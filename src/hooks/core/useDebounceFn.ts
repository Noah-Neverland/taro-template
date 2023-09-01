import { debounce } from 'lodash-es';
import { useLatest, useUnmount, useCreation } from './index';

type noop = (...args: any[]) => any;

interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
  const fnRef = useLatest(fn);

  const debounced = useCreation(() => debounce((...args: Parameters<T>): ReturnType<T> => fnRef.current(...args), options?.wait ?? 1000, options), []);

  useUnmount(() => {
    debounced.cancel();
  });

  return debounced;
};

export default useDebounceFn;
