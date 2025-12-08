;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="0fe63a66-d806-5085-70df-19dde0f5336e")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/utils/lazyLoadIntegration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lazyLoadIntegration",
    ()=>lazyLoadIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/version.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
// This is a map of integration function method to bundle file name.
const LazyLoadableIntegrations = {
    replayIntegration: 'replay',
    replayCanvasIntegration: 'replay-canvas',
    feedbackIntegration: 'feedback',
    feedbackModalIntegration: 'feedback-modal',
    feedbackScreenshotIntegration: 'feedback-screenshot',
    captureConsoleIntegration: 'captureconsole',
    contextLinesIntegration: 'contextlines',
    linkedErrorsIntegration: 'linkederrors',
    dedupeIntegration: 'dedupe',
    extraErrorDataIntegration: 'extraerrordata',
    graphqlClientIntegration: 'graphqlclient',
    httpClientIntegration: 'httpclient',
    reportingObserverIntegration: 'reportingobserver',
    rewriteFramesIntegration: 'rewriteframes',
    browserProfilingIntegration: 'browserprofiling',
    moduleMetadataIntegration: 'modulemetadata',
    instrumentAnthropicAiClient: 'instrumentanthropicaiclient',
    instrumentOpenAiClient: 'instrumentopenaiclient',
    instrumentGoogleGenAIClient: 'instrumentgooglegenaiclient',
    instrumentLangGraph: 'instrumentlanggraph',
    createLangChainCallbackHandler: 'createlangchaincallbackhandler'
};
const WindowWithMaybeIntegration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"];
/**
 * Lazy load an integration from the CDN.
 * Rejects if the integration cannot be loaded.
 */ async function lazyLoadIntegration(name, scriptNonce) {
    const bundle = LazyLoadableIntegrations[name];
    // `window.Sentry` is only set when using a CDN bundle, but this method can also be used via the NPM package
    const sentryOnWindow = WindowWithMaybeIntegration.Sentry = WindowWithMaybeIntegration.Sentry || {};
    if (!bundle) {
        throw new Error(`Cannot lazy load integration: ${name}`);
    }
    // Bail if the integration already exists
    const existing = sentryOnWindow[name];
    // The `feedbackIntegration` is loaded by default in the CDN bundles,
    // so we need to differentiate between the real integration and the shim.
    // if only the shim exists, we still want to lazy load the real integration.
    if (typeof existing === 'function' && !('_isShim' in existing)) {
        return existing;
    }
    const url = getScriptURL(bundle);
    const script = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.createElement('script');
    script.src = url;
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'strict-origin';
    if (scriptNonce) {
        script.setAttribute('nonce', scriptNonce);
    }
    const waitForLoad = new Promise((resolve, reject)=>{
        script.addEventListener('load', ()=>resolve());
        script.addEventListener('error', reject);
    });
    const currentScript = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.currentScript;
    const parent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.body || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.head || currentScript?.parentElement;
    if (parent) {
        parent.appendChild(script);
    } else {
        throw new Error(`Could not find parent element to insert lazy-loaded ${name} script`);
    }
    try {
        await waitForLoad;
    } catch  {
        throw new Error(`Error when loading integration: ${name}`);
    }
    const integrationFn = sentryOnWindow[name];
    if (typeof integrationFn !== 'function') {
        throw new Error(`Could not load integration: ${name}`);
    }
    return integrationFn;
}
function getScriptURL(bundle) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const baseURL = client?.getOptions()?.cdnBaseUrl || 'https://browser.sentry-cdn.com';
    return new URL(`/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_VERSION"]}/${bundle}.min.js`, baseURL).toString();
}
;
 //# sourceMappingURL=lazyLoadIntegration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/feedbackAsync.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "feedbackAsyncIntegration",
    ()=>feedbackAsyncIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+feedback@10.29.0/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/utils/lazyLoadIntegration.js [app-client] (ecmascript)");
;
;
/**
 * An integration to add user feedback to your application,
 * while loading most of the code lazily only when it's needed.
 */ const feedbackAsyncIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFeedbackIntegration"])({
    lazyLoadIntegration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazyLoadIntegration"]
});
;
 //# sourceMappingURL=feedbackAsync.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/feedbackSync.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "feedbackSyncIntegration",
    ()=>feedbackSyncIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+feedback@10.29.0/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [app-client] (ecmascript)");
;
/** Add a widget to capture user feedback to your application. */ const feedbackSyncIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFeedbackIntegration"])({
    getModalIntegration: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackModalIntegration"],
    getScreenshotIntegration: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackScreenshotIntegration"]
});
;
 //# sourceMappingURL=feedbackSync.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uiProfiler",
    ()=>uiProfiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
;
;
/**
 * Starts the Sentry UI profiler.
 * This mode is exclusive with the transaction profiler and will only work if the profilesSampleRate is set to a falsy value.
 * In UI profiling mode, the profiler will keep reporting profile chunks to Sentry until it is stopped, which allows for continuous profiling of the application.
 */ function startProfiler() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('No Sentry client available, profiling is not started');
        return;
    }
    const integration = client.getIntegrationByName('BrowserProfiling');
    if (!integration) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('BrowserProfiling integration is not available');
        return;
    }
    client.emit('startUIProfiler');
}
/**
 * Stops the Sentry UI profiler.
 * Calls to stop will stop the profiler and flush the currently collected profile data to Sentry.
 */ function stopProfiler() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('No Sentry client available, profiling is not started');
        return;
    }
    const integration = client.getIntegrationByName('BrowserProfiling');
    if (!integration) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('ProfilingIntegration is not available');
        return;
    }
    client.emit('stopUIProfiler');
}
/**
 * Profiler namespace for controlling the JS profiler in 'manual' mode.
 *
 * Requires the `browserProfilingIntegration` from the `@sentry/browser` package.
 */ const uiProfiler = {
    startProfiler,
    stopProfiler
};
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/userfeedback.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUserFeedbackEnvelope",
    ()=>createUserFeedbackEnvelope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/dsn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
;
/**
 * Creates an envelope from a user feedback.
 */ function createUserFeedbackEnvelope(feedback, { metadata, tunnel, dsn }) {
    const headers = {
        event_id: feedback.event_id,
        sent_at: new Date().toISOString(),
        ...metadata?.sdk && {
            sdk: {
                name: metadata.sdk.name,
                version: metadata.sdk.version
            }
        },
        ...!!tunnel && !!dsn && {
            dsn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dsnToString"])(dsn)
        }
    };
    const item = createUserFeedbackEnvelopeItem(feedback);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEnvelope"])(headers, [
        item
    ]);
}
function createUserFeedbackEnvelopeItem(feedback) {
    const feedbackHeaders = {
        type: 'user_report'
    };
    return [
        feedbackHeaders,
        feedback
    ];
}
;
 //# sourceMappingURL=userfeedback.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/report-dialog.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "showReportDialog",
    ()=>showReportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
/**
 * Present the user with a report dialog.
 *
 * @param options Everything is optional, we try to fetch all info need from the current scope.
 */ function showReportDialog(options = {}) {
    const optionalDocument = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document;
    const injectionPoint = optionalDocument?.head || optionalDocument?.body;
    // doesn't work without a document (React Native)
    if (!injectionPoint) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('[showReportDialog] Global document not defined');
        return;
    }
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const dsn = client?.getDsn();
    if (!dsn) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('[showReportDialog] DSN not configured');
        return;
    }
    const mergedOptions = {
        ...options,
        user: {
            ...scope.getUser(),
            ...options.user
        },
        eventId: options.eventId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lastEventId"])()
    };
    const script = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReportDialogEndpoint"])(dsn, mergedOptions);
    const { onLoad, onClose } = mergedOptions;
    if (onLoad) {
        script.onload = onLoad;
    }
    if (onClose) {
        const reportDialogClosedMessageHandler = (event)=>{
            if (event.data === '__sentry_reportdialog_closed__') {
                try {
                    onClose();
                } finally{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].removeEventListener('message', reportDialogClosedMessageHandler);
                }
            }
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].addEventListener('message', reportDialogClosedMessageHandler);
    }
    injectionPoint.appendChild(script);
}
;
 //# sourceMappingURL=report-dialog.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/reportingobserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportingObserverIntegration",
    ()=>reportingObserverIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/supports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
const INTEGRATION_NAME = 'ReportingObserver';
const SETUP_CLIENTS = new WeakMap();
const _reportingObserverIntegration = (options = {})=>{
    const types = options.types || [
        'crash',
        'deprecation',
        'intervention'
    ];
    /** Handler for the reporting observer. */ function handler(reports) {
        if (!SETUP_CLIENTS.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])())) {
            return;
        }
        for (const report of reports){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
                scope.setExtra('url', report.url);
                const label = `ReportingObserver [${report.type}]`;
                let details = 'No details available';
                if (report.body) {
                    // Object.keys doesn't work on ReportBody, as all properties are inherited
                    const plainBody = {};
                    // eslint-disable-next-line guard-for-in
                    for(const prop in report.body){
                        plainBody[prop] = report.body[prop];
                    }
                    scope.setExtra('body', plainBody);
                    if (report.type === 'crash') {
                        const body = report.body;
                        // A fancy way to create a message out of crashId OR reason OR both OR fallback
                        details = [
                            body.crashId || '',
                            body.reason || ''
                        ].join(' ').trim() || details;
                    } else {
                        const body = report.body;
                        details = body.message || details;
                    }
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureMessage"])(`${label}: ${details}`);
            });
        }
    }
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsReportingObserver"])()) {
                return;
            }
            const observer = new WINDOW.ReportingObserver(handler, {
                buffered: true,
                types
            });
            observer.observe();
        },
        setup (client) {
            SETUP_CLIENTS.set(client, true);
        }
    };
};
/**
 * Reporting API integration - https://w3c.github.io/reporting/
 */ const reportingObserverIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_reportingObserverIntegration);
;
 //# sourceMappingURL=reportingobserver.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpclient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "httpClientIntegration",
    ()=>httpClientIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/supports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/instrument/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$isSentryRequestUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/isSentryRequestUrl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+browser-utils@10.29.0/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
;
;
;
const INTEGRATION_NAME = 'HttpClient';
const _httpClientIntegration = (options = {})=>{
    const _options = {
        failedRequestStatusCodes: [
            [
                500,
                599
            ]
        ],
        failedRequestTargets: [
            /.*/
        ],
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            _wrapFetch(client, _options);
            _wrapXHR(client, _options);
        }
    };
};
/**
 * Create events for failed client side HTTP requests.
 */ const httpClientIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_httpClientIntegration);
