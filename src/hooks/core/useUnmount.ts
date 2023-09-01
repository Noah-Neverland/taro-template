import react from 'react';
import { useLatest } from './index';

const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);

  react.useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};

export default useUnmount;
