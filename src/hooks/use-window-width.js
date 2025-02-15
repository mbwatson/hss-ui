import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }
  return () => {}; // no-op in non-browser environments
}

function getSnapshot() {
  return typeof window !== 'undefined' ? window.innerWidth : 1024; // Default width for SSR
}

export const useWindowWidth = () => useSyncExternalStore(subscribe, getSnapshot);
