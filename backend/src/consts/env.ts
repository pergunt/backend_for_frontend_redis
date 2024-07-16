export const { API_URL, CORS_URLS, PORT } = process.env as Record<
  string,
  string
>;

export const ENV_VARS = ["API_URL", "CORS_URLS", "PORT"] as const;
