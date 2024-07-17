module.exports = {
  eslint: {
    mode: 'file', // Remove default config.
    loaderOptions: { resolvePluginsRelativeTo: process.cwd() }, // Use eslint plugins from your node_modules, not from react-script's ones.
  }
};
