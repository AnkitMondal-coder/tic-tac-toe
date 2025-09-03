import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((frequency: number, duration: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not supported
      console.log('Audio not supported');
    }
  }, []);

  const playMoveSound = useCallback(() => {
    playSound(800, 0.1);
  }, [playSound]);

  const playWinSound = useCallback(() => {
    playSound(1200, 0.3);
    setTimeout(() => playSound(1400, 0.2), 100);
    setTimeout(() => playSound(1600, 0.3), 200);
  }, [playSound]);

  const playDrawSound = useCallback(() => {
    playSound(400, 0.5);
  }, [playSound]);

  return {
    playMoveSound,
    playWinSound,
    playDrawSound
  };
};