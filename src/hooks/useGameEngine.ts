import { useReducer, useEffect, useRef } from 'react';
import { gameReducer, initialState } from '@/game/reducer';

export const useGameEngine = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const lastTimeRef = useRef(0);
  const animationFrameIdRef = useRef<number>();

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // in seconds
      lastTimeRef.current = timestamp;

      if (state.status === 'in-progress') {
        dispatch({ type: 'GAME_TICK', payload: { deltaTime } });
      }

      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [state.status]);

  return { state, dispatch };
};