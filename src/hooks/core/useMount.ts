import react from 'react';

const useMount = (fn: () => void) => {
  react.useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