/**
 * Interceptor function for fetch requests
 *
 * @param requestInfo The Fetch API request info
 * @param response The Fetch API response
 * @param requestInit The request init object
 */ function _fetchResponseHandler(options, requestInfo, response, requestInit, error) {
    if (_shouldCaptureResponse(options, response.status, response.url)) {
        const request = _getRequest(requestInfo, requestInit);
        let requestHeaders, responseHeaders, requestCookies, responseCookies;
        if (_shouldSendDefaultPii()) {
            [requestHeaders, requestCookies] = _parseCookieHeaders('Cookie', request);
            [responseHeaders, responseCookies] = _parseCookieHeaders('Set-Cookie', response);
        }
        const event = _createEvent({
            url: request.url,
            method: request.method,
            status: response.status,
            requestHeaders,
            responseHeaders,
            requestCookies,
            responseCookies,
            error,
            type: 'fetch'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"])(event);
    }
}
function _parseCookieHeaders(cookieHeader, obj) {
    const headers = _extractFetchHeaders(obj.headers);
    let cookies;
    try {
        const cookieString = headers[cookieHeader] || headers[cookieHeader.toLowerCase()] || undefined;
        if (cookieString) {
            cookies = _parseCookieString(cookieString);
        }
    } catch  {
    // ignore it if parsing fails
    }
    return [
        headers,
        cookies
    ];
}
/**
 * Interceptor function for XHR requests
 *
 * @param xhr The XHR request
 * @param method The HTTP method
 * @param headers The HTTP headers
 */ function _xhrResponseHandler(options, xhr, method, headers, error) {
    if (_shouldCaptureResponse(options, xhr.status, xhr.responseURL)) {
        let requestHeaders, responseCookies, responseHeaders;
        if (_shouldSendDefaultPii()) {
            try {
                const cookieString = xhr.getResponseHeader('Set-Cookie') || xhr.getResponseHeader('set-cookie') || undefined;
                if (cookieString) {
                    responseCookies = _parseCookieString(cookieString);
                }
            } catch  {
            // ignore it if parsing fails
            }
            try {
                responseHeaders = _getXHRResponseHeaders(xhr);
            } catch  {
            // ignore it if parsing fails
            }
            requestHeaders = headers;
        }
        const event = _createEvent({
            url: xhr.responseURL,
            method,
            status: xhr.status,
            requestHeaders,
            // Can't access request cookies from XHR
            responseHeaders,
            responseCookies,
            error,
            type: 'xhr'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"])(event);
    }
}
/**
 * Extracts response size from `Content-Length` header when possible
 *
 * @param headers
 * @returns The response size in bytes or undefined
 */ function _getResponseSizeFromHeaders(headers) {
    if (headers) {
        const contentLength = headers['Content-Length'] || headers['content-length'];
        if (contentLength) {
            return parseInt(contentLength, 10);
        }
    }
    return undefined;
}
/**
 * Creates an object containing cookies from the given cookie string
 *
 * @param cookieString The cookie string to parse
 * @returns The parsed cookies
 */ function _parseCookieString(cookieString) {
    return cookieString.split('; ').reduce((acc, cookie)=>{
        const [key, value] = cookie.split('=');
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
/**
 * Extracts the headers as an object from the given Fetch API request or response object
 *
 * @param headers The headers to extract
 * @returns The extracted headers as an object
 */ function _extractFetchHeaders(headers) {
    const result = {};
    headers.forEach((value, key)=>{
        result[key] = value;
    });
    return result;
}
/**
 * Extracts the response headers as an object from the given XHR object
 *
 * @param xhr The XHR object to extract the response headers from
 * @returns The response headers as an object
 */ function _getXHRResponseHeaders(xhr) {
    const headers = xhr.getAllResponseHeaders();
    if (!headers) {
        return {};
    }
    return headers.split('\r\n').reduce((acc, line)=>{
        const [key, value] = line.split(': ');
        if (key && value) {
            acc[key] = value;
        }
        return acc;
    }, {});
}
/**
 * Checks if the given target url is in the given list of targets
 *
 * @param target The target url to check
 * @returns true if the target url is in the given list of targets, false otherwise
 */ function _isInGivenRequestTargets(failedRequestTargets, target) {
    return failedRequestTargets.some((givenRequestTarget)=>{
        if (typeof givenRequestTarget === 'string') {
            return target.includes(givenRequestTarget);
        }
        return givenRequestTarget.test(target);
    });
}
/**
 * Checks if the given status code is in the given range
 *
 * @param status The status code to check
 * @returns true if the status code is in the given range, false otherwise
 */ function _isInGivenStatusRanges(failedRequestStatusCodes, status) {
    return failedRequestStatusCodes.some((range)=>{
        if (typeof range === 'number') {
            return range === status;
        }
        return status >= range[0] && status <= range[1];
    });
}
/**
 * Wraps `fetch` function to capture request and response data
 */ function _wrapFetch(client, options) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$supports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsNativeFetch"])()) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addFetchInstrumentationHandler"])((handlerData)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { response, args, error, virtualError } = handlerData;
        const [requestInfo, requestInit] = args;
        if (!response) {
            return;
        }
        _fetchResponseHandler(options, requestInfo, response, requestInit, error || virtualError);
    }, false);
}
/**
 * Wraps XMLHttpRequest to capture request and response data
 */ function _wrapXHR(client, options) {
    if (!('XMLHttpRequest' in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"])) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addXhrInstrumentationHandler"])((handlerData)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client) {
            return;
        }
        const { error, virtualError } = handlerData;
        const xhr = handlerData.xhr;
        const sentryXhrData = xhr[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
        if (!sentryXhrData) {
            return;
        }
        const { method, request_headers: headers } = sentryXhrData;
        try {
            _xhrResponseHandler(options, xhr, method, headers, error || virtualError);
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('Error while extracting response event form XHR response', e);
        }
    });
}
/**
 * Checks whether to capture given response as an event
 *
 * @param status response status code
 * @param url response url
 */ function _shouldCaptureResponse(options, status, url) {
    return _isInGivenStatusRanges(options.failedRequestStatusCodes, status) && _isInGivenRequestTargets(options.failedRequestTargets, url) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$isSentryRequestUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSentryRequestUrl"])(url, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])());
}
/**
 * Creates a synthetic Sentry event from given response data
 *
 * @param data response data
 * @returns event
 */ function _createEvent(data) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const virtualStackTrace = client && data.error && data.error instanceof Error ? data.error.stack : undefined;
    // Remove the first frame from the stack as it's the HttpClient call
    const stack = virtualStackTrace && client ? client.getOptions().stackParser(virtualStackTrace, 0, 1) : undefined;
    const message = `HTTP Client Error with status code: ${data.status}`;
    const event = {
        message,
        exception: {
            values: [
                {
                    type: 'Error',
                    value: message,
                    stacktrace: stack ? {
                        frames: stack
                    } : undefined
                }
            ]
        },
        request: {
            url: data.url,
            method: data.method,
            headers: data.requestHeaders,
            cookies: data.requestCookies
        },
        contexts: {
            response: {
                status_code: data.status,
                headers: data.responseHeaders,
                cookies: data.responseCookies,
                body_size: _getResponseSizeFromHeaders(data.responseHeaders)
            }
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
        type: `auto.http.client.${data.type}`,
        handled: false
    });
    return event;
}
function _getRequest(requestInfo, requestInit) {
    if (!requestInit && requestInfo instanceof Request) {
        return requestInfo;
    }
    // If both are set, we try to construct a new Request with the given arguments
    // However, if e.g. the original request has a `body`, this will throw an error because it was already accessed
    // In this case, as a fallback, we just use the original request - using both is rather an edge case
    if (requestInfo instanceof Request && requestInfo.bodyUsed) {
        return requestInfo;
    }
    return new Request(requestInfo, requestInit);
}
function _shouldSendDefaultPii() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    return client ? Boolean(client.getOptions().sendDefaultPii) : false;
}
;
 //# sourceMappingURL=httpclient.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/contextlines.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySourceContextToFrame",
    ()=>applySourceContextToFrame,
    "contextLinesIntegration",
    ()=>contextLinesIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/url.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
;
const WINDOW = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"];
const DEFAULT_LINES_OF_CONTEXT = 7;
const INTEGRATION_NAME = 'ContextLines';
const _contextLinesIntegration = (options = {})=>{
    const contextLines = options.frameContextLines != null ? options.frameContextLines : DEFAULT_LINES_OF_CONTEXT;
    return {
        name: INTEGRATION_NAME,
        processEvent (event) {
            return addSourceContext(event, contextLines);
        }
    };
};
/**
 * Collects source context lines around the lines of stackframes pointing to JS embedded in
 * the current page's HTML.
 *
 * This integration DOES NOT work for stack frames pointing to JS files that are loaded by the browser.
 * For frames pointing to files, context lines are added during ingestion and symbolication
 * by attempting to download the JS files to the Sentry backend.
 *
 * Use this integration if you have inline JS code in HTML pages that can't be accessed
 * by our backend (e.g. due to a login-protected page).
 */ const contextLinesIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_contextLinesIntegration);
