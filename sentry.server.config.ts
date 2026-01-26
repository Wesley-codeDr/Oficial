// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Disable sending user PII (Personally Identifiable Information) - LGPD compliance
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // Before send callback to filter sensitive data
  beforeSend(event, hint) {
    // Remove sensitive data from the event
    if (event.request) {
      delete event.request.cookies
      delete event.request.headers
    }

    // Remove user PII
    if (event.user) {
      delete event.user.email
      delete event.user.ip_address
      delete event.user.username
    }

    return event
  },
});
