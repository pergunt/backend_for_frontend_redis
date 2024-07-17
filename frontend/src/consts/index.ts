// nodejs app won't be able to start without this env var so we can cast it
const { REACT_APP_API_URL: API_URL } = process.env as Record<string, string>;

export { API_URL };
