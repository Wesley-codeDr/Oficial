;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="4e54b3da-b6bb-3682-4ee7-8fa81045429e")}catch(e){}}();
module.exports = [
"[project]/sentry.server.config.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/cjs/index.server.js [instrumentation] (ecmascript)");
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["init"]({
    dsn: "https://893edabca7965e86e06718dbfcba0166@o4510188708691968.ingest.us.sentry.io/4510497457831936",
    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Enable sending user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
    sendDefaultPii: true
});
}),
];

//# debugId=4e54b3da-b6bb-3682-4ee7-8fa81045429e
//# sourceMappingURL=sentry_server_config_ts_8712b202._.js.map