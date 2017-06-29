const mock = () => {
  let storage = {};
  return {
    getItem: (key: string) => key in storage ? (<any>storage)[key] : null,
    setItem: (key: string, value: any) => (<any>storage)[key] = value || '',
    removeItem: (key: string) => delete (<any>storage)[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
