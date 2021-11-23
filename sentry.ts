/**
 * Sentry initialization
 */
import { init } from '@sentry/node';

export default () => {
  if (['test', 'development'].includes(process.env.NODE_ENV)) { return; }
  init({
    environment: (process.env.NODE_ENV || 'staging'),
    dsn: process.env.SENTRY_DSN,
  });
};