/**
 * Processes an event and adds context lines.
 */ function addSourceContext(event, contextLines) {
    const doc = WINDOW.document;
    const htmlFilename = WINDOW.location && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripUrlQueryAndFragment"])(WINDOW.location.href);
    if (!doc || !htmlFilename) {
        return event;
    }
    const exceptions = event.exception?.values;
    if (!exceptions?.length) {
        return event;
    }
    const html = doc.documentElement.innerHTML;
    if (!html) {
        return event;
    }
    const htmlLines = [
        '<!DOCTYPE html>',
        '<html>',
        ...html.split('\n'),
        '</html>'
    ];
    exceptions.forEach((exception)=>{
        const stacktrace = exception.stacktrace;
        if (stacktrace?.frames) {
            stacktrace.frames = stacktrace.frames.map((frame)=>applySourceContextToFrame(frame, htmlLines, htmlFilename, contextLines));
        }
    });
    return event;
}
/**
 * Only exported for testing
 */ function applySourceContextToFrame(frame, htmlLines, htmlFilename, linesOfContext) {
    if (frame.filename !== htmlFilename || !frame.lineno || !htmlLines.length) {
        return frame;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addContextToFrame"])(htmlLines, frame, linesOfContext);
    return frame;
}
;
 //# sourceMappingURL=contextlines.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/graphqlClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGraphQLRequestPayload",
    ()=>getGraphQLRequestPayload,
    "getRequestPayloadXhrOrFetch",
    ()=>getRequestPayloadXhrOrFetch,
    "graphqlClientIntegration",
    ()=>graphqlClientIntegration,
    "parseGraphQLQuery",
    ()=>parseGraphQLQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+browser-utils@10.29.0/node_modules/@sentry-internal/browser-utils/build/esm/instrument/xhr.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+browser-utils@10.29.0/node_modules/@sentry-internal/browser-utils/build/esm/networkUtils.js [app-client] (ecmascript)");
;
;
const INTEGRATION_NAME = 'GraphQLClient';
const _graphqlClientIntegration = (options)=>{
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            _updateSpanWithGraphQLData(client, options);
            _updateBreadcrumbWithGraphQLData(client, options);
        }
    };
};
function _updateSpanWithGraphQLData(client, options) {
    client.on('beforeOutgoingRequestSpan', (span, hint)=>{
        const spanJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span);
        const spanAttributes = spanJSON.data || {};
        const spanOp = spanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]];
        const isHttpClientSpan = spanOp === 'http.client';
        if (!isHttpClientSpan) {
            return;
        }
        const httpUrl = spanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_URL_FULL"]] || spanAttributes['http.url'];
        const httpMethod = spanAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_HTTP_REQUEST_METHOD"]] || spanAttributes['http.method'];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(httpUrl) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isString"])(httpMethod)) {
            return;
        }
        const { endpoints } = options;
        const isTracedGraphqlEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(httpUrl, endpoints);
        const payload = getRequestPayloadXhrOrFetch(hint);
        if (isTracedGraphqlEndpoint && payload) {
            const graphqlBody = getGraphQLRequestPayload(payload);
            if (graphqlBody) {
                const operationInfo = _getGraphQLOperation(graphqlBody);
                span.updateName(`${httpMethod} ${httpUrl} (${operationInfo})`);
                span.setAttribute('graphql.document', payload);
            }
        }
    });
}
function _updateBreadcrumbWithGraphQLData(client, options) {
    client.on('beforeOutgoingRequestBreadcrumb', (breadcrumb, handlerData)=>{
        const { category, type, data } = breadcrumb;
        const isFetch = category === 'fetch';
        const isXhr = category === 'xhr';
        const isHttpBreadcrumb = type === 'http';
        if (isHttpBreadcrumb && (isFetch || isXhr)) {
            const httpUrl = data?.url;
            const { endpoints } = options;
            const isTracedGraphqlEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringMatchesSomePattern"])(httpUrl, endpoints);
            const payload = getRequestPayloadXhrOrFetch(handlerData);
            if (isTracedGraphqlEndpoint && data && payload) {
                const graphqlBody = getGraphQLRequestPayload(payload);
                if (!data.graphql && graphqlBody) {
                    const operationInfo = _getGraphQLOperation(graphqlBody);
                    data['graphql.document'] = graphqlBody.query;
                    data['graphql.operation'] = operationInfo;
                }
            }
        }
    });
}
/**
 * @param requestBody - GraphQL request
 * @returns A formatted version of the request: 'TYPE NAME' or 'TYPE'
 */ function _getGraphQLOperation(requestBody) {
    const { query: graphqlQuery, operationName: graphqlOperationName } = requestBody;
    const { operationName = graphqlOperationName, operationType } = parseGraphQLQuery(graphqlQuery);
    const operationInfo = operationName ? `${operationType} ${operationName}` : `${operationType}`;
    return operationInfo;
}
/**
 * Get the request body/payload based on the shape of the hint.
 *
 * Exported for tests only.
 */ function getRequestPayloadXhrOrFetch(hint) {
    const isXhr = 'xhr' in hint;
    let body;
    if (isXhr) {
        const sentryXhrData = hint.xhr[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$instrument$2f$xhr$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SENTRY_XHR_DATA_KEY"]];
        body = sentryXhrData && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBodyString"])(sentryXhrData.body)[0];
    } else {
        const sentryFetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFetchRequestArgBody"])(hint.input);
        body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$browser$2d$utils$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$browser$2d$utils$2f$build$2f$esm$2f$networkUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBodyString"])(sentryFetchData)[0];
    }
    return body;
}
/**
 * Extract the name and type of the operation from the GraphQL query.
 *
 * Exported for tests only.
 */ function parseGraphQLQuery(query) {
    const namedQueryRe = /^(?:\s*)(query|mutation|subscription)(?:\s*)(\w+)(?:\s*)[{(]/;
    const unnamedQueryRe = /^(?:\s*)(query|mutation|subscription)(?:\s*)[{(]/;
    const namedMatch = query.match(namedQueryRe);
    if (namedMatch) {
        return {
            operationType: namedMatch[1],
            operationName: namedMatch[2]
        };
    }
    const unnamedMatch = query.match(unnamedQueryRe);
    if (unnamedMatch) {
        return {
            operationType: unnamedMatch[1],
            operationName: undefined
        };
    }
    return {
        operationType: undefined,
        operationName: undefined
    };
}
/**
 * Extract the payload of a request if it's GraphQL.
 * Exported for tests only.
 * @param payload - A valid JSON string
 * @returns A POJO or undefined
 */ function getGraphQLRequestPayload(payload) {
    let graphqlBody = undefined;
    try {
        const requestBody = JSON.parse(payload);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const isGraphQLRequest = !!requestBody['query'];
        if (isGraphQLRequest) {
            graphqlBody = requestBody;
        }
    } finally{
        // Fallback to undefined if payload is an invalid JSON (SyntaxError)
        /* eslint-disable no-unsafe-finally */ return graphqlBody;
    }
}
/**
 * This integration ensures that GraphQL requests made in the browser
 * have their GraphQL-specific data captured and attached to spans and breadcrumbs.
 */ const graphqlClientIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_graphqlClientIntegration);
;
 //# sourceMappingURL=graphqlClient.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/tracing/reportPageLoaded.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportPageLoaded",
    ()=>reportPageLoaded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
;
/**
 * Manually report the end of the page load, resulting in the SDK ending the pageload span.
 * This only works if {@link BrowserTracingOptions.enableReportPageLoaded} is set to `true`.
 * Otherwise, the pageload span will end itself based on the {@link BrowserTracingOptions.finalTimeout},
 * {@link BrowserTracingOptions.idleTimeout} and {@link BrowserTracingOptions.childSpanTimeout}.
 *
 * @param client - The client to use. If not provided, the global client will be used.
 */ function reportPageLoaded(client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])()) {
    client?.emit('endPageloadSpan');
}
;
 //# sourceMappingURL=reportPageLoaded.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/tracing/setActiveSpan.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setActiveSpanInBrowser",
    ()=>setActiveSpanInBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$setSpanForScope__as__$5f$INTERNAL_setSpanForScope$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript) <export _setSpanForScope as _INTERNAL_setSpanForScope>");
;
/**
 * Sets an inactive span active on the current scope.
 *
 * This is useful in browser applications, if you want to create a span that cannot be finished
 * within its callback. Any spans started while the given span is active, will be children of the span.
 *
 * If there already was an active span on the scope prior to calling this function, it is replaced
 * with the given span and restored after the span ended. Otherwise, the span will simply be
 * removed, resulting in no active span on the scope.
 *
 * IMPORTANT: This function can ONLY be used in the browser! Calling this function in a server
 * environment (for example in a server-side rendered component) will result in undefined behaviour
 * and is not supported.
 * You MUST call `span.end()` manually, otherwise the span will never be finished.
 *
 * @example
 * ```js
 * let checkoutSpan;
 *
 * on('checkoutStarted', () => {
 *  checkoutSpan = Sentry.startInactiveSpan({ name: 'checkout-flow' });
 *  Sentry.setActiveSpanInBrowser(checkoutSpan);
 * })
 *
 * // during this time, any spans started will be children of `checkoutSpan`:
 * Sentry.startSpan({ name: 'checkout-step-1' }, () => {
 *  // ... `
 * })
 *
 * on('checkoutCompleted', () => {
 *  checkoutSpan?.end();
 * })
 * ```
 *
 * @param span - the span to set active
 */ function setActiveSpanInBrowser(span) {
    const maybePreviousActiveSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    // If the span is already active, there's no need to double-patch or set it again.
    // This also guards against users (for whatever reason) calling setActiveSpanInBrowser on SDK-started
    // idle spans like pageload or navigation spans. These will already be handled correctly by the SDK.
    // For nested situations, we have to double-patch to ensure we restore the correct previous span (see tests)
    if (maybePreviousActiveSpan === span) {
        return;
    }
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    // Putting a small patch onto the span.end method to ensure we
    // remove the span from the scope when it ends.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    span.end = new Proxy(span.end, {
        apply (target, thisArg, args) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$setSpanForScope__as__$5f$INTERNAL_setSpanForScope$3e$__["_INTERNAL_setSpanForScope"])(scope, maybePreviousActiveSpan);
            return Reflect.apply(target, thisArg, args);
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$setSpanForScope__as__$5f$INTERNAL_setSpanForScope$3e$__["_INTERNAL_setSpanForScope"])(scope, span);
}
;
 //# sourceMappingURL=setActiveSpan.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/transports/offline.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore,
    "makeBrowserOfflineTransport",
    ()=>makeBrowserOfflineTransport,
    "push",
    ()=>push,
    "shift",
    ()=>shift,
    "unshift",
    ()=>unshift
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$offline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/transports/offline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [app-client] (ecmascript)");
;
;
;
// 'Store', 'promisifyRequest' and 'createStore' were originally copied from the 'idb-keyval' package before being
// modified and simplified: https://github.com/jakearchibald/idb-keyval
//
// At commit: 0420a704fd6cbb4225429c536b1f61112d012fca
// Original license:
// Copyright 2016, Jake Archibald
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function promisifyRequest(request) {
    return new Promise((resolve, reject)=>{
        // @ts-expect-error - file size hacks
        request.oncomplete = request.onsuccess = ()=>resolve(request.result);
        // @ts-expect-error - file size hacks
        request.onabort = request.onerror = ()=>reject(request.error);
    });
}
/** Create or open an IndexedDb store */ function createStore(dbName, storeName) {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = ()=>request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);
    return (callback)=>dbp.then((db)=>callback(db.transaction(storeName, 'readwrite').objectStore(storeName)));
}
function keys(store) {
    return promisifyRequest(store.getAllKeys());
}
/** Insert into the end of the store */ function push(store, value, maxQueueSize) {
    return store((store)=>{
        return keys(store).then((keys)=>{
            if (keys.length >= maxQueueSize) {
                return;
            }
            // We insert with an incremented key so that the entries are popped in order
            store.put(value, Math.max(...keys, 0) + 1);
            return promisifyRequest(store.transaction);
        });
    });
}
/** Insert into the front of the store */ function unshift(store, value, maxQueueSize) {
    return store((store)=>{
        return keys(store).then((keys)=>{
            if (keys.length >= maxQueueSize) {
                return;
            }
            // We insert with an decremented key so that the entries are popped in order
            store.put(value, Math.min(...keys, 0) - 1);
            return promisifyRequest(store.transaction);
        });
    });
}
/** Pop the oldest value from the store */ function shift(store) {
    return store((store)=>{
        return keys(store).then((keys)=>{
            const firstKey = keys[0];
            if (firstKey == null) {
                return undefined;
            }
            return promisifyRequest(store.get(firstKey)).then((value)=>{
                store.delete(firstKey);
                return promisifyRequest(store.transaction).then(()=>value);
            });
        });
    });
}
function createIndexedDbStore(options) {
    let store;
    // Lazily create the store only when it's needed
    function getStore() {
        if (store == undefined) {
            store = createStore(options.dbName || 'sentry-offline', options.storeName || 'queue');
        }
        return store;
    }
    return {
        push: async (env)=>{
            try {
                const serialized = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeEnvelope"])(env);
                await push(getStore(), serialized, options.maxQueueSize || 30);
            } catch  {
            //
            }
        },
        unshift: async (env)=>{
            try {
                const serialized = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeEnvelope"])(env);
                await unshift(getStore(), serialized, options.maxQueueSize || 30);
            } catch  {
            //
            }
        },
        shift: async ()=>{
            try {
                const deserialized = await shift(getStore());
                if (deserialized) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEnvelope"])(deserialized);
                }
            } catch  {
            //
            }
            return undefined;
        }
    };
}
function makeIndexedDbOfflineTransport(createTransport) {
    return (options)=>{
        const transport = createTransport({
            ...options,
            createStore: createIndexedDbStore
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].addEventListener('online', async (_)=>{
            await transport.flush();
        });
        return transport;
    };
}
/**
 * Creates a transport that uses IndexedDb to store events when offline.
 */ function makeBrowserOfflineTransport(createTransport = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeFetchTransport"]) {
    return makeIndexedDbOfflineTransport((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$offline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeOfflineTransport"])(createTransport));
}
;
 //# sourceMappingURL=offline.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_PROFILE_DURATION_MS",
    ()=>MAX_PROFILE_DURATION_MS,
    "PROFILER_THREAD_ID_STRING",
    ()=>PROFILER_THREAD_ID_STRING,
    "PROFILER_THREAD_NAME",
    ()=>PROFILER_THREAD_NAME,
    "addProfileToGlobalCache",
    ()=>addProfileToGlobalCache,
    "addProfilesToEnvelope",
    ()=>addProfilesToEnvelope,
    "applyDebugMetadata",
    ()=>applyDebugMetadata,
    "attachProfiledThreadToEvent",
    ()=>attachProfiledThreadToEvent,
    "convertJSSelfProfileToSampledFormat",
    ()=>convertJSSelfProfileToSampledFormat,
    "createProfileChunkPayload",
    ()=>createProfileChunkPayload,
    "createProfilePayload",
    ()=>createProfilePayload,
    "createProfilingEvent",
    ()=>createProfilingEvent,
    "enrichWithThreadInformation",
    ()=>enrichWithThreadInformation,
    "findProfiledTransactionsFromEnvelope",
    ()=>findProfiledTransactionsFromEnvelope,
    "getActiveProfilesCount",
    ()=>getActiveProfilesCount,
    "hasLegacyProfiling",
    ()=>hasLegacyProfiling,
    "isAutomatedPageLoadSpan",
    ()=>isAutomatedPageLoadSpan,
    "isValidSampleRate",
    ()=>isValidSampleRate,
    "shouldProfileSession",
    ()=>shouldProfileSession,
    "shouldProfileSpanLegacy",
    ()=>shouldProfileSpanLegacy,
    "startJSSelfProfile",
    ()=>startJSSelfProfile,
    "takeProfileFromGlobalCache",
    ()=>takeProfileFromGlobalCache,
    "validateProfileChunk",
    ()=>validateProfileChunk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/time.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$ids$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-ids.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
;
;
;
const MS_TO_NS = 1e6;
// Checking if we are in Main or Worker thread: `self` (not `window`) is the `globalThis` in Web Workers and `importScripts` are only available in Web Workers
const isMainThread = 'window' in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].window === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && typeof importScripts === 'undefined';
// Setting ID to 0 as we cannot get an ID from Web Workers
const PROFILER_THREAD_ID_STRING = String(0);
const PROFILER_THREAD_NAME = isMainThread ? 'main' : 'worker';
// We force make this optional to be on the safe side...
const navigator = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator;
// Machine properties (eval only once)
let OS_PLATFORM = '';
let OS_PLATFORM_VERSION = '';
let OS_ARCH = '';
let OS_BROWSER = navigator?.userAgent || '';
let OS_MODEL = '';
const OS_LOCALE = navigator?.language || navigator?.languages?.[0] || '';
function isUserAgentData(data) {
    return typeof data === 'object' && data !== null && 'getHighEntropyValues' in data;
}
// @ts-expect-error userAgentData is not part of the navigator interface yet
const userAgentData = navigator?.userAgentData;
if (isUserAgentData(userAgentData)) {
    userAgentData.getHighEntropyValues([
        'architecture',
        'model',
        'platform',
        'platformVersion',
        'fullVersionList'
    ]).then((ua)=>{
        OS_PLATFORM = ua.platform || '';
        OS_ARCH = ua.architecture || '';
        OS_MODEL = ua.model || '';
        OS_PLATFORM_VERSION = ua.platformVersion || '';
        if (ua.fullVersionList?.length) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const firstUa = ua.fullVersionList[ua.fullVersionList.length - 1];
            OS_BROWSER = `${firstUa.brand} ${firstUa.version}`;
        }
    }).catch((e)=>void 0);
}
function isProcessedJSSelfProfile(profile) {
    return !('thread_metadata' in profile);
}
// Enriches the profile with threadId of the current thread.
// This is done in node as we seem to not be able to get the info from C native code.
/**
 *
 */ function enrichWithThreadInformation(profile) {
    if (!isProcessedJSSelfProfile(profile)) {
        return profile;
    }
    return convertJSSelfProfileToSampledFormat(profile);
}
// Profile is marked as optional because it is deleted from the metadata
// by the integration before the event is processed by other integrations.
function getTraceId(event) {
    const traceId = event.contexts?.trace?.trace_id;
    // Log a warning if the profile has an invalid traceId (should be uuidv4).
    // All profiles and transactions are rejected if this is the case and we want to
    // warn users that this is happening if they enable debug flag
    if (typeof traceId === 'string' && traceId.length !== 32) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Invalid traceId: ${traceId} on profiled event`);
        }
    }
    if (typeof traceId !== 'string') {
        return '';
    }
    return traceId;
}
/**
 * Creates a profiling event envelope from a Sentry event. If profile does not pass
 * validation, returns null.
 * @param event
 * @param dsn
 * @param metadata
 * @param tunnel
 * @returns {EventEnvelope | null}
 */ /**
 * Creates a profiling event envelope from a Sentry event.
 */ function createProfilePayload(profile_id, start_timestamp, processed_profile, event) {
    if (event.type !== 'transaction') {
        // createProfilingEventEnvelope should only be called for transactions,
        // we type guard this behavior with isProfiledTransactionEvent.
        throw new TypeError('Profiling events may only be attached to transactions, this should never occur.');
    }
    if (processed_profile === undefined || processed_profile === null) {
        throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${processed_profile} instead.`);
    }
    const traceId = getTraceId(event);
    const enrichedThreadProfile = enrichWithThreadInformation(processed_profile);
    const transactionStartMs = start_timestamp ? start_timestamp : typeof event.start_timestamp === 'number' ? event.start_timestamp * 1000 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])() * 1000;
    const transactionEndMs = typeof event.timestamp === 'number' ? event.timestamp * 1000 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])() * 1000;
    const profile = {
        event_id: profile_id,
        timestamp: new Date(transactionStartMs).toISOString(),
        platform: 'javascript',
        version: '1',
        release: event.release || '',
        environment: event.environment || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ENVIRONMENT"],
        runtime: {
            name: 'javascript',
            version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].navigator.userAgent
        },
        os: {
            name: OS_PLATFORM,
            version: OS_PLATFORM_VERSION,
            build_number: OS_BROWSER
        },
        device: {
            locale: OS_LOCALE,
            model: OS_MODEL,
            manufacturer: OS_BROWSER,
            architecture: OS_ARCH,
            is_emulator: false
        },
        debug_meta: {
            images: applyDebugMetadata(processed_profile.resources)
        },
        profile: enrichedThreadProfile,
        transactions: [
            {
                name: event.transaction || '',
                id: event.event_id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])(),
                trace_id: traceId,
                active_thread_id: PROFILER_THREAD_ID_STRING,
                relative_start_ns: '0',
                relative_end_ns: ((transactionEndMs - transactionStartMs) * 1e6).toFixed(0)
            }
        ]
    };
    return profile;
}
/**
 * Create a profile chunk envelope item
 */ function createProfileChunkPayload(jsSelfProfile, client, profilerId) {
    // only == to catch null and undefined
    if (jsSelfProfile == null) {
        throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${jsSelfProfile} instead.`);
    }
    const continuousProfile = convertToContinuousProfile(jsSelfProfile);
    const options = client.getOptions();
    const sdk = client.getSdkMetadata?.()?.sdk;
    return {
        chunk_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])(),
        client_sdk: {
            name: sdk?.name ?? 'sentry.javascript.browser',
            version: sdk?.version ?? '0.0.0'
        },
        profiler_id: profilerId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])(),
        platform: 'javascript',
        version: '2',
        release: options.release ?? '',
        environment: options.environment ?? 'production',
        debug_meta: {
            // function name obfuscation
            images: applyDebugMetadata(jsSelfProfile.resources)
        },
        profile: continuousProfile
    };
}
/**
 * Validate a profile chunk against the Sample Format V2 requirements.
 * https://develop.sentry.dev/sdk/telemetry/profiles/sample-format-v2/
 * - Presence of samples, stacks, frames
 * - Required metadata fields
 */ function validateProfileChunk(chunk) {
    try {
        // Required metadata
        if (!chunk || typeof chunk !== 'object') {
            return {
                reason: 'chunk is not an object'
            };
        }
        // profiler_id and chunk_id must be 32 lowercase hex chars
        const isHex32 = (val)=>typeof val === 'string' && /^[a-f0-9]{32}$/.test(val);
        if (!isHex32(chunk.profiler_id)) {
            return {
                reason: 'missing or invalid profiler_id'
            };
        }
        if (!isHex32(chunk.chunk_id)) {
            return {
                reason: 'missing or invalid chunk_id'
            };
        }
        if (!chunk.client_sdk) {
            return {
                reason: 'missing client_sdk metadata'
            };
        }
        // Profile data must have frames, stacks, samples
        const profile = chunk.profile;
        if (!profile) {
            return {
                reason: 'missing profile data'
            };
        }
        if (!Array.isArray(profile.frames) || !profile.frames.length) {
            return {
                reason: 'profile has no frames'
            };
        }
        if (!Array.isArray(profile.stacks) || !profile.stacks.length) {
            return {
                reason: 'profile has no stacks'
            };
        }
        if (!Array.isArray(profile.samples) || !profile.samples.length) {
            return {
                reason: 'profile has no samples'
            };
        }
        return {
            valid: true
        };
    } catch (e) {
        return {
            reason: `unknown validation error: ${e}`
        };
    }
}
/**
 * Convert from JSSelfProfile format to ContinuousThreadCpuProfile format.
 */ function convertToContinuousProfile(input) {
    // Frames map 1:1 by index; fill only when present to avoid sparse writes
    const frames = [];
    for(let i = 0; i < input.frames.length; i++){
        const frame = input.frames[i];
        if (!frame) {
            continue;
        }
        frames[i] = {
            function: frame.name,
            abs_path: typeof frame.resourceId === 'number' ? input.resources[frame.resourceId] : undefined,
            lineno: frame.line,
            colno: frame.column
        };
    }
    // Build stacks by following parent links, top->down order (root last)
    const stacks = [];
    for(let i = 0; i < input.stacks.length; i++){
        const stackHead = input.stacks[i];
        if (!stackHead) {
            continue;
        }
        const list = [];
        let current = stackHead;
        while(current){
            list.push(current.frameId);
            current = current.parentId === undefined ? undefined : input.stacks[current.parentId];
        }
        stacks[i] = list;
    }
    // Align timestamps to SDK time origin to match span/event timelines
    const perfOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserPerformanceTimeOrigin"])();
    const origin = typeof performance.timeOrigin === 'number' ? performance.timeOrigin : perfOrigin || 0;
    const adjustForOriginChange = origin - (perfOrigin || origin);
    const samples = [];
    for(let i = 0; i < input.samples.length; i++){
        const sample = input.samples[i];
        if (!sample) {
            continue;
        }
        // Convert ms to seconds epoch-based timestamp
        const timestampSeconds = (origin + (sample.timestamp - adjustForOriginChange)) / 1000;
        samples[i] = {
            stack_id: sample.stackId ?? 0,
            thread_id: PROFILER_THREAD_ID_STRING,
            timestamp: timestampSeconds
        };
    }
    return {
        frames,
        stacks,
        samples,
        thread_metadata: {
            [PROFILER_THREAD_ID_STRING]: {
                name: PROFILER_THREAD_NAME
            }
        }
    };
}
/*
  See packages/browser-utils/src/browser/router.ts
*/ /**
 *
 */ function isAutomatedPageLoadSpan(span) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).op === 'pageload';
}
/**
 * Converts a JSSelfProfile to a our sampled format.
 * Does not currently perform stack indexing.
 */ function convertJSSelfProfileToSampledFormat(input) {
    let EMPTY_STACK_ID = undefined;
    let STACK_ID = 0;
    // Initialize the profile that we will fill with data
    const profile = {
        samples: [],
        stacks: [],
        frames: [],
        thread_metadata: {
            [PROFILER_THREAD_ID_STRING]: {
                name: PROFILER_THREAD_NAME
            }
        }
    };
    const firstSample = input.samples[0];
    if (!firstSample) {
        return profile;
    }
    // We assert samples.length > 0 above and timestamp should always be present
    const start = firstSample.timestamp;
    // The JS SDK might change it's time origin based on some heuristic (see See packages/utils/src/time.ts)
    // when that happens, we need to ensure we are correcting the profile timings so the two timelines stay in sync.
    // Since JS self profiling time origin is always initialized to performance.timeOrigin, we need to adjust for
    // the drift between the SDK selected value and our profile time origin.
    const perfOrigin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserPerformanceTimeOrigin"])();
    const origin = typeof performance.timeOrigin === 'number' ? performance.timeOrigin : perfOrigin || 0;
    const adjustForOriginChange = origin - (perfOrigin || origin);
    input.samples.forEach((jsSample, i)=>{
        // If sample has no stack, add an empty sample
        if (jsSample.stackId === undefined) {
            if (EMPTY_STACK_ID === undefined) {
                EMPTY_STACK_ID = STACK_ID;
                profile.stacks[EMPTY_STACK_ID] = [];
                STACK_ID++;
            }
            profile['samples'][i] = {
                // convert ms timestamp to ns
                elapsed_since_start_ns: ((jsSample.timestamp + adjustForOriginChange - start) * MS_TO_NS).toFixed(0),
                stack_id: EMPTY_STACK_ID,
                thread_id: PROFILER_THREAD_ID_STRING
            };
            return;
        }
        let stackTop = input.stacks[jsSample.stackId];
        // Functions in top->down order (root is last)
        // We follow the stackTop.parentId trail and collect each visited frameId
        const stack = [];
        while(stackTop){
            stack.push(stackTop.frameId);
            const frame = input.frames[stackTop.frameId];
            // If our frame has not been indexed yet, index it
            if (frame && profile.frames[stackTop.frameId] === undefined) {
                profile.frames[stackTop.frameId] = {
                    function: frame.name,
                    abs_path: typeof frame.resourceId === 'number' ? input.resources[frame.resourceId] : undefined,
                    lineno: frame.line,
                    colno: frame.column
                };
            }
            stackTop = stackTop.parentId === undefined ? undefined : input.stacks[stackTop.parentId];
        }
        const sample = {
            // convert ms timestamp to ns
            elapsed_since_start_ns: ((jsSample.timestamp + adjustForOriginChange - start) * MS_TO_NS).toFixed(0),
            stack_id: STACK_ID,
            thread_id: PROFILER_THREAD_ID_STRING
        };
        profile['stacks'][STACK_ID] = stack;
        profile['samples'][i] = sample;
        STACK_ID++;
    });
    return profile;
}
/**
 * Adds items to envelope if they are not already present - mutates the envelope.
 * @param envelope
 */ function addProfilesToEnvelope(envelope, profiles) {
    if (!profiles.length) {
        return envelope;
    }
    for (const profile of profiles){
        envelope[1].push([
            {
                type: 'profile'
            },
            profile
        ]);
    }
    return envelope;
}
/**
 * Finds transactions with profile_id context in the envelope
 * @param envelope
 * @returns
 */ function findProfiledTransactionsFromEnvelope(envelope) {
    const events = [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
        if (type !== 'transaction') {
            return;
        }
        for(let j = 1; j < item.length; j++){
            const event = item[j];
            if (event?.contexts?.profile?.profile_id) {
                events.push(item[j]);
            }
        }
    });
    return events;
}
/**
 * Applies debug meta data to an event from a list of paths to resources (sourcemaps)
 */ function applyDebugMetadata(resource_paths) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client?.getOptions();
    const stackParser = options?.stackParser;
    if (!stackParser) {
        return [];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$ids$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDebugImagesForResources"])(stackParser, resource_paths);
}
/**
 * Checks the given sample rate to make sure it is valid type and value (a boolean, or a number between 0 and 1).
 */ function isValidSampleRate(rate) {
    // we need to check NaN explicitly because it's of type 'number' and therefore wouldn't get caught by this typecheck
    if (typeof rate !== 'number' && typeof rate !== 'boolean' || typeof rate === 'number' && isNaN(rate)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn(`[Profiling] Invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(rate)} of type ${JSON.stringify(typeof rate)}.`);
        return false;
    }
    // Boolean sample rates are always valid
    if (rate === true || rate === false) {
        return true;
    }
    // in case sampleRate is a boolean, it will get automatically cast to 1 if it's true and 0 if it's false
    if (rate < 0 || rate > 1) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn(`[Profiling] Invalid sample rate. Sample rate must be between 0 and 1. Got ${rate}.`);
        return false;
    }
    return true;
}
function isValidProfile(profile) {
    if (profile.samples.length < 2) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            // Log a warning if the profile has less than 2 samples so users can know why
            // they are not seeing any profiling data and we cant avoid the back and forth
            // of asking them to provide us with a dump of the profile data.
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because it contains less than 2 samples');
        }
        return false;
    }
    if (!profile.frames.length) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because it contains no frames');
        }
        return false;
    }
    return true;
}
// Keep a flag value to avoid re-initializing the profiler constructor. If it fails
// once, it will always fail and this allows us to early return.
let PROFILING_CONSTRUCTOR_FAILED = false;
const MAX_PROFILE_DURATION_MS = 30000;
/**
 * Check if profiler constructor is available.
 * @param maybeProfiler
 */ function isJSProfilerSupported(maybeProfiler) {
    return typeof maybeProfiler === 'function';
}
/**
 * Starts the profiler and returns the profiler instance.
 */ function startJSSelfProfile() {
    // Feature support check first
    const JSProfilerConstructor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].Profiler;
    if (!isJSProfilerSupported(JSProfilerConstructor)) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling is not supported by this browser, Profiler interface missing on window object.');
        }
        return;
    }
    // From initial testing, it seems that the minimum value for sampleInterval is 10ms.
    const samplingIntervalMS = 10;
    // Start the profiler
    const maxSamples = Math.floor(MAX_PROFILE_DURATION_MS / samplingIntervalMS);
    // Attempt to initialize the profiler constructor, if it fails, we disable profiling for the current user session.
    // This is likely due to a missing 'Document-Policy': 'js-profiling' header. We do not want to throw an error if this happens
    // as we risk breaking the user's application, so just disable profiling and log an error.
    try {
        return new JSProfilerConstructor({
            sampleInterval: samplingIntervalMS,
            maxBufferSize: maxSamples
        });
    } catch (e) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log("[Profiling] Failed to initialize the Profiling constructor, this is likely due to a missing 'Document-Policy': 'js-profiling' header.");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Disabling profiling for current user session.');
        }
        PROFILING_CONSTRUCTOR_FAILED = true;
    }
    return;
}
/**
 * Determine if a profile should be profiled.
 */ function shouldProfileSpanLegacy(span) {
    // If constructor failed once, it will always fail, so we can early return.
    if (PROFILING_CONSTRUCTOR_FAILED) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling has been disabled for the duration of the current user session.');
        }
        return false;
    }
    if (!span.isRecording()) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because root span was not sampled.');
        return false;
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    const options = client?.getOptions();
    if (!options) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling disabled, no options found.');
        return false;
    }
    // eslint-disable-next-line deprecation/deprecation
    const profilesSampleRate = options.profilesSampleRate;
    // Since this is coming from the user (or from a function provided by the user), who knows what we might get. (The
    // only valid values are booleans or numbers between 0 and 1.)
    if (!isValidSampleRate(profilesSampleRate)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Discarding profile because of invalid sample rate.');
        return false;
    }
    // if the function returned 0 (or false), or if `profileSampleRate` is 0, it's a sign the profile should be dropped
    if (!profilesSampleRate) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because a negative sampling decision was inherited or profileSampleRate is set to 0');
        return false;
    }
    // Now we roll the dice. Math.random is inclusive of 0, but not of 1, so strict < is safe here. In case sampleRate is
    // a boolean, the < comparison will cause it to be automatically cast to 1 if it's true and 0 if it's false.
    const sampled = profilesSampleRate === true ? true : Math.random() < profilesSampleRate;
    // Check if we should sample this profile
    if (!sampled) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Discarding profile because it's not included in the random sample (sampling rate = ${Number(profilesSampleRate)})`);
        return false;
    }
    return true;
}
/**
 * Determine if a profile should be created for the current session.
 */ function shouldProfileSession(options) {
    // If constructor failed once, it will always fail, so we can early return.
    if (PROFILING_CONSTRUCTOR_FAILED) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling has been disabled for the duration of the current user session as the JS Profiler could not be started.');
        }
        return false;
    }
    if (options.profileLifecycle !== 'trace' && options.profileLifecycle !== 'manual') {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Session not sampled. Invalid `profileLifecycle` option.');
        return false;
    }
    //  Session sampling: profileSessionSampleRate gates whether profiling is enabled for this session
    const profileSessionSampleRate = options.profileSessionSampleRate;
    if (!isValidSampleRate(profileSessionSampleRate)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Discarding profile because of invalid profileSessionSampleRate.');
        return false;
    }
    if (!profileSessionSampleRate) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because profileSessionSampleRate is not defined or set to 0');
        return false;
    }
    return Math.random() <= profileSessionSampleRate;
}
/**
 * Checks if legacy profiling is configured.
 */ function hasLegacyProfiling(options) {
    // eslint-disable-next-line deprecation/deprecation
    return typeof options.profilesSampleRate !== 'undefined';
}
/**
 * Creates a profiling envelope item, if the profile does not pass validation, returns null.
 * @param event
 * @returns {Profile | null}
 */ function createProfilingEvent(profile_id, start_timestamp, profile, event) {
    if (!isValidProfile(profile)) {
        return null;
    }
    return createProfilePayload(profile_id, start_timestamp, profile, event);
}
// TODO (v8): We need to obtain profile ids in @sentry-internal/tracing,
// but we don't have access to this map because importing this map would
// cause a circular dependency. We need to resolve this in v8.
const PROFILE_MAP = new Map();
/**
 *
 */ function getActiveProfilesCount() {
    return PROFILE_MAP.size;
}
/**
 * Retrieves profile from global cache and removes it.
 */ function takeProfileFromGlobalCache(profile_id) {
    const profile = PROFILE_MAP.get(profile_id);
    if (profile) {
        PROFILE_MAP.delete(profile_id);
    }
    return profile;
}
/**
 * Adds profile to global cache and evicts the oldest profile if the cache is full.
 */ function addProfileToGlobalCache(profile_id, profile) {
    PROFILE_MAP.set(profile_id, profile);
    if (PROFILE_MAP.size > 30) {
        const last = PROFILE_MAP.keys().next().value;
        if (last !== undefined) {
            PROFILE_MAP.delete(last);
        }
    }
}
/**
 * Attaches the profiled thread information to the event's trace context.
 */ function attachProfiledThreadToEvent(event) {
    if (!event?.contexts?.profile) {
        return event;
    }
    if (!event.contexts) {
        return event;
    }
    // @ts-expect-error the trace fallback value is wrong, though it should never happen
    // and in case it does, we dont want to override whatever was passed initially.
    event.contexts.trace = {
        ...event.contexts?.trace ?? {},
        data: {
            ...event.contexts?.trace?.data ?? {},
            ['thread.id']: PROFILER_THREAD_ID_STRING,
            ['thread.name']: PROFILER_THREAD_NAME
        }
    };
    // Attach thread info to individual spans so that spans can be associated with the profiled thread on the UI even if contexts are missing.
    event.spans?.forEach((span)=>{
        span.data = {
            ...span.data || {},
            ['thread.id']: PROFILER_THREAD_ID_STRING,
            ['thread.name']: PROFILER_THREAD_NAME
        };
    });
    return event;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/startProfileForSpan.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startProfileForSpan",
    ()=>startProfileForSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/time.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Wraps startTransaction and stopTransaction with profiling related logic.
 * startProfileForTransaction is called after the call to startTransaction in order to avoid our own code from
 * being profiled. Because of that same reason, stopProfiling is called before the call to stopTransaction.
 */ function startProfileForSpan(span) {
    // Start the profiler and get the profiler instance.
    let startTimestamp;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAutomatedPageLoadSpan"])(span)) {
        startTimestamp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timestampInSeconds"])() * 1000;
    }
    const profiler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startJSSelfProfile"])();
    // We failed to construct the profiler, so we skip.
    // No need to log anything as this has already been logged in startProfile.
    if (!profiler) {
        return;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] started profiling span: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description}`);
    }
    // We create "unique" span names to avoid concurrent spans with same names
    // from being ignored by the profiler. From here on, only this span name should be used when
    // calling the profiler methods. Note: we log the original name to the user to avoid confusion.
    const profileId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])();
    // A couple of important things to note here:
    // `CpuProfilerBindings.stopProfiling` will be scheduled to run in 30seconds in order to exceed max profile duration.
    // Whichever of the two (span.finish/timeout) is first to run, the profiling will be stopped and the gathered profile
    // will be processed when the original span is finished. Since onProfileHandler can be invoked multiple times in the
    // event of an error or user mistake (calling span.finish multiple times), it is important that the behavior of onProfileHandler
    // is idempotent as we do not want any timings or profiles to be overridden by the last call to onProfileHandler.
    // After the original finish method is called, the event will be reported through the integration and delegated to transport.
    let processedProfile = null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().setContext('profile', {
        profile_id: profileId,
        start_timestamp: startTimestamp
    });
    /**
   * Idempotent handler for profile stop
   */ async function onProfileHandler() {
        // Check if the profile exists and return it the behavior has to be idempotent as users may call span.finish multiple times.
        if (!span) {
            return;
        }
        // Satisfy the type checker, but profiler will always be defined here.
        if (!profiler) {
            return;
        }
        if (processedProfile) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] profile for:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description, 'already exists, returning early');
            }
            return;
        }
        return profiler.stop().then((profile)=>{
            if (maxDurationTimeoutID) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].clearTimeout(maxDurationTimeoutID);
                maxDurationTimeoutID = undefined;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] stopped profiling of span: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description}`);
            }
            // In case of an overlapping span, stopProfiling may return null and silently ignore the overlapping profile.
            if (!profile) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] profiler returned null profile for: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description}`, 'this may indicate an overlapping span or a call to stopProfiling with a profile title that was never started');
                }
                return;
            }
            processedProfile = profile;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addProfileToGlobalCache"])(profileId, profile);
        }).catch((error)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] error while stopping profiler:', error);
            }
        });
    }
    // Enqueue a timeout to prevent profiles from running over max duration.
    let maxDurationTimeoutID = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].setTimeout(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] max profile duration elapsed, stopping profiling for:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).description);
        }
        // If the timeout exceeds, we want to stop profiling, but not finish the span
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        onProfileHandler();
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_PROFILE_DURATION_MS"]);
    // We need to reference the original end call to avoid creating an infinite loop
    const originalEnd = span.end.bind(span);
    /**
   * Wraps span `end()` with profiling related logic.
   * startProfiling is called after the call to spanStart in order to avoid our own code from
   * being profiled. Because of that same reason, stopProfiling is called before the call to spanEnd.
   */ function profilingWrappedSpanEnd() {
        if (!span) {
            return originalEnd();
        }
        // onProfileHandler should always return the same profile even if this is called multiple times.
        // Always call onProfileHandler to ensure stopProfiling is called and the timeout is cleared.
        void onProfileHandler().then(()=>{
            originalEnd();
        }, ()=>{
            // If onProfileHandler fails, we still want to call the original finish method.
            originalEnd();
        });
        return span;
    }
    span.end = profilingWrappedSpanEnd;
}
;
 //# sourceMappingURL=startProfileForSpan.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/UIProfiler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UIProfiler",
    ()=>UIProfiler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/dsn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [app-client] (ecmascript)");
;
;
;
const CHUNK_INTERVAL_MS = 60000; // 1 minute
// Maximum length for trace lifecycle profiling per root span (e.g. if spanEnd never fires)
const MAX_ROOT_SPAN_PROFILE_MS = 300000; // 5 minutes max per root span in trace mode
/**
 * UIProfiler (Profiling V2):
 * Supports two lifecycle modes:
 *  - 'manual': controlled explicitly via start()/stop()
 *  - 'trace': automatically runs while there are active sampled root spans
 *
 * Profiles are emitted as standalone `profile_chunk` envelopes either when:
 * - there are no more sampled root spans, or
 * - the 60s chunk timer elapses while profiling is running.
 */ class UIProfiler {
    // Manual + Trace
    // one per Profiler session
    // current profiler instance active flag
    // sampling decision for entire session
    // Trace-only
    constructor(){
        this._client = undefined;
        this._profiler = undefined;
        this._chunkTimer = undefined;
        this._profilerId = undefined;
        this._isRunning = false;
        this._sessionSampled = false;
        this._lifecycleMode = undefined;
        this._activeRootSpanIds = new Set();
        this._rootSpanTimeouts = new Map();
    }
    /**
   * Initialize the profiler with client, session sampling and lifecycle mode.
   */ initialize(client) {
        const lifecycleMode = client.getOptions().profileLifecycle;
        const sessionSampled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldProfileSession"])(client.getOptions());
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Initializing profiler (lifecycle='${lifecycleMode}').`);
        if (!sessionSampled) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Session not sampled. Skipping lifecycle profiler initialization.');
        }
        // One Profiler ID per profiling session (user session)
        this._profilerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])();
        this._client = client;
        this._sessionSampled = sessionSampled;
        this._lifecycleMode = lifecycleMode;
        if (lifecycleMode === 'trace') {
            this._setupTraceLifecycleListeners(client);
        }
    }
    /** Starts UI profiling (only effective in 'manual' mode and when sampled). */ start() {
        if (this._lifecycleMode === 'trace') {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] `profileLifecycle` is set to "trace". Calls to `uiProfiler.start()` are ignored in trace mode.');
            return;
        }
        if (this._isRunning) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Profile session is already running, `uiProfiler.start()` is a no-op.');
            return;
        }
        if (!this._sessionSampled) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Session is not sampled, `uiProfiler.start()` is a no-op.');
            return;
        }
        this._beginProfiling();
    }
    /** Stops UI profiling (only effective in 'manual' mode). */ stop() {
        if (this._lifecycleMode === 'trace') {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] `profileLifecycle` is set to "trace". Calls to `uiProfiler.stop()` are ignored in trace mode.');
            return;
        }
        if (!this._isRunning) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Profiler is not running, `uiProfiler.stop()` is a no-op.');
            return;
        }
        this._endProfiling();
    }
    /** Handle an already-active root span at integration setup time (used only in trace mode). */ notifyRootSpanActive(rootSpan) {
        if (this._lifecycleMode !== 'trace' || !this._sessionSampled) {
            return;
        }
        const spanId = rootSpan.spanContext().spanId;
        if (!spanId || this._activeRootSpanIds.has(spanId)) {
            return;
        }
        this._registerTraceRootSpan(spanId);
        const rootSpanCount = this._activeRootSpanIds.size;
        if (rootSpanCount === 1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Detected already active root span during setup. Active root spans now:', rootSpanCount);
            this._beginProfiling();
        }
    }
    /**
   * Begin profiling if not already running.
   */ _beginProfiling() {
        if (this._isRunning) {
            return;
        }
        this._isRunning = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Started profiling with profiler ID:', this._profilerId);
        // Expose profiler_id to match root spans with profiles
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().setContext('profile', {
            profiler_id: this._profilerId
        });
        this._startProfilerInstance();
        if (!this._profiler) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Failed to start JS Profiler; stopping.');
            this._resetProfilerInfo();
            return;
        }
        this._startPeriodicChunking();
    }
    /** End profiling session; final chunk will be collected and sent. */ _endProfiling() {
        if (!this._isRunning) {
            return;
        }
        this._isRunning = false;
        if (this._chunkTimer) {
            clearTimeout(this._chunkTimer);
            this._chunkTimer = undefined;
        }
        this._clearAllRootSpanTimeouts();
        // Collect whatever was currently recording
        this._collectCurrentChunk().catch((e)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('[Profiling] Failed to collect current profile chunk on `stop()`:', e);
        });
        // Manual: Clear profiling context so spans outside start()/stop() aren't marked as profiled
        // Trace: Profile context is kept for the whole session duration
        if (this._lifecycleMode === 'manual') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().setContext('profile', {});
        }
    }
    /** Trace-mode: attach spanStart/spanEnd listeners. */ _setupTraceLifecycleListeners(client) {
        client.on('spanStart', (span)=>{
            if (!this._sessionSampled) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Session not sampled because of negative sampling decision.');
                return;
            }
            if (span !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span)) {
                return; // only care about root spans
            }
            // Only count sampled root spans
            if (!span.isRecording()) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding profile because root span was not sampled.');
                return;
            }
            const spanId = span.spanContext().spanId;
            if (!spanId || this._activeRootSpanIds.has(spanId)) {
                return;
            }
            this._registerTraceRootSpan(spanId);
            const rootSpanCount = this._activeRootSpanIds.size;
            if (rootSpanCount === 1) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Root span ${spanId} started. Profiling active while there are active root spans (count=${rootSpanCount}).`);
                this._beginProfiling();
            }
        });
        client.on('spanEnd', (span)=>{
            if (!this._sessionSampled) {
                return;
            }
            const spanId = span.spanContext().spanId;
            if (!spanId || !this._activeRootSpanIds.has(spanId)) {
                return;
            }
            this._activeRootSpanIds.delete(spanId);
            const rootSpanCount = this._activeRootSpanIds.size;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Root span with ID ${spanId} ended. Will continue profiling for as long as there are active root spans (currently: ${rootSpanCount}).`);
            if (rootSpanCount === 0) {
                this._collectCurrentChunk().catch((e)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('[Profiling] Failed to collect current profile chunk on last `spanEnd`:', e);
                });
                this._endProfiling();
            }
        });
    }
    /**
   * Resets profiling information from scope and resets running state (used on failure)
   */ _resetProfilerInfo() {
        this._isRunning = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalScope"])().setContext('profile', {});
    }
    /**
   * Clear and reset all per-root-span timeouts.
   */ _clearAllRootSpanTimeouts() {
        this._rootSpanTimeouts.forEach((timeout)=>clearTimeout(timeout));
        this._rootSpanTimeouts.clear();
    }
    /** Keep track of root spans and schedule safeguard timeout (trace mode). */ _registerTraceRootSpan(spanId) {
        this._activeRootSpanIds.add(spanId);
        const timeout = setTimeout(()=>this._onRootSpanTimeout(spanId), MAX_ROOT_SPAN_PROFILE_MS);
        this._rootSpanTimeouts.set(spanId, timeout);
    }
    /**
   * Start a profiler instance if needed.
   */ _startProfilerInstance() {
        if (this._profiler?.stopped === false) {
            return; // already running
        }
        const profiler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startJSSelfProfile"])();
        if (!profiler) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Failed to start JS Profiler.');
            return;
        }
        this._profiler = profiler;
    }
    /**
   * Schedule the next 60s chunk while running.
   * Each tick collects a chunk and restarts the profiler.
   * A chunk should be closed when there are no active root spans anymore OR when the maximum chunk interval is reached.
   */ _startPeriodicChunking() {
        if (!this._isRunning) {
            return;
        }
        this._chunkTimer = setTimeout(()=>{
            this._collectCurrentChunk().catch((e)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('[Profiling] Failed to collect current profile chunk during periodic chunking:', e);
            });
            if (this._isRunning) {
                this._startProfilerInstance();
                if (!this._profiler) {
                    // If restart failed, stop scheduling further chunks and reset context.
                    this._resetProfilerInfo();
                    return;
                }
                this._startPeriodicChunking();
            }
        }, CHUNK_INTERVAL_MS);
    }
    /**
   * Handle timeout for a specific root span ID to avoid indefinitely running profiler if `spanEnd` never fires.
   * If this was the last active root span, collect the current chunk and stop profiling.
   */ _onRootSpanTimeout(rootSpanId) {
        // If span already ended, ignore
        if (!this._rootSpanTimeouts.has(rootSpanId)) {
            return;
        }
        this._rootSpanTimeouts.delete(rootSpanId);
        if (!this._activeRootSpanIds.has(rootSpanId)) {
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Reached 5-minute timeout for root span ${rootSpanId}. You likely started a manual root span that never called \`.end()\`.`);
        this._activeRootSpanIds.delete(rootSpanId);
        if (this._activeRootSpanIds.size === 0) {
            this._endProfiling();
        }
    }
    /**
   * Stop current profiler instance, convert profile to chunk & send.
   */ async _collectCurrentChunk() {
        const prevProfiler = this._profiler;
        this._profiler = undefined;
        if (!prevProfiler) {
            return;
        }
        try {
            const profile = await prevProfiler.stop();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const chunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProfileChunkPayload"])(profile, this._client, this._profilerId);
            // Validate chunk before sending
            const validationReturn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateProfileChunk"])(chunk);
            if ('reason' in validationReturn) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Discarding invalid profile chunk (this is probably a bug in the SDK):', validationReturn.reason);
                return;
            }
            this._sendProfileChunk(chunk);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Collected browser profile chunk.');
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Error while stopping JS Profiler for chunk:', e);
        }
    }
    /**
   * Send a profile chunk as a standalone envelope.
   */ _sendProfileChunk(chunk) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const client = this._client;
        const sdkInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkMetadataForEnvelopeHeader"])(client.getSdkMetadata?.());
        const dsn = client.getDsn();
        const tunnel = client.getOptions().tunnel;
        const envelope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEnvelope"])({
            event_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuid4"])(),
            sent_at: new Date().toISOString(),
            ...sdkInfo && {
                sdk: sdkInfo
            },
            ...!!tunnel && dsn && {
                dsn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dsnToString"])(dsn)
            }
        }, [
            [
                {
                    type: 'profile_chunk'
                },
                chunk
            ]
        ]);
        client.sendEnvelope(envelope).then(null, (reason)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('Error while sending profile chunk envelope:', reason);
        });
    }
}
;
 //# sourceMappingURL=UIProfiler.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "browserProfilingIntegration",
    ()=>browserProfilingIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$startProfileForSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/startProfileForSpan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$UIProfiler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/UIProfiler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
