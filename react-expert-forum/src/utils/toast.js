let listeners = [];

export const toast = {
  show(message, type = 'info') {
    const id = Date.now() + Math.random();
    listeners.forEach((listener) => listener({ id, message, type }));
  },
  success(message) {
    this.show(message, 'success');
  },
  error(message) {
    this.show(message, 'error');
  },
  info(message) {
    this.show(message, 'info');
  },
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
