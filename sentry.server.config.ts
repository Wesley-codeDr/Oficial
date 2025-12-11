// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://893edabca7965e86e06718dbfcba0166@o4510188708691968.ingest.us.sentry.io/4510497457831936",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Filter out errors that are expected operational events
  beforeSend(event, hint) {
    const error = hint.originalException;
    
    // Filter out "aborted" errors from HTTP server
    // These occur when clients disconnect before requests complete (normal behavior)
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      // Check for aborted connection errors
      if (errorMessage.includes('aborted')) {
        return null; // Don't send to Sentry
      }
    }
    
    return event;
  },
});