const INTEGRATION_NAME = 'BrowserProfiling';
const _browserProfilingIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            const options = client.getOptions();
            const profiler = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$UIProfiler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UIProfiler"]();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options) && !options.profileLifecycle) {
                // Set default lifecycle mode
                options.profileLifecycle = 'manual';
            }
            // eslint-disable-next-line deprecation/deprecation
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options) && !options.profilesSampleRate) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] Profiling disabled, no profiling options found.');
                return;
            }
            const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
            const rootSpan = activeSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options) && options.profileSessionSampleRate !== undefined) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('[Profiling] Both legacy profiling (`profilesSampleRate`) and UI profiling settings are defined. `profileSessionSampleRate` has no effect when legacy profiling is enabled.');
            }
            // UI PROFILING (Profiling V2)
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasLegacyProfiling"])(options)) {
                const lifecycleMode = options.profileLifecycle;
                // Registering hooks in all lifecycle modes to be able to notify users in case they want to start/stop the profiler manually in `trace` mode
                client.on('startUIProfiler', ()=>profiler.start());
                client.on('stopUIProfiler', ()=>profiler.stop());
                if (lifecycleMode === 'manual') {
                    profiler.initialize(client);
                } else if (lifecycleMode === 'trace') {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$hasSpansEnabled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasSpansEnabled"])(options)) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn("[Profiling] `profileLifecycle` is 'trace' but tracing is disabled. Set a `tracesSampleRate` or `tracesSampler` to enable span tracing.");
                        return;
                    }
                    profiler.initialize(client);
                    // If there is an active, sampled root span already, notify the profiler
                    if (rootSpan) {
                        profiler.notifyRootSpanActive(rootSpan);
                    }
                    // In case rootSpan is created slightly after setup -> schedule microtask to re-check and notify.
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"].setTimeout(()=>{
                        const laterActiveSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
                        const laterRootSpan = laterActiveSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(laterActiveSpan);
                        if (laterRootSpan) {
                            profiler.notifyRootSpanActive(laterRootSpan);
                        }
                    }, 0);
                }
            } else {
                // LEGACY PROFILING (v1)
                if (rootSpan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAutomatedPageLoadSpan"])(rootSpan)) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldProfileSpanLegacy"])(rootSpan)) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$startProfileForSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startProfileForSpan"])(rootSpan);
                    }
                }
                client.on('spanStart', (span)=>{
                    if (span === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldProfileSpanLegacy"])(span)) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$startProfileForSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startProfileForSpan"])(span);
                    }
                });
                client.on('beforeEnvelope', (envelope)=>{
                    // if not profiles are in queue, there is nothing to add to the envelope.
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveProfilesCount"])()) {
                        return;
                    }
                    const profiledTransactionEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProfiledTransactionsFromEnvelope"])(envelope);
                    if (!profiledTransactionEvents.length) {
                        return;
                    }
                    const profilesToAddToEnvelope = [];
                    for (const profiledTransaction of profiledTransactionEvents){
                        const context = profiledTransaction?.contexts;
                        const profile_id = context?.profile?.['profile_id'];
                        const start_timestamp = context?.profile?.['start_timestamp'];
                        if (typeof profile_id !== 'string') {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] cannot find profile for a span without a profile context');
                            continue;
                        }
                        if (!profile_id) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Profiling] cannot find profile for a span without a profile context');
                            continue;
                        }
                        // Remove the profile from the span context before sending, relay will take care of the rest.
                        if (context?.profile) {
                            delete context.profile;
                        }
                        const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["takeProfileFromGlobalCache"])(profile_id);
                        if (!profile) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`[Profiling] Could not retrieve profile for span: ${profile_id}`);
                            continue;
                        }
                        const profileEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProfilingEvent"])(profile_id, start_timestamp, profile, profiledTransaction);
                        if (profileEvent) {
                            profilesToAddToEnvelope.push(profileEvent);
                        }
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addProfilesToEnvelope"])(envelope, profilesToAddToEnvelope);
                });
            }
        },
        processEvent (event) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachProfiledThreadToEvent"])(event);
        }
    };
};
const browserProfilingIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_browserProfilingIntegration);
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/launchdarkly/integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildLaunchDarklyFlagUsedHandler",
    ()=>buildLaunchDarklyFlagUsedHandler,
    "launchDarklyIntegration",
    ()=>launchDarklyIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)");
