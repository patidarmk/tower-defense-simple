import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  Outlet,
  NotFoundRoute
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from './pages/NotFound';
import Game from './pages/Game';

const queryClient = new QueryClient();

// Create root route
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Outlet />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})

// Create a 404 Route
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

// Create index route
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

// Create game route
const gameRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: Game,
})

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, gameRoute])

// Create router with proper TypeScript configuration
const router = createRouter({ 
  routeTree,
  notFoundRoute,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;