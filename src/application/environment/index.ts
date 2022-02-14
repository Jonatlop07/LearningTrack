export function setEnvironment(): Array<string> | string {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ['local.app.env'];
    case 'test':
      return ['test.app.env', 'local.app.env'];
    case 'production':
      return ['prod.app.env', 'local.app.env'];
    default:
      return 'local.app.env';
  }
}