;
/**
 * Sentry integration for capturing feature flag evaluations from LaunchDarkly.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import * as Sentry from '@sentry/browser';
 * import {launchDarklyIntegration, buildLaunchDarklyFlagUsedInspector} from '@sentry/browser';
 * import * as LaunchDarkly from 'launchdarkly-js-client-sdk';
 *
 * Sentry.init(..., integrations: [launchDarklyIntegration()])
 * const ldClient = LaunchDarkly.initialize(..., {inspectors: [buildLaunchDarklyFlagUsedHandler()]});
 * ```
 */ const launchDarklyIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'LaunchDarkly',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
/**
 * LaunchDarkly hook to listen for and buffer flag evaluations. This needs to
 * be registered as an 'inspector' in LaunchDarkly initialize() options,
 * separately from `launchDarklyIntegration`. Both the hook and the integration
 * are needed to capture LaunchDarkly flags.
 */ function buildLaunchDarklyFlagUsedHandler() {
    return {
        name: 'sentry-flag-auditor',
        type: 'flag-used',
        synchronous: true,
        /**
     * Handle a flag evaluation by storing its name and value on the current scope.
     */ method: (flagKey, flagDetail, _context)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(flagKey, flagDetail.value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(flagKey, flagDetail.value);
        }
    };
}
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/openfeature/integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenFeatureIntegrationHook",
    ()=>OpenFeatureIntegrationHook,
    "openFeatureIntegration",
    ()=>openFeatureIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)");
