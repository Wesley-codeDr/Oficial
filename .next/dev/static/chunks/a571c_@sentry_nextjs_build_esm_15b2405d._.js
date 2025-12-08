;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="8615b167-60d2-7bf1-2b64-a954b7caf8b9")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/index.client.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
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
 //# sourceMappingURL=index.client.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloudflareWaitUntil",
    ()=>cloudflareWaitUntil,
    "flushSafelyWithTimeout",
    ()=>flushSafelyWithTimeout,
    "isCloudflareWaitUntilAvailable",
    ()=>isCloudflareWaitUntilAvailable,
    "waitUntil",
    ()=>waitUntil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$vercelWaitUntil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/vercelWaitUntil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/debug-build.js [app-client] (ecmascript)");
;
;
/**
 * Flushes pending Sentry events with a 2 second timeout and in a way that cannot create unhandled promise rejections.
 */ async function flushSafelyWithTimeout() {
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Flushing events...');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flush"])(2000);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Done flushing events');
    } catch (e) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Error while flushing events:\n', e);
    }
}
/**
 * Uses platform-specific waitUntil function to wait for the provided task to complete without blocking.
 */ function waitUntil(task) {
    // If deployed on Cloudflare, use the Cloudflare waitUntil function to flush the events
    if (isCloudflareWaitUntilAvailable()) {
        cloudflareWaitUntil(task);
        return;
    }
    // otherwise, use vercel's
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$vercelWaitUntil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vercelWaitUntil"])(task);
}
/**
 * Gets the Cloudflare context from the global object.
 * Relevant to opennext
 * https://github.com/opennextjs/opennextjs-cloudflare/blob/b53a046bd5c30e94a42e36b67747cefbf7785f9a/packages/cloudflare/src/cli/templates/init.ts#L17
 */ function _getOpenNextCloudflareContext() {
    const openNextCloudflareContextSymbol = Symbol.for('__cloudflare-context__');
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"][openNextCloudflareContextSymbol]?.ctx;
}
/**
 * Function that delays closing of a Cloudflare lambda until the provided promise is resolved.
 */ function cloudflareWaitUntil(task) {
    _getOpenNextCloudflareContext()?.waitUntil(task);
}
/**
 * Checks if the Cloudflare waitUntil function is available globally.
 */ function isCloudflareWaitUntilAvailable() {
    return typeof _getOpenNextCloudflareContext()?.waitUntil === 'function';
}
;
 //# sourceMappingURL=responseEnd.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/_error.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureUnderscoreErrorException",
    ()=>captureUnderscoreErrorException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)");
;
;
/**
 * Capture the exception passed by nextjs to the `_error` page, adding context data as appropriate.
 *
 * @param contextOrProps The data passed to either `getInitialProps` or `render` by nextjs
 */ async function captureUnderscoreErrorException(contextOrProps) {
    const { req, res, err } = contextOrProps;
    // 404s (and other 400-y friends) can trigger `_error`, but we don't want to send them to Sentry
    const statusCode = res?.statusCode || contextOrProps.statusCode;
    if (statusCode && statusCode < 500) {
        return Promise.resolve();
    }
    // In previous versions of the suggested `_error.js` page in which this function is meant to be used, there was a
    // workaround for https://github.com/vercel/next.js/issues/8592 which involved an extra call to this function, in the
    // custom error component's `render` method, just in case it hadn't been called by `getInitialProps`. Now that that
    // issue has been fixed, the second call is unnecessary, but since it lives in user code rather than our code, users
    // have to be the ones to get rid of it, and guaraneteedly, not all of them will. So, rather than capture the error
    // twice, we just bail if we sense we're in that now-extraneous second call. (We can tell which function we're in
    // because Nextjs passes `pathname` to `getInitialProps` but not to `render`.)
    if (!contextOrProps.pathname) {
        return Promise.resolve();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        if (req) {
            const normalizedRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpRequestToRequestData"])(req);
            scope.setSDKProcessingMetadata({
                normalizedRequest
            });
        }
        // If third-party libraries (or users themselves) throw something falsy, we want to capture it as a message (which
        // is what passing a string to `captureException` will wind up doing)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(err || `_error.js called with falsy error (${err})`, {
            mechanism: {
                type: 'auto.function.nextjs.underscore_error',
                handled: false,
                data: {
                    function: '_error.getInitialProps'
                }
            }
        });
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitUntil"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSafelyWithTimeout"])());
}
;
 //# sourceMappingURL=_error.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBuild",
    ()=>isBuild
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/constants.js [app-client] (ecmascript)");
;
/**
 * Decide if the currently running process is part of the build phase or happening at runtime.
 */ function isBuild() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PHASE === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASE_PRODUCTION_BUILD"];
}
;
 //# sourceMappingURL=isBuild.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isUseCacheFunction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Vendored from: https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/client-and-server-references.ts
__turbopack_context__.s([
    "isUseCacheFunction",
    ()=>isUseCacheFunction
]);
function extractInfoFromServerReferenceId(id) {
    const infoByte = parseInt(id.slice(0, 2), 16);
    // eslint-disable-next-line no-bitwise
    const typeBit = infoByte >> 7 & 0x1;
    // eslint-disable-next-line no-bitwise
    const argMask = infoByte >> 1 & 0x3f;
    // eslint-disable-next-line no-bitwise
    const restArgs = infoByte & 0x1;
    const usedArgs = Array(6);
    for(let index = 0; index < 6; index++){
        const bitPosition = 5 - index;
        // eslint-disable-next-line no-bitwise
        const bit = argMask >> bitPosition & 0x1;
        usedArgs[index] = bit === 1;
    }
    return {
        type: typeBit === 1 ? 'use-cache' : 'server-action',
        usedArgs: usedArgs,
        hasRestArgs: restArgs === 1
    };
}
function isServerReference(value) {
    return value.$$typeof === Symbol.for('react.server.reference');
}
/**
 * Check if the function is a use cache function.
 *
 * @param value - The function to check.
 * @returns true if the function is a use cache function, false otherwise.
 */ function isUseCacheFunction(value) {
    if (!isServerReference(value)) {
        return false;
    }
    const { type } = extractInfoFromServerReferenceId(value.$$id);
    return type === 'use-cache';
}
;
 //# sourceMappingURL=isUseCacheFunction.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/nextSpan.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startInactiveSpan",
    ()=>startInactiveSpan,
    "startSpan",
    ()=>startSpan,
    "startSpanManual",
    ()=>startSpanManual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isUseCacheFunction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isUseCacheFunction.js [app-client] (ecmascript)");
;
;
;
;
function shouldNoopSpan(callback) {
    const isBuildContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])();
    const isUseCacheFunctionContext = callback ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isUseCacheFunction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUseCacheFunction"])(callback) : false;
    if (isUseCacheFunctionContext) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('Skipping span creation in Cache Components context');
    }
    return isBuildContext || isUseCacheFunctionContext;
}
function createNonRecordingSpan() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$sentryNonRecordingSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SentryNonRecordingSpan"]({
        traceId: '00000000000000000000000000000000',
        spanId: '0000000000000000'
    });
}
/**
 * Next.js-specific implementation of `startSpan` that skips span creation
 * in Cache Components contexts (which render at build time).
 *
 * When in a Cache Components context, we execute the callback with a non-recording span
 * and return early without creating an actual span, since spans don't make sense at build/cache time.
 *
 * @param options - Options for starting the span
 * @param callback - Callback function that receives the span
 * @returns The return value of the callback
 */ function startSpan(options, callback) {
    if (shouldNoopSpan(callback)) {
        return callback(createNonRecordingSpan());
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])(options, callback);
}
/**
 *
 * When in a Cache Components context, we execute the callback with a non-recording span
 * and return early without creating an actual span, since spans don't make sense at build/cache time.
 *
 * @param options - Options for starting the span
 * @param callback - Callback function that receives the span and finish function
 * @returns The return value of the callback
 */ function startSpanManual(options, callback) {
    if (shouldNoopSpan(callback)) {
        const nonRecordingSpan = createNonRecordingSpan();
        return callback(nonRecordingSpan, ()=>nonRecordingSpan.end());
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])(options, callback);
}
/**
 *
 * When in a Cache Components context, we return a non-recording span and return early
 * without creating an actual span, since spans don't make sense at build/cache time.
 *
 * @param options - Options for starting the span
 * @returns A non-recording span (in Cache Components context) or the created span
 */ function startInactiveSpan(options) {
    if (shouldNoopSpan()) {
        return createNonRecordingSpan();
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startInactiveSpan"])(options);
}
;
 //# sourceMappingURL=nextSpan.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/span-attributes-with-logic-attached.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * If this attribute is attached to a transaction, the Next.js SDK will drop that transaction.
 */ __turbopack_context__.s([
    "TRANSACTION_ATTR_SENTRY_ROUTE_BACKFILL",
    ()=>TRANSACTION_ATTR_SENTRY_ROUTE_BACKFILL,
    "TRANSACTION_ATTR_SENTRY_TRACE_BACKFILL",
    ()=>TRANSACTION_ATTR_SENTRY_TRACE_BACKFILL,
    "TRANSACTION_ATTR_SHOULD_DROP_TRANSACTION",
    ()=>TRANSACTION_ATTR_SHOULD_DROP_TRANSACTION
]);
const TRANSACTION_ATTR_SHOULD_DROP_TRANSACTION = 'sentry.drop_transaction';
const TRANSACTION_ATTR_SENTRY_TRACE_BACKFILL = 'sentry.sentry_trace_backfill';
const TRANSACTION_ATTR_SENTRY_ROUTE_BACKFILL = 'sentry.route_backfill';
;
 //# sourceMappingURL=span-attributes-with-logic-attached.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callDataFetcherTraced",
    ()=>callDataFetcherTraced,
    "withErrorInstrumentation",
    ()=>withErrorInstrumentation,
    "withTracedServerSideDataFetcher",
    ()=>withTracedServerSideDataFetcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/traceData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/span-attributes-with-logic-attached.js [app-client] (ecmascript)");
;
;
/**
 * Wraps a function that potentially throws. If it does, the error is passed to `captureException` and rethrown.
 *
 * Note: This function turns the wrapped function into an asynchronous one.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function withErrorInstrumentation(origFunction) {
    return async function(...origFunctionArguments) {
        try {
            return await origFunction.apply(this, origFunctionArguments);
        } catch (e) {
            // TODO: Extract error logic from `withSentry` in here or create a new wrapper with said logic or something like that.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(e, {
                // TODO: check if origFunction.name actually returns the correct name or minified garbage
                // in this case, we can add another argument to this wrapper with the respective function name
                mechanism: {
                    handled: false,
                    type: 'auto.function.nextjs.wrapped',
                    data: {
                        function: origFunction.name
                    }
                }
            });
            throw e;
        }
    };
}
/**
 * Calls a server-side data fetching function (that takes a `req` and `res` object in its context) with tracing
 * instrumentation. A transaction will be created for the incoming request (if it doesn't already exist) in addition to
 * a span for the wrapped data fetching function.
 *
 * All of the above happens in an isolated domain, meaning all thrown errors will be associated with the correct span.
 *
 * @param origDataFetcher The data fetching method to call.
 * @param origFunctionArguments The arguments to call the data fetching method with.
 * @param req The data fetching function's request object.
 * @param res The data fetching function's response object.
 * @param options Options providing details for the created transaction and span.
 * @returns what the data fetching method call returned.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function withTracedServerSideDataFetcher(origDataFetcher, req, res, options) {
    return async function(...args) {
        const normalizedRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpRequestToRequestData"])(req);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().setTransactionName(`${options.dataFetchingMethodName} (${options.dataFetcherRouteName})`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"])().setSDKProcessingMetadata({
            normalizedRequest
        });
        const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
        // Only set the route backfill if the span is not for /_error
        if (span && options.requestedRouteName !== '/_error') {
            const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span);
            root.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSACTION_ATTR_SENTRY_ROUTE_BACKFILL"], options.requestedRouteName);
        }
        const { 'sentry-trace': sentryTrace, baggage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$traceData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTraceData"])();
        return {
            sentryTrace: sentryTrace,
            baggage: baggage,
            data: await origDataFetcher.apply(this, args)
        };
    };
}
/**
 * Call a data fetcher and trace it. Only traces the function if there is an active transaction on the scope.
 *
 * We only do the following until we move transaction creation into this function: When called, the wrapped function
 * will also update the name of the active transaction with a parameterized route provided via the `options` argument.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callDataFetcherTraced(origFunction, origFunctionArgs) {
    try {
        return await origFunction(...origFunctionArgs);
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(e, {
            mechanism: {
                handled: false,
                type: 'auto.function.nextjs.data_fetcher'
            }
        });
        throw e;
    }
}
;
 //# sourceMappingURL=wrapperUtils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapGetStaticPropsWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapGetStaticPropsWithSentry",
    ()=>wrapGetStaticPropsWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)");
;
;
/**
 * Create a wrapped version of the user's exported `getStaticProps` function
 *
 * @param origGetStaticProps The user's `getStaticProps` function
 * @param parameterizedRoute The page's parameterized route
 * @returns A wrapped version of the function
 */ function wrapGetStaticPropsWithSentry(origGetStaticPropsa, _parameterizedRoute) {
    return new Proxy(origGetStaticPropsa, {
        apply: async (wrappingTarget, thisArg, args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])()) {
                return wrappingTarget.apply(thisArg, args);
            }
            const errorWrappedGetStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorInstrumentation"])(wrappingTarget);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callDataFetcherTraced"])(errorWrappedGetStaticProps, args);
        }
    });
}
;
 //# sourceMappingURL=wrapGetStaticPropsWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapGetInitialPropsWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapGetInitialPropsWithSentry",
    ()=>wrapGetInitialPropsWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)");
;
;
/**
 * Create a wrapped version of the user's exported `getInitialProps` function
 *
 * @param origGetInitialProps The user's `getInitialProps` function
 * @param parameterizedRoute The page's parameterized route
 * @returns A wrapped version of the function
 */ function wrapGetInitialPropsWithSentry(origGetInitialProps) {
    return new Proxy(origGetInitialProps, {
        apply: async (wrappingTarget, thisArg, args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])()) {
                return wrappingTarget.apply(thisArg, args);
            }
            const [context] = args;
            const { req, res } = context;
            const errorWrappedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorInstrumentation"])(wrappingTarget);
            // Generally we can assume that `req` and `res` are always defined on the server:
            // https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#context-object
            // This does not seem to be the case in dev mode. Because we have no clean way of associating the the data fetcher
            // span with each other when there are no req or res objects, we simply do not trace them at all here.
            if (req && res) {
                const tracedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTracedServerSideDataFetcher"])(errorWrappedGetInitialProps, req, res, {
                    dataFetcherRouteName: context.pathname,
                    requestedRouteName: context.pathname,
                    dataFetchingMethodName: 'getInitialProps'
                });
                const { data: initialProps, baggage, sentryTrace } = await tracedGetInitialProps.apply(thisArg, args) ?? {}; // Next.js allows undefined to be returned from a getInitialPropsFunction.
                if (typeof initialProps === 'object' && initialProps !== null) {
                    // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                    if (sentryTrace) {
                        initialProps._sentryTraceData = sentryTrace;
                    }
                    // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                    if (baggage) {
                        initialProps._sentryBaggage = baggage;
                    }
                }
                return initialProps;
            } else {
                return errorWrappedGetInitialProps.apply(thisArg, args);
            }
        }
    });
}
;
 //# sourceMappingURL=wrapGetInitialPropsWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapAppGetInitialPropsWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapAppGetInitialPropsWithSentry",
    ()=>wrapAppGetInitialPropsWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)");
;
;
/**
 * Create a wrapped version of the user's exported `getInitialProps` function in
 * a custom app ("_app.js").
 *
 * @param origAppGetInitialProps The user's `getInitialProps` function
 * @param parameterizedRoute The page's parameterized route
 * @returns A wrapped version of the function
 */ function wrapAppGetInitialPropsWithSentry(origAppGetInitialProps) {
    return new Proxy(origAppGetInitialProps, {
        apply: async (wrappingTarget, thisArg, args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])()) {
                return wrappingTarget.apply(thisArg, args);
            }
            const [context] = args;
            const { req, res } = context.ctx;
            const errorWrappedAppGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorInstrumentation"])(wrappingTarget);
            // Generally we can assume that `req` and `res` are always defined on the server:
            // https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#context-object
            // This does not seem to be the case in dev mode. Because we have no clean way of associating the the data fetcher
            // span with each other when there are no req or res objects, we simply do not trace them at all here.
            if (req && res) {
                const tracedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTracedServerSideDataFetcher"])(errorWrappedAppGetInitialProps, req, res, {
                    dataFetcherRouteName: '/_app',
                    requestedRouteName: context.ctx.pathname,
                    dataFetchingMethodName: 'getInitialProps'
                });
                const { data: appGetInitialProps, sentryTrace, baggage } = await tracedGetInitialProps.apply(thisArg, args);
                if (typeof appGetInitialProps === 'object' && appGetInitialProps !== null) {
                    // Per definition, `pageProps` is not optional, however an increased amount of users doesn't seem to call
                    // `App.getInitialProps(appContext)` in their custom `_app` pages which is required as per
                    // https://nextjs.org/docs/advanced-features/custom-app - resulting in missing `pageProps`.
                    // For this reason, we just handle the case where `pageProps` doesn't exist explicitly.
                    if (!appGetInitialProps.pageProps) {
                        appGetInitialProps.pageProps = {};
                    }
                    // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                    if (sentryTrace) {
                        appGetInitialProps.pageProps._sentryTraceData = sentryTrace;
                    }
                    // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                    if (baggage) {
                        appGetInitialProps.pageProps._sentryBaggage = baggage;
                    }
                }
                return appGetInitialProps;
            } else {
                return errorWrappedAppGetInitialProps.apply(thisArg, args);
            }
        }
    });
}
;
 //# sourceMappingURL=wrapAppGetInitialPropsWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapDocumentGetInitialPropsWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapDocumentGetInitialPropsWithSentry",
    ()=>wrapDocumentGetInitialPropsWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)");
;
;
/**
 * Create a wrapped version of the user's exported `getInitialProps` function in
 * a custom document ("_document.js").
 *
 * @param origDocumentGetInitialProps The user's `getInitialProps` function
 * @param parameterizedRoute The page's parameterized route
 * @returns A wrapped version of the function
 */ function wrapDocumentGetInitialPropsWithSentry(origDocumentGetInitialProps) {
    return new Proxy(origDocumentGetInitialProps, {
        apply: async (wrappingTarget, thisArg, args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])()) {
                return wrappingTarget.apply(thisArg, args);
            }
            const [context] = args;
            const { req, res } = context;
            const errorWrappedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorInstrumentation"])(wrappingTarget);
            // Generally we can assume that `req` and `res` are always defined on the server:
            // https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#context-object
            // This does not seem to be the case in dev mode. Because we have no clean way of associating the the data fetcher
            // span with each other when there are no req or res objects, we simply do not trace them at all here.
            if (req && res) {
                const tracedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTracedServerSideDataFetcher"])(errorWrappedGetInitialProps, req, res, {
                    dataFetcherRouteName: '/_document',
                    requestedRouteName: context.pathname,
                    dataFetchingMethodName: 'getInitialProps'
                });
                const { data } = await tracedGetInitialProps.apply(thisArg, args);
                return data;
            } else {
                return errorWrappedGetInitialProps.apply(thisArg, args);
            }
        }
    });
}
;
 //# sourceMappingURL=wrapDocumentGetInitialPropsWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapErrorGetInitialPropsWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapErrorGetInitialPropsWithSentry",
    ()=>wrapErrorGetInitialPropsWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)");
;
;
/**
 * Create a wrapped version of the user's exported `getInitialProps` function in
 * a custom error page ("_error.js").
 *
 * @param origErrorGetInitialProps The user's `getInitialProps` function
 * @param parameterizedRoute The page's parameterized route
 * @returns A wrapped version of the function
 */ function wrapErrorGetInitialPropsWithSentry(origErrorGetInitialProps) {
    return new Proxy(origErrorGetInitialProps, {
        apply: async (wrappingTarget, thisArg, args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])()) {
                return wrappingTarget.apply(thisArg, args);
            }
            const [context] = args;
            const { req, res } = context;
            const errorWrappedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorInstrumentation"])(wrappingTarget);
            // Generally we can assume that `req` and `res` are always defined on the server:
            // https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#context-object
            // This does not seem to be the case in dev mode. Because we have no clean way of associating the the data fetcher
            // span with each other when there are no req or res objects, we simply do not trace them at all here.
            if (req && res) {
                const tracedGetInitialProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTracedServerSideDataFetcher"])(errorWrappedGetInitialProps, req, res, {
                    dataFetcherRouteName: '/_error',
                    requestedRouteName: context.pathname,
                    dataFetchingMethodName: 'getInitialProps'
                });
                const { data: errorGetInitialProps, baggage, sentryTrace } = await tracedGetInitialProps.apply(thisArg, args);
                if (typeof errorGetInitialProps === 'object' && errorGetInitialProps !== null) {
                    if (sentryTrace) {
                        // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                        errorGetInitialProps._sentryTraceData = sentryTrace;
                    }
                    // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                    if (baggage) {
                        errorGetInitialProps._sentryBaggage = baggage;
                    }
                }
                return errorGetInitialProps;
            } else {
                return errorWrappedGetInitialProps.apply(thisArg, args);
            }
        }
    });
}
;
 //# sourceMappingURL=wrapErrorGetInitialPropsWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapGetServerSidePropsWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapGetServerSidePropsWithSentry",
    ()=>wrapGetServerSidePropsWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/isBuild.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/wrapperUtils.js [app-client] (ecmascript)");
;
;
/**
 * Create a wrapped version of the user's exported `getServerSideProps` function
 *
 * @param origGetServerSideProps The user's `getServerSideProps` function
 * @param parameterizedRoute The page's parameterized route
 * @returns A wrapped version of the function
 */ function wrapGetServerSidePropsWithSentry(origGetServerSideProps, parameterizedRoute) {
    return new Proxy(origGetServerSideProps, {
        apply: async (wrappingTarget, thisArg, args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$isBuild$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBuild"])()) {
                return wrappingTarget.apply(thisArg, args);
            }
            const [context] = args;
            const { req, res } = context;
            const errorWrappedGetServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorInstrumentation"])(wrappingTarget);
            const tracedGetServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$wrapperUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withTracedServerSideDataFetcher"])(errorWrappedGetServerSideProps, req, res, {
                dataFetcherRouteName: parameterizedRoute,
                requestedRouteName: parameterizedRoute,
                dataFetchingMethodName: 'getServerSideProps'
            });
            const { data: serverSideProps, baggage, sentryTrace } = await tracedGetServerSideProps.apply(thisArg, args);
            if (typeof serverSideProps === 'object' && serverSideProps !== null && 'props' in serverSideProps) {
                // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                if (sentryTrace) {
                    serverSideProps.props._sentryTraceData = sentryTrace;
                }
                // The Next.js serializer throws on undefined values so we need to guard for it (#12102)
                if (baggage) {
                    serverSideProps.props._sentryBaggage = baggage;
                }
            }
            return serverSideProps;
        }
    });
}
;
 //# sourceMappingURL=wrapGetServerSidePropsWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/tracingUtils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commonObjectToIsolationScope",
    ()=>commonObjectToIsolationScope,
    "commonObjectToPropagationContext",
    ()=>commonObjectToPropagationContext,
    "dropNextjsRootContext",
    ()=>dropNextjsRootContext,
    "escapeNextjsTracing",
    ()=>escapeNextjsTracing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/scope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/span-attributes-with-logic-attached.js [app-client] (ecmascript)");
;
;
;
const commonPropagationContextMap = new WeakMap();
/**
 * Takes a shared (garbage collectable) object between resources, e.g. a headers object shared between Next.js server components and returns a common propagation context.
 *
 * @param commonObject The shared object.
 * @param propagationContext The propagation context that should be shared between all the resources if no propagation context was registered yet.
 * @returns the shared propagation context.
 */ function commonObjectToPropagationContext(commonObject, propagationContext) {
    if (typeof commonObject === 'object' && commonObject) {
        const memoPropagationContext = commonPropagationContextMap.get(commonObject);
        if (memoPropagationContext) {
            return memoPropagationContext;
        } else {
            commonPropagationContextMap.set(commonObject, propagationContext);
            return propagationContext;
        }
    } else {
        return propagationContext;
    }
}
const commonIsolationScopeMap = new WeakMap();
/**
 * Takes a shared (garbage collectable) object between resources, e.g. a headers object shared between Next.js server components and returns a common propagation context.
 *
 * @param commonObject The shared object.
 * @param isolationScope The isolationScope that should be shared between all the resources if no isolation scope was created yet.
 * @returns the shared isolation scope.
 */ function commonObjectToIsolationScope(commonObject) {
    if (typeof commonObject === 'object' && commonObject) {
        const memoIsolationScope = commonIsolationScopeMap.get(commonObject);
        if (memoIsolationScope) {
            return memoIsolationScope;
        } else {
            const newIsolationScope = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"]();
            commonIsolationScopeMap.set(commonObject, newIsolationScope);
            return newIsolationScope;
        }
    } else {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"]();
    }
}
let nextjsEscapedAsyncStorage;
/**
 * Will mark the execution context of the callback as "escaped" from Next.js internal tracing by unsetting the active
 * span and propagation context. When an execution passes through this function multiple times, it is a noop after the
 * first time.
 */ function escapeNextjsTracing(cb) {
    const MaybeGlobalAsyncLocalStorage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].AsyncLocalStorage;
    if (!MaybeGlobalAsyncLocalStorage) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn("Tried to register AsyncLocalStorage async context strategy in a runtime that doesn't support AsyncLocalStorage.");
        return cb();
    }
    if (!nextjsEscapedAsyncStorage) {
        nextjsEscapedAsyncStorage = new MaybeGlobalAsyncLocalStorage();
    }
    if (nextjsEscapedAsyncStorage.getStore()) {
        return cb();
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startNewTrace"])(()=>{
            return nextjsEscapedAsyncStorage.run(true, ()=>{
                return cb();
            });
        });
    }
}
/**
 * Ideally this function never lands in the develop branch.
 *
 * Drops the entire span tree this function was called in, if it was a span tree created by Next.js.
 */ function dropNextjsRootContext() {
    const nextJsOwnedSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    if (nextJsOwnedSpan) {
        const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(nextJsOwnedSpan);
        const rootSpanAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(rootSpan).data;
        if (rootSpanAttributes?.['next.span_type']) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(nextJsOwnedSpan)?.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSACTION_ATTR_SHOULD_DROP_TRANSACTION"], true);
        }
    }
}
;
 //# sourceMappingURL=tracingUtils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapServerComponentWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapServerComponentWithSentry",
    ()=>wrapServerComponentWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/scope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/nextNavigationErrorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/span-attributes-with-logic-attached.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$tracingUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/tracingUtils.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * Wraps an `app` directory server component with Sentry error instrumentation.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapServerComponentWithSentry(appDirComponent, context) {
    const { componentRoute, componentType } = context;
    // Even though users may define server components as async functions, for the client bundles
    // Next.js will turn them into synchronous functions and it will transform any `await`s into instances of the `use`
    // hook. 🤯
    return new Proxy(appDirComponent, {
        apply: (originalFunction, thisArg, args)=>{
            const requestTraceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])()?.spanContext().traceId;
            const isolationScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$tracingUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonObjectToIsolationScope"])(context.headers);
            const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
            if (activeSpan) {
                const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
                const { scope } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCapturedScopesOnSpan"])(rootSpan);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCapturedScopesOnSpan"])(rootSpan, scope ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"](), isolationScope);
            }
            const headersDict = context.headers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["winterCGHeadersToDict"])(context.headers) : undefined;
            isolationScope.setSDKProcessingMetadata({
                normalizedRequest: {
                    headers: headersDict
                }
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])(isolationScope, ()=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
                    scope.setTransactionName(`${componentType} Server Component (${componentRoute})`);
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
                    if (activeSpan) {
                        const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
                        const sentryTrace = headersDict?.['sentry-trace'];
                        if (sentryTrace) {
                            rootSpan.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSACTION_ATTR_SENTRY_TRACE_BACKFILL"], sentryTrace);
                        }
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                        op: 'function.nextjs',
                        name: `${componentType} Server Component (${componentRoute})`,
                        attributes: {
                            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'component',
                            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.function.nextjs.server_component',
                            'sentry.nextjs.ssr.function.type': componentType,
                            'sentry.nextjs.ssr.function.route': componentRoute
                        }
                    }, (span)=>{
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>originalFunction.apply(thisArg, args), (error)=>{
                            // When you read this code you might think: "Wait a minute, shouldn't we set the status on the root span too?"
                            // The answer is: "No." - The status of the root span is determined by whatever status code Next.js decides to put on the response.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotFoundNavigationError"])(error)) {
                                // We don't want to report "not-found"s
                                span.setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                    message: 'not_found'
                                });
                            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRedirectNavigationError"])(error)) {
                                // We don't want to report redirects
                                span.setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_OK"]
                                });
                            } else {
                                span.setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                    message: 'internal_error'
                                });
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                                    mechanism: {
                                        handled: false,
                                        type: 'auto.function.nextjs.server_component'
                                    }
                                });
                            }
                        }, ()=>{
                            span.end();
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitUntil"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSafelyWithTimeout"])());
                        });
                    });
                });
            });
        }
    });
}
;
 //# sourceMappingURL=wrapServerComponentWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapRouteHandlerWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapRouteHandlerWithSentry",
    ()=>wrapRouteHandlerWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$28$2e$5_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$1_react$40$19$2e$2$2e$1_$5f$react$40$19$2e$2$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_@babel+core@7.28.5_@opentelemetry+api@1.9.0_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/nextNavigationErrorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Wraps a Next.js App Router Route handler with Sentry error and performance instrumentation.
 *
 * NOTICE: This wrapper is for App Router API routes. If you are looking to wrap Pages Router API routes use `wrapApiHandlerWithSentry` instead.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapRouteHandlerWithSentry(routeHandler, context) {
    const { method, parameterizedRoute, headers } = context;
    return new Proxy(routeHandler, {
        apply: async (originalFunction, thisArg, args)=>{
            const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
            const rootSpan = activeSpan ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan) : undefined;
            let edgeRuntimeIsolationScopeOverride;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"])(), ()=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])(async (scope)=>{
                    scope.setTransactionName(`${method} ${parameterizedRoute}`);
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>originalFunction.apply(thisArg, args), (error)=>{
                        // Next.js throws errors when calling `redirect()`. We don't wanna report these.
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRedirectNavigationError"])(error)) ;
                        else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotFoundNavigationError"])(error)) {
                            if (activeSpan) {
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(activeSpan, 404);
                            }
                            if (rootSpan) {
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(rootSpan, 404);
                            }
                        } else {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                                mechanism: {
                                    handled: false,
                                    type: 'auto.function.nextjs.route_handler'
                                }
                            });
                        }
                    }, ()=>{
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitUntil"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSafelyWithTimeout"])());
                    });
                    try {
                        if (response.status) {
                            if (activeSpan) {
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(activeSpan, response.status);
                            }
                            if (rootSpan) {
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(rootSpan, response.status);
                            }
                        }
                    } catch  {
                    // best effort - response may be undefined?
                    }
                    return response;
                });
            });
        }
    });
}
;
 //# sourceMappingURL=wrapRouteHandlerWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapApiHandlerWithSentryVercelCrons.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapApiHandlerWithSentryVercelCrons",
    ()=>wrapApiHandlerWithSentryVercelCrons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
;
/**
 * Wraps a function with Sentry crons instrumentation by automatically sending check-ins for the given Vercel crons config.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapApiHandlerWithSentryVercelCrons(handler, vercelCronsConfig) {
    return new Proxy(handler, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apply: (originalFunction, thisArg, args)=>{
            if (!args?.[0]) {
                return originalFunction.apply(thisArg, args);
            }
            const [req] = args;
            let maybePromiseResult;
            const cronsKey = 'nextUrl' in req ? req.nextUrl.pathname : req.url;
            const userAgentHeader = 'nextUrl' in req ? req.headers.get('user-agent') : req.headers['user-agent'];
            if (!vercelCronsConfig || // do nothing if vercel crons config is missing
            !userAgentHeader?.includes('vercel-cron') // do nothing if endpoint is not called from vercel crons
            ) {
                return originalFunction.apply(thisArg, args);
            }
            const vercelCron = vercelCronsConfig.find((vercelCron)=>vercelCron.path === cronsKey);
            if (!vercelCron?.path || !vercelCron.schedule) {
                return originalFunction.apply(thisArg, args);
            }
            const monitorSlug = vercelCron.path;
            const checkInId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureCheckIn"])({
                monitorSlug,
                status: 'in_progress'
            }, {
                maxRuntime: 60 * 12,
                schedule: {
                    type: 'crontab',
                    value: vercelCron.schedule
                }
            });
            const startTime = Date.now() / 1000;
            const handleErrorCase = ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureCheckIn"])({
                    checkInId,
                    monitorSlug,
                    status: 'error',
                    duration: Date.now() / 1000 - startTime
                });
            };
            try {
                maybePromiseResult = originalFunction.apply(thisArg, args);
            } catch (e) {
                handleErrorCase();
                throw e;
            }
            if (typeof maybePromiseResult === 'object' && maybePromiseResult !== null && 'then' in maybePromiseResult) {
                Promise.resolve(maybePromiseResult).then(()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureCheckIn"])({
                        checkInId,
                        monitorSlug,
                        status: 'ok',
                        duration: Date.now() / 1000 - startTime
                    });
                }, ()=>{
                    handleErrorCase();
                });
                // It is very important that we return the original promise here, because Next.js attaches various properties
                // to that promise and will throw if they are not on the returned value.
                return maybePromiseResult;
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureCheckIn"])({
                    checkInId,
                    monitorSlug,
                    status: 'ok',
                    duration: Date.now() / 1000 - startTime
                });
                return maybePromiseResult;
            }
        }
    });
}
;
 //# sourceMappingURL=wrapApiHandlerWithSentryVercelCrons.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapMiddlewareWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapMiddlewareWithSentry",
    ()=>wrapMiddlewareWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)");
;
;
/**
 * Wraps Next.js middleware with Sentry error and performance instrumentation.
 *
 * @param middleware The middleware handler.
 * @returns a wrapped middleware handler.
 */ function wrapMiddlewareWithSentry(middleware) {
    return new Proxy(middleware, {
        apply: async (wrappingTarget, thisArg, args)=>{
            const tunnelRoute = '_sentryRewritesTunnelPath' in globalThis ? globalThis._sentryRewritesTunnelPath : undefined;
            if (tunnelRoute && typeof tunnelRoute === 'string') {
                const req = args[0];
                // Check if the current request matches the tunnel route
                if (req instanceof Request) {
                    const url = new URL(req.url);
                    const isTunnelRequest = url.pathname.startsWith(tunnelRoute);
                    if (isTunnelRequest) {
                        // Create a simple response that mimics NextResponse.next() so we don't need to import internals here
                        // which breaks next 13 apps
                        // https://github.com/vercel/next.js/blob/c12c9c1f78ad384270902f0890dc4cd341408105/packages/next/src/server/web/spec-extension/response.ts#L146
                        return new Response(null, {
                            status: 200,
                            headers: {
                                'x-middleware-next': '1'
                            }
                        });
                    }
                }
            }
            // TODO: We still should add central isolation scope creation for when our build-time instrumentation does not work anymore with turbopack.
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])((isolationScope)=>{
                const req = args[0];
                const currentScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
                let spanName;
                let spanSource;
                if (req instanceof Request) {
                    isolationScope.setSDKProcessingMetadata({
                        normalizedRequest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["winterCGRequestToRequestData"])(req)
                    });
                    spanName = `middleware ${req.method}`;
                    spanSource = 'url';
                } else {
                    spanName = 'middleware';
                    spanSource = 'component';
                }
                currentScope.setTransactionName(spanName);
                const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
                if (activeSpan) {
                    // If there is an active span, it likely means that the automatic Next.js OTEL instrumentation worked and we can
                    // rely on that for parameterization.
                    spanName = 'middleware';
                    spanSource = 'component';
                    const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
                    if (rootSpan) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCapturedScopesOnSpan"])(rootSpan, currentScope, isolationScope);
                    }
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                    name: spanName,
                    op: 'http.server.middleware',
                    attributes: {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: spanSource,
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.function.nextjs.wrap_middleware'
                    }
                }, ()=>{
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>wrappingTarget.apply(thisArg, args), (error)=>{
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                            mechanism: {
                                type: 'auto.function.nextjs.wrap_middleware',
                                handled: false
                            }
                        });
                    }, ()=>{
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitUntil"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSafelyWithTimeout"])());
                    });
                });
            });
        }
    });
}
;
 //# sourceMappingURL=wrapMiddlewareWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapPageComponentWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapPageComponentWithSentry",
    ()=>wrapPageComponentWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/tracing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
;
function isReactClassComponent(target) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return typeof target === 'function' && target?.prototype?.isReactComponent;
}
/**
 * Wraps a page component with Sentry error instrumentation.
 */ function wrapPageComponentWithSentry(pageComponent) {
    if (isReactClassComponent(pageComponent)) {
        return class SentryWrappedPageComponent extends pageComponent {
            render(...args) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])(()=>{
                    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
                    // We extract the sentry trace data that is put in the component props by datafetcher wrappers
                    const sentryTraceData = typeof this.props === 'object' && this.props !== null && '_sentryTraceData' in this.props && typeof this.props._sentryTraceData === 'string' ? this.props._sentryTraceData : undefined;
                    if (sentryTraceData) {
                        const traceparentData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractTraceparentData"])(sentryTraceData);
                        scope.setContext('trace', {
                            span_id: traceparentData?.parentSpanId,
                            trace_id: traceparentData?.traceId
                        });
                    }
                    try {
                        return super.render(...args);
                    } catch (e) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(e, {
                            mechanism: {
                                handled: false,
                                type: 'auto.function.nextjs.page_class'
                            }
                        });
                        throw e;
                    }
                });
            }
        };
    } else if (typeof pageComponent === 'function') {
        return new Proxy(pageComponent, {
            apply (target, thisArg, argArray) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])(()=>{
                    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
                    // We extract the sentry trace data that is put in the component props by datafetcher wrappers
                    const sentryTraceData = argArray?.[0]?._sentryTraceData;
                    if (sentryTraceData) {
                        const traceparentData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractTraceparentData"])(sentryTraceData);
                        scope.setContext('trace', {
                            span_id: traceparentData?.parentSpanId,
                            trace_id: traceparentData?.traceId
                        });
                    }
                    try {
                        return target.apply(thisArg, argArray);
                    } catch (e) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(e, {
                            mechanism: {
                                handled: false,
                                type: 'auto.function.nextjs.page_function'
                            }
                        });
                        throw e;
                    }
                });
            }
        });
    } else {
        return pageComponent;
    }
}
;
 //# sourceMappingURL=wrapPageComponentWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapGenerationFunctionWithSentry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapGenerationFunctionWithSentry",
    ()=>wrapGenerationFunctionWithSentry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/scope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/tracing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/nextNavigationErrorUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/span-attributes-with-logic-attached.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$tracingUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/tracingUtils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Wraps a generation function (e.g. generateMetadata) with Sentry error and performance instrumentation.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapGenerationFunctionWithSentry(generationFunction, context) {
    const { requestAsyncStorage, componentRoute, componentType, generationFunctionIdentifier } = context;
    return new Proxy(generationFunction, {
        apply: (originalFunction, thisArg, args)=>{
            const requestTraceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])()?.spanContext().traceId;
            let headers = undefined;
            // We try-catch here just in case anything goes wrong with the async storage here goes wrong since it is Next.js internal API
            try {
                headers = requestAsyncStorage?.getStore()?.headers;
            } catch  {
            /** empty */ }
            const isolationScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$tracingUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonObjectToIsolationScope"])(headers);
            const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
            if (activeSpan) {
                const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
                const { scope } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCapturedScopesOnSpan"])(rootSpan);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCapturedScopesOnSpan"])(rootSpan, scope ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$scope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"](), isolationScope);
            }
            const headersDict = headers ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["winterCGHeadersToDict"])(headers) : undefined;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])(isolationScope, ()=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
                    scope.setTransactionName(`${componentType}.${generationFunctionIdentifier} (${componentRoute})`);
                    isolationScope.setSDKProcessingMetadata({
                        normalizedRequest: {
                            headers: headersDict
                        }
                    });
                    const activeSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
                    if (activeSpan) {
                        const rootSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(activeSpan);
                        const sentryTrace = headersDict?.['sentry-trace'];
                        if (sentryTrace) {
                            rootSpan.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$span$2d$attributes$2d$with$2d$logic$2d$attached$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSACTION_ATTR_SENTRY_TRACE_BACKFILL"], sentryTrace);
                        }
                    }
                    const propagationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$tracingUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commonObjectToPropagationContext"])(headers, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$tracing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["propagationContextFromHeaders"])(headersDict?.['sentry-trace'], headersDict?.['baggage']));
                    if (requestTraceId) {
                        propagationContext.traceId = requestTraceId;
                    }
                    scope.setPropagationContext(propagationContext);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                        op: 'function.nextjs',
                        name: `${componentType}.${generationFunctionIdentifier} (${componentRoute})`,
                        attributes: {
                            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'route',
                            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.function.nextjs',
                            'sentry.nextjs.ssr.function.type': generationFunctionIdentifier,
                            'sentry.nextjs.ssr.function.route': componentRoute
                        }
                    }, (span)=>{
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>originalFunction.apply(thisArg, args), (err)=>{
                            // When you read this code you might think: "Wait a minute, shouldn't we set the status on the root span too?"
                            // The answer is: "No." - The status of the root span is determined by whatever status code Next.js decides to put on the response.
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotFoundNavigationError"])(err)) {
                                // We don't want to report "not-found"s
                                span.setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                    message: 'not_found'
                                });
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span).setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                    message: 'not_found'
                                });
                            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRedirectNavigationError"])(err)) {
                                // We don't want to report redirects
                                span.setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_OK"]
                                });
                            } else {
                                span.setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                    message: 'internal_error'
                                });
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"])(span).setStatus({
                                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                    message: 'internal_error'
                                });
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(err, {
                                    mechanism: {
                                        handled: false,
                                        type: 'auto.function.nextjs.generation_function',
                                        data: {
                                            function: generationFunctionIdentifier
                                        }
                                    }
                                });
                            }
                        }, ()=>{
                            span.end();
                        });
                    });
                });
            });
        }
    });
}
;
 //# sourceMappingURL=wrapGenerationFunctionWithSentry.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/withServerActionInstrumentation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withServerActionInstrumentation",
    ()=>withServerActionInstrumentation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/nextNavigationErrorUtils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Wraps a Next.js Server Action implementation with Sentry Error and Performance instrumentation.
 */ function withServerActionInstrumentation(...args) {
    if (typeof args[1] === 'function') {
        const [serverActionName, callback] = args;
        return withServerActionInstrumentationImplementation(serverActionName, {}, callback);
    } else {
        const [serverActionName, options, callback] = args;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return withServerActionInstrumentationImplementation(serverActionName, options, callback);
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function withServerActionInstrumentationImplementation(serverActionName, options, callback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"])(async (isolationScope)=>{
        const sendDefaultPii = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii;
        let sentryTraceHeader;
        let baggageHeader;
        const fullHeadersObject = {};
        try {
            const awaitedHeaders = await options.headers;
            sentryTraceHeader = awaitedHeaders?.get('sentry-trace') ?? undefined;
            baggageHeader = awaitedHeaders?.get('baggage');
            awaitedHeaders?.forEach((value, key)=>{
                fullHeadersObject[key] = value;
            });
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn("Sentry wasn't able to extract the tracing headers for a server action. Will not trace this request.");
        }
        isolationScope.setTransactionName(`serverAction/${serverActionName}`);
        isolationScope.setSDKProcessingMetadata({
            normalizedRequest: {
                headers: fullHeadersObject
            }
        });
        // Normally, there is an active span here (from Next.js OTEL) and we just use that as parent
        // Else, we manually continueTrace from the incoming headers
        const continueTraceIfNoActiveSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])() ? (_opts, callback)=>callback() : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continueTrace"];
        return continueTraceIfNoActiveSpan({
            sentryTrace: sentryTraceHeader,
            baggage: baggageHeader
        }, async ()=>{
            try {
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                    op: 'function.server_action',
                    name: `serverAction/${serverActionName}`,
                    forceTransaction: true,
                    attributes: {
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"]]: 'route',
                        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.function.nextjs.server_action'
                    }
                }, async (span)=>{
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(callback, (error)=>{
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNotFoundNavigationError"])(error)) {
                            // We don't want to report "not-found"s
                            span.setStatus({
                                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                message: 'not_found'
                            });
                        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$nextNavigationErrorUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRedirectNavigationError"])(error)) {
                        // Don't do anything for redirects
                        } else {
                            span.setStatus({
                                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                                message: 'internal_error'
                            });
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                                mechanism: {
                                    handled: false,
                                    type: 'auto.function.nextjs.server_action'
                                }
                            });
                        }
                    });
                    if (options.recordResponse !== undefined ? options.recordResponse : sendDefaultPii) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"])().setExtra('server_action_result', result);
                    }
                    if (options.formData) {
                        options.formData.forEach((value, key)=>{
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"])().setExtra(`server_action_form_data.${key}`, typeof value === 'string' ? value : '[non-string value]');
                        });
                    }
                    return result;
                });
            } finally{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitUntil"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSafelyWithTimeout"])());
            }
        });
    });
}
;
 //# sourceMappingURL=withServerActionInstrumentation.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/captureRequestError.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureRequestError",
    ()=>captureRequestError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/responseEnd.js [app-client] (ecmascript)");
;
;
/**
 * Reports errors passed to the the Next.js `onRequestError` instrumentation hook.
 */ function captureRequestError(error, request, errorContext) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        scope.setSDKProcessingMetadata({
            normalizedRequest: {
                headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$request$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headersToDict"])(request.headers),
                method: request.method
            }
        });
        scope.setContext('nextjs', {
            request_path: request.path,
            router_kind: errorContext.routerKind,
            router_path: errorContext.routePath,
            route_type: errorContext.routeType
        });
        scope.setTransactionName(errorContext.routePath);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
            mechanism: {
                handled: false,
                type: 'auto.function.nextjs.on_request_error'
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitUntil"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$responseEnd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSafelyWithTimeout"])());
    });
}
;
 //# sourceMappingURL=captureRequestError.js.map
}),
"[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/index.client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrowserClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrowserClient"],
    "ErrorBoundary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorBoundary"],
    "MULTIPLEXED_TRANSPORT_EXTRA_KEY",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MULTIPLEXED_TRANSPORT_EXTRA_KEY"],
    "OpenFeatureIntegrationHook",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OpenFeatureIntegrationHook"],
    "Profiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Profiler"],
    "SDK_VERSION",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SDK_VERSION"],
    "SEMANTIC_ATTRIBUTE_SENTRY_OP",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"],
    "SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"],
    "SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE"],
    "SEMANTIC_ATTRIBUTE_SENTRY_SOURCE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_SOURCE"],
    "Scope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scope"],
    "WINDOW",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WINDOW"],
    "addBreadcrumb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"],
    "addEventProcessor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEventProcessor"],
    "addIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addIntegration"],
    "breadcrumbsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["breadcrumbsIntegration"],
    "browserApiErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserApiErrorsIntegration"],
    "browserProfilingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserProfilingIntegration"],
    "browserSessionIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserSessionIntegration"],
    "browserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$browserTracingIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["browserTracingIntegration"],
    "buildLaunchDarklyFlagUsedHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildLaunchDarklyFlagUsedHandler"],
    "captureConsoleIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureConsoleIntegration"],
    "captureEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureEvent"],
    "captureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"],
    "captureFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureFeedback"],
    "captureMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureMessage"],
    "captureReactException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureReactException"],
    "captureRequestError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$captureRequestError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureRequestError"],
    "captureRouterTransitionStart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureRouterTransitionStart"],
    "captureSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureSession"],
    "captureUnderscoreErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$_error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureUnderscoreErrorException"],
    "chromeStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chromeStackLineParser"],
    "close",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["close"],
    "consoleLoggingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["consoleLoggingIntegration"],
    "contextLinesIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contextLinesIntegration"],
    "continueTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["continueTrace"],
    "createConsolaReporter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConsolaReporter"],
    "createLangChainCallbackHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLangChainCallbackHandler"],
    "createReduxEnhancer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createReduxEnhancer"],
    "createTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransport"],
    "createUserFeedbackEnvelope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserFeedbackEnvelope"],
    "dedupeIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dedupeIntegration"],
    "defaultRequestInstrumentationOptions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultRequestInstrumentationOptions"],
    "defaultStackLineParsers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultStackLineParsers"],
    "defaultStackParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultStackParser"],
    "diagnoseSdkConnectivity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diagnoseSdkConnectivity"],
    "endSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endSession"],
    "eventFiltersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFiltersIntegration"],
    "eventFromException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromException"],
    "eventFromMessage",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eventFromMessage"],
    "exceptionFromError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exceptionFromError"],
    "extraErrorDataIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extraErrorDataIntegration"],
    "featureFlagsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureFlagsIntegration"],
    "feedbackAsyncIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackAsyncIntegration"],
    "feedbackIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackIntegration"],
    "feedbackSyncIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["feedbackSyncIntegration"],
    "flush",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flush"],
    "forceLoad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forceLoad"],
    "functionToStringIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functionToStringIntegration"],
    "geckoStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["geckoStackLineParser"],
    "getActiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"],
    "getClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"],
    "getCurrentScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"],
    "getDefaultIntegrations",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultIntegrations"],
    "getFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedback"],
    "getGlobalScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGlobalScope"],
    "getIsolationScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIsolationScope"],
    "getReplay",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReplay"],
    "getRootSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRootSpan"],
    "getSpanDescendants",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanDescendants"],
    "getSpanStatusFromHttpCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanStatusFromHttpCode"],
    "getTraceData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTraceData"],
    "globalHandlersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalHandlersIntegration"],
    "graphqlClientIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphqlClientIntegration"],
    "growthbookIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["growthbookIntegration"],
    "httpClientIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpClientIntegration"],
    "httpContextIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["httpContextIntegration"],
    "inboundFiltersIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inboundFiltersIntegration"],
    "init",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"],
    "instrumentAnthropicAiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentAnthropicAiClient"],
    "instrumentGoogleGenAIClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentGoogleGenAIClient"],
    "instrumentLangGraph",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentLangGraph"],
    "instrumentOpenAiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentOpenAiClient"],
    "instrumentOutgoingRequests",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentOutgoingRequests"],
    "instrumentSupabaseClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentSupabaseClient"],
    "isEnabled",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEnabled"],
    "isInitialized",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInitialized"],
    "lastEventId",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lastEventId"],
    "launchDarklyIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["launchDarklyIntegration"],
    "lazyLoadIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazyLoadIntegration"],
    "linkedErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkedErrorsIntegration"],
    "logger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logger"],
    "makeBrowserOfflineTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeBrowserOfflineTransport"],
    "makeFetchTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeFetchTransport"],
    "makeMultiplexedTransport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeMultiplexedTransport"],
    "metrics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metrics"],
    "moduleMetadataIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["moduleMetadataIntegration"],
    "onLoad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onLoad"],
    "openFeatureIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openFeatureIntegration"],
    "opera10StackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["opera10StackLineParser"],
    "opera11StackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["opera11StackLineParser"],
    "parameterize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parameterize"],
    "reactErrorHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactErrorHandler"],
    "reactRouterV3BrowserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactRouterV3BrowserTracingIntegration"],
    "reactRouterV4BrowserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactRouterV4BrowserTracingIntegration"],
    "reactRouterV5BrowserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactRouterV5BrowserTracingIntegration"],
    "reactRouterV6BrowserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactRouterV6BrowserTracingIntegration"],
    "reactRouterV7BrowserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reactRouterV7BrowserTracingIntegration"],
    "registerSpanErrorInstrumentation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerSpanErrorInstrumentation"],
    "registerWebWorker",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerWebWorker"],
    "replayCanvasIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replayCanvasIntegration"],
    "replayIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replayIntegration"],
    "reportPageLoaded",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportPageLoaded"],
    "reportingObserverIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportingObserverIntegration"],
    "rewriteFramesIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rewriteFramesIntegration"],
    "sendFeedback",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendFeedback"],
    "setActiveSpanInBrowser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveSpanInBrowser"],
    "setContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setContext"],
    "setCurrentClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCurrentClient"],
    "setExtra",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExtra"],
    "setExtras",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExtras"],
    "setHttpStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"],
    "setMeasurement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMeasurement"],
    "setTag",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTag"],
    "setTags",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTags"],
    "setUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUser"],
    "showReportDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showReportDialog"],
    "spanToBaggageHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToBaggageHeader"],
    "spanToJSON",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"],
    "spanToTraceHeader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToTraceHeader"],
    "spotlightBrowserIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spotlightBrowserIntegration"],
    "startBrowserTracingNavigationSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startBrowserTracingNavigationSpan"],
    "startBrowserTracingPageLoadSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startBrowserTracingPageLoadSpan"],
    "startInactiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$nextSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startInactiveSpan"],
    "startNewTrace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startNewTrace"],
    "startSession",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSession"],
    "startSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$nextSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"],
    "startSpanManual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$nextSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"],
    "statsigIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsigIntegration"],
    "supabaseIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabaseIntegration"],
    "suppressTracing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suppressTracing"],
    "tanstackRouterBrowserTracingIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tanstackRouterBrowserTracingIntegration"],
    "thirdPartyErrorFilterIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["thirdPartyErrorFilterIntegration"],
    "uiProfiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uiProfiler"],
    "unleashIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unleashIntegration"],
    "updateSpanName",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateSpanName"],
    "useProfiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProfiler"],
    "webWorkerIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["webWorkerIntegration"],
    "winjsStackLineParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["winjsStackLineParser"],
    "withActiveSpan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withActiveSpan"],
    "withErrorBoundary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withErrorBoundary"],
    "withIsolationScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withIsolationScope"],
    "withProfiler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withProfiler"],
    "withScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"],
    "withSentryConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["withSentryConfig"],
    "withSentryReactRouterV6Routing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withSentryReactRouterV6Routing"],
    "withSentryReactRouterV7Routing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withSentryReactRouterV7Routing"],
    "withSentryRouting",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withSentryRouting"],
    "withServerActionInstrumentation",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$withServerActionInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withServerActionInstrumentation"],
    "wrapApiHandlerWithSentryVercelCrons",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapApiHandlerWithSentryVercelCrons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapApiHandlerWithSentryVercelCrons"],
    "wrapAppGetInitialPropsWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapAppGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapAppGetInitialPropsWithSentry"],
    "wrapCreateBrowserRouterV6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapCreateBrowserRouterV6"],
    "wrapCreateBrowserRouterV7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapCreateBrowserRouterV7"],
    "wrapCreateMemoryRouterV6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapCreateMemoryRouterV6"],
    "wrapCreateMemoryRouterV7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapCreateMemoryRouterV7"],
    "wrapDocumentGetInitialPropsWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapDocumentGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapDocumentGetInitialPropsWithSentry"],
    "wrapErrorGetInitialPropsWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapErrorGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapErrorGetInitialPropsWithSentry"],
    "wrapGenerationFunctionWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapGenerationFunctionWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapGenerationFunctionWithSentry"],
    "wrapGetInitialPropsWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapGetInitialPropsWithSentry"],
    "wrapGetServerSidePropsWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapGetServerSidePropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapGetServerSidePropsWithSentry"],
    "wrapGetStaticPropsWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapGetStaticPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapGetStaticPropsWithSentry"],
    "wrapMiddlewareWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapMiddlewareWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapMiddlewareWithSentry"],
    "wrapPageComponentWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapPageComponentWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapPageComponentWithSentry"],
    "wrapRouteHandlerWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapRouteHandlerWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapRouteHandlerWithSentry"],
    "wrapServerComponentWithSentry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapServerComponentWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapServerComponentWithSentry"],
    "wrapUseRoutesV6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapUseRoutesV6"],
    "wrapUseRoutesV7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapUseRoutesV7"],
    "zodErrorsIntegration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodErrorsIntegration"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$index$2e$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/index.client.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/client/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$_error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/_error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$utils$2f$nextSpan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/utils/nextSpan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$browserTracingIntegration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/client/browserTracingIntegration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$client$2f$routing$2f$appRouterRoutingInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/client/routing/appRouterRoutingInstrumentation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapGetStaticPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapGetStaticPropsWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapGetInitialPropsWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapAppGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapAppGetInitialPropsWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapDocumentGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapDocumentGetInitialPropsWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapErrorGetInitialPropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapErrorGetInitialPropsWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapGetServerSidePropsWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapGetServerSidePropsWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapServerComponentWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapServerComponentWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapRouteHandlerWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapRouteHandlerWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapApiHandlerWithSentryVercelCrons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapApiHandlerWithSentryVercelCrons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapMiddlewareWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapMiddlewareWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$pages$2d$router$2d$instrumentation$2f$wrapPageComponentWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/pages-router-instrumentation/wrapPageComponentWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$wrapGenerationFunctionWithSentry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/wrapGenerationFunctionWithSentry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$withServerActionInstrumentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/withServerActionInstrumentation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$10$2e$29$2e$0_$40$opentelemetry$2b$context$2d$async$2d$hooks$40$2$2e$2$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$_7ebf494e80e14fd764d74d9ec521c0da$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$esm$2f$common$2f$captureRequestError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+nextjs@10.29.0_@opentelemetry+context-async-hooks@2.2.0_@opentelemetry+api@1.9._7ebf494e80e14fd764d74d9ec521c0da/node_modules/@sentry/nextjs/build/esm/common/captureRequestError.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$react$40$10$2e$29$2e$0_react$40$19$2e$2$2e$1$2f$node_modules$2f40$sentry$2f$react$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+react@10.29.0_react@19.2.1/node_modules/@sentry/react/build/esm/index.js [app-client] (ecmascript)");
}),
]);

//# debugId=8615b167-60d2-7bf1-2b64-a954b7caf8b9
//# sourceMappingURL=a571c_%40sentry_nextjs_build_esm_15b2405d._.js.map