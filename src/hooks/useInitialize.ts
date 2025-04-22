import { useEffect, useState } from 'react';
import { useStore } from '../storage/StoreContext';

export const useInitialize = () => {
  const store = useStore();
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      await store.initialize();
      setIsInitialized(true);
    };
    
    init();
  }, [store]);
  
  return isInitialized;
};