;
const openFeatureIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'OpenFeature',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
/**
 * OpenFeature Hook class implementation.
 */ class OpenFeatureIntegrationHook {
    /**
   * Successful evaluation result.
   */ after(_hookContext, evaluationDetails) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(evaluationDetails.flagKey, evaluationDetails.value);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(evaluationDetails.flagKey, evaluationDetails.value);
    }
    /**
   * On error evaluation result.
   */ error(hookContext, _error, _hookHints) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(hookContext.flagKey, hookContext.defaultValue);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(hookContext.flagKey, hookContext.defaultValue);
    }
}
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/unleash/integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unleashIntegration",
    ()=>unleashIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
;
;
/**
 * Sentry integration for capturing feature flag evaluations from the Unleash SDK.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import { UnleashClient } from 'unleash-proxy-client';
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   dsn: '___PUBLIC_DSN___',
 *   integrations: [Sentry.unleashIntegration({featureFlagClientClass: UnleashClient})],
 * });
 *
 * const unleash = new UnleashClient(...);
 * unleash.start();
 *
 * unleash.isEnabled('my-feature');
 * Sentry.captureException(new Error('something went wrong'));
 * ```
 */ const unleashIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ featureFlagClientClass: unleashClientClass })=>{
    return {
        name: 'Unleash',
        setupOnce () {
            const unleashClientPrototype = unleashClientClass.prototype;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(unleashClientPrototype, 'isEnabled', _wrappedIsEnabled);
        },
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
/**
 * Wraps the UnleashClient.isEnabled method to capture feature flag evaluations. Its only side effect is writing to Sentry scope.
 *
 * This wrapper is safe for all isEnabled signatures. If the signature does not match (this: UnleashClient, toggleName: string, ...args: unknown[]) => boolean,
 * we log an error and return the original result.
 *
 * @param original - The original method.
 * @returns Wrapped method. Results should match the original.
 */ function _wrappedIsEnabled(original) {
    return function(...args) {
        const toggleName = args[0];
        const result = original.apply(this, args);
        if (typeof toggleName === 'string' && typeof result === 'boolean') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(toggleName, result);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(toggleName, result);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`[Feature Flags] UnleashClient.isEnabled does not match expected signature. arg0: ${toggleName} (${typeof toggleName}), result: ${result} (${typeof result})`);
        }
        return result;
    };
}
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/growthbook/integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "growthbookIntegration",
    ()=>growthbookIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$growthbook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/featureFlags/growthbook.js [app-client] (ecmascript)");
