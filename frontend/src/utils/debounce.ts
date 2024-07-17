const debounce = (fn: (...args: any[]) => any, delay?: number) => {
  let timer: number | undefined;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = window.setTimeout(() => fn(...args), delay);
  };
};

export default debounce;