;
/**
 * Sentry integration for capturing feature flag evaluations from GrowthBook.
 *
 * See the feature flag documentation: https://develop.sentry.dev/sdk/expected-features/#feature-flags
 *
 * @example
 * ```
 * import { GrowthBook } from '@growthbook/growthbook';
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   dsn: '___PUBLIC_DSN___',
 *   integrations: [Sentry.growthbookIntegration({ growthbookClass: GrowthBook })],
 * });
 *
 * const gb = new GrowthBook();
 * gb.isOn('my-feature');
 * Sentry.captureException(new Error('something went wrong'));
 * ```
 */ const growthbookIntegration = ({ growthbookClass })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$growthbook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["growthbookIntegration"])({
        growthbookClass
    });
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/statsig/integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "statsigIntegration",
    ()=>statsigIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)");
;
/**
 * Sentry integration for capturing feature flag evaluations from the Statsig js-client SDK.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import { StatsigClient } from '@statsig/js-client';
 * import * as Sentry from '@sentry/browser';
 *
 * const statsigClient = new StatsigClient();
 *
 * Sentry.init({
 *   dsn: '___PUBLIC_DSN___',
 *   integrations: [Sentry.statsigIntegration({featureFlagClient: statsigClient})],
 * });
 *
 * await statsigClient.initializeAsync();  // or statsigClient.initializeSync();
 *
 * const result = statsigClient.checkGate('my-feature-gate');
 * Sentry.captureException(new Error('something went wrong'));
 * ```
 */ const statsigIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ featureFlagClient: statsigClient })=>{
    return {
        name: 'Statsig',
        setup (_client) {
            statsigClient.on('gate_evaluation', (event)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(event.gate.name, event.gate.value);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(event.gate.name, event.gate.value);
            });
        },
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
;
 //# sourceMappingURL=integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/diagnose-sdk.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "diagnoseSdkConnectivity",
    ()=>diagnoseSdkConnectivity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
;
/**
 * A function to diagnose why the SDK might not be successfully sending data.
 *
 * Possible return values wrapped in a Promise:
 * - `"no-client-active"` - There was no active client when the function was called. This possibly means that the SDK was not initialized yet.
 * - `"sentry-unreachable"` - The Sentry SaaS servers were not reachable. This likely means that there is an ad blocker active on the page or that there are other connection issues.
 *
 * If the function doesn't detect an issue it resolves to `undefined`.
 */ async function diagnoseSdkConnectivity() {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        return 'no-client-active';
    }
    if (!client.getDsn()) {
        return 'no-dsn-configured';
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suppressTracing"])(()=>// If fetch throws, there is likely an ad blocker active or there are other connective issues.
            fetch(// We are using the
            // - "sentry-sdks" org with id 447951 not to pollute any actual organizations.
            // - "diagnose-sdk-connectivity" project with id 4509632503087104
            // - the public key of said org/project, which is disabled in the project settings
            // => this DSN: https://c1dfb07d783ad5325c245c1fd3725390@o447951.ingest.us.sentry.io/4509632503087104 (i.e. disabled)
            'https://o447951.ingest.sentry.io/api/4509632503087104/envelope/?sentry_version=7&sentry_key=c1dfb07d783ad5325c245c1fd3725390&sentry_client=sentry.javascript.browser%2F1.33.7', {
                body: '{}',
                method: 'POST',
                mode: 'cors',
                credentials: 'omit'
            }));
    } catch  {
        return 'sentry-unreachable';
    }
}
;
 //# sourceMappingURL=diagnose-sdk.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/webWorker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTEGRATION_NAME",
    ()=>INTEGRATION_NAME,
    "registerWebWorker",
    ()=>registerWebWorker,
    "webWorkerIntegration",
    ()=>webWorkerIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [app-client] (ecmascript)");
;
;
;
;
;
const INTEGRATION_NAME = 'WebWorker';
/**
 * Use this integration to set up Sentry with web workers.
 *
 * IMPORTANT: This integration must be added **before** you start listening to
 * any messages from the worker. Otherwise, your message handlers will receive
 * messages from the Sentry SDK which you need to ignore.
 *
 * This integration only has an effect, if you call `Sentry.registerWebWorker(self)`
 * from within the worker(s) you're adding to the integration.
 *
 * Given that you want to initialize the SDK as early as possible, you most likely
 * want to add this integration **after** initializing the SDK:
 *
 * @example:
 * ```ts filename={main.js}
 * import * as Sentry from '@sentry/<your-sdk>';
 *
 * // some time earlier:
 * Sentry.init(...)
 *
 * // 1. Initialize the worker
 * const worker = new Worker(new URL('./worker.ts', import.meta.url));
 *
 * // 2. Add the integration
 * const webWorkerIntegration = Sentry.webWorkerIntegration({ worker });
 * Sentry.addIntegration(webWorkerIntegration);
 *
 * // 3. Register message listeners on the worker
 * worker.addEventListener('message', event => {
 *  // ...
 * });
 * ```
 *
 * If you initialize multiple workers at the same time, you can also pass an array of workers
 * to the integration:
 *
 * ```ts filename={main.js}
 * const webWorkerIntegration = Sentry.webWorkerIntegration({ worker: [worker1, worker2] });
 * Sentry.addIntegration(webWorkerIntegration);
 * ```
 *
 * If you have any additional workers that you initialize at a later point,
 * you can add them to the integration as follows:
 *
 * ```ts filename={main.js}
 * const webWorkerIntegration = Sentry.webWorkerIntegration({ worker: worker1 });
 * Sentry.addIntegration(webWorkerIntegration);
 *
 * // sometime later:
 * webWorkerIntegration.addWorker(worker2);
 * ```
 *
 * Of course, you can also directly add the integration in Sentry.init:
 * ```ts filename={main.js}
 * import * as Sentry from '@sentry/<your-sdk>';
 *
 * // 1. Initialize the worker
 * const worker = new Worker(new URL('./worker.ts', import.meta.url));
 *
 * // 2. Initialize the SDK
 * Sentry.init({
 *  integrations: [Sentry.webWorkerIntegration({ worker })]
 * });
 *
 * // 3. Register message listeners on the worker
 * worker.addEventListener('message', event => {
 *  // ...
 * });
 * ```
 *
 * @param options {WebWorkerIntegrationOptions} Integration options:
 *   - `worker`: The worker instance.
 */ const webWorkerIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ worker })=>({
        name: INTEGRATION_NAME,
        setupOnce: ()=>{
            (Array.isArray(worker) ? worker : [
                worker
            ]).forEach((w)=>listenForSentryMessages(w));
        },
        addWorker: (worker)=>listenForSentryMessages(worker)
    }));
function listenForSentryMessages(worker) {
    worker.addEventListener('message', (event)=>{
        if (isSentryMessage(event.data)) {
            event.stopImmediatePropagation(); // other listeners should not receive this message
            // Handle debug IDs
            if (event.data._sentryDebugIds) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Sentry debugId web worker message received', event.data);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryDebugIds = {
                    ...event.data._sentryDebugIds,
                    // debugIds of the main thread have precedence over the worker's in case of a collision.
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"]._sentryDebugIds
                };
            }
            // Handle unhandled rejections forwarded from worker
            if (event.data._sentryWorkerError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Sentry worker rejection message received', event.data._sentryWorkerError);
                handleForwardedWorkerRejection(event.data._sentryWorkerError);
            }
        }
    });
}
function handleForwardedWorkerRejection(workerError) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (!client) {
        return;
    }
    const stackParser = client.getOptions().stackParser;
    const attachStacktrace = client.getOptions().attachStacktrace;
    const error = workerError.reason;
    // Follow same pattern as globalHandlers for unhandledrejection
    // Handle both primitives and errors the same way
    const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimitive"])(error) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_eventFromRejectionWithPrimitive"])(error) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromUnknownInput"])(stackParser, error, undefined, attachStacktrace, true);
    event.level = 'error';
    // Add worker-specific context
    if (workerError.filename) {
        event.contexts = {
            ...event.contexts,
            worker: {
                filename: workerError.filename
            }
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"])(event, {
        originalException: error,
        mechanism: {
            handled: false,
            type: 'auto.browser.web_worker.onunhandledrejection'
        }
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Captured worker unhandled rejection', error);
}
/**
 * Minimal interface for DedicatedWorkerGlobalScope, only requiring the postMessage method.
 * (which is the only thing we need from the worker's global object)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
 *
 * We can't use the actual type because it breaks everyone who doesn't have {"lib": ["WebWorker"]}
 * but uses {"skipLibCheck": true} in their tsconfig.json.
 */ /**
 * Use this function to register the worker with the Sentry SDK.
 *
 * This function will:
 * - Send debug IDs to the parent thread
 * - Set up a handler for unhandled rejections in the worker
 * - Forward unhandled rejections to the parent thread for capture
 *
 * Note: Synchronous errors in workers are already captured by globalHandlers.
 * This only handles unhandled promise rejections which don't bubble to the parent.
 *
 * @example
 * ```ts filename={worker.js}
 * import * as Sentry from '@sentry/<your-sdk>';
 *
 * // Do this as early as possible in your worker.
 * Sentry.registerWebWorker({ self });
 *
 * // continue setting up your worker
 * self.postMessage(...)
 * ```
 * @param options {RegisterWebWorkerOptions} Integration options:
 *   - `self`: The worker instance you're calling this function from (self).
 */ function registerWebWorker({ self }) {
    // Send debug IDs to parent thread
    self.postMessage({
        _sentryMessage: true,
        _sentryDebugIds: self._sentryDebugIds ?? undefined
    });
    // Set up unhandledrejection handler inside the worker
    // Following the same pattern as globalHandlers
    // unhandled rejections don't bubble to the parent thread, so we need to handle them here
    self.addEventListener('unhandledrejection', (event)=>{
        const reason = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_getUnhandledRejectionError"])(event);
        // Forward the raw reason to parent thread
        // The parent will handle primitives vs errors the same way globalHandlers does
        const serializedError = {
            reason: reason,
            filename: self.location?.href
        };
        // Forward to parent thread
        self.postMessage({
            _sentryMessage: true,
            _sentryWorkerError: serializedError
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Sentry Worker] Forwarding unhandled rejection to parent', serializedError);
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Sentry Worker] Registered worker with unhandled rejection handling');
}
function isSentryMessage(eventData) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData) || eventData._sentryMessage !== true) {
        return false;
    }
    // Must have at least one of: debug IDs or worker error
    const hasDebugIds = '_sentryDebugIds' in eventData;
    const hasWorkerError = '_sentryWorkerError' in eventData;
    if (!hasDebugIds && !hasWorkerError) {
        return false;
    }
    // Validate debug IDs if present
    if (hasDebugIds && !((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData._sentryDebugIds) || eventData._sentryDebugIds === undefined)) {
        return false;
    }
    // Validate worker error if present
    if (hasWorkerError && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(eventData._sentryWorkerError)) {
        return false;
    }
    return true;
}
;
 //# sourceMappingURL=webWorker.js.map
}),
"[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowserClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserClient"],
    "MULTIPLEXED_TRANSPORT_EXTRA_KEY",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$multiplexed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MULTIPLEXED_TRANSPORT_EXTRA_KEY"],
    "OpenFeatureIntegrationHook",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$openfeature$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OpenFeatureIntegrationHook"],
    "SDK_VERSION",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_VERSION"],
    "SEMANTIC_ATTRIBUTE_SENTRY_OP",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"],
    "SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"],
    "SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE"],
    "SEMANTIC_ATTRIBUTE_SENTRY_SOURCE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"],
    "Scope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"],
    "WINDOW",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"],
    "addBreadcrumb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"],
    "addEventProcessor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventProcessor"],
    "addIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addIntegration"],
    "breadcrumbsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breadcrumbsIntegration"],
    "browserApiErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserApiErrorsIntegration"],
    "browserProfilingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserProfilingIntegration"],
    "browserSessionIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserSessionIntegration"],
    "browserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserTracingIntegration"],
    "buildLaunchDarklyFlagUsedHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$launchdarkly$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLaunchDarklyFlagUsedHandler"],
    "captureConsoleIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$captureconsole$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureConsoleIntegration"],
    "captureEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"],
    "captureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"],
    "captureFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$feedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureFeedback"],
    "captureMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureMessage"],
    "captureSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureSession"],
    "chromeStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chromeStackLineParser"],
    "close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["close"],
    "consoleLoggingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$console$2d$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["consoleLoggingIntegration"],
    "contextLinesIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$contextlines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contextLinesIntegration"],
    "continueTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continueTrace"],
    "createConsolaReporter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$consola$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConsolaReporter"],
    "createLangChainCallbackHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLangChainCallbackHandler"],
    "createTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransport"],
    "createUserFeedbackEnvelope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$userfeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserFeedbackEnvelope"],
    "dedupeIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dedupeIntegration"],
    "defaultRequestInstrumentationOptions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultRequestInstrumentationOptions"],
    "defaultStackLineParsers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultStackLineParsers"],
    "defaultStackParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultStackParser"],
    "diagnoseSdkConnectivity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$diagnose$2d$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diagnoseSdkConnectivity"],
    "endSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endSession"],
    "eventFiltersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFiltersIntegration"],
    "eventFromException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromException"],
    "eventFromMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromMessage"],
    "exceptionFromError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exceptionFromError"],
    "extraErrorDataIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$extraerrordata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extraErrorDataIntegration"],
    "featureFlagsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$featureFlagsIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureFlagsIntegration"],
    "feedbackAsyncIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackAsync$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackAsyncIntegration"],
    "feedbackIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackSync$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackSyncIntegration"],
    "feedbackSyncIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackSync$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackSyncIntegration"],
    "flush",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flush"],
    "forceLoad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forceLoad"],
    "functionToStringIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionToStringIntegration"],
    "geckoStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geckoStackLineParser"],
    "getActiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"],
    "getClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"],
    "getCurrentScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"],
    "getDefaultIntegrations",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultIntegrations"],
    "getFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedback"],
    "getGlobalScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalScope"],
    "getIsolationScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"],
    "getReplay",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$replay$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReplay"],
    "getRootSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"],
    "getSpanDescendants",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanDescendants"],
    "getSpanStatusFromHttpCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanStatusFromHttpCode"],
    "getTraceData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTraceData"],
    "globalHandlersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalHandlersIntegration"],
    "graphqlClientIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$graphqlClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphqlClientIntegration"],
    "growthbookIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$growthbook$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["growthbookIntegration"],
    "httpClientIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpclient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpClientIntegration"],
    "httpContextIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpContextIntegration"],
    "inboundFiltersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inboundFiltersIntegration"],
    "init",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["init"],
    "instrumentAnthropicAiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentAnthropicAiClient"],
    "instrumentGoogleGenAIClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentGoogleGenAIClient"],
    "instrumentLangGraph",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentLangGraph"],
    "instrumentOpenAiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentOpenAiClient"],
    "instrumentOutgoingRequests",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentOutgoingRequests"],
    "instrumentSupabaseClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentSupabaseClient"],
    "isEnabled",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEnabled"],
    "isInitialized",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInitialized"],
    "lastEventId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lastEventId"],
    "launchDarklyIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$launchdarkly$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["launchDarklyIntegration"],
    "lazyLoadIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazyLoadIntegration"],
    "linkedErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkedErrorsIntegration"],
    "logger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__logger$3e$__["logger"],
    "makeBrowserOfflineTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$offline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeBrowserOfflineTransport"],
    "makeFetchTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeFetchTransport"],
    "makeMultiplexedTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$multiplexed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeMultiplexedTransport"],
    "metrics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__metrics$3e$__["metrics"],
    "moduleMetadataIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$moduleMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moduleMetadataIntegration"],
    "onLoad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onLoad"],
    "openFeatureIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$openfeature$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openFeatureIntegration"],
    "opera10StackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["opera10StackLineParser"],
    "opera11StackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["opera11StackLineParser"],
    "parameterize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parameterize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parameterize"],
    "registerSpanErrorInstrumentation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerSpanErrorInstrumentation"],
    "registerWebWorker",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$webWorker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerWebWorker"],
    "replayCanvasIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$replay$2d$canvas$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2d$canvas$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replayCanvasIntegration"],
    "replayIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$replay$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replayIntegration"],
    "reportPageLoaded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$reportPageLoaded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportPageLoaded"],
    "reportingObserverIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$reportingobserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportingObserverIntegration"],
    "rewriteFramesIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$rewriteframes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rewriteFramesIntegration"],
    "sendFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendFeedback"],
    "setActiveSpanInBrowser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$setActiveSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveSpanInBrowser"],
    "setContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setContext"],
    "setCurrentClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCurrentClient"],
    "setExtra",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExtra"],
    "setExtras",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExtras"],
    "setHttpStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"],
    "setMeasurement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMeasurement"],
    "setTag",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTag"],
    "setTags",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTags"],
    "setUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUser"],
    "showReportDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$report$2d$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showReportDialog"],
    "spanToBaggageHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToBaggageHeader"],
    "spanToJSON",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"],
    "spanToTraceHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToTraceHeader"],
    "spotlightBrowserIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spotlightBrowserIntegration"],
    "startBrowserTracingNavigationSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startBrowserTracingNavigationSpan"],
    "startBrowserTracingPageLoadSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startBrowserTracingPageLoadSpan"],
    "startInactiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startInactiveSpan"],
    "startNewTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startNewTrace"],
    "startSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSession"],
    "startSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"],
    "startSpanManual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"],
    "statsigIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$statsig$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsigIntegration"],
    "supabaseIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseIntegration"],
    "suppressTracing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suppressTracing"],
    "thirdPartyErrorFilterIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$third$2d$party$2d$errors$2d$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thirdPartyErrorFilterIntegration"],
    "uiProfiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uiProfiler"],
    "unleashIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$unleash$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unleashIntegration"],
    "updateSpanName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateSpanName"],
    "webWorkerIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$webWorker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webWorkerIntegration"],
    "winjsStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["winjsStackLineParser"],
    "withActiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withActiveSpan"],
    "withIsolationScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"],
    "withScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"],
    "zodErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$zoderrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodErrorsIntegration"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackAsync$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/feedbackAsync.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$feedbackSync$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/feedbackSync.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$multiplexed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/transports/multiplexed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/version.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/scope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/breadcrumbs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$captureconsole$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/captureconsole.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$feedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/feedback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$console$2d$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/console-integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$consola$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/consola.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$transports$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/transports/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$dedupe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/dedupe.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$eventFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/eventFilters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$extraerrordata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/extraerrordata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$featureFlags$2f$featureFlagsIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/featureFlags/featureFlagsIntegration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$functiontostring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/functiontostring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/traceData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langgraph/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$supabase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/supabase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__logger$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/public-api.js [app-client] (ecmascript) <export * as logger>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__metrics$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metrics/public-api.js [app-client] (ecmascript) <export * as metrics>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$moduleMetadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/moduleMetadata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parameterize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/parameterize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$errors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/errors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$rewriteframes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/rewriteframes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/sdk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$measurement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/measurement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$dynamicSamplingContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$third$2d$party$2d$errors$2d$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/third-party-errors-filter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integrations$2f$zoderrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/zoderrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/transports/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$stack$2d$parsers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/stack-parsers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$eventbuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/eventbuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$userfeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/userfeedback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/sdk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$report$2d$dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/report-dialog.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/breadcrumbs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$globalhandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/globalhandlers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpcontext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpcontext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$linkederrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/linkederrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browserapierrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browserapierrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$utils$2f$lazyLoadIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/utils/lazyLoadIntegration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$reportingobserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/reportingobserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$httpclient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/httpclient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$contextlines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/contextlines.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$graphqlClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/graphqlClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$replay$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+replay@10.29.0/node_modules/@sentry-internal/replay/build/npm/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$replay$2d$canvas$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$replay$2d$canvas$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+replay-canvas@10.29.0/node_modules/@sentry-internal/replay-canvas/build/npm/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2d$internal$2b$feedback$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2d$internal$2f$feedback$2f$build$2f$npm$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry-internal+feedback@10.29.0/node_modules/@sentry-internal/feedback/build/npm/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/tracing/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$browserTracingIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/tracing/browserTracingIntegration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$reportPageLoaded$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/tracing/reportPageLoaded.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$tracing$2f$setActiveSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/tracing/setActiveSpan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$transports$2f$offline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/transports/offline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$profiling$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/profiling/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$spotlight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/spotlight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$browsersession$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/browsersession.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$launchdarkly$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/launchdarkly/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$openfeature$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/openfeature/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$unleash$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/unleash/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$growthbook$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/growthbook/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$featureFlags$2f$statsig$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/featureFlags/statsig/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$diagnose$2d$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/diagnose-sdk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$browser$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$browser$2f$build$2f$npm$2f$esm$2f$dev$2f$integrations$2f$webWorker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+browser@10.29.0/node_modules/@sentry/browser/build/npm/esm/dev/integrations/webWorker.js [app-client] (ecmascript)");
}),
]);

//# debugId=0fe63a66-d806-5085-70df-19dde0f5336e
//# sourceMappingURL=4686d_%40sentry_browser_build_npm_esm_dev_fa8bde74._.js.map