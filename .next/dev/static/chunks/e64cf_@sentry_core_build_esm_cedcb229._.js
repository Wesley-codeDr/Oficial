;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="1a0cd62f-76dc-3e05-a9ab-e6b61b6b3f1f")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/request.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Transforms a `Headers` object that implements the `Web Fetch API` (https://developer.mozilla.org/en-US/docs/Web/API/Headers) into a simple key-value dict.
 * The header keys will be lower case: e.g. A "Content-Type" header will be stored as "content-type".
 */ __turbopack_context__.s([
    "extractQueryParamsFromUrl",
    ()=>extractQueryParamsFromUrl,
    "headersToDict",
    ()=>headersToDict,
    "httpHeadersToSpanAttributes",
    ()=>httpHeadersToSpanAttributes,
    "httpRequestToRequestData",
    ()=>httpRequestToRequestData,
    "winterCGHeadersToDict",
    ()=>winterCGHeadersToDict,
    "winterCGRequestToRequestData",
    ()=>winterCGRequestToRequestData
]);
function winterCGHeadersToDict(winterCGHeaders) {
    const headers = {};
    try {
        winterCGHeaders.forEach((value, key)=>{
            if (typeof value === 'string') {
                // We check that value is a string even though it might be redundant to make sure prototype pollution is not possible.
                headers[key] = value;
            }
        });
    } catch  {
    // just return the empty headers
    }
    return headers;
}
/**
 * Convert common request headers to a simple dictionary.
 */ function headersToDict(reqHeaders) {
    const headers = Object.create(null);
    try {
        Object.entries(reqHeaders).forEach(([key, value])=>{
            if (typeof value === 'string') {
                headers[key] = value;
            }
        });
    } catch  {
    // just return the empty headers
    }
    return headers;
}
/**
 * Converts a `Request` object that implements the `Web Fetch API` (https://developer.mozilla.org/en-US/docs/Web/API/Headers) into the format that the `RequestData` integration understands.
 */ function winterCGRequestToRequestData(req) {
    const headers = winterCGHeadersToDict(req.headers);
    return {
        method: req.method,
        url: req.url,
        query_string: extractQueryParamsFromUrl(req.url),
        headers
    };
}
/**
 * Convert a HTTP request object to RequestEventData to be passed as normalizedRequest.
 * Instead of allowing `PolymorphicRequest` to be passed,
 * we want to be more specific and generally require a http.IncomingMessage-like object.
 */ function httpRequestToRequestData(request) {
    const headers = request.headers || {};
    // Check for x-forwarded-host first, then fall back to host header
    const forwardedHost = typeof headers['x-forwarded-host'] === 'string' ? headers['x-forwarded-host'] : undefined;
    const host = forwardedHost || (typeof headers.host === 'string' ? headers.host : undefined);
    // Check for x-forwarded-proto first, then fall back to existing protocol detection
    const forwardedProto = typeof headers['x-forwarded-proto'] === 'string' ? headers['x-forwarded-proto'] : undefined;
    const protocol = forwardedProto || request.protocol || (request.socket?.encrypted ? 'https' : 'http');
    const url = request.url || '';
    const absoluteUrl = getAbsoluteUrl({
        url,
        host,
        protocol
    });
    // This is non-standard, but may be sometimes set
    // It may be overwritten later by our own body handling
    const data = request.body || undefined;
    // This is non-standard, but may be set on e.g. Next.js or Express requests
    const cookies = request.cookies;
    return {
        url: absoluteUrl,
        method: request.method,
        query_string: extractQueryParamsFromUrl(url),
        headers: headersToDict(headers),
        cookies,
        data
    };
}
function getAbsoluteUrl({ url, protocol, host }) {
    if (url?.startsWith('http')) {
        return url;
    }
    if (url && host) {
        return `${protocol}://${host}${url}`;
    }
    return undefined;
}
// "-user" because otherwise it would match "user-agent"
const SENSITIVE_HEADER_SNIPPETS = [
    'auth',
    'token',
    'secret',
    'cookie',
    '-user',
    'password',
    'key',
    'jwt',
    'bearer',
    'sso',
    'saml'
];
/**
 * Converts incoming HTTP request headers to OpenTelemetry span attributes following semantic conventions.
 * Header names are converted to the format: http.request.header.<key>
 * where <key> is the header name in lowercase with dashes converted to underscores.
 *
 * @see https://opentelemetry.io/docs/specs/semconv/registry/attributes/http/#http-request-header
 */ function httpHeadersToSpanAttributes(headers) {
    const spanAttributes = {};
    try {
        Object.entries(headers).forEach(([key, value])=>{
            if (value == null) {
                return;
            }
            const lowerCasedKey = key.toLowerCase();
            const isSensitive = SENSITIVE_HEADER_SNIPPETS.some((snippet)=>lowerCasedKey.includes(snippet));
            const normalizedKey = `http.request.header.${lowerCasedKey.replace(/-/g, '_')}`;
            if (isSensitive) {
                spanAttributes[normalizedKey] = '[Filtered]';
            } else if (Array.isArray(value)) {
                spanAttributes[normalizedKey] = value.map((v)=>v != null ? String(v) : v).join(';');
            } else if (typeof value === 'string') {
                spanAttributes[normalizedKey] = value;
            }
        });
    } catch  {
    // Return empty object if there's an error
    }
    return spanAttributes;
}
/** Extract the query params from an URL. */ function extractQueryParamsFromUrl(url) {
    // url is path and query string
    if (!url) {
        return;
    }
    try {
        // The `URL` constructor can't handle internal URLs of the form `/some/path/here`, so stick a dummy protocol and
        // hostname as the base. Since the point here is just to grab the query string, it doesn't matter what we use.
        const queryParams = new URL(url, 'http://s.io').search.slice(1);
        return queryParams.length ? queryParams : undefined;
    } catch  {
        return undefined;
    }
}
;
 //# sourceMappingURL=request.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/vercelWaitUntil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "vercelWaitUntil",
    ()=>vercelWaitUntil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
/**
 * Function that delays closing of a Vercel lambda until the provided promise is resolved.
 *
 * Vendored from https://www.npmjs.com/package/@vercel/functions
 */ function vercelWaitUntil(task) {
    const vercelRequestContextGlobal = // @ts-expect-error This is not typed
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"][Symbol.for('@vercel/request-context')];
    const ctx = vercelRequestContextGlobal?.get?.();
    if (ctx?.waitUntil) {
        ctx.waitUntil(task);
    }
}
;
 //# sourceMappingURL=vercelWaitUntil.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/feedback.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureFeedback",
    ()=>captureFeedback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
;
/**
 * Send user feedback to Sentry.
 */ function captureFeedback(params, hint = {}, scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])()) {
    const { message, name, email, url, source, associatedEventId, tags } = params;
    const feedbackEvent = {
        contexts: {
            feedback: {
                contact_email: email,
                name,
                message,
                url,
                source,
                associated_event_id: associatedEventId
            }
        },
        type: 'feedback',
        level: 'info',
        tags
    };
    const client = scope?.getClient() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
    if (client) {
        client.emit('beforeSendFeedback', feedbackEvent, hint);
    }
    const eventId = scope.captureEvent(feedbackEvent, hint);
    return eventId;
}
;
 //# sourceMappingURL=feedback.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/transports/multiplexed.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MULTIPLEXED_TRANSPORT_EXTRA_KEY",
    ()=>MULTIPLEXED_TRANSPORT_EXTRA_KEY,
    "eventFromEnvelope",
    ()=>eventFromEnvelope,
    "makeMultiplexedTransport",
    ()=>makeMultiplexedTransport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/dsn.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
;
;
;
/**
 * Key used in event.extra to provide routing information for the multiplexed transport.
 * Should contain an array of `{ dsn: string, release?: string }` objects.
 */ const MULTIPLEXED_TRANSPORT_EXTRA_KEY = 'MULTIPLEXED_TRANSPORT_EXTRA_KEY';
/**
 * Gets an event from an envelope.
 *
 * This is only exported for use in the tests
 */ function eventFromEnvelope(env, types) {
    let event;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(env, (item, type)=>{
        if (types.includes(type)) {
            event = Array.isArray(item) ? item[1] : undefined;
        }
        // bail out if we found an event
        return !!event;
    });
    return event;
}
/**
 * Creates a transport that overrides the release on all events.
 */ function makeOverrideReleaseTransport(createTransport, release) {
    return (options)=>{
        const transport = createTransport(options);
        return {
            ...transport,
            send: async (envelope)=>{
                const event = eventFromEnvelope(envelope, [
                    'event',
                    'transaction',
                    'profile',
                    'replay_event'
                ]);
                if (event) {
                    event.release = release;
                }
                return transport.send(envelope);
            }
        };
    };
}
/** Overrides the DSN in the envelope header  */ function overrideDsn(envelope, dsn) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEnvelope"])(dsn ? {
        ...envelope[0],
        dsn
    } : envelope[0], envelope[1]);
}
/**
 * Creates a transport that can send events to different DSNs depending on the envelope contents.
 *
 * If no matcher is provided, the transport will look for routing information in
 * `event.extra[MULTIPLEXED_TRANSPORT_EXTRA_KEY]`, which should contain
 * an array of `{ dsn: string, release?: string }` objects.
 */ function makeMultiplexedTransport(createTransport, matcher) {
    return (options)=>{
        const fallbackTransport = createTransport(options);
        const otherTransports = new Map();
        // Use provided matcher or default to simple multiplexed transport behavior
        const actualMatcher = matcher || ((args)=>{
            const event = args.getEvent();
            if (event?.extra?.[MULTIPLEXED_TRANSPORT_EXTRA_KEY] && Array.isArray(event.extra[MULTIPLEXED_TRANSPORT_EXTRA_KEY])) {
                return event.extra[MULTIPLEXED_TRANSPORT_EXTRA_KEY];
            }
            return [];
        });
        function getTransport(dsn, release) {
            // We create a transport for every unique dsn/release combination as there may be code from multiple releases in
            // use at the same time
            const key = release ? `${dsn}:${release}` : dsn;
            let transport = otherTransports.get(key);
            if (!transport) {
                const validatedDsn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$dsn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dsnFromString"])(dsn);
                if (!validatedDsn) {
                    return undefined;
                }
                const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEnvelopeEndpointWithUrlEncodedAuth"])(validatedDsn, options.tunnel);
                transport = release ? makeOverrideReleaseTransport(createTransport, release)({
                    ...options,
                    url
                }) : createTransport({
                    ...options,
                    url
                });
                otherTransports.set(key, transport);
            }
            return [
                dsn,
                transport
            ];
        }
        async function send(envelope) {
            function getEvent(types) {
                const eventTypes = types?.length ? types : [
                    'event'
                ];
                return eventFromEnvelope(envelope, eventTypes);
            }
            const transports = actualMatcher({
                envelope,
                getEvent
            }).map((result)=>{
                if (typeof result === 'string') {
                    return getTransport(result, undefined);
                } else {
                    return getTransport(result.dsn, result.release);
                }
            }).filter((t)=>!!t);
            // If we have no transports to send to, use the fallback transport
            // Don't override the DSN in the header for the fallback transport. '' is falsy
            const transportsWithFallback = transports.length ? transports : [
                [
                    '',
                    fallbackTransport
                ]
            ];
            const results = await Promise.all(transportsWithFallback.map(([dsn, transport])=>transport.send(overrideDsn(envelope, dsn))));
            return results[0];
        }
        async function flush(timeout) {
            const allTransports = [
                ...otherTransports.values(),
                fallbackTransport
            ];
            const results = await Promise.all(allTransports.map((transport)=>transport.flush(timeout)));
            return results.every((r)=>r);
        }
        return {
            send,
            flush
        };
    };
}
;
 //# sourceMappingURL=multiplexed.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/captureconsole.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "captureConsoleIntegration",
    ()=>captureConsoleIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/instrument/console.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/severity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const INTEGRATION_NAME = 'CaptureConsole';
const _captureConsoleIntegration = (options = {})=>{
    const levels = options.levels || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONSOLE_LEVELS"];
    const handled = options.handled ?? true;
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            if (!('console' in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"])) {
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(({ args, level })=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || !levels.includes(level)) {
                    return;
                }
                consoleHandler(args, level, handled);
            });
        }
    };
};
/**
 * Send Console API calls as Sentry Events.
 */ const captureConsoleIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_captureConsoleIntegration);
function consoleHandler(args, level, handled) {
    const severityLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level);
    /*
    We create this error here already to attach a stack trace to captured messages,
    if users set `attachStackTrace` to `true` in Sentry.init.
    We do this here already because we want to minimize the number of Sentry SDK stack frames
    within the error. Technically, Client.captureMessage will also do it but this happens several
    stack frames deeper.
  */ const syntheticException = new Error();
    const captureContext = {
        level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$severity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["severityLevelFromString"])(level),
        extra: {
            arguments: args
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withScope"])((scope)=>{
        scope.addEventProcessor((event)=>{
            event.logger = 'console';
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(event, {
                handled,
                type: 'auto.core.capture_console'
            });
            return event;
        });
        if (level === 'assert') {
            if (!args[0]) {
                const message = `Assertion failed: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJoin"])(args.slice(1), ' ') || 'console.assert'}`;
                scope.setExtra('arguments', args.slice(1));
                scope.captureMessage(message, severityLevel, {
                    captureContext,
                    syntheticException
                });
            }
            return;
        }
        const error = args.find((arg)=>arg instanceof Error);
        if (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, captureContext);
            return;
        }
        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJoin"])(args, ' ');
        scope.captureMessage(message, severityLevel, {
            captureContext,
            syntheticException
        });
    });
}
;
 //# sourceMappingURL=captureconsole.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConsoleTemplateAttributes",
    ()=>createConsoleTemplateAttributes,
    "formatConsoleArgs",
    ()=>formatConsoleArgs,
    "hasConsoleSubstitutions",
    ()=>hasConsoleSubstitutions,
    "safeJoinConsoleArgs",
    ()=>safeJoinConsoleArgs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
;
;
/**
 * Formats the given values into a string.
 *
 * @param values - The values to format.
 * @param normalizeDepth - The depth to normalize the values.
 * @param normalizeMaxBreadth - The max breadth to normalize the values.
 * @returns The formatted string.
 */ function formatConsoleArgs(values, normalizeDepth, normalizeMaxBreadth) {
    return 'util' in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].util.format === 'function' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"].util.format(...values) : safeJoinConsoleArgs(values, normalizeDepth, normalizeMaxBreadth);
}
/**
 * Joins the given values into a string.
 *
 * @param values - The values to join.
 * @param normalizeDepth - The depth to normalize the values.
 * @param normalizeMaxBreadth - The max breadth to normalize the values.
 * @returns The joined string.
 */ function safeJoinConsoleArgs(values, normalizeDepth, normalizeMaxBreadth) {
    return values.map((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimitive"])(value) ? String(value) : JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(value, normalizeDepth, normalizeMaxBreadth))).join(' ');
}
/**
 * Checks if a string contains console substitution patterns like %s, %d, %i, %f, %o, %O, %c.
 *
 * @param str - The string to check
 * @returns true if the string contains console substitution patterns
 */ function hasConsoleSubstitutions(str) {
    // Match console substitution patterns: %s, %d, %i, %f, %o, %O, %c
    return /%[sdifocO]/.test(str);
}
/**
 * Creates template attributes for multiple console arguments.
 *
 * @param args - The console arguments
 * @returns An object with template and parameter attributes
 */ function createConsoleTemplateAttributes(firstArg, followingArgs) {
    const attributes = {};
    // Create template with placeholders for each argument
    const template = new Array(followingArgs.length).fill('{}').join(' ');
    attributes['sentry.message.template'] = `${firstArg} ${template}`;
    // Add each argument as a parameter
    followingArgs.forEach((arg, index)=>{
        attributes[`sentry.message.parameter.${index}`] = arg;
    });
    return attributes;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/console-integration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "consoleLoggingIntegration",
    ()=>consoleLoggingIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/instrument/console.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/internal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const INTEGRATION_NAME = 'ConsoleLogs';
const DEFAULT_ATTRIBUTES = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.log.console'
};
const _consoleLoggingIntegration = (options = {})=>{
    const levels = options.levels || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONSOLE_LEVELS"];
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            const { enableLogs, normalizeDepth = 3, normalizeMaxBreadth = 1000 } = client.getOptions();
            if (!enableLogs) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('`enableLogs` is not enabled, ConsoleLogs integration disabled');
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$instrument$2f$console$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addConsoleInstrumentationHandler"])(({ args, level })=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])() !== client || !levels.includes(level)) {
                    return;
                }
                const firstArg = args[0];
                const followingArgs = args.slice(1);
                if (level === 'assert') {
                    if (!firstArg) {
                        const assertionMessage = followingArgs.length > 0 ? `Assertion failed: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatConsoleArgs"])(followingArgs, normalizeDepth, normalizeMaxBreadth)}` : 'Assertion failed';
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_captureLog"])({
                            level: 'error',
                            message: assertionMessage,
                            attributes: DEFAULT_ATTRIBUTES
                        });
                    }
                    return;
                }
                const isLevelLog = level === 'log';
                const shouldGenerateTemplate = args.length > 1 && typeof args[0] === 'string' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasConsoleSubstitutions"])(args[0]);
                const attributes = {
                    ...DEFAULT_ATTRIBUTES,
                    ...shouldGenerateTemplate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConsoleTemplateAttributes"])(firstArg, followingArgs) : {}
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_captureLog"])({
                    level: isLevelLog ? 'info' : level,
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatConsoleArgs"])(args, normalizeDepth, normalizeMaxBreadth),
                    severityNumber: isLevelLog ? 10 : undefined,
                    attributes
                });
            });
        }
    };
};
/**
 * Captures calls to the `console` API as logs in Sentry. Requires the `enableLogs` option to be enabled.
 *
 * @experimental This feature is experimental and may be changed or removed in future versions.
 *
 * By default the integration instruments `console.debug`, `console.info`, `console.warn`, `console.error`,
 * `console.log`, `console.trace`, and `console.assert`. You can use the `levels` option to customize which
 * levels are captured.
 *
 * @example
 *
 * ```ts
 * import * as Sentry from '@sentry/browser';
 *
 * Sentry.init({
 *   enableLogs: true,
 *   integrations: [Sentry.consoleLoggingIntegration({ levels: ['error', 'warn'] })],
 * });
 * ```
 */ const consoleLoggingIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_consoleLoggingIntegration);
;
 //# sourceMappingURL=console-integration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/consola.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConsolaReporter",
    ()=>createConsolaReporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/internal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/utils.js [app-client] (ecmascript)");
;
;
;
/**
 * Options for the Sentry Consola reporter.
 */ const DEFAULT_CAPTURED_LEVELS = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal'
];
/**
 * Creates a new Sentry reporter for Consola that forwards logs to Sentry. Requires the `enableLogs` option to be enabled.
 *
 * **Note: This integration supports Consola v3.x only.** The reporter interface and log object structure
 * may differ in other versions of Consola.
 *
 * @param options - Configuration options for the reporter.
 * @returns A Consola reporter that can be added to consola instances.
 *
 * @example
 * ```ts
 * import * as Sentry from '@sentry/node';
 * import { consola } from 'consola';
 *
 * Sentry.init({
 *   enableLogs: true,
 * });
 *
 * const sentryReporter = Sentry.createConsolaReporter({
 *   // Optional: filter levels to capture
 *   levels: ['error', 'warn', 'info'],
 * });
 *
 * consola.addReporter(sentryReporter);
 *
 * // Now consola logs will be captured by Sentry
 * consola.info('This will be sent to Sentry');
 * consola.error('This error will also be sent to Sentry');
 * ```
 */ function createConsolaReporter(options = {}) {
    const levels = new Set(options.levels ?? DEFAULT_CAPTURED_LEVELS);
    const providedClient = options.client;
    return {
        log (logObj) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { type, level, message: consolaMessage, args, tag, date: _date, ...attributes } = logObj;
            // Get client - use provided client or current client
            const client = providedClient || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
            if (!client) {
                return;
            }
            // Determine the log severity level
            const logSeverityLevel = getLogSeverityLevel(type, level);
            // Early exit if this level should not be captured
            if (!levels.has(logSeverityLevel)) {
                return;
            }
            const { normalizeDepth = 3, normalizeMaxBreadth = 1000 } = client.getOptions();
            // Format the log message using the same approach as consola's basic reporter
            const messageParts = [];
            if (consolaMessage) {
                messageParts.push(consolaMessage);
            }
            if (args && args.length > 0) {
                messageParts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatConsoleArgs"])(args, normalizeDepth, normalizeMaxBreadth));
            }
            const message = messageParts.join(' ');
            // Build attributes
            attributes['sentry.origin'] = 'auto.log.consola';
            if (tag) {
                attributes['consola.tag'] = tag;
            }
            if (type) {
                attributes['consola.type'] = type;
            }
            // Only add level if it's a valid number (not null/undefined)
            if (level != null && typeof level === 'number') {
                attributes['consola.level'] = level;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_captureLog"])({
                level: logSeverityLevel,
                message,
                attributes
            });
        }
    };
}
// Mapping from consola log types to Sentry log severity levels
const CONSOLA_TYPE_TO_LOG_SEVERITY_LEVEL_MAP = {
    // Consola built-in types
    silent: 'trace',
    fatal: 'fatal',
    error: 'error',
    warn: 'warn',
    log: 'info',
    info: 'info',
    success: 'info',
    fail: 'error',
    ready: 'info',
    start: 'info',
    box: 'info',
    debug: 'debug',
    trace: 'trace',
    verbose: 'debug',
    // Custom types that might exist
    critical: 'fatal',
    notice: 'info'
};
// Mapping from consola log levels (numbers) to Sentry log severity levels
const CONSOLA_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP = {
    0: 'fatal',
    1: 'warn',
    2: 'info',
    3: 'info',
    4: 'debug',
    5: 'trace'
};
/**
 * Determines the log severity level from Consola type and level.
 *
 * @param type - The Consola log type (e.g., 'error', 'warn', 'info')
 * @param level - The Consola numeric log level (0-5) or null for some types like 'verbose'
 * @returns The corresponding Sentry log severity level
 */ function getLogSeverityLevel(type, level) {
    // Handle special case for verbose logs (level can be null with infinite level in Consola)
    if (type === 'verbose') {
        return 'debug';
    }
    // Handle silent logs - these should be at trace level
    if (type === 'silent') {
        return 'trace';
    }
    // First try to map by type (more specific)
    if (type) {
        const mappedLevel = CONSOLA_TYPE_TO_LOG_SEVERITY_LEVEL_MAP[type];
        if (mappedLevel) {
            return mappedLevel;
        }
    }
    // Fallback to level mapping (handle null level)
    if (typeof level === 'number') {
        const mappedLevel = CONSOLA_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP[level];
        if (mappedLevel) {
            return mappedLevel;
        }
    }
    // Default fallback
    return 'info';
}
;
 //# sourceMappingURL=consola.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * OpenAI Integration Telemetry Attributes
 * Based on OpenTelemetry Semantic Conventions for Generative AI
 * @see https://opentelemetry.io/docs/specs/semconv/gen-ai/
 */ // =============================================================================
// OPENTELEMETRY SEMANTIC CONVENTIONS FOR GENAI
// =============================================================================
/**
 * The input messages sent to the model
 */ __turbopack_context__.s([
    "ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE",
    ()=>ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE,
    "GEN_AI_AGENT_NAME_ATTRIBUTE",
    ()=>GEN_AI_AGENT_NAME_ATTRIBUTE,
    "GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE",
    ()=>GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE,
    "GEN_AI_OPERATION_NAME_ATTRIBUTE",
    ()=>GEN_AI_OPERATION_NAME_ATTRIBUTE,
    "GEN_AI_PIPELINE_NAME_ATTRIBUTE",
    ()=>GEN_AI_PIPELINE_NAME_ATTRIBUTE,
    "GEN_AI_PROMPT_ATTRIBUTE",
    ()=>GEN_AI_PROMPT_ATTRIBUTE,
    "GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE,
    "GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE,
    "GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE,
    "GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE,
    "GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE,
    "GEN_AI_REQUEST_MESSAGES_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_MESSAGES_ATTRIBUTE,
    "GEN_AI_REQUEST_MODEL_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_MODEL_ATTRIBUTE,
    "GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE,
    "GEN_AI_REQUEST_STREAM_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_STREAM_ATTRIBUTE,
    "GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE,
    "GEN_AI_REQUEST_TOP_K_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_TOP_K_ATTRIBUTE,
    "GEN_AI_REQUEST_TOP_P_ATTRIBUTE",
    ()=>GEN_AI_REQUEST_TOP_P_ATTRIBUTE,
    "GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE,
    "GEN_AI_RESPONSE_ID_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_ID_ATTRIBUTE,
    "GEN_AI_RESPONSE_MODEL_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_MODEL_ATTRIBUTE,
    "GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE,
    "GEN_AI_RESPONSE_STREAMING_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_STREAMING_ATTRIBUTE,
    "GEN_AI_RESPONSE_TEXT_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_TEXT_ATTRIBUTE,
    "GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE",
    ()=>GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE,
    "GEN_AI_SYSTEM_ATTRIBUTE",
    ()=>GEN_AI_SYSTEM_ATTRIBUTE,
    "GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE",
    ()=>GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE,
    "GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE",
    ()=>GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE,
    "GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE,
    "GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE",
    ()=>GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE,
    "OPENAI_OPERATIONS",
    ()=>OPENAI_OPERATIONS,
    "OPENAI_RESPONSE_ID_ATTRIBUTE",
    ()=>OPENAI_RESPONSE_ID_ATTRIBUTE,
    "OPENAI_RESPONSE_MODEL_ATTRIBUTE",
    ()=>OPENAI_RESPONSE_MODEL_ATTRIBUTE,
    "OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE",
    ()=>OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE,
    "OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE",
    ()=>OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE,
    "OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE",
    ()=>OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE
]);
const GEN_AI_PROMPT_ATTRIBUTE = 'gen_ai.prompt';
/**
 * The Generative AI system being used
 * For OpenAI, this should always be "openai"
 */ const GEN_AI_SYSTEM_ATTRIBUTE = 'gen_ai.system';
/**
 * The name of the model as requested
 * Examples: "gpt-4", "gpt-3.5-turbo"
 */ const GEN_AI_REQUEST_MODEL_ATTRIBUTE = 'gen_ai.request.model';
/**
 * Whether streaming was enabled for the request
 */ const GEN_AI_REQUEST_STREAM_ATTRIBUTE = 'gen_ai.request.stream';
/**
 * The temperature setting for the model request
 */ const GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE = 'gen_ai.request.temperature';
/**
 * The maximum number of tokens requested
 */ const GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE = 'gen_ai.request.max_tokens';
/**
 * The frequency penalty setting for the model request
 */ const GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE = 'gen_ai.request.frequency_penalty';
/**
 * The presence penalty setting for the model request
 */ const GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE = 'gen_ai.request.presence_penalty';
/**
 * The top_p (nucleus sampling) setting for the model request
 */ const GEN_AI_REQUEST_TOP_P_ATTRIBUTE = 'gen_ai.request.top_p';
/**
 * The top_k setting for the model request
 */ const GEN_AI_REQUEST_TOP_K_ATTRIBUTE = 'gen_ai.request.top_k';
/**
 * The encoding format for the model request
 */ const GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE = 'gen_ai.request.encoding_format';
/**
 * The dimensions for the model request
 */ const GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE = 'gen_ai.request.dimensions';
/**
 * Array of reasons why the model stopped generating tokens
 */ const GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE = 'gen_ai.response.finish_reasons';
/**
 * The name of the model that generated the response
 */ const GEN_AI_RESPONSE_MODEL_ATTRIBUTE = 'gen_ai.response.model';
/**
 * The unique identifier for the response
 */ const GEN_AI_RESPONSE_ID_ATTRIBUTE = 'gen_ai.response.id';
/**
 * The reason why the model stopped generating tokens
 */ const GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE = 'gen_ai.response.stop_reason';
/**
 * The number of tokens used in the prompt
 */ const GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.input_tokens';
/**
 * The number of tokens used in the response
 */ const GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.output_tokens';
/**
 * The total number of tokens used (input + output)
 */ const GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE = 'gen_ai.usage.total_tokens';
/**
 * The operation name
 */ const GEN_AI_OPERATION_NAME_ATTRIBUTE = 'gen_ai.operation.name';
/**
 * The prompt messages
 * Only recorded when recordInputs is enabled
 */ const GEN_AI_REQUEST_MESSAGES_ATTRIBUTE = 'gen_ai.request.messages';
/**
 * The response text
 * Only recorded when recordOutputs is enabled
 */ const GEN_AI_RESPONSE_TEXT_ATTRIBUTE = 'gen_ai.response.text';
/**
 * The available tools from incoming request
 * Only recorded when recordInputs is enabled
 */ const GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE = 'gen_ai.request.available_tools';
/**
 * Whether the response is a streaming response
 */ const GEN_AI_RESPONSE_STREAMING_ATTRIBUTE = 'gen_ai.response.streaming';
/**
 * The tool calls from the response
 * Only recorded when recordOutputs is enabled
 */ const GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE = 'gen_ai.response.tool_calls';
/**
 * The agent name
 */ const GEN_AI_AGENT_NAME_ATTRIBUTE = 'gen_ai.agent.name';
/**
 * The pipeline name
 */ const GEN_AI_PIPELINE_NAME_ATTRIBUTE = 'gen_ai.pipeline.name';
/**
 * The number of cache creation input tokens used
 */ const GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.cache_creation_input_tokens';
/**
 * The number of cache read input tokens used
 */ const GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE = 'gen_ai.usage.cache_read_input_tokens';
/**
 * The number of cache write input tokens used
 */ const GEN_AI_USAGE_INPUT_TOKENS_CACHE_WRITE_ATTRIBUTE = 'gen_ai.usage.input_tokens.cache_write';
/**
 * The number of cached input tokens that were used
 */ const GEN_AI_USAGE_INPUT_TOKENS_CACHED_ATTRIBUTE = 'gen_ai.usage.input_tokens.cached';
/**
 * The span operation name for invoking an agent
 */ const GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE = 'gen_ai.invoke_agent';
// =============================================================================
// OPENAI-SPECIFIC ATTRIBUTES
// =============================================================================
/**
 * The response ID from OpenAI
 */ const OPENAI_RESPONSE_ID_ATTRIBUTE = 'openai.response.id';
/**
 * The response model from OpenAI
 */ const OPENAI_RESPONSE_MODEL_ATTRIBUTE = 'openai.response.model';
/**
 * The response timestamp from OpenAI (ISO string)
 */ const OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE = 'openai.response.timestamp';
/**
 * The number of completion tokens used
 */ const OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE = 'openai.usage.completion_tokens';
/**
 * The number of prompt tokens used
 */ const OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE = 'openai.usage.prompt_tokens';
// =============================================================================
// OPENAI OPERATIONS
// =============================================================================
/**
 * OpenAI API operations
 */ const OPENAI_OPERATIONS = {
    CHAT: 'chat',
    RESPONSES: 'responses',
    EMBEDDINGS: 'embeddings'
};
// =============================================================================
// ANTHROPIC AI OPERATIONS
// =============================================================================
/**
 * The response timestamp from Anthropic AI (ISO string)
 */ const ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE = 'anthropic.response.timestamp';
;
 //# sourceMappingURL=gen-ai-attributes.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LANGCHAIN_INTEGRATION_NAME",
    ()=>LANGCHAIN_INTEGRATION_NAME,
    "LANGCHAIN_ORIGIN",
    ()=>LANGCHAIN_ORIGIN,
    "ROLE_MAP",
    ()=>ROLE_MAP
]);
const LANGCHAIN_INTEGRATION_NAME = 'LangChain';
const LANGCHAIN_ORIGIN = 'auto.ai.langchain';
const ROLE_MAP = {
    human: 'user',
    ai: 'assistant',
    assistant: 'assistant',
    system: 'system',
    function: 'function',
    tool: 'tool'
};
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Default maximum size in bytes for GenAI messages.
 * Messages exceeding this limit will be truncated.
 */ __turbopack_context__.s([
    "DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT",
    ()=>DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT,
    "truncateGenAiMessages",
    ()=>truncateGenAiMessages,
    "truncateGenAiStringInput",
    ()=>truncateGenAiStringInput,
    "truncateMessagesByBytes",
    ()=>truncateMessagesByBytes
]);
const DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT = 20000;
/**
 * Message format used by OpenAI and Anthropic APIs.
 */ /**
 * Calculate the UTF-8 byte length of a string.
 */ const utf8Bytes = (text)=>{
    return new TextEncoder().encode(text).length;
};
/**
 * Calculate the UTF-8 byte length of a value's JSON representation.
 */ const jsonBytes = (value)=>{
    return utf8Bytes(JSON.stringify(value));
};
/**
 * Truncate a string to fit within maxBytes when encoded as UTF-8.
 * Uses binary search for efficiency with multi-byte characters.
 *
 * @param text - The string to truncate
 * @param maxBytes - Maximum byte length (UTF-8 encoded)
 * @returns Truncated string that fits within maxBytes
 */ function truncateTextByBytes(text, maxBytes) {
    if (utf8Bytes(text) <= maxBytes) {
        return text;
    }
    let low = 0;
    let high = text.length;
    let bestFit = '';
    while(low <= high){
        const mid = Math.floor((low + high) / 2);
        const candidate = text.slice(0, mid);
        const byteSize = utf8Bytes(candidate);
        if (byteSize <= maxBytes) {
            bestFit = candidate;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return bestFit;
}
/**
 * Extract text content from a Google GenAI message part.
 * Parts are either plain strings or objects with a text property.
 *
 * @returns The text content
 */ function getPartText(part) {
    if (typeof part === 'string') {
        return part;
    }
    return part.text;
}
/**
 * Create a new part with updated text content while preserving the original structure.
 *
 * @param part - Original part (string or object)
 * @param text - New text content
 * @returns New part with updated text
 */ function withPartText(part, text) {
    if (typeof part === 'string') {
        return text;
    }
    return {
        ...part,
        text
    };
}
/**
 * Check if a message has the OpenAI/Anthropic content format.
 */ function isContentMessage(message) {
    return message !== null && typeof message === 'object' && 'content' in message && typeof message.content === 'string';
}
/**
 * Check if a message has the Google GenAI parts format.
 */ function isPartsMessage(message) {
    return message !== null && typeof message === 'object' && 'parts' in message && Array.isArray(message.parts) && message.parts.length > 0;
}
/**
 * Truncate a message with `content: string` format (OpenAI/Anthropic).
 *
 * @param message - Message with content property
 * @param maxBytes - Maximum byte limit
 * @returns Array with truncated message, or empty array if it doesn't fit
 */ function truncateContentMessage(message, maxBytes) {
    // Calculate overhead (message structure without content)
    const emptyMessage = {
        ...message,
        content: ''
    };
    const overhead = jsonBytes(emptyMessage);
    const availableForContent = maxBytes - overhead;
    if (availableForContent <= 0) {
        return [];
    }
    const truncatedContent = truncateTextByBytes(message.content, availableForContent);
    return [
        {
            ...message,
            content: truncatedContent
        }
    ];
}
/**
 * Truncate a message with `parts: [...]` format (Google GenAI).
 * Keeps as many complete parts as possible, only truncating the first part if needed.
 *
 * @param message - Message with parts array
 * @param maxBytes - Maximum byte limit
 * @returns Array with truncated message, or empty array if it doesn't fit
 */ function truncatePartsMessage(message, maxBytes) {
    const { parts } = message;
    // Calculate overhead by creating empty text parts
    const emptyParts = parts.map((part)=>withPartText(part, ''));
    const overhead = jsonBytes({
        ...message,
        parts: emptyParts
    });
    let remainingBytes = maxBytes - overhead;
    if (remainingBytes <= 0) {
        return [];
    }
    // Include parts until we run out of space
    const includedParts = [];
    for (const part of parts){
        const text = getPartText(part);
        const textSize = utf8Bytes(text);
        if (textSize <= remainingBytes) {
            // Part fits: include it as-is
            includedParts.push(part);
            remainingBytes -= textSize;
        } else if (includedParts.length === 0) {
            // First part doesn't fit: truncate it
            const truncated = truncateTextByBytes(text, remainingBytes);
            if (truncated) {
                includedParts.push(withPartText(part, truncated));
            }
            break;
        } else {
            break;
        }
    }
    return includedParts.length > 0 ? [
        {
            ...message,
            parts: includedParts
        }
    ] : [];
}
/**
 * Truncate a single message to fit within maxBytes.
 *
 * Supports two message formats:
 * - OpenAI/Anthropic: `{ ..., content: string }`
 * - Google GenAI: `{ ..., parts: Array<string | {text: string} | non-text> }`
 *
 * @param message - The message to truncate
 * @param maxBytes - Maximum byte limit for the message
 * @returns Array containing the truncated message, or empty array if truncation fails
 */ function truncateSingleMessage(message, maxBytes) {
    if (!message || typeof message !== 'object') {
        return [];
    }
    if (isContentMessage(message)) {
        return truncateContentMessage(message, maxBytes);
    }
    if (isPartsMessage(message)) {
        return truncatePartsMessage(message, maxBytes);
    }
    // Unknown message format: cannot truncate safely
    return [];
}
/**
 * Truncate an array of messages to fit within a byte limit.
 *
 * Strategy:
 * - Keeps the newest messages (from the end of the array)
 * - Uses O(n) algorithm: precompute sizes once, then find largest suffix under budget
 * - If no complete messages fit, attempts to truncate the newest single message
 *
 * @param messages - Array of messages to truncate
 * @param maxBytes - Maximum total byte limit for all messages
 * @returns Truncated array of messages
 *
 * @example
 * ```ts
 * const messages = [msg1, msg2, msg3, msg4]; // newest is msg4
 * const truncated = truncateMessagesByBytes(messages, 10000);
 * // Returns [msg3, msg4] if they fit, or [msg4] if only it fits, etc.
 * ```
 */ function truncateMessagesByBytes(messages, maxBytes) {
    // Early return for empty or invalid input
    if (!Array.isArray(messages) || messages.length === 0) {
        return messages;
    }
    // Fast path: if all messages fit, return as-is
    const totalBytes = jsonBytes(messages);
    if (totalBytes <= maxBytes) {
        return messages;
    }
    // Precompute each message's JSON size once for efficiency
    const messageSizes = messages.map(jsonBytes);
    // Find the largest suffix (newest messages) that fits within the budget
    let bytesUsed = 0;
    let startIndex = messages.length; // Index where the kept suffix starts
    for(let i = messages.length - 1; i >= 0; i--){
        const messageSize = messageSizes[i];
        if (messageSize && bytesUsed + messageSize > maxBytes) {
            break;
        }
        if (messageSize) {
            bytesUsed += messageSize;
        }
        startIndex = i;
    }
    // If no complete messages fit, try truncating just the newest message
    if (startIndex === messages.length) {
        const newestMessage = messages[messages.length - 1];
        return truncateSingleMessage(newestMessage, maxBytes);
    }
    // Return the suffix that fits
    return messages.slice(startIndex);
}
/**
 * Truncate GenAI messages using the default byte limit.
 *
 * Convenience wrapper around `truncateMessagesByBytes` with the default limit.
 *
 * @param messages - Array of messages to truncate
 * @returns Truncated array of messages
 */ function truncateGenAiMessages(messages) {
    return truncateMessagesByBytes(messages, DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT);
}
/**
 * Truncate GenAI string input using the default byte limit.
 *
 * @param input - The string to truncate
 * @returns Truncated string
 */ function truncateGenAiStringInput(input) {
    return truncateTextByBytes(input, DEFAULT_GEN_AI_MESSAGES_BYTE_LIMIT);
}
;
 //# sourceMappingURL=messageTruncation.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractChatModelRequestAttributes",
    ()=>extractChatModelRequestAttributes,
    "extractLLMRequestAttributes",
    ()=>extractLLMRequestAttributes,
    "extractLlmResponseAttributes",
    ()=>extractLlmResponseAttributes,
    "getInvocationParams",
    ()=>getInvocationParams,
    "normalizeLangChainMessages",
    ()=>normalizeLangChainMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/constants.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Assigns an attribute only when the value is neither `undefined` nor `null`.
 *
 * We keep this tiny helper because call sites are repetitive and easy to miswrite.
 * It also preserves falsy-but-valid values like `0` and `""`.
 */ const setIfDefined = (target, key, value)=>{
    if (value != null) target[key] = value;
};
/**
 * Like `setIfDefined`, but converts the value with `Number()` and skips only when the
 * result is `NaN`. This ensures numeric 0 makes it through (unlike truthy checks).
 */ const setNumberIfDefined = (target, key, value)=>{
    const n = Number(value);
    if (!Number.isNaN(n)) target[key] = n;
};
/**
 * Converts a value to a string. Avoids double-quoted JSON strings where a plain
 * string is desired, but still handles objects/arrays safely.
 */ function asString(v) {
    if (typeof v === 'string') return v;
    try {
        return JSON.stringify(v);
    } catch  {
        return String(v);
    }
}
/**
 * Normalizes a single role token to our canonical set.
 *
 * @param role Incoming role value (free-form, any casing)
 * @returns Canonical role: 'user' | 'assistant' | 'system' | 'function' | 'tool' | <passthrough>
 */ function normalizeMessageRole(role) {
    const normalized = role.toLowerCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_MAP"][normalized] ?? normalized;
}
/**
 * Infers a role from a LangChain message constructor name.
 *
 * Checks for substrings like "System", "Human", "AI", etc.
 */ function normalizeRoleNameFromCtor(name) {
    if (name.includes('System')) return 'system';
    if (name.includes('Human')) return 'user';
    if (name.includes('AI') || name.includes('Assistant')) return 'assistant';
    if (name.includes('Function')) return 'function';
    if (name.includes('Tool')) return 'tool';
    return 'user';
}
/**
 * Returns invocation params from a LangChain `tags` object.
 *
 * LangChain often passes runtime parameters (model, temperature, etc.) via the
 * `tags.invocation_params` bag. If `tags` is an array (LangChain sometimes uses
 * string tags), we return `undefined`.
 *
 * @param tags LangChain tags (string[] or record)
 * @returns The `invocation_params` object, if present
 */ function getInvocationParams(tags) {
    if (!tags || Array.isArray(tags)) return undefined;
    return tags.invocation_params;
}
/**
 * Normalizes a heterogeneous set of LangChain messages to `{ role, content }`.
 *
 * Why so many branches? LangChain messages can arrive in several shapes:
 *  - Message classes with `_getType()` (most reliable)
 *  - Classes with meaningful constructor names (e.g. `SystemMessage`)
 *  - Plain objects with `type`, or `{ role, content }`
 *  - Serialized format with `{ lc: 1, id: [...], kwargs: { content } }`
 * We preserve the prioritization to minimize behavioral drift.
 *
 * @param messages Mixed LangChain messages
 * @returns Array of normalized `{ role, content }`
 */ function normalizeLangChainMessages(messages) {
    return messages.map((message)=>{
        // 1) Prefer _getType() when present
        const maybeGetType = message._getType;
        if (typeof maybeGetType === 'function') {
            const messageType = maybeGetType.call(message);
            return {
                role: normalizeMessageRole(messageType),
                content: asString(message.content)
            };
        }
        // 2) Then try constructor name (SystemMessage / HumanMessage / ...)
        const ctor = message.constructor?.name;
        if (ctor) {
            return {
                role: normalizeMessageRole(normalizeRoleNameFromCtor(ctor)),
                content: asString(message.content)
            };
        }
        // 3) Then objects with `type`
        if (message.type) {
            const role = String(message.type).toLowerCase();
            return {
                role: normalizeMessageRole(role),
                content: asString(message.content)
            };
        }
        // 4) Then objects with `{ role, content }`
        if (message.role) {
            return {
                role: normalizeMessageRole(String(message.role)),
                content: asString(message.content)
            };
        }
        // 5) Serialized LangChain format (lc: 1)
        if (message.lc === 1 && message.kwargs) {
            const id = message.id;
            const messageType = Array.isArray(id) && id.length > 0 ? id[id.length - 1] : '';
            const role = typeof messageType === 'string' ? normalizeRoleNameFromCtor(messageType) : 'user';
            return {
                role: normalizeMessageRole(role),
                content: asString(message.kwargs?.content)
            };
        }
        // 6) Fallback: treat as user text
        return {
            role: 'user',
            content: asString(message.content)
        };
    });
}
/**
 * Extracts request attributes common to both LLM and ChatModel invocations.
 *
 * Source precedence:
 * 1) `invocationParams` (highest)
 * 2) `langSmithMetadata`
 *
 * Numeric values are set even when 0 (e.g. `temperature: 0`), but skipped if `NaN`.
 */ function extractCommonRequestAttributes(serialized, invocationParams, langSmithMetadata) {
    const attrs = {};
    // Get kwargs if available (from constructor type)
    const kwargs = 'kwargs' in serialized ? serialized.kwargs : undefined;
    const temperature = invocationParams?.temperature ?? langSmithMetadata?.ls_temperature ?? kwargs?.temperature;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"], temperature);
    const maxTokens = invocationParams?.max_tokens ?? langSmithMetadata?.ls_max_tokens ?? kwargs?.max_tokens;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE"], maxTokens);
    const topP = invocationParams?.top_p ?? kwargs?.top_p;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"], topP);
    const frequencyPenalty = invocationParams?.frequency_penalty;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"], frequencyPenalty);
    const presencePenalty = invocationParams?.presence_penalty;
    setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE"], presencePenalty);
    // LangChain uses `stream`. We only set the attribute if the key actually exists
    // (some callbacks report `false` even on streamed requests, this stems from LangChain's callback handler).
    if (invocationParams && 'stream' in invocationParams) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_STREAM_ATTRIBUTE"], Boolean(invocationParams.stream));
    }
    return attrs;
}
/**
 * Small helper to assemble boilerplate attributes shared by both request extractors.
 */ function baseRequestAttributes(system, modelName, operation, serialized, invocationParams, langSmithMetadata) {
    return {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: asString(system ?? 'langchain'),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: operation,
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]]: asString(modelName),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"],
        ...extractCommonRequestAttributes(serialized, invocationParams, langSmithMetadata)
    };
}
/**
 * Extracts attributes for plain LLM invocations (string prompts).
 *
 * - Operation is tagged as `pipeline` to distinguish from chat-style invocations.
 * - When `recordInputs` is true, string prompts are wrapped into `{role:"user"}`
 *   messages to align with the chat schema used elsewhere.
 */ function extractLLMRequestAttributes(llm, prompts, recordInputs, invocationParams, langSmithMetadata) {
    const system = langSmithMetadata?.ls_provider;
    const modelName = invocationParams?.model ?? langSmithMetadata?.ls_model_name ?? 'unknown';
    const attrs = baseRequestAttributes(system, modelName, 'pipeline', llm, invocationParams, langSmithMetadata);
    if (recordInputs && Array.isArray(prompts) && prompts.length > 0) {
        const messages = prompts.map((p)=>({
                role: 'user',
                content: p
            }));
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"], asString(messages));
    }
    return attrs;
}
/**
 * Extracts attributes for ChatModel invocations (array-of-arrays of messages).
 *
 * - Operation is tagged as `chat`.
 * - We flatten LangChain's `LangChainMessage[][]` and normalize shapes into a
 *   consistent `{ role, content }` array when `recordInputs` is true.
 * - Provider system value falls back to `serialized.id?.[2]`.
 */ function extractChatModelRequestAttributes(llm, langChainMessages, recordInputs, invocationParams, langSmithMetadata) {
    const system = langSmithMetadata?.ls_provider ?? llm.id?.[2];
    const modelName = invocationParams?.model ?? langSmithMetadata?.ls_model_name ?? 'unknown';
    const attrs = baseRequestAttributes(system, modelName, 'chat', llm, invocationParams, langSmithMetadata);
    if (recordInputs && Array.isArray(langChainMessages) && langChainMessages.length > 0) {
        const normalized = normalizeLangChainMessages(langChainMessages.flat());
        const truncated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(normalized);
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"], asString(truncated));
    }
    return attrs;
}
/**
 * Scans generations for Anthropic-style `tool_use` items and records them.
 *
 * LangChain represents some provider messages (e.g., Anthropic) with a `message.content`
 * array that may include objects `{ type: 'tool_use', ... }`. We collect and attach
 * them as a JSON array on `gen_ai.response.tool_calls` for downstream consumers.
 */ function addToolCallsAttributes(generations, attrs) {
    const toolCalls = [];
    const flatGenerations = generations.flat();
    for (const gen of flatGenerations){
        const content = gen.message?.content;
        if (Array.isArray(content)) {
            for (const item of content){
                const t = item;
                if (t.type === 'tool_use') toolCalls.push(t);
            }
        }
    }
    if (toolCalls.length > 0) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"], asString(toolCalls));
    }
}
/**
 * Adds token usage attributes, supporting both OpenAI (`tokenUsage`) and Anthropic (`usage`) formats.
 * - Preserve zero values (0 tokens) by avoiding truthy checks.
 * - Compute a total for Anthropic when not explicitly provided.
 * - Include cache token metrics when present.
 */ function addTokenUsageAttributes(llmOutput, attrs) {
    if (!llmOutput) return;
    const tokenUsage = llmOutput.tokenUsage;
    const anthropicUsage = llmOutput.usage;
    if (tokenUsage) {
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"], tokenUsage.promptTokens);
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"], tokenUsage.completionTokens);
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"], tokenUsage.totalTokens);
    } else if (anthropicUsage) {
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"], anthropicUsage.input_tokens);
        setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"], anthropicUsage.output_tokens);
        // Compute total when not provided by the provider.
        const input = Number(anthropicUsage.input_tokens);
        const output = Number(anthropicUsage.output_tokens);
        const total = (Number.isNaN(input) ? 0 : input) + (Number.isNaN(output) ? 0 : output);
        if (total > 0) setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"], total);
        // Extra Anthropic cache metrics (present only when caching is enabled)
        if (anthropicUsage.cache_creation_input_tokens !== undefined) setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS_ATTRIBUTE"], anthropicUsage.cache_creation_input_tokens);
        if (anthropicUsage.cache_read_input_tokens !== undefined) setNumberIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS_ATTRIBUTE"], anthropicUsage.cache_read_input_tokens);
    }
}
/**
 * Extracts response-related attributes based on a `LangChainLLMResult`.
 *
 * - Records finish reasons when present on generations (e.g., OpenAI)
 * - When `recordOutputs` is true, captures textual response content and any
 *   tool calls.
 * - Also propagates model name (`model_name` or `model`), response `id`, and
 *   `stop_reason` (for providers that use it).
 */ function extractLlmResponseAttributes(llmResult, recordOutputs) {
    if (!llmResult) return;
    const attrs = {};
    if (Array.isArray(llmResult.generations)) {
        const finishReasons = llmResult.generations.flat().map((g)=>{
            // v1 uses generationInfo.finish_reason
            if (g.generationInfo?.finish_reason) {
                return g.generationInfo.finish_reason;
            }
            // v0.3+ uses generation_info.finish_reason
            if (g.generation_info?.finish_reason) {
                return g.generation_info.finish_reason;
            }
            return null;
        }).filter((r)=>typeof r === 'string');
        if (finishReasons.length > 0) {
            setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"], asString(finishReasons));
        }
        // Tool calls metadata (names, IDs) are not PII, so capture them regardless of recordOutputs
        addToolCallsAttributes(llmResult.generations, attrs);
        if (recordOutputs) {
            const texts = llmResult.generations.flat().map((gen)=>gen.text ?? gen.message?.content).filter((t)=>typeof t === 'string');
            if (texts.length > 0) {
                setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"], asString(texts));
            }
        }
    }
    addTokenUsageAttributes(llmResult.llmOutput, attrs);
    const llmOutput = llmResult.llmOutput;
    // Extract from v1 generations structure if available
    const firstGeneration = llmResult.generations?.[0]?.[0];
    const v1Message = firstGeneration?.message;
    // Provider model identifier: `model_name` (OpenAI-style) or `model` (others)
    // v1 stores this in message.response_metadata.model_name
    const modelName = llmOutput?.model_name ?? llmOutput?.model ?? v1Message?.response_metadata?.model_name;
    if (modelName) setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"], modelName);
    // Response ID: v1 stores this in message.id
    const responseId = llmOutput?.id ?? v1Message?.id;
    if (responseId) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"], responseId);
    }
    // Stop reason: v1 stores this in message.response_metadata.finish_reason
    const stopReason = llmOutput?.stop_reason ?? v1Message?.response_metadata?.finish_reason;
    if (stopReason) {
        setIfDefined(attrs, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STOP_REASON_ATTRIBUTE"], asString(stopReason));
    }
    return attrs;
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLangChainCallbackHandler",
    ()=>createLangChainCallbackHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Creates a Sentry callback handler for LangChain
 * Returns a plain object that LangChain will call via duck-typing
 *
 * This is a stateful handler that tracks spans across multiple LangChain executions.
 */ function createLangChainCallbackHandler(options = {}) {
    const recordInputs = options.recordInputs ?? false;
    const recordOutputs = options.recordOutputs ?? false;
    // Internal state - single instance tracks all spans
    const spanMap = new Map();
    /**
   * Exit a span and clean up
   */ const exitSpan = (runId)=>{
        const span = spanMap.get(runId);
        if (span?.isRecording()) {
            span.end();
            spanMap.delete(runId);
        }
    };
    /**
   * Handler for LLM Start
   * This handler will be called by LangChain's callback handler when an LLM event is detected.
   */ const handler = {
        // Required LangChain BaseCallbackHandler properties
        lc_serializable: false,
        lc_namespace: [
            'langchain_core',
            'callbacks',
            'sentry'
        ],
        lc_secrets: undefined,
        lc_attributes: undefined,
        lc_aliases: undefined,
        lc_serializable_keys: undefined,
        lc_id: [
            'langchain_core',
            'callbacks',
            'sentry'
        ],
        lc_kwargs: {},
        name: 'SentryCallbackHandler',
        // BaseCallbackHandlerInput boolean flags
        ignoreLLM: false,
        ignoreChain: false,
        ignoreAgent: false,
        ignoreRetriever: false,
        ignoreCustomEvent: false,
        raiseError: false,
        awaitHandlers: true,
        handleLLMStart (llm, prompts, runId, _parentRunId, _extraParams, tags, metadata, _runName) {
            const invocationParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInvocationParams"])(tags);
            const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractLLMRequestAttributes"])(llm, prompts, recordInputs, invocationParams, metadata);
            const modelName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]];
            const operationName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `${operationName} ${modelName}`,
                op: 'gen_ai.pipeline',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.pipeline'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // Chat Model Start Handler
        handleChatModelStart (llm, messages, runId, _parentRunId, _extraParams, tags, metadata, _runName) {
            const invocationParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInvocationParams"])(tags);
            const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractChatModelRequestAttributes"])(llm, messages, recordInputs, invocationParams, metadata);
            const modelName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]];
            const operationName = attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `${operationName} ${modelName}`,
                op: 'gen_ai.chat',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.chat'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // LLM End Handler - note: handleLLMEnd with capital LLM (used by both LLMs and chat models!)
        handleLLMEnd (output, runId, _parentRunId, _tags, _extraParams) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractLlmResponseAttributes"])(output, recordOutputs);
                if (attributes) {
                    span.setAttributes(attributes);
                }
                exitSpan(runId);
            }
        },
        // LLM Error Handler - note: handleLLMError with capital LLM
        handleLLMError (error, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'llm_error'
                });
                exitSpan(runId);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                mechanism: {
                    handled: false,
                    type: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"]}.llm_error_handler`
                }
            });
        },
        // Chain Start Handler
        handleChainStart (chain, inputs, runId, _parentRunId) {
            const chainName = chain.name || 'unknown_chain';
            const attributes = {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.langchain',
                'langchain.chain.name': chainName
            };
            // Add inputs if recordInputs is enabled
            if (recordInputs) {
                attributes['langchain.chain.inputs'] = JSON.stringify(inputs);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `chain ${chainName}`,
                op: 'gen_ai.invoke_agent',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.invoke_agent'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // Chain End Handler
        handleChainEnd (outputs, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                // Add outputs if recordOutputs is enabled
                if (recordOutputs) {
                    span.setAttributes({
                        'langchain.chain.outputs': JSON.stringify(outputs)
                    });
                }
                exitSpan(runId);
            }
        },
        // Chain Error Handler
        handleChainError (error, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'chain_error'
                });
                exitSpan(runId);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                mechanism: {
                    handled: false,
                    type: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"]}.chain_error_handler`
                }
            });
        },
        // Tool Start Handler
        handleToolStart (tool, input, runId, _parentRunId) {
            const toolName = tool.name || 'unknown_tool';
            const attributes = {
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"],
                'gen_ai.tool.name': toolName
            };
            // Add input if recordInputs is enabled
            if (recordInputs) {
                attributes['gen_ai.tool.input'] = input;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `execute_tool ${toolName}`,
                op: 'gen_ai.execute_tool',
                attributes: {
                    ...attributes,
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.execute_tool'
                }
            }, (span)=>{
                spanMap.set(runId, span);
                return span;
            });
        },
        // Tool End Handler
        handleToolEnd (output, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                // Add output if recordOutputs is enabled
                if (recordOutputs) {
                    span.setAttributes({
                        'gen_ai.tool.output': JSON.stringify(output)
                    });
                }
                exitSpan(runId);
            }
        },
        // Tool Error Handler
        handleToolError (error, runId) {
            const span = spanMap.get(runId);
            if (span?.isRecording()) {
                span.setStatus({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                    message: 'tool_error'
                });
                exitSpan(runId);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                mechanism: {
                    handled: false,
                    type: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGCHAIN_ORIGIN"]}.tool_error_handler`
                }
            });
        },
        // LangChain BaseCallbackHandler required methods
        copy () {
            return handler;
        },
        toJSON () {
            return {
                lc: 1,
                type: 'not_implemented',
                id: handler.lc_id
            };
        },
        toJSONNotImplemented () {
            return {
                lc: 1,
                type: 'not_implemented',
                id: handler.lc_id
            };
        }
    };
    return handler;
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/extraerrordata.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extraErrorDataIntegration",
    ()=>extraErrorDataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/normalize.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const INTEGRATION_NAME = 'ExtraErrorData';
/**
 * Extract additional data for from original exceptions.
 */ const _extraErrorDataIntegration = (options = {})=>{
    const { depth = 3, captureErrorCause = true } = options;
    return {
        name: INTEGRATION_NAME,
        processEvent (event, hint, client) {
            const { maxValueLength } = client.getOptions();
            return _enhanceEventWithErrorData(event, hint, depth, captureErrorCause, maxValueLength);
        }
    };
};
const extraErrorDataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_extraErrorDataIntegration);
function _enhanceEventWithErrorData(event, hint = {}, depth, captureErrorCause, maxValueLength) {
    if (!hint.originalException || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(hint.originalException)) {
        return event;
    }
    const exceptionName = hint.originalException.name || hint.originalException.constructor.name;
    const errorData = _extractErrorData(hint.originalException, captureErrorCause, maxValueLength);
    if (errorData) {
        const contexts = {
            ...event.contexts
        };
        const normalizedErrorData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$normalize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalize"])(errorData, depth);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(normalizedErrorData)) {
            // We mark the error data as "already normalized" here, because we don't want other normalization procedures to
            // potentially truncate the data we just already normalized, with a certain depth setting.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addNonEnumerableProperty"])(normalizedErrorData, '__sentry_skip_normalization__', true);
            contexts[exceptionName] = normalizedErrorData;
        }
        return {
            ...event,
            contexts
        };
    }
    return event;
}
/**
 * Extract extra information from the Error object
 */ function _extractErrorData(error, captureErrorCause, maxValueLength) {
    // We are trying to enhance already existing event, so no harm done if it won't succeed
    try {
        const nativeKeys = [
            'name',
            'message',
            'stack',
            'line',
            'column',
            'fileName',
            'lineNumber',
            'columnNumber',
            'toJSON'
        ];
        const extraErrorInfo = {};
        // We want only enumerable properties, thus `getOwnPropertyNames` is redundant here, as we filter keys anyway.
        for (const key of Object.keys(error)){
            if (nativeKeys.indexOf(key) !== -1) {
                continue;
            }
            const value = error[key];
            extraErrorInfo[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(value) || typeof value === 'string' ? maxValueLength ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(`${value}`, maxValueLength) : `${value}` : value;
        }
        // Error.cause is a standard property that is non enumerable, we therefore need to access it separately.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
        if (captureErrorCause && error.cause !== undefined) {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(error.cause)) {
                const errorName = error.cause.name || error.cause.constructor.name;
                extraErrorInfo.cause = {
                    [errorName]: _extractErrorData(error.cause, false, maxValueLength)
                };
            } else {
                extraErrorInfo.cause = error.cause;
            }
        }
        // Check if someone attached `toJSON` method to grab even more properties (eg. axios is doing that)
        if (typeof error.toJSON === 'function') {
            const serializedError = error.toJSON();
            for (const key of Object.keys(serializedError)){
                const value = serializedError[key];
                extraErrorInfo[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(value) ? value.toString() : value;
            }
        }
        return extraErrorInfo;
    } catch (oO) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error('Unable to extract extra data from the Error object:', oO);
    }
    return null;
}
;
 //# sourceMappingURL=extraerrordata.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_INTERNAL_FLAG_BUFFER_SIZE",
    ()=>_INTERNAL_FLAG_BUFFER_SIZE,
    "_INTERNAL_MAX_FLAGS_PER_SPAN",
    ()=>_INTERNAL_MAX_FLAGS_PER_SPAN,
    "_INTERNAL_addFeatureFlagToActiveSpan",
    ()=>_INTERNAL_addFeatureFlagToActiveSpan,
    "_INTERNAL_copyFlagsFromScopeToEvent",
    ()=>_INTERNAL_copyFlagsFromScopeToEvent,
    "_INTERNAL_insertFlagToScope",
    ()=>_INTERNAL_insertFlagToScope,
    "_INTERNAL_insertToFlagBuffer",
    ()=>_INTERNAL_insertToFlagBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanUtils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Ordered LRU cache for storing feature flags in the scope context. The name
 * of each flag in the buffer is unique, and the output of getAll() is ordered
 * from oldest to newest.
 */ /**
 * Max size of the LRU flag buffer stored in Sentry scope and event contexts.
 */ const _INTERNAL_FLAG_BUFFER_SIZE = 100;
/**
 * Max number of flag evaluations to record per span.
 */ const _INTERNAL_MAX_FLAGS_PER_SPAN = 10;
const SPAN_FLAG_ATTRIBUTE_PREFIX = 'flag.evaluation.';
/**
 * Copies feature flags that are in current scope context to the event context
 */ function _INTERNAL_copyFlagsFromScopeToEvent(event) {
    const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])();
    const flagContext = scope.getScopeData().contexts.flags;
    const flagBuffer = flagContext ? flagContext.values : [];
    if (!flagBuffer.length) {
        return event;
    }
    if (event.contexts === undefined) {
        event.contexts = {};
    }
    event.contexts.flags = {
        values: [
            ...flagBuffer
        ]
    };
    return event;
}
/**
 * Inserts a flag into the current scope's context while maintaining ordered LRU properties.
 * Not thread-safe. After inserting:
 * - The flag buffer is sorted in order of recency, with the newest evaluation at the end.
 * - The names in the buffer are always unique.
 * - The length of the buffer never exceeds `maxSize`.
 *
 * @param name     Name of the feature flag to insert.
 * @param value    Value of the feature flag.
 * @param maxSize  Max number of flags the buffer should store. Default value should always be used in production.
 */ function _INTERNAL_insertFlagToScope(name, value, maxSize = _INTERNAL_FLAG_BUFFER_SIZE) {
    const scopeContexts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentScope"])().getScopeData().contexts;
    if (!scopeContexts.flags) {
        scopeContexts.flags = {
            values: []
        };
    }
    const flags = scopeContexts.flags.values;
    _INTERNAL_insertToFlagBuffer(flags, name, value, maxSize);
}
/**
 * Exported for tests only. Currently only accepts boolean values (otherwise no-op).
 * Inserts a flag into a FeatureFlag array while maintaining the following properties:
 * - Flags are sorted in order of recency, with the newest evaluation at the end.
 * - The flag names are always unique.
 * - The length of the array never exceeds `maxSize`.
 *
 * @param flags      The buffer to insert the flag into.
 * @param name       Name of the feature flag to insert.
 * @param value      Value of the feature flag.
 * @param maxSize    Max number of flags the buffer should store. Default value should always be used in production.
 */ function _INTERNAL_insertToFlagBuffer(flags, name, value, maxSize) {
    if (typeof value !== 'boolean') {
        return;
    }
    if (flags.length > maxSize) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${maxSize}`);
        return;
    }
    // Check if the flag is already in the buffer - O(n)
    const index = flags.findIndex((f)=>f.flag === name);
    if (index !== -1) {
        // The flag was found, remove it from its current position - O(n)
        flags.splice(index, 1);
    }
    if (flags.length === maxSize) {
        // If at capacity, pop the earliest flag - O(n)
        flags.shift();
    }
    // Push the flag to the end - O(1)
    flags.push({
        flag: name,
        result: value
    });
}
/**
 * Records a feature flag evaluation for the active span. This is a no-op for non-boolean values.
 * The flag and its value is stored in span attributes with the `flag.evaluation` prefix. Once the
 * unique flags for a span reaches maxFlagsPerSpan, subsequent flags are dropped.
 *
 * @param name             Name of the feature flag.
 * @param value            Value of the feature flag. Non-boolean values are ignored.
 * @param maxFlagsPerSpan  Max number of flags a buffer should store. Default value should always be used in production.
 */ function _INTERNAL_addFeatureFlagToActiveSpan(name, value, maxFlagsPerSpan = _INTERNAL_MAX_FLAGS_PER_SPAN) {
    if (typeof value !== 'boolean') {
        return;
    }
    const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActiveSpan"])();
    if (!span) {
        return;
    }
    const attributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spanToJSON"])(span).data;
    // If the flag already exists, always update it
    if (`${SPAN_FLAG_ATTRIBUTE_PREFIX}${name}` in attributes) {
        span.setAttribute(`${SPAN_FLAG_ATTRIBUTE_PREFIX}${name}`, value);
        return;
    }
    // Else, add the flag to the span if we have not reached the max number of flags
    const numOfAddedFlags = Object.keys(attributes).filter((key)=>key.startsWith(SPAN_FLAG_ATTRIBUTE_PREFIX)).length;
    if (numOfAddedFlags < maxFlagsPerSpan) {
        span.setAttribute(`${SPAN_FLAG_ATTRIBUTE_PREFIX}${name}`, value);
    }
}
;
 //# sourceMappingURL=featureFlags.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/featureFlags/featureFlagsIntegration.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "featureFlagsIntegration",
    ()=>featureFlagsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)");
;
;
/**
 * Sentry integration for buffering feature flag evaluations manually with an API, and
 * capturing them on error events and spans.
 *
 * See the [feature flag documentation](https://develop.sentry.dev/sdk/expected-features/#feature-flags) for more information.
 *
 * @example
 * ```
 * import * as Sentry from '@sentry/browser';
 * import { type FeatureFlagsIntegration } from '@sentry/browser';
 *
 * // Setup
 * Sentry.init(..., integrations: [Sentry.featureFlagsIntegration()])
 *
 * // Verify
 * const flagsIntegration = Sentry.getClient()?.getIntegrationByName<FeatureFlagsIntegration>('FeatureFlags');
 * if (flagsIntegration) {
 *   flagsIntegration.addFeatureFlag('my-flag', true);
 * } else {
 *   // check your setup
 * }
 * Sentry.captureException(Exception('broke')); // 'my-flag' should be captured to this Sentry event.
 * ```
 */ const featureFlagsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'FeatureFlags',
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        },
        addFeatureFlag (name, value) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(name, value);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(name, value);
        }
    };
});
;
 //# sourceMappingURL=featureFlagsIntegration.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMethodPath",
    ()=>buildMethodPath,
    "getFinalOperationName",
    ()=>getFinalOperationName,
    "getSpanOperation",
    ()=>getSpanOperation,
    "getTruncatedJsonString",
    ()=>getTruncatedJsonString,
    "setTokenUsageAttributes",
    ()=>setTokenUsageAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [app-client] (ecmascript)");
;
;
/**
 * Maps AI method paths to Sentry operation name
 */ function getFinalOperationName(methodPath) {
    if (methodPath.includes('messages')) {
        return 'messages';
    }
    if (methodPath.includes('completions')) {
        return 'completions';
    }
    if (methodPath.includes('models')) {
        return 'models';
    }
    if (methodPath.includes('chat')) {
        return 'chat';
    }
    return methodPath.split('.').pop() || 'unknown';
}
/**
 * Get the span operation for AI methods
 * Following Sentry's convention: "gen_ai.{operation_name}"
 */ function getSpanOperation(methodPath) {
    return `gen_ai.${getFinalOperationName(methodPath)}`;
}
/**
 * Build method path from current traversal
 */ function buildMethodPath(currentPath, prop) {
    return currentPath ? `${currentPath}.${prop}` : prop;
}
/**
 * Set token usage attributes
 * @param span - The span to add attributes to
 * @param promptTokens - The number of prompt tokens
 * @param completionTokens - The number of completion tokens
 * @param cachedInputTokens - The number of cached input tokens
 * @param cachedOutputTokens - The number of cached output tokens
 */ function setTokenUsageAttributes(span, promptTokens, completionTokens, cachedInputTokens, cachedOutputTokens) {
    if (promptTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]]: promptTokens
        });
    }
    if (completionTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]]: completionTokens
        });
    }
    if (promptTokens !== undefined || completionTokens !== undefined || cachedInputTokens !== undefined || cachedOutputTokens !== undefined) {
        /**
     * Total input tokens in a request is the summation of `input_tokens`,
     * `cache_creation_input_tokens`, and `cache_read_input_tokens`.
     */ const totalTokens = (promptTokens ?? 0) + (completionTokens ?? 0) + (cachedInputTokens ?? 0) + (cachedOutputTokens ?? 0);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]]: totalTokens
        });
    }
}
/**
 * Get the truncated JSON string for a string or array of strings.
 *
 * @param value - The string or array of strings to truncate
 * @returns The truncated JSON string
 */ function getTruncatedJsonString(value) {
    if (typeof value === 'string') {
        // Some values are already JSON strings, so we don't need to duplicate the JSON parsing
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateGenAiStringInput"])(value);
    }
    if (Array.isArray(value)) {
        // truncateGenAiMessages returns an array of strings, so we need to stringify it
        const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(value);
        return JSON.stringify(truncatedMessages);
    }
    // value is an object, so we need to stringify it
    return JSON.stringify(value);
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/streaming.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentAsyncIterableStream",
    ()=>instrumentAsyncIterableStream,
    "instrumentMessageStream",
    ()=>instrumentMessageStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [app-client] (ecmascript)");
;
;
;
;
/**
 * State object used to accumulate information from a stream of Anthropic AI events.
 */ /**
 * Checks if an event is an error event
 * @param event - The event to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 * @param span - The span to update
 * @returns Whether an error occurred
 */ function isErrorEvent(event, span) {
    if ('type' in event && typeof event.type === 'string') {
        // If the event is an error, set the span status and capture the error
        // These error events are not rejected by the API by default, but are sent as metadata of the response
        if (event.type === 'error') {
            span.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message: event.error?.type ?? 'internal_error'
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(event.error, {
                mechanism: {
                    handled: false,
                    type: 'auto.ai.anthropic.anthropic_error'
                }
            });
            return true;
        }
    }
    return false;
}
/**
 * Processes the message metadata of an event
 * @param event - The event to process
 * @param state - The state of the streaming process
 */ function handleMessageMetadata(event, state) {
    // The token counts shown in the usage field of the message_delta event are cumulative.
    // @see https://docs.anthropic.com/en/docs/build-with-claude/streaming#event-types
    if (event.type === 'message_delta' && event.usage) {
        if ('output_tokens' in event.usage && typeof event.usage.output_tokens === 'number') {
            state.completionTokens = event.usage.output_tokens;
        }
    }
    if (event.message) {
        const message = event.message;
        if (message.id) state.responseId = message.id;
        if (message.model) state.responseModel = message.model;
        if (message.stop_reason) state.finishReasons.push(message.stop_reason);
        if (message.usage) {
            if (typeof message.usage.input_tokens === 'number') state.promptTokens = message.usage.input_tokens;
            if (typeof message.usage.cache_creation_input_tokens === 'number') state.cacheCreationInputTokens = message.usage.cache_creation_input_tokens;
            if (typeof message.usage.cache_read_input_tokens === 'number') state.cacheReadInputTokens = message.usage.cache_read_input_tokens;
        }
    }
}
/**
 * Handle start of a content block (e.g., tool_use)
 */ function handleContentBlockStart(event, state) {
    if (event.type !== 'content_block_start' || typeof event.index !== 'number' || !event.content_block) return;
    if (event.content_block.type === 'tool_use' || event.content_block.type === 'server_tool_use') {
        state.activeToolBlocks[event.index] = {
            id: event.content_block.id,
            name: event.content_block.name,
            inputJsonParts: []
        };
    }
}
/**
 * Handle deltas of a content block, including input_json_delta for tool_use
 */ function handleContentBlockDelta(event, state, recordOutputs) {
    if (event.type !== 'content_block_delta' || !event.delta) return;
    // Accumulate tool_use input JSON deltas only when we have an index and an active tool block
    if (typeof event.index === 'number' && 'partial_json' in event.delta && typeof event.delta.partial_json === 'string') {
        const active = state.activeToolBlocks[event.index];
        if (active) {
            active.inputJsonParts.push(event.delta.partial_json);
        }
    }
    // Accumulate streamed response text regardless of index
    if (recordOutputs && typeof event.delta.text === 'string') {
        state.responseTexts.push(event.delta.text);
    }
}
/**
 * Handle stop of a content block; finalize tool_use entries
 */ function handleContentBlockStop(event, state) {
    if (event.type !== 'content_block_stop' || typeof event.index !== 'number') return;
    const active = state.activeToolBlocks[event.index];
    if (!active) return;
    const raw = active.inputJsonParts.join('');
    let parsedInput;
    try {
        parsedInput = raw ? JSON.parse(raw) : {};
    } catch  {
        parsedInput = {
            __unparsed: raw
        };
    }
    state.toolCalls.push({
        type: 'tool_use',
        id: active.id,
        name: active.name,
        input: parsedInput
    });
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete state.activeToolBlocks[event.index];
}
/**
 * Processes an event
 * @param event - The event to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 * @param span - The span to update
 */ function processEvent(event, state, recordOutputs, span) {
    if (!(event && typeof event === 'object')) {
        return;
    }
    const isError = isErrorEvent(event, span);
    if (isError) return;
    handleMessageMetadata(event, state);
    // Tool call events are sent via 3 separate events:
    // - content_block_start (start of the tool call)
    // - content_block_delta (delta aka input of the tool call)
    // - content_block_stop (end of the tool call)
    // We need to handle them all to capture the full tool call.
    handleContentBlockStart(event, state);
    handleContentBlockDelta(event, state, recordOutputs);
    handleContentBlockStop(event, state);
}
/**
 * Finalizes span attributes when stream processing completes
 */ function finalizeStreamSpan(state, span, recordOutputs) {
    if (!span.isRecording()) {
        return;
    }
    // Set common response attributes if available
    if (state.responseId) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: state.responseId
        });
    }
    if (state.responseModel) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: state.responseModel
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, state.promptTokens, state.completionTokens, state.cacheCreationInputTokens, state.cacheReadInputTokens);
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
    });
    if (state.finishReasons.length > 0) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(state.finishReasons)
        });
    }
    if (recordOutputs && state.responseTexts.length > 0) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: state.responseTexts.join('')
        });
    }
    // Set tool calls if any were captured
    if (recordOutputs && state.toolCalls.length > 0) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(state.toolCalls)
        });
    }
    span.end();
}
/**
 * Instruments an async iterable stream of Anthropic events, updates the span with
 * streaming attributes and (optionally) the aggregated output text, and yields
 * each event from the input stream unchanged.
 */ async function* instrumentAsyncIterableStream(stream, span, recordOutputs) {
    const state = {
        responseTexts: [],
        finishReasons: [],
        responseId: '',
        responseModel: '',
        promptTokens: undefined,
        completionTokens: undefined,
        cacheCreationInputTokens: undefined,
        cacheReadInputTokens: undefined,
        toolCalls: [],
        activeToolBlocks: {}
    };
    try {
        for await (const event of stream){
            processEvent(event, state, recordOutputs, span);
            yield event;
        }
    } finally{
        // Set common response attributes if available
        if (state.responseId) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: state.responseId
            });
        }
        if (state.responseModel) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: state.responseModel
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, state.promptTokens, state.completionTokens, state.cacheCreationInputTokens, state.cacheReadInputTokens);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
        });
        if (state.finishReasons.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(state.finishReasons)
            });
        }
        if (recordOutputs && state.responseTexts.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: state.responseTexts.join('')
            });
        }
        // Set tool calls if any were captured
        if (recordOutputs && state.toolCalls.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(state.toolCalls)
            });
        }
        span.end();
    }
}
/**
 * Instruments a MessageStream by registering event handlers and preserving the original stream API.
 */ function instrumentMessageStream(stream, span, recordOutputs) {
    const state = {
        responseTexts: [],
        finishReasons: [],
        responseId: '',
        responseModel: '',
        promptTokens: undefined,
        completionTokens: undefined,
        cacheCreationInputTokens: undefined,
        cacheReadInputTokens: undefined,
        toolCalls: [],
        activeToolBlocks: {}
    };
    stream.on('streamEvent', (event)=>{
        processEvent(event, state, recordOutputs, span);
    });
    // The event fired when a message is done being streamed by the API. Corresponds to the message_stop SSE event.
    // @see https://github.com/anthropics/anthropic-sdk-typescript/blob/d3be31f5a4e6ebb4c0a2f65dbb8f381ae73a9166/helpers.md?plain=1#L42-L44
    stream.on('message', ()=>{
        finalizeStreamSpan(state, span, recordOutputs);
    });
    stream.on('error', (error)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
            mechanism: {
                handled: false,
                type: 'auto.ai.anthropic.stream_error'
            }
        });
        if (span.isRecording()) {
            span.setStatus({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                message: 'stream_error'
            });
            span.end();
        }
    });
    return stream;
}
;
 //# sourceMappingURL=streaming.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANTHROPIC_AI_INSTRUMENTED_METHODS",
    ()=>ANTHROPIC_AI_INSTRUMENTED_METHODS,
    "ANTHROPIC_AI_INTEGRATION_NAME",
    ()=>ANTHROPIC_AI_INTEGRATION_NAME
]);
const ANTHROPIC_AI_INTEGRATION_NAME = 'Anthropic_AI';
// https://docs.anthropic.com/en/api/messages
// https://docs.anthropic.com/en/api/models-list
const ANTHROPIC_AI_INSTRUMENTED_METHODS = [
    'messages.create',
    'messages.stream',
    'messages.countTokens',
    'models.get',
    'completions.create',
    'models.retrieve',
    'beta.messages.create'
];
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleResponseError",
    ()=>handleResponseError,
    "messagesFromParams",
    ()=>messagesFromParams,
    "shouldInstrument",
    ()=>shouldInstrument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/constants.js [app-client] (ecmascript)");
;
;
;
/**
 * Check if a method path should be instrumented
 */ function shouldInstrument(methodPath) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANTHROPIC_AI_INSTRUMENTED_METHODS"].includes(methodPath);
}
/**
 * Capture error information from the response
 * @see https://docs.anthropic.com/en/api/errors#error-shapes
 */ function handleResponseError(span, response) {
    if (response.error) {
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: response.error.type || 'internal_error'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(response.error, {
            mechanism: {
                handled: false,
                type: 'auto.ai.anthropic.anthropic_error'
            }
        });
    }
}
/**
 * Include the system prompt in the messages list, if available
 */ function messagesFromParams(params) {
    const { system, messages } = params;
    const systemMessages = typeof system === 'string' ? [
        {
            role: 'system',
            content: params.system
        }
    ] : [];
    const userMessages = Array.isArray(messages) ? messages : messages != null ? [
        messages
    ] : [];
    return [
        ...systemMessages,
        ...userMessages
    ];
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentAnthropicAiClient",
    ()=>instrumentAnthropicAiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/streaming.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/anthropic-ai/utils.js [app-client] (ecmascript)");
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
/**
 * Extract request attributes from method arguments
 */ function extractRequestAttributes(args, methodPath) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: 'anthropic',
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.anthropic'
    };
    if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
        const params = args[0];
        if (params.tools && Array.isArray(params.tools)) {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"]] = JSON.stringify(params.tools);
        }
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = params.model ?? 'unknown';
        if ('temperature' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"]] = params.temperature;
        if ('top_p' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"]] = params.top_p;
        if ('stream' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_STREAM_ATTRIBUTE"]] = params.stream;
        if ('top_k' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_K_ATTRIBUTE"]] = params.top_k;
        if ('frequency_penalty' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"]] = params.frequency_penalty;
        if ('max_tokens' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE"]] = params.max_tokens;
    } else {
        if (methodPath === 'models.retrieve' || methodPath === 'models.get') {
            // models.retrieve(model-id) and models.get(model-id)
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = args[0];
        } else {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = 'unknown';
        }
    }
    return attributes;
}
/**
 * Add private request attributes to spans.
 * This is only recorded if recordInputs is true.
 */ function addPrivateRequestAttributes(span, params) {
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["messagesFromParams"])(params);
    if (messages.length) {
        const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(messages);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedMessages
        });
    }
    if ('input' in params) {
        const truncatedInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(params.input);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedInput
        });
    }
    if ('prompt' in params) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_PROMPT_ATTRIBUTE"]]: JSON.stringify(params.prompt)
        });
    }
}
/**
 * Add content attributes when recordOutputs is enabled
 */ function addContentAttributes(span, response) {
    // Messages.create
    if ('content' in response) {
        if (Array.isArray(response.content)) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: response.content.map((item)=>item.text).filter((text)=>!!text).join('')
            });
            const toolCalls = [];
            for (const item of response.content){
                if (item.type === 'tool_use' || item.type === 'server_tool_use') {
                    toolCalls.push(item);
                }
            }
            if (toolCalls.length > 0) {
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(toolCalls)
                });
            }
        }
    }
    // Completions.create
    if ('completion' in response) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: response.completion
        });
    }
    // Models.countTokens
    if ('input_tokens' in response) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: JSON.stringify(response.input_tokens)
        });
    }
}
/**
 * Add basic metadata attributes from the response
 */ function addMetadataAttributes(span, response) {
    if ('id' in response && 'model' in response) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: response.id,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: response.model
        });
        if ('created' in response && typeof response.created === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(response.created * 1000).toISOString()
            });
        }
        if ('created_at' in response && typeof response.created_at === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANTHROPIC_AI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(response.created_at * 1000).toISOString()
            });
        }
        if ('usage' in response && response.usage) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, response.usage.input_tokens, response.usage.output_tokens, response.usage.cache_creation_input_tokens, response.usage.cache_read_input_tokens);
        }
    }
}
/**
 * Add response attributes to spans
 */ function addResponseAttributes(span, response, recordOutputs) {
    if (!response || typeof response !== 'object') return;
    // capture error, do not add attributes if error (they shouldn't exist)
    if ('type' in response && response.type === 'error') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleResponseError"])(span, response);
        return;
    }
    // Private response attributes that are only recorded if recordOutputs is true.
    if (recordOutputs) {
        addContentAttributes(span, response);
    }
    // Add basic metadata attributes
    addMetadataAttributes(span, response);
}
/**
 * Handle common error catching and reporting for streaming requests
 */ function handleStreamingError(error, span, methodPath) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
        mechanism: {
            handled: false,
            type: 'auto.ai.anthropic',
            data: {
                function: methodPath
            }
        }
    });
    if (span.isRecording()) {
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: 'internal_error'
        });
        span.end();
    }
    throw error;
}
/**
 * Handle streaming cases with common logic
 */ function handleStreamingRequest(originalMethod, target, context, args, requestAttributes, operationName, methodPath, params, options, isStreamRequested, isStreamingMethod) {
    const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] ?? 'unknown';
    const spanConfig = {
        name: `${operationName} ${model} stream-response`,
        op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
        attributes: requestAttributes
    };
    // messages.stream() always returns a sync MessageStream, even with stream: true param
    if (isStreamRequested && !isStreamingMethod) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])(spanConfig, async (span)=>{
            try {
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                const result = await originalMethod.apply(context, args);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentAsyncIterableStream"])(result, span, options.recordOutputs ?? false);
            } catch (error) {
                return handleStreamingError(error, span, methodPath);
            }
        });
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])(spanConfig, (span)=>{
            try {
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                const messageStream = target.apply(context, args);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentMessageStream"])(messageStream, span, options.recordOutputs ?? false);
            } catch (error) {
                return handleStreamingError(error, span, methodPath);
            }
        });
    }
}
/**
 * Instrument a method with Sentry spans
 * Following Sentry AI Agents Manual Instrumentation conventions
 * @see https://docs.sentry.io/platforms/javascript/guides/node/tracing/instrumentation/ai-agents-module/#manual-instrumentation
 */ function instrumentMethod(originalMethod, methodPath, context, options) {
    return new Proxy(originalMethod, {
        apply (target, thisArg, args) {
            const requestAttributes = extractRequestAttributes(args, methodPath);
            const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] ?? 'unknown';
            const operationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath);
            const params = typeof args[0] === 'object' ? args[0] : undefined;
            const isStreamRequested = Boolean(params?.stream);
            const isStreamingMethod = methodPath === 'messages.stream';
            if (isStreamRequested || isStreamingMethod) {
                return handleStreamingRequest(originalMethod, target, context, args, requestAttributes, operationName, methodPath, params, options, isStreamRequested, isStreamingMethod);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: `${operationName} ${model}`,
                op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                attributes: requestAttributes
            }, (span)=>{
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>target.apply(context, args), (error)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.anthropic',
                            data: {
                                function: methodPath
                            }
                        }
                    });
                }, ()=>{}, (result)=>addResponseAttributes(span, result, options.recordOutputs));
            });
        }
    });
}
/**
 * Create a deep proxy for Anthropic AI client instrumentation
 */ function createDeepProxy(target, currentPath = '', options) {
    return new Proxy(target, {
        get (obj, prop) {
            const value = obj[prop];
            const methodPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMethodPath"])(currentPath, String(prop));
            if (typeof value === 'function' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$anthropic$2d$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldInstrument"])(methodPath)) {
                return instrumentMethod(value, methodPath, obj, options);
            }
            if (typeof value === 'function') {
                // Bind non-instrumented functions to preserve the original `this` context,
                return value.bind(obj);
            }
            if (value && typeof value === 'object') {
                return createDeepProxy(value, methodPath, options);
            }
            return value;
        }
    });
}
/**
 * Instrument an Anthropic AI client with Sentry tracing
 * Can be used across Node.js, Cloudflare Workers, and Vercel Edge
 *
 * @template T - The type of the client that extends object
 * @param client - The Anthropic AI client to instrument
 * @param options - Optional configuration for recording inputs and outputs
 * @returns The instrumented client with the same type as the input
 */ function instrumentAnthropicAiClient(anthropicAiClient, options) {
    const sendDefaultPii = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii);
    const _options = {
        recordInputs: sendDefaultPii,
        recordOutputs: sendDefaultPii,
        ...options
    };
    return createDeepProxy(anthropicAiClient, '', _options);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHATS_CREATE_METHOD",
    ()=>CHATS_CREATE_METHOD,
    "CHAT_PATH",
    ()=>CHAT_PATH,
    "GOOGLE_GENAI_INSTRUMENTED_METHODS",
    ()=>GOOGLE_GENAI_INSTRUMENTED_METHODS,
    "GOOGLE_GENAI_INTEGRATION_NAME",
    ()=>GOOGLE_GENAI_INTEGRATION_NAME,
    "GOOGLE_GENAI_SYSTEM_NAME",
    ()=>GOOGLE_GENAI_SYSTEM_NAME
]);
const GOOGLE_GENAI_INTEGRATION_NAME = 'Google_GenAI';
// https://ai.google.dev/api/rest/v1/models/generateContent
// https://ai.google.dev/api/rest/v1/chats/sendMessage
// https://googleapis.github.io/js-genai/release_docs/classes/models.Models.html#generatecontentstream
// https://googleapis.github.io/js-genai/release_docs/classes/chats.Chat.html#sendmessagestream
const GOOGLE_GENAI_INSTRUMENTED_METHODS = [
    'models.generateContent',
    'models.generateContentStream',
    'chats.create',
    'sendMessage',
    'sendMessageStream'
];
// Constants for internal use
const GOOGLE_GENAI_SYSTEM_NAME = 'google_genai';
const CHATS_CREATE_METHOD = 'chats.create';
const CHAT_PATH = 'chat';
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/streaming.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentStream",
    ()=>instrumentStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
;
;
;
/**
 * State object used to accumulate information from a stream of Google GenAI events.
 */ /**
 * Checks if a response chunk contains an error
 * @param chunk - The response chunk to check
 * @param span - The span to update if error is found
 * @returns Whether an error occurred
 */ function isErrorChunk(chunk, span) {
    const feedback = chunk?.promptFeedback;
    if (feedback?.blockReason) {
        const message = feedback.blockReasonMessage ?? feedback.blockReason;
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: `Content blocked: ${message}`
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(`Content blocked: ${message}`, {
            mechanism: {
                handled: false,
                type: 'auto.ai.google_genai'
            }
        });
        return true;
    }
    return false;
}
/**
 * Processes response metadata from a chunk
 * @param chunk - The response chunk to process
 * @param state - The state of the streaming process
 */ function handleResponseMetadata(chunk, state) {
    if (typeof chunk.responseId === 'string') state.responseId = chunk.responseId;
    if (typeof chunk.modelVersion === 'string') state.responseModel = chunk.modelVersion;
    const usage = chunk.usageMetadata;
    if (usage) {
        if (typeof usage.promptTokenCount === 'number') state.promptTokens = usage.promptTokenCount;
        if (typeof usage.candidatesTokenCount === 'number') state.completionTokens = usage.candidatesTokenCount;
        if (typeof usage.totalTokenCount === 'number') state.totalTokens = usage.totalTokenCount;
    }
}
/**
 * Processes candidate content from a response chunk
 * @param chunk - The response chunk to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 */ function handleCandidateContent(chunk, state, recordOutputs) {
    if (Array.isArray(chunk.functionCalls)) {
        state.toolCalls.push(...chunk.functionCalls);
    }
    for (const candidate of chunk.candidates ?? []){
        if (candidate?.finishReason && !state.finishReasons.includes(candidate.finishReason)) {
            state.finishReasons.push(candidate.finishReason);
        }
        for (const part of candidate?.content?.parts ?? []){
            if (recordOutputs && part.text) state.responseTexts.push(part.text);
            if (part.functionCall) {
                state.toolCalls.push({
                    type: 'function',
                    id: part.functionCall.id,
                    name: part.functionCall.name,
                    arguments: part.functionCall.args
                });
            }
        }
    }
}
/**
 * Processes a single chunk from the Google GenAI stream
 * @param chunk - The chunk to process
 * @param state - The state of the streaming process
 * @param recordOutputs - Whether to record outputs
 * @param span - The span to update
 */ function processChunk(chunk, state, recordOutputs, span) {
    if (!chunk || isErrorChunk(chunk, span)) return;
    handleResponseMetadata(chunk, state);
    handleCandidateContent(chunk, state, recordOutputs);
}
/**
 * Instruments an async iterable stream of Google GenAI response chunks, updates the span with
 * streaming attributes and (optionally) the aggregated output text, and yields
 * each chunk from the input stream unchanged.
 */ async function* instrumentStream(stream, span, recordOutputs) {
    const state = {
        responseTexts: [],
        finishReasons: [],
        toolCalls: []
    };
    try {
        for await (const chunk of stream){
            processChunk(chunk, state, recordOutputs, span);
            yield chunk;
        }
    } finally{
        const attrs = {
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
        };
        if (state.responseId) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]] = state.responseId;
        if (state.responseModel) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]] = state.responseModel;
        if (state.promptTokens !== undefined) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]] = state.promptTokens;
        if (state.completionTokens !== undefined) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]] = state.completionTokens;
        if (state.totalTokens !== undefined) attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]] = state.totalTokens;
        if (state.finishReasons.length) {
            attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]] = JSON.stringify(state.finishReasons);
        }
        if (recordOutputs && state.responseTexts.length) {
            attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]] = state.responseTexts.join('');
        }
        if (recordOutputs && state.toolCalls.length) {
            attrs[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]] = JSON.stringify(state.toolCalls);
        }
        span.setAttributes(attrs);
        span.end();
    }
}
;
 //# sourceMappingURL=streaming.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isStreamingMethod",
    ()=>isStreamingMethod,
    "shouldInstrument",
    ()=>shouldInstrument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/constants.js [app-client] (ecmascript)");
;
/**
 * Check if a method path should be instrumented
 */ function shouldInstrument(methodPath) {
    // Check for exact matches first (like 'models.generateContent')
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_GENAI_INSTRUMENTED_METHODS"].includes(methodPath)) {
        return true;
    }
    // Check for method name matches (like 'sendMessage' from chat instances)
    const methodName = methodPath.split('.').pop();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_GENAI_INSTRUMENTED_METHODS"].includes(methodName);
}
/**
 * Check if a method is a streaming method
 */ function isStreamingMethod(methodPath) {
    return methodPath.includes('Stream') || methodPath.endsWith('generateContentStream') || methodPath.endsWith('sendMessageStream');
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractModel",
    ()=>extractModel,
    "instrumentGoogleGenAIClient",
    ()=>instrumentGoogleGenAIClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/handleCallbackErrors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/streaming.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/google-genai/utils.js [app-client] (ecmascript)");
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
/**
 * Extract model from parameters or chat context object
 * For chat instances, the model is available on the chat object as 'model' (older versions) or 'modelVersion' (newer versions)
 */ function extractModel(params, context) {
    if ('model' in params && typeof params.model === 'string') {
        return params.model;
    }
    // Try to get model from chat context object (chat instance has model property)
    if (context && typeof context === 'object') {
        const contextObj = context;
        // Check for 'model' property (older versions, and streaming)
        if ('model' in contextObj && typeof contextObj.model === 'string') {
            return contextObj.model;
        }
        // Check for 'modelVersion' property (newer versions)
        if ('modelVersion' in contextObj && typeof contextObj.modelVersion === 'string') {
            return contextObj.modelVersion;
        }
    }
    return 'unknown';
}
/**
 * Extract generation config parameters
 */ function extractConfigAttributes(config) {
    const attributes = {};
    if ('temperature' in config && typeof config.temperature === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"]] = config.temperature;
    }
    if ('topP' in config && typeof config.topP === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"]] = config.topP;
    }
    if ('topK' in config && typeof config.topK === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_K_ATTRIBUTE"]] = config.topK;
    }
    if ('maxOutputTokens' in config && typeof config.maxOutputTokens === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MAX_TOKENS_ATTRIBUTE"]] = config.maxOutputTokens;
    }
    if ('frequencyPenalty' in config && typeof config.frequencyPenalty === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"]] = config.frequencyPenalty;
    }
    if ('presencePenalty' in config && typeof config.presencePenalty === 'number') {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE"]] = config.presencePenalty;
    }
    return attributes;
}
/**
 * Extract request attributes from method arguments
 * Builds the base attributes for span creation including system info, model, and config
 */ function extractRequestAttributes(methodPath, params, context) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOOGLE_GENAI_SYSTEM_NAME"],
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.google_genai'
    };
    if (params) {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = extractModel(params, context);
        // Extract generation config parameters
        if ('config' in params && typeof params.config === 'object' && params.config) {
            const config = params.config;
            Object.assign(attributes, extractConfigAttributes(config));
            // Extract available tools from config
            if ('tools' in config && Array.isArray(config.tools)) {
                const functionDeclarations = config.tools.flatMap((tool)=>tool.functionDeclarations);
                attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"]] = JSON.stringify(functionDeclarations);
            }
        }
    } else {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = extractModel({}, context);
    }
    return attributes;
}
/**
 * Add private request attributes to spans.
 * This is only recorded if recordInputs is true.
 * Handles different parameter formats for different Google GenAI methods.
 */ function addPrivateRequestAttributes(span, params) {
    // For models.generateContent: ContentListUnion: Content | Content[] | PartUnion | PartUnion[]
    if ('contents' in params) {
        const contents = params.contents;
        // For models.generateContent: ContentListUnion: Content | Content[] | PartUnion | PartUnion[]
        const truncatedContents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(contents);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedContents
        });
    }
    // For chat.sendMessage: message can be string or Part[]
    if ('message' in params) {
        const message = params.message;
        const truncatedMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(message);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedMessage
        });
    }
    // For chats.create: history contains the conversation history
    if ('history' in params) {
        const history = params.history;
        const truncatedHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(history);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedHistory
        });
    }
}
/**
 * Add response attributes from the Google GenAI response
 * @see https://github.com/googleapis/js-genai/blob/v1.19.0/src/types.ts#L2313
 */ function addResponseAttributes(span, response, recordOutputs) {
    if (!response || typeof response !== 'object') return;
    // Add usage metadata if present
    if (response.usageMetadata && typeof response.usageMetadata === 'object') {
        const usage = response.usageMetadata;
        if (typeof usage.promptTokenCount === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]]: usage.promptTokenCount
            });
        }
        if (typeof usage.candidatesTokenCount === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]]: usage.candidatesTokenCount
            });
        }
        if (typeof usage.totalTokenCount === 'number') {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]]: usage.totalTokenCount
            });
        }
    }
    // Add response text if recordOutputs is enabled
    if (recordOutputs && Array.isArray(response.candidates) && response.candidates.length > 0) {
        const responseTexts = response.candidates.map((candidate)=>{
            if (candidate.content?.parts && Array.isArray(candidate.content.parts)) {
                return candidate.content.parts.map((part)=>typeof part.text === 'string' ? part.text : '').filter((text)=>text.length > 0).join('');
            }
            return '';
        }).filter((text)=>text.length > 0);
        if (responseTexts.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: responseTexts.join('')
            });
        }
    }
    // Add tool calls if recordOutputs is enabled
    if (recordOutputs && response.functionCalls) {
        const functionCalls = response.functionCalls;
        if (Array.isArray(functionCalls) && functionCalls.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(functionCalls)
            });
        }
    }
}
/**
 * Instrument any async or synchronous genai method with Sentry spans
 * Handles operations like models.generateContent and chat.sendMessage and chats.create
 * @see https://docs.sentry.io/platforms/javascript/guides/node/tracing/instrumentation/ai-agents-module/#manual-instrumentation
 */ function instrumentMethod(originalMethod, methodPath, context, options) {
    const isSyncCreate = methodPath === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHATS_CREATE_METHOD"];
    return new Proxy(originalMethod, {
        apply (target, _, args) {
            const params = args[0];
            const requestAttributes = extractRequestAttributes(methodPath, params, context);
            const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] ?? 'unknown';
            const operationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalOperationName"])(methodPath);
            // Check if this is a streaming method
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStreamingMethod"])(methodPath)) {
                // Use startSpanManual for streaming methods to control span lifecycle
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                    name: `${operationName} ${model} stream-response`,
                    op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                    attributes: requestAttributes
                }, async (span)=>{
                    try {
                        if (options.recordInputs && params) {
                            addPrivateRequestAttributes(span, params);
                        }
                        const stream = await target.apply(context, args);
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentStream"])(stream, span, Boolean(options.recordOutputs));
                    } catch (error) {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                            message: 'internal_error'
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                            mechanism: {
                                handled: false,
                                type: 'auto.ai.google_genai',
                                data: {
                                    function: methodPath
                                }
                            }
                        });
                        span.end();
                        throw error;
                    }
                });
            }
            // Single span for both sync and async operations
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: isSyncCreate ? `${operationName} ${model} create` : `${operationName} ${model}`,
                op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                attributes: requestAttributes
            }, (span)=>{
                if (options.recordInputs && params) {
                    addPrivateRequestAttributes(span, params);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$handleCallbackErrors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCallbackErrors"])(()=>target.apply(context, args), (error)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.google_genai',
                            data: {
                                function: methodPath
                            }
                        }
                    });
                }, ()=>{}, (result)=>{
                    // Only add response attributes for content-producing methods, not for chats.create
                    if (!isSyncCreate) {
                        addResponseAttributes(span, result, options.recordOutputs);
                    }
                });
            });
        }
    });
}
/**
 * Create a deep proxy for Google GenAI client instrumentation
 * Recursively instruments methods and handles special cases like chats.create
 */ function createDeepProxy(target, currentPath = '', options) {
    return new Proxy(target, {
        get: (t, prop, receiver)=>{
            const value = Reflect.get(t, prop, receiver);
            const methodPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMethodPath"])(currentPath, String(prop));
            if (typeof value === 'function' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldInstrument"])(methodPath)) {
                // Special case: chats.create is synchronous but needs both instrumentation AND result proxying
                if (methodPath === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHATS_CREATE_METHOD"]) {
                    const instrumentedMethod = instrumentMethod(value, methodPath, t, options);
                    return function instrumentedAndProxiedCreate(...args) {
                        const result = instrumentedMethod(...args);
                        // If the result is an object (like a chat instance), proxy it too
                        if (result && typeof result === 'object') {
                            return createDeepProxy(result, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$google$2d$genai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHAT_PATH"], options);
                        }
                        return result;
                    };
                }
                return instrumentMethod(value, methodPath, t, options);
            }
            if (typeof value === 'function') {
                // Bind non-instrumented functions to preserve the original `this` context
                return value.bind(t);
            }
            if (value && typeof value === 'object') {
                return createDeepProxy(value, methodPath, options);
            }
            return value;
        }
    });
}
/**
 * Instrument a Google GenAI client with Sentry tracing
 * Can be used across Node.js, Cloudflare Workers, and Vercel Edge
 *
 * @template T - The type of the client that extends client object
 * @param client - The Google GenAI client to instrument
 * @param options - Optional configuration for recording inputs and outputs
 * @returns The instrumented client with the same type as the input
 *
 * @example
 * ```typescript
 * import { GoogleGenAI } from '@google/genai';
 * import { instrumentGoogleGenAIClient } from '@sentry/core';
 *
 * const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
 * const instrumentedClient = instrumentGoogleGenAIClient(genAI);
 *
 * // Now both chats.create and sendMessage will be instrumented
 * const chat = instrumentedClient.chats.create({ model: 'gemini-1.5-pro' });
 * const response = await chat.sendMessage({ message: 'Hello' });
 * ```
 */ function instrumentGoogleGenAIClient(client, options) {
    const sendDefaultPii = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii);
    const _options = {
        recordInputs: sendDefaultPii,
        recordOutputs: sendDefaultPii,
        ...options
    };
    return createDeepProxy(client, '', _options);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langgraph/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LANGGRAPH_INTEGRATION_NAME",
    ()=>LANGGRAPH_INTEGRATION_NAME,
    "LANGGRAPH_ORIGIN",
    ()=>LANGGRAPH_ORIGIN
]);
const LANGGRAPH_INTEGRATION_NAME = 'LangGraph';
const LANGGRAPH_ORIGIN = 'auto.ai.langgraph';
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langgraph/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractModelMetadata",
    ()=>extractModelMetadata,
    "extractTokenUsageFromMessage",
    ()=>extractTokenUsageFromMessage,
    "extractToolCalls",
    ()=>extractToolCalls,
    "extractToolsFromCompiledGraph",
    ()=>extractToolsFromCompiledGraph,
    "setResponseAttributes",
    ()=>setResponseAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [app-client] (ecmascript)");
;
;
/**
 * Extract tool calls from messages
 */ function extractToolCalls(messages) {
    if (!messages || messages.length === 0) {
        return null;
    }
    const toolCalls = [];
    for (const message of messages){
        if (message && typeof message === 'object') {
            const msgToolCalls = message.tool_calls;
            if (msgToolCalls && Array.isArray(msgToolCalls)) {
                toolCalls.push(...msgToolCalls);
            }
        }
    }
    return toolCalls.length > 0 ? toolCalls : null;
}
/**
 * Extract token usage from a message's usage_metadata or response_metadata
 * Returns token counts without setting span attributes
 */ function extractTokenUsageFromMessage(message) {
    const msg = message;
    let inputTokens = 0;
    let outputTokens = 0;
    let totalTokens = 0;
    // Extract from usage_metadata (newer format)
    if (msg.usage_metadata && typeof msg.usage_metadata === 'object') {
        const usage = msg.usage_metadata;
        if (typeof usage.input_tokens === 'number') {
            inputTokens = usage.input_tokens;
        }
        if (typeof usage.output_tokens === 'number') {
            outputTokens = usage.output_tokens;
        }
        if (typeof usage.total_tokens === 'number') {
            totalTokens = usage.total_tokens;
        }
        return {
            inputTokens,
            outputTokens,
            totalTokens
        };
    }
    // Fallback: Extract from response_metadata.tokenUsage
    if (msg.response_metadata && typeof msg.response_metadata === 'object') {
        const metadata = msg.response_metadata;
        if (metadata.tokenUsage && typeof metadata.tokenUsage === 'object') {
            const tokenUsage = metadata.tokenUsage;
            if (typeof tokenUsage.promptTokens === 'number') {
                inputTokens = tokenUsage.promptTokens;
            }
            if (typeof tokenUsage.completionTokens === 'number') {
                outputTokens = tokenUsage.completionTokens;
            }
            if (typeof tokenUsage.totalTokens === 'number') {
                totalTokens = tokenUsage.totalTokens;
            }
        }
    }
    return {
        inputTokens,
        outputTokens,
        totalTokens
    };
}
/**
 * Extract model and finish reason from a message's response_metadata
 */ function extractModelMetadata(span, message) {
    const msg = message;
    if (msg.response_metadata && typeof msg.response_metadata === 'object') {
        const metadata = msg.response_metadata;
        if (metadata.model_name && typeof metadata.model_name === 'string') {
            span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"], metadata.model_name);
        }
        if (metadata.finish_reason && typeof metadata.finish_reason === 'string') {
            span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"], [
                metadata.finish_reason
            ]);
        }
    }
}
/**
 * Extract tools from compiled graph structure
 *
 * Tools are stored in: compiledGraph.builder.nodes.tools.runnable.tools
 */ function extractToolsFromCompiledGraph(compiledGraph) {
    if (!compiledGraph.builder?.nodes?.tools?.runnable?.tools) {
        return null;
    }
    const tools = compiledGraph.builder?.nodes?.tools?.runnable?.tools;
    if (!tools || !Array.isArray(tools) || tools.length === 0) {
        return null;
    }
    // Extract name, description, and schema from each tool's lc_kwargs
    return tools.map((tool)=>({
            name: tool.lc_kwargs?.name,
            description: tool.lc_kwargs?.description,
            schema: tool.lc_kwargs?.schema
        }));
}
/**
 * Set response attributes on the span
 */ function setResponseAttributes(span, inputMessages, result) {
    // Extract messages from result
    const resultObj = result;
    const outputMessages = resultObj?.messages;
    if (!outputMessages || !Array.isArray(outputMessages)) {
        return;
    }
    // Get new messages (delta between input and output)
    const inputCount = inputMessages?.length ?? 0;
    const newMessages = outputMessages.length > inputCount ? outputMessages.slice(inputCount) : [];
    if (newMessages.length === 0) {
        return;
    }
    // Extract and set tool calls from new messages BEFORE normalization
    // (normalization strips tool_calls, so we need to extract them first)
    const toolCalls = extractToolCalls(newMessages);
    if (toolCalls) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"], JSON.stringify(toolCalls));
    }
    // Normalize the new messages
    const normalizedNewMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeLangChainMessages"])(newMessages);
    span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"], JSON.stringify(normalizedNewMessages));
    // Accumulate token usage across all messages
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalTokens = 0;
    // Extract metadata from messages
    for (const message of newMessages){
        // Accumulate token usage
        const tokens = extractTokenUsageFromMessage(message);
        totalInputTokens += tokens.inputTokens;
        totalOutputTokens += tokens.outputTokens;
        totalTokens += tokens.totalTokens;
        // Extract model metadata (last message's metadata wins for model/finish_reason)
        extractModelMetadata(span, message);
    }
    // Set accumulated token usage on span
    if (totalInputTokens > 0) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"], totalInputTokens);
    }
    if (totalOutputTokens > 0) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"], totalOutputTokens);
    }
    if (totalTokens > 0) {
        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"], totalTokens);
    }
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langgraph/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentLangGraph",
    ()=>instrumentLangGraph,
    "instrumentStateGraphCompile",
    ()=>instrumentStateGraphCompile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/messageTruncation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langchain/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langgraph/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/langgraph/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
/**
 * Instruments StateGraph's compile method to create spans for agent creation and invocation
 *
 * Wraps the compile() method to:
 * - Create a `gen_ai.create_agent` span when compile() is called
 * - Automatically wrap the invoke() method on the returned compiled graph with a `gen_ai.invoke_agent` span
 *
 */ function instrumentStateGraphCompile(originalCompile, options) {
    return new Proxy(originalCompile, {
        apply (target, thisArg, args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                op: 'gen_ai.create_agent',
                name: 'create_agent',
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGGRAPH_ORIGIN"],
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'gen_ai.create_agent',
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: 'create_agent'
                }
            }, (span)=>{
                try {
                    const compiledGraph = Reflect.apply(target, thisArg, args);
                    const compileOptions = args.length > 0 ? args[0] : {};
                    // Extract graph name
                    if (compileOptions?.name && typeof compileOptions.name === 'string') {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_AGENT_NAME_ATTRIBUTE"], compileOptions.name);
                        span.updateName(`create_agent ${compileOptions.name}`);
                    }
                    // Instrument agent invoke method on the compiled graph
                    const originalInvoke = compiledGraph.invoke;
                    if (originalInvoke && typeof originalInvoke === 'function') {
                        compiledGraph.invoke = instrumentCompiledGraphInvoke(originalInvoke.bind(compiledGraph), compiledGraph, compileOptions, options);
                    }
                    return compiledGraph;
                } catch (error) {
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.langgraph.error'
                        }
                    });
                    throw error;
                }
            });
        }
    });
}
/**
 * Instruments CompiledGraph's invoke method to create spans for agent invocation
 *
 * Creates a `gen_ai.invoke_agent` span when invoke() is called
 */ function instrumentCompiledGraphInvoke(originalInvoke, graphInstance, compileOptions, options) {
    return new Proxy(originalInvoke, {
        apply (target, thisArg, args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                op: 'gen_ai.invoke_agent',
                name: 'invoke_agent',
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGGRAPH_ORIGIN"],
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_INVOKE_AGENT_OPERATION_ATTRIBUTE"],
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: 'invoke_agent'
                }
            }, async (span)=>{
                try {
                    const graphName = compileOptions?.name;
                    if (graphName && typeof graphName === 'string') {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_PIPELINE_NAME_ATTRIBUTE"], graphName);
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_AGENT_NAME_ATTRIBUTE"], graphName);
                        span.updateName(`invoke_agent ${graphName}`);
                    }
                    // Extract available tools from the graph instance
                    const tools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractToolsFromCompiledGraph"])(graphInstance);
                    if (tools) {
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"], JSON.stringify(tools));
                    }
                    // Parse input messages
                    const recordInputs = options.recordInputs;
                    const recordOutputs = options.recordOutputs;
                    const inputMessages = args.length > 0 ? args[0].messages ?? [] : [];
                    if (inputMessages && recordInputs) {
                        const normalizedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langchain$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeLangChainMessages"])(inputMessages);
                        const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$messageTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateGenAiMessages"])(normalizedMessages);
                        span.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"], JSON.stringify(truncatedMessages));
                    }
                    // Call original invoke
                    const result = await Reflect.apply(target, thisArg, args);
                    // Set response attributes
                    if (recordOutputs) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$langgraph$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setResponseAttributes"])(span, inputMessages ?? null, result);
                    }
                    return result;
                } catch (error) {
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.langgraph.error'
                        }
                    });
                    throw error;
                }
            });
        }
    });
}
/**
 * Directly instruments a StateGraph instance to add tracing spans
 *
 * This function can be used to manually instrument LangGraph StateGraph instances
 * in environments where automatic instrumentation is not available or desired.
 *
 * @param stateGraph - The StateGraph instance to instrument
 * @param options - Optional configuration for recording inputs/outputs
 *
 * @example
 * ```typescript
 * import { instrumentLangGraph } from '@sentry/cloudflare';
 * import { StateGraph } from '@langchain/langgraph';
 *
 * const graph = new StateGraph(MessagesAnnotation)
 *   .addNode('agent', mockLlm)
 *   .addEdge(START, 'agent')
 *   .addEdge('agent', END);
 *
 * instrumentLangGraph(graph, { recordInputs: true, recordOutputs: true });
 * const compiled = graph.compile({ name: 'my_agent' });
 * ```
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function instrumentLangGraph(stateGraph, options) {
    const _options = options || {};
    stateGraph.compile = instrumentStateGraphCompile(stateGraph.compile.bind(stateGraph), _options);
    return stateGraph;
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INSTRUMENTED_METHODS",
    ()=>INSTRUMENTED_METHODS,
    "OPENAI_INTEGRATION_NAME",
    ()=>OPENAI_INTEGRATION_NAME,
    "RESPONSES_TOOL_CALL_EVENT_TYPES",
    ()=>RESPONSES_TOOL_CALL_EVENT_TYPES,
    "RESPONSE_EVENT_TYPES",
    ()=>RESPONSE_EVENT_TYPES
]);
const OPENAI_INTEGRATION_NAME = 'OpenAI';
// https://platform.openai.com/docs/quickstart?api-mode=responses
// https://platform.openai.com/docs/quickstart?api-mode=chat
const INSTRUMENTED_METHODS = [
    'responses.create',
    'chat.completions.create',
    'embeddings.create'
];
const RESPONSES_TOOL_CALL_EVENT_TYPES = [
    'response.output_item.added',
    'response.function_call_arguments.delta',
    'response.function_call_arguments.done',
    'response.output_item.done'
];
const RESPONSE_EVENT_TYPES = [
    'response.created',
    'response.in_progress',
    'response.failed',
    'response.completed',
    'response.incomplete',
    'response.queued',
    'response.output_text.delta',
    ...RESPONSES_TOOL_CALL_EVENT_TYPES
];
;
 //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addChatCompletionAttributes",
    ()=>addChatCompletionAttributes,
    "addEmbeddingsAttributes",
    ()=>addEmbeddingsAttributes,
    "addResponsesApiAttributes",
    ()=>addResponsesApiAttributes,
    "buildMethodPath",
    ()=>buildMethodPath,
    "getOperationName",
    ()=>getOperationName,
    "getSpanOperation",
    ()=>getSpanOperation,
    "isChatCompletionChunk",
    ()=>isChatCompletionChunk,
    "isChatCompletionResponse",
    ()=>isChatCompletionResponse,
    "isEmbeddingsResponse",
    ()=>isEmbeddingsResponse,
    "isResponsesApiResponse",
    ()=>isResponsesApiResponse,
    "isResponsesApiStreamEvent",
    ()=>isResponsesApiStreamEvent,
    "setCommonResponseAttributes",
    ()=>setCommonResponseAttributes,
    "setTokenUsageAttributes",
    ()=>setTokenUsageAttributes,
    "shouldInstrument",
    ()=>shouldInstrument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/constants.js [app-client] (ecmascript)");
;
;
/**
 * Maps OpenAI method paths to Sentry operation names
 */ function getOperationName(methodPath) {
    if (methodPath.includes('chat.completions')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].CHAT;
    }
    if (methodPath.includes('responses')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].RESPONSES;
    }
    if (methodPath.includes('embeddings')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_OPERATIONS"].EMBEDDINGS;
    }
    return methodPath.split('.').pop() || 'unknown';
}
/**
 * Get the span operation for OpenAI methods
 * Following Sentry's convention: "gen_ai.{operation_name}"
 */ function getSpanOperation(methodPath) {
    return `gen_ai.${getOperationName(methodPath)}`;
}
/**
 * Check if a method path should be instrumented
 */ function shouldInstrument(methodPath) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSTRUMENTED_METHODS"].includes(methodPath);
}
/**
 * Build method path from current traversal
 */ function buildMethodPath(currentPath, prop) {
    return currentPath ? `${currentPath}.${prop}` : prop;
}
/**
 * Check if response is a Chat Completion object
 */ function isChatCompletionResponse(response) {
    return response !== null && typeof response === 'object' && 'object' in response && response.object === 'chat.completion';
}
/**
 * Check if response is a Responses API object
 */ function isResponsesApiResponse(response) {
    return response !== null && typeof response === 'object' && 'object' in response && response.object === 'response';
}
/**
 * Check if response is an Embeddings API object
 */ function isEmbeddingsResponse(response) {
    if (response === null || typeof response !== 'object' || !('object' in response)) {
        return false;
    }
    const responseObject = response;
    return responseObject.object === 'list' && typeof responseObject.model === 'string' && responseObject.model.toLowerCase().includes('embedding');
}
/**
 * Check if streaming event is from the Responses API
 */ function isResponsesApiStreamEvent(event) {
    return event !== null && typeof event === 'object' && 'type' in event && typeof event.type === 'string' && event.type.startsWith('response.');
}
/**
 * Check if streaming event is a chat completion chunk
 */ function isChatCompletionChunk(event) {
    return event !== null && typeof event === 'object' && 'object' in event && event.object === 'chat.completion.chunk';
}
/**
 * Add attributes for Chat Completion responses
 */ function addChatCompletionAttributes(span, response, recordOutputs) {
    setCommonResponseAttributes(span, response.id, response.model, response.created);
    if (response.usage) {
        setTokenUsageAttributes(span, response.usage.prompt_tokens, response.usage.completion_tokens, response.usage.total_tokens);
    }
    if (Array.isArray(response.choices)) {
        const finishReasons = response.choices.map((choice)=>choice.finish_reason).filter((reason)=>reason !== null);
        if (finishReasons.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(finishReasons)
            });
        }
        // Extract tool calls from all choices (only if recordOutputs is true)
        if (recordOutputs) {
            const toolCalls = response.choices.map((choice)=>choice.message?.tool_calls).filter((calls)=>Array.isArray(calls) && calls.length > 0).flat();
            if (toolCalls.length > 0) {
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(toolCalls)
                });
            }
        }
    }
}
/**
 * Add attributes for Responses API responses
 */ function addResponsesApiAttributes(span, response, recordOutputs) {
    setCommonResponseAttributes(span, response.id, response.model, response.created_at);
    if (response.status) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify([
                response.status
            ])
        });
    }
    if (response.usage) {
        setTokenUsageAttributes(span, response.usage.input_tokens, response.usage.output_tokens, response.usage.total_tokens);
    }
    // Extract function calls from output (only if recordOutputs is true)
    if (recordOutputs) {
        const responseWithOutput = response;
        if (Array.isArray(responseWithOutput.output) && responseWithOutput.output.length > 0) {
            // Filter for function_call type objects in the output array
            const functionCalls = responseWithOutput.output.filter((item)=>typeof item === 'object' && item !== null && item.type === 'function_call');
            if (functionCalls.length > 0) {
                span.setAttributes({
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(functionCalls)
                });
            }
        }
    }
}
/**
 * Add attributes for Embeddings API responses
 */ function addEmbeddingsAttributes(span, response) {
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_MODEL_ATTRIBUTE"]]: response.model,
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: response.model
    });
    if (response.usage) {
        setTokenUsageAttributes(span, response.usage.prompt_tokens, undefined, response.usage.total_tokens);
    }
}
/**
 * Set token usage attributes
 * @param span - The span to add attributes to
 * @param promptTokens - The number of prompt tokens
 * @param completionTokens - The number of completion tokens
 * @param totalTokens - The number of total tokens
 */ function setTokenUsageAttributes(span, promptTokens, completionTokens, totalTokens) {
    if (promptTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_USAGE_PROMPT_TOKENS_ATTRIBUTE"]]: promptTokens,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_INPUT_TOKENS_ATTRIBUTE"]]: promptTokens
        });
    }
    if (completionTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_USAGE_COMPLETION_TOKENS_ATTRIBUTE"]]: completionTokens,
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_OUTPUT_TOKENS_ATTRIBUTE"]]: completionTokens
        });
    }
    if (totalTokens !== undefined) {
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_USAGE_TOTAL_TOKENS_ATTRIBUTE"]]: totalTokens
        });
    }
}
/**
 * Set common response attributes
 * @param span - The span to add attributes to
 * @param id - The response id
 * @param model - The response model
 * @param timestamp - The response timestamp
 */ function setCommonResponseAttributes(span, id, model, timestamp) {
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_ID_ATTRIBUTE"]]: id,
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_ID_ATTRIBUTE"]]: id
    });
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_MODEL_ATTRIBUTE"]]: model,
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_MODEL_ATTRIBUTE"]]: model
    });
    span.setAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPENAI_RESPONSE_TIMESTAMP_ATTRIBUTE"]]: new Date(timestamp * 1000).toISOString()
    });
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/streaming.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentStream",
    ()=>instrumentStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/utils.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * State object used to accumulate information from a stream of OpenAI events/chunks.
 */ /**
 * Processes tool calls from a chat completion chunk delta.
 * Follows the pattern: accumulate by index, then convert to array at the end.
 *
 * @param toolCalls - Array of tool calls from the delta.
 * @param state - The current streaming state to update.
 *
 *  @see https://platform.openai.com/docs/guides/function-calling#streaming
 */ function processChatCompletionToolCalls(toolCalls, state) {
    for (const toolCall of toolCalls){
        const index = toolCall.index;
        if (index === undefined || !toolCall.function) continue;
        // Initialize tool call if this is the first chunk for this index
        if (!(index in state.chatCompletionToolCalls)) {
            state.chatCompletionToolCalls[index] = {
                ...toolCall,
                function: {
                    name: toolCall.function.name,
                    arguments: toolCall.function.arguments || ''
                }
            };
        } else {
            // Accumulate function arguments from subsequent chunks
            const existingToolCall = state.chatCompletionToolCalls[index];
            if (toolCall.function.arguments && existingToolCall?.function) {
                existingToolCall.function.arguments += toolCall.function.arguments;
            }
        }
    }
}
/**
 * Processes a single OpenAI ChatCompletionChunk event, updating the streaming state.
 *
 * @param chunk - The ChatCompletionChunk event to process.
 * @param state - The current streaming state to update.
 * @param recordOutputs - Whether to record output text fragments.
 */ function processChatCompletionChunk(chunk, state, recordOutputs) {
    state.responseId = chunk.id ?? state.responseId;
    state.responseModel = chunk.model ?? state.responseModel;
    state.responseTimestamp = chunk.created ?? state.responseTimestamp;
    if (chunk.usage) {
        // For stream responses, the input tokens remain constant across all events in the stream.
        // Output tokens, however, are only finalized in the last event.
        // Since we can't guarantee that the last event will include usage data or even be a typed event,
        // we update the output token values on every event that includes them.
        // This ensures that output token usage is always set, even if the final event lacks it.
        state.promptTokens = chunk.usage.prompt_tokens;
        state.completionTokens = chunk.usage.completion_tokens;
        state.totalTokens = chunk.usage.total_tokens;
    }
    for (const choice of chunk.choices ?? []){
        if (recordOutputs) {
            if (choice.delta?.content) {
                state.responseTexts.push(choice.delta.content);
            }
            // Handle tool calls from delta
            if (choice.delta?.tool_calls) {
                processChatCompletionToolCalls(choice.delta.tool_calls, state);
            }
        }
        if (choice.finish_reason) {
            state.finishReasons.push(choice.finish_reason);
        }
    }
}
/**
 * Processes a single OpenAI Responses API streaming event, updating the streaming state and span.
 *
 * @param streamEvent - The event to process (may be an error or unknown object).
 * @param state - The current streaming state to update.
 * @param recordOutputs - Whether to record output text fragments.
 * @param span - The span to update with error status if needed.
 */ function processResponsesApiEvent(streamEvent, state, recordOutputs, span) {
    if (!(streamEvent && typeof streamEvent === 'object')) {
        state.eventTypes.push('unknown:non-object');
        return;
    }
    if (streamEvent instanceof Error) {
        span.setStatus({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
            message: 'internal_error'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(streamEvent, {
            mechanism: {
                handled: false,
                type: 'auto.ai.openai.stream-response'
            }
        });
        return;
    }
    if (!('type' in streamEvent)) return;
    const event = streamEvent;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESPONSE_EVENT_TYPES"].includes(event.type)) {
        state.eventTypes.push(event.type);
        return;
    }
    // Handle output text delta
    if (recordOutputs) {
        // Handle tool call events for Responses API
        if (event.type === 'response.output_item.done' && 'item' in event) {
            state.responsesApiToolCalls.push(event.item);
        }
        if (event.type === 'response.output_text.delta' && 'delta' in event && event.delta) {
            state.responseTexts.push(event.delta);
            return;
        }
    }
    if ('response' in event) {
        const { response } = event;
        state.responseId = response.id ?? state.responseId;
        state.responseModel = response.model ?? state.responseModel;
        state.responseTimestamp = response.created_at ?? state.responseTimestamp;
        if (response.usage) {
            // For stream responses, the input tokens remain constant across all events in the stream.
            // Output tokens, however, are only finalized in the last event.
            // Since we can't guarantee that the last event will include usage data or even be a typed event,
            // we update the output token values on every event that includes them.
            // This ensures that output token usage is always set, even if the final event lacks it.
            state.promptTokens = response.usage.input_tokens;
            state.completionTokens = response.usage.output_tokens;
            state.totalTokens = response.usage.total_tokens;
        }
        if (response.status) {
            state.finishReasons.push(response.status);
        }
        if (recordOutputs && response.output_text) {
            state.responseTexts.push(response.output_text);
        }
    }
}
/**
 * Instruments a stream of OpenAI events, updating the provided span with relevant attributes and
 * optionally recording output text. This function yields each event from the input stream as it is processed.
 *
 * @template T - The type of events in the stream.
 * @param stream - The async iterable stream of events to instrument.
 * @param span - The span to add attributes to and to finish at the end of the stream.
 * @param recordOutputs - Whether to record output text fragments in the span.
 * @returns An async generator yielding each event from the input stream.
 */ async function* instrumentStream(stream, span, recordOutputs) {
    const state = {
        eventTypes: [],
        responseTexts: [],
        finishReasons: [],
        responseId: '',
        responseModel: '',
        responseTimestamp: 0,
        promptTokens: undefined,
        completionTokens: undefined,
        totalTokens: undefined,
        chatCompletionToolCalls: {},
        responsesApiToolCalls: []
    };
    try {
        for await (const event of stream){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isChatCompletionChunk"])(event)) {
                processChatCompletionChunk(event, state, recordOutputs);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isResponsesApiStreamEvent"])(event)) {
                processResponsesApiEvent(event, state, recordOutputs, span);
            }
            yield event;
        }
    } finally{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCommonResponseAttributes"])(span, state.responseId, state.responseModel, state.responseTimestamp);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTokenUsageAttributes"])(span, state.promptTokens, state.completionTokens, state.totalTokens);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_STREAMING_ATTRIBUTE"]]: true
        });
        if (state.finishReasons.length) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_FINISH_REASONS_ATTRIBUTE"]]: JSON.stringify(state.finishReasons)
            });
        }
        if (recordOutputs && state.responseTexts.length) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: state.responseTexts.join('')
            });
        }
        // Set tool calls attribute if any were accumulated
        const chatCompletionToolCallsArray = Object.values(state.chatCompletionToolCalls);
        const allToolCalls = [
            ...chatCompletionToolCallsArray,
            ...state.responsesApiToolCalls
        ];
        if (allToolCalls.length > 0) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TOOL_CALLS_ATTRIBUTE"]]: JSON.stringify(allToolCalls)
            });
        }
        span.end();
    }
}
;
 //# sourceMappingURL=streaming.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "instrumentOpenAiClient",
    ()=>instrumentOpenAiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/currentScopes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/gen-ai-attributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/ai/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/streaming.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/openai/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
/**
 * Extract request attributes from method arguments
 */ function extractRequestAttributes(args, methodPath) {
    const attributes = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_SYSTEM_ATTRIBUTE"]]: 'openai',
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_OPERATION_NAME_ATTRIBUTE"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOperationName"])(methodPath),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.ai.openai'
    };
    // Chat completion API accepts web_search_options and tools as parameters
    // we append web search options to the available tools to capture all tool calls
    if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
        const params = args[0];
        const tools = Array.isArray(params.tools) ? params.tools : [];
        const hasWebSearchOptions = params.web_search_options && typeof params.web_search_options === 'object';
        const webSearchOptions = hasWebSearchOptions ? [
            {
                type: 'web_search_options',
                ...params.web_search_options
            }
        ] : [];
        const availableTools = [
            ...tools,
            ...webSearchOptions
        ];
        if (availableTools.length > 0) {
            attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_AVAILABLE_TOOLS_ATTRIBUTE"]] = JSON.stringify(availableTools);
        }
    }
    if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
        const params = args[0];
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = params.model ?? 'unknown';
        if ('temperature' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TEMPERATURE_ATTRIBUTE"]] = params.temperature;
        if ('top_p' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_TOP_P_ATTRIBUTE"]] = params.top_p;
        if ('frequency_penalty' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_FREQUENCY_PENALTY_ATTRIBUTE"]] = params.frequency_penalty;
        if ('presence_penalty' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_PRESENCE_PENALTY_ATTRIBUTE"]] = params.presence_penalty;
        if ('stream' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_STREAM_ATTRIBUTE"]] = params.stream;
        if ('encoding_format' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_ENCODING_FORMAT_ATTRIBUTE"]] = params.encoding_format;
        if ('dimensions' in params) attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_DIMENSIONS_ATTRIBUTE"]] = params.dimensions;
    } else {
        attributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] = 'unknown';
    }
    return attributes;
}
/**
 * Add response attributes to spans
 * This currently supports both Chat Completion and Responses API responses
 */ function addResponseAttributes(span, result, recordOutputs) {
    if (!result || typeof result !== 'object') return;
    const response = result;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isChatCompletionResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addChatCompletionAttributes"])(span, response, recordOutputs);
        if (recordOutputs && response.choices?.length) {
            const responseTexts = response.choices.map((choice)=>choice.message?.content || '');
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: JSON.stringify(responseTexts)
            });
        }
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isResponsesApiResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addResponsesApiAttributes"])(span, response, recordOutputs);
        if (recordOutputs && response.output_text) {
            span.setAttributes({
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_RESPONSE_TEXT_ATTRIBUTE"]]: response.output_text
            });
        }
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEmbeddingsResponse"])(response)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEmbeddingsAttributes"])(span, response);
    }
}
// Extract and record AI request inputs, if present. This is intentionally separate from response attributes.
function addRequestAttributes(span, params) {
    if ('messages' in params) {
        const truncatedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(params.messages);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedMessages
        });
    }
    if ('input' in params) {
        const truncatedInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTruncatedJsonString"])(params.input);
        span.setAttributes({
            [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MESSAGES_ATTRIBUTE"]]: truncatedInput
        });
    }
}
/**
 * Instrument a method with Sentry spans
 * Following Sentry AI Agents Manual Instrumentation conventions
 * @see https://docs.sentry.io/platforms/javascript/guides/node/tracing/instrumentation/ai-agents-module/#manual-instrumentation
 */ function instrumentMethod(originalMethod, methodPath, context, options) {
    return async function instrumentedMethod(...args) {
        const requestAttributes = extractRequestAttributes(args, methodPath);
        const model = requestAttributes[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$ai$2f$gen$2d$ai$2d$attributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GEN_AI_REQUEST_MODEL_ATTRIBUTE"]] || 'unknown';
        const operationName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOperationName"])(methodPath);
        const params = args[0];
        const isStreamRequested = params && typeof params === 'object' && params.stream === true;
        if (isStreamRequested) {
            // For streaming responses, use manual span management to properly handle the async generator lifecycle
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpanManual"])({
                name: `${operationName} ${model} stream-response`,
                op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                attributes: requestAttributes
            }, async (span)=>{
                try {
                    if (options.recordInputs && params) {
                        addRequestAttributes(span, params);
                    }
                    const result = await originalMethod.apply(context, args);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$streaming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["instrumentStream"])(result, span, options.recordOutputs ?? false);
                } catch (error) {
                    // For streaming requests that fail before stream creation, we still want to record
                    // them as streaming requests but end the span gracefully
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"],
                        message: 'internal_error'
                    });
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.openai.stream',
                            data: {
                                function: methodPath
                            }
                        }
                    });
                    span.end();
                    throw error;
                }
            });
        } else {
            //  Non-streaming responses
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: `${operationName} ${model}`,
                op: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSpanOperation"])(methodPath),
                attributes: requestAttributes
            }, async (span)=>{
                try {
                    if (options.recordInputs && params) {
                        addRequestAttributes(span, params);
                    }
                    const result = await originalMethod.apply(context, args);
                    addResponseAttributes(span, result, options.recordOutputs);
                    return result;
                } catch (error) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(error, {
                        mechanism: {
                            handled: false,
                            type: 'auto.ai.openai',
                            data: {
                                function: methodPath
                            }
                        }
                    });
                    throw error;
                }
            });
        }
    };
}
/**
 * Create a deep proxy for OpenAI client instrumentation
 */ function createDeepProxy(target, currentPath = '', options) {
    return new Proxy(target, {
        get (obj, prop) {
            const value = obj[prop];
            const methodPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMethodPath"])(currentPath, String(prop));
            if (typeof value === 'function' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$openai$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldInstrument"])(methodPath)) {
                return instrumentMethod(value, methodPath, obj, options);
            }
            if (typeof value === 'function') {
                // Bind non-instrumented functions to preserve the original `this` context,
                // which is required for accessing private class fields (e.g. #baseURL) in OpenAI SDK v5.
                return value.bind(obj);
            }
            if (value && typeof value === 'object') {
                return createDeepProxy(value, methodPath, options);
            }
            return value;
        }
    });
}
/**
 * Instrument an OpenAI client with Sentry tracing
 * Can be used across Node.js, Cloudflare Workers, and Vercel Edge
 */ function instrumentOpenAiClient(client, options) {
    const sendDefaultPii = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$currentScopes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])()?.getOptions().sendDefaultPii);
    const _options = {
        recordInputs: sendDefaultPii,
        recordOutputs: sendDefaultPii,
        ...options
    };
    return createDeepProxy(client, '', _options);
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/supabase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DB_OPERATIONS_TO_INSTRUMENT",
    ()=>DB_OPERATIONS_TO_INSTRUMENT,
    "FILTER_MAPPINGS",
    ()=>FILTER_MAPPINGS,
    "extractOperation",
    ()=>extractOperation,
    "instrumentSupabaseClient",
    ()=>instrumentSupabaseClient,
    "supabaseIntegration",
    ()=>supabaseIntegration,
    "translateFiltersIntoMethods",
    ()=>translateFiltersIntoMethods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/breadcrumbs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/exports.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/semanticAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/misc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/spanstatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/tracing/trace.js [app-client] (ecmascript)");
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
// Based on Kamil Ogórek's work on:
// https://github.com/supabase-community/sentry-integration-js
const AUTH_OPERATIONS_TO_INSTRUMENT = [
    'reauthenticate',
    'signInAnonymously',
    'signInWithOAuth',
    'signInWithIdToken',
    'signInWithOtp',
    'signInWithPassword',
    'signInWithSSO',
    'signOut',
    'signUp',
    'verifyOtp'
];
const AUTH_ADMIN_OPERATIONS_TO_INSTRUMENT = [
    'createUser',
    'deleteUser',
    'listUsers',
    'getUserById',
    'updateUserById',
    'inviteUserByEmail'
];
const FILTER_MAPPINGS = {
    eq: 'eq',
    neq: 'neq',
    gt: 'gt',
    gte: 'gte',
    lt: 'lt',
    lte: 'lte',
    like: 'like',
    'like(all)': 'likeAllOf',
    'like(any)': 'likeAnyOf',
    ilike: 'ilike',
    'ilike(all)': 'ilikeAllOf',
    'ilike(any)': 'ilikeAnyOf',
    is: 'is',
    in: 'in',
    cs: 'contains',
    cd: 'containedBy',
    sr: 'rangeGt',
    nxl: 'rangeGte',
    sl: 'rangeLt',
    nxr: 'rangeLte',
    adj: 'rangeAdjacent',
    ov: 'overlaps',
    fts: '',
    plfts: 'plain',
    phfts: 'phrase',
    wfts: 'websearch',
    not: 'not'
};
const DB_OPERATIONS_TO_INSTRUMENT = [
    'select',
    'insert',
    'upsert',
    'update',
    'delete'
];
function markAsInstrumented(fn) {
    try {
        fn.__SENTRY_INSTRUMENTED__ = true;
    } catch  {
    // ignore errors here
    }
}
function isInstrumented(fn) {
    try {
        return fn.__SENTRY_INSTRUMENTED__;
    } catch  {
        return false;
    }
}
/**
 * Extracts the database operation type from the HTTP method and headers
 * @param method - The HTTP method of the request
 * @param headers - The request headers
 * @returns The database operation type ('select', 'insert', 'upsert', 'update', or 'delete')
 */ function extractOperation(method, headers = {}) {
    switch(method){
        case 'GET':
            {
                return 'select';
            }
        case 'POST':
            {
                if (headers['Prefer']?.includes('resolution=')) {
                    return 'upsert';
                } else {
                    return 'insert';
                }
            }
        case 'PATCH':
            {
                return 'update';
            }
        case 'DELETE':
            {
                return 'delete';
            }
        default:
            {
                return '<unknown-op>';
            }
    }
}
/**
 * Translates Supabase filter parameters into readable method names for tracing
 * @param key - The filter key from the URL search parameters
 * @param query - The filter value from the URL search parameters
 * @returns A string representation of the filter as a method call
 */ function translateFiltersIntoMethods(key, query) {
    if (query === '' || query === '*') {
        return 'select(*)';
    }
    if (key === 'select') {
        return `select(${query})`;
    }
    if (key === 'or' || key.endsWith('.or')) {
        return `${key}${query}`;
    }
    const [filter, ...value] = query.split('.');
    let method;
    // Handle optional `configPart` of the filter
    if (filter?.startsWith('fts')) {
        method = 'textSearch';
    } else if (filter?.startsWith('plfts')) {
        method = 'textSearch[plain]';
    } else if (filter?.startsWith('phfts')) {
        method = 'textSearch[phrase]';
    } else if (filter?.startsWith('wfts')) {
        method = 'textSearch[websearch]';
    } else {
        method = filter && FILTER_MAPPINGS[filter] || 'filter';
    }
    return `${method}(${key}, ${value.join('.')})`;
}
function instrumentAuthOperation(operation, isAdmin = false) {
    return new Proxy(operation, {
        apply (target, thisArg, argumentsList) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: `auth ${isAdmin ? '(admin) ' : ''}${operation.name}`,
                attributes: {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.db.supabase',
                    [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'db',
                    'db.system': 'postgresql',
                    'db.operation': `auth.${isAdmin ? 'admin.' : ''}${operation.name}`
                }
            }, (span)=>{
                return Reflect.apply(target, thisArg, argumentsList).then((res)=>{
                    if (res && typeof res === 'object' && 'error' in res && res.error) {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"]
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(res.error, {
                            mechanism: {
                                handled: false,
                                type: 'auto.db.supabase.auth'
                            }
                        });
                    } else {
                        span.setStatus({
                            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_OK"]
                        });
                    }
                    span.end();
                    return res;
                }).catch((err)=>{
                    span.setStatus({
                        code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPAN_STATUS_ERROR"]
                    });
                    span.end();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(err, {
                        mechanism: {
                            handled: false,
                            type: 'auto.db.supabase.auth'
                        }
                    });
                    throw err;
                }).then(...argumentsList);
            });
        }
    });
}
function instrumentSupabaseAuthClient(supabaseClientInstance) {
    const auth = supabaseClientInstance.auth;
    if (!auth || isInstrumented(supabaseClientInstance.auth)) {
        return;
    }
    for (const operation of AUTH_OPERATIONS_TO_INSTRUMENT){
        const authOperation = auth[operation];
        if (!authOperation) {
            continue;
        }
        if (typeof supabaseClientInstance.auth[operation] === 'function') {
            supabaseClientInstance.auth[operation] = instrumentAuthOperation(authOperation);
        }
    }
    for (const operation of AUTH_ADMIN_OPERATIONS_TO_INSTRUMENT){
        const authOperation = auth.admin[operation];
        if (!authOperation) {
            continue;
        }
        if (typeof supabaseClientInstance.auth.admin[operation] === 'function') {
            supabaseClientInstance.auth.admin[operation] = instrumentAuthOperation(authOperation, true);
        }
    }
    markAsInstrumented(supabaseClientInstance.auth);
}
function instrumentSupabaseClientConstructor(SupabaseClient) {
    if (isInstrumented(SupabaseClient.prototype.from)) {
        return;
    }
    SupabaseClient.prototype.from = new Proxy(SupabaseClient.prototype.from, {
        apply (target, thisArg, argumentsList) {
            const rv = Reflect.apply(target, thisArg, argumentsList);
            const PostgRESTQueryBuilder = rv.constructor;
            instrumentPostgRESTQueryBuilder(PostgRESTQueryBuilder);
            return rv;
        }
    });
    markAsInstrumented(SupabaseClient.prototype.from);
}
function instrumentPostgRESTFilterBuilder(PostgRESTFilterBuilder) {
    if (isInstrumented(PostgRESTFilterBuilder.prototype.then)) {
        return;
    }
    PostgRESTFilterBuilder.prototype.then = new Proxy(PostgRESTFilterBuilder.prototype.then, {
        apply (target, thisArg, argumentsList) {
            const operations = DB_OPERATIONS_TO_INSTRUMENT;
            const typedThis = thisArg;
            const operation = extractOperation(typedThis.method, typedThis.headers);
            if (!operations.includes(operation)) {
                return Reflect.apply(target, thisArg, argumentsList);
            }
            if (!typedThis?.url?.pathname || typeof typedThis.url.pathname !== 'string') {
                return Reflect.apply(target, thisArg, argumentsList);
            }
            const pathParts = typedThis.url.pathname.split('/');
            const table = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
            const queryItems = [];
            for (const [key, value] of typedThis.url.searchParams.entries()){
                // It's possible to have multiple entries for the same key, eg. `id=eq.7&id=eq.3`,
                // so we need to use array instead of object to collect them.
                queryItems.push(translateFiltersIntoMethods(key, value));
            }
            const body = Object.create(null);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlainObject"])(typedThis.body)) {
                for (const [key, value] of Object.entries(typedThis.body)){
                    body[key] = value;
                }
            }
            // Adding operation to the beginning of the description if it's not a `select` operation
            // For example, it can be an `insert` or `update` operation but the query can be `select(...)`
            // For `select` operations, we don't need repeat it in the description
            const description = `${operation === 'select' ? '' : `${operation}${body ? '(...) ' : ''}`}${queryItems.join(' ')} from(${table})`;
            const attributes = {
                'db.table': table,
                'db.schema': typedThis.schema,
                'db.url': typedThis.url.origin,
                'db.sdk': typedThis.headers['X-Client-Info'],
                'db.system': 'postgresql',
                'db.operation': operation,
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN"]]: 'auto.db.supabase',
                [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$semanticAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEMANTIC_ATTRIBUTE_SENTRY_OP"]]: 'db'
            };
            if (queryItems.length) {
                attributes['db.query'] = queryItems;
            }
            if (Object.keys(body).length) {
                attributes['db.body'] = body;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$trace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startSpan"])({
                name: description,
                attributes
            }, (span)=>{
                return Reflect.apply(target, thisArg, []).then((res)=>{
                    if (span) {
                        if (res && typeof res === 'object' && 'status' in res) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, res.status || 500);
                        }
                        span.end();
                    }
                    if (res.error) {
                        const err = new Error(res.error.message);
                        if (res.error.code) {
                            err.code = res.error.code;
                        }
                        if (res.error.details) {
                            err.details = res.error.details;
                        }
                        const supabaseContext = {};
                        if (queryItems.length) {
                            supabaseContext.query = queryItems;
                        }
                        if (Object.keys(body).length) {
                            supabaseContext.body = body;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$exports$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureException"])(err, (scope)=>{
                            scope.addEventProcessor((e)=>{
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$misc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addExceptionMechanism"])(e, {
                                    handled: false,
                                    type: 'auto.db.supabase.postgres'
                                });
                                return e;
                            });
                            scope.setContext('supabase', supabaseContext);
                            return scope;
                        });
                    }
                    const breadcrumb = {
                        type: 'supabase',
                        category: `db.${operation}`,
                        message: description
                    };
                    const data = {};
                    if (queryItems.length) {
                        data.query = queryItems;
                    }
                    if (Object.keys(body).length) {
                        data.body = body;
                    }
                    if (Object.keys(data).length) {
                        breadcrumb.data = data;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$breadcrumbs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBreadcrumb"])(breadcrumb);
                    return res;
                }, (err)=>{
                    // TODO: shouldn't we capture this error?
                    if (span) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$tracing$2f$spanstatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setHttpStatus"])(span, 500);
                        span.end();
                    }
                    throw err;
                }).then(...argumentsList);
            });
        }
    });
    markAsInstrumented(PostgRESTFilterBuilder.prototype.then);
}
function instrumentPostgRESTQueryBuilder(PostgRESTQueryBuilder) {
    // We need to wrap _all_ operations despite them sharing the same `PostgRESTFilterBuilder`
    // constructor, as we don't know which method will be called first, and we don't want to miss any calls.
    for (const operation of DB_OPERATIONS_TO_INSTRUMENT){
        if (isInstrumented(PostgRESTQueryBuilder.prototype[operation])) {
            continue;
        }
        PostgRESTQueryBuilder.prototype[operation] = new Proxy(PostgRESTQueryBuilder.prototype[operation], {
            apply (target, thisArg, argumentsList) {
                const rv = Reflect.apply(target, thisArg, argumentsList);
                const PostgRESTFilterBuilder = rv.constructor;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log(`Instrumenting ${operation} operation's PostgRESTFilterBuilder`);
                instrumentPostgRESTFilterBuilder(PostgRESTFilterBuilder);
                return rv;
            }
        });
        markAsInstrumented(PostgRESTQueryBuilder.prototype[operation]);
    }
}
const instrumentSupabaseClient = (supabaseClient)=>{
    if (!supabaseClient) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].warn('Supabase integration was not installed because no Supabase client was provided.');
        return;
    }
    const SupabaseClientConstructor = supabaseClient.constructor === Function ? supabaseClient : supabaseClient.constructor;
    instrumentSupabaseClientConstructor(SupabaseClientConstructor);
    instrumentSupabaseAuthClient(supabaseClient);
};
const INTEGRATION_NAME = 'Supabase';
const _supabaseIntegration = (supabaseClient)=>{
    return {
        setupOnce () {
            instrumentSupabaseClient(supabaseClient);
        },
        name: INTEGRATION_NAME
    };
};
const supabaseIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options)=>{
    return _supabaseIntegration(options.supabaseClient);
});
;
 //# sourceMappingURL=supabase.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/public-api.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debug",
    ()=>debug,
    "error",
    ()=>error,
    "fatal",
    ()=>fatal,
    "info",
    ()=>info,
    "trace",
    ()=>trace,
    "warn",
    ()=>warn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/internal.js [app-client] (ecmascript)");
;
;
/**
 * Capture a log with the given level.
 *
 * @param level - The level of the log.
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., userId: 100.
 * @param scope - The scope to capture the log with.
 * @param severityNumber - The severity number of the log.
 */ function captureLog(level, message, attributes, scope, severityNumber) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_captureLog"])({
        level,
        message,
        attributes,
        severityNumber
    }, scope);
}
/**
 * Additional metadata to capture the log with.
 */ /**
 * @summary Capture a log with the `trace` level. Requires the `enableLogs` option to be enabled.
 *
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., { userId: 100, route: '/dashboard' }.
 * @param metadata - additional metadata to capture the log with.
 *
 * @example
 *
 * ```
 * Sentry.logger.trace('User clicked submit button', {
 *   buttonId: 'submit-form',
 *   formId: 'user-profile',
 *   timestamp: Date.now()
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.trace(Sentry.logger.fmt`User ${user} navigated to ${page}`, {
 *   userId: '123',
 *   sessionId: 'abc-xyz'
 * });
 * ```
 */ function trace(message, attributes, { scope } = {}) {
    captureLog('trace', message, attributes, scope);
}
/**
 * @summary Capture a log with the `debug` level. Requires the `enableLogs` option to be enabled.
 *
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., { component: 'Header', state: 'loading' }.
 * @param metadata - additional metadata to capture the log with.
 *
 * @example
 *
 * ```
 * Sentry.logger.debug('Component mounted', {
 *   component: 'UserProfile',
 *   props: { userId: 123 },
 *   renderTime: 150
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.debug(Sentry.logger.fmt`API request to ${endpoint} failed`, {
 *   statusCode: 404,
 *   requestId: 'req-123',
 *   duration: 250
 * });
 * ```
 */ function debug(message, attributes, { scope } = {}) {
    captureLog('debug', message, attributes, scope);
}
/**
 * @summary Capture a log with the `info` level. Requires the `enableLogs` option to be enabled.
 *
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., { feature: 'checkout', status: 'completed' }.
 * @param metadata - additional metadata to capture the log with.
 *
 * @example
 *
 * ```
 * Sentry.logger.info('User completed checkout', {
 *   orderId: 'order-123',
 *   amount: 99.99,
 *   paymentMethod: 'credit_card'
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.info(Sentry.logger.fmt`User ${user} updated profile picture`, {
 *   userId: 'user-123',
 *   imageSize: '2.5MB',
 *   timestamp: Date.now()
 * });
 * ```
 */ function info(message, attributes, { scope } = {}) {
    captureLog('info', message, attributes, scope);
}
/**
 * @summary Capture a log with the `warn` level. Requires the `enableLogs` option to be enabled.
 *
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., { browser: 'Chrome', version: '91.0' }.
 * @param metadata - additional metadata to capture the log with.
 *
 * @example
 *
 * ```
 * Sentry.logger.warn('Browser compatibility issue detected', {
 *   browser: 'Safari',
 *   version: '14.0',
 *   feature: 'WebRTC',
 *   fallback: 'enabled'
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.warn(Sentry.logger.fmt`API endpoint ${endpoint} is deprecated`, {
 *   recommendedEndpoint: '/api/v2/users',
 *   sunsetDate: '2024-12-31',
 *   clientVersion: '1.2.3'
 * });
 * ```
 */ function warn(message, attributes, { scope } = {}) {
    captureLog('warn', message, attributes, scope);
}
/**
 * @summary Capture a log with the `error` level. Requires the `enableLogs` option to be enabled.
 *
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., { error: 'NetworkError', url: '/api/data' }.
 * @param metadata - additional metadata to capture the log with.
 *
 * @example
 *
 * ```
 * Sentry.logger.error('Failed to load user data', {
 *   error: 'NetworkError',
 *   url: '/api/users/123',
 *   statusCode: 500,
 *   retryCount: 3
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.error(Sentry.logger.fmt`Payment processing failed for order ${orderId}`, {
 *   error: 'InsufficientFunds',
 *   amount: 100.00,
 *   currency: 'USD',
 *   userId: 'user-456'
 * });
 * ```
 */ function error(message, attributes, { scope } = {}) {
    captureLog('error', message, attributes, scope);
}
/**
 * @summary Capture a log with the `fatal` level. Requires the `enableLogs` option to be enabled.
 *
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., { appState: 'corrupted', sessionId: 'abc-123' }.
 * @param metadata - additional metadata to capture the log with.
 *
 * @example
 *
 * ```
 * Sentry.logger.fatal('Application state corrupted', {
 *   lastKnownState: 'authenticated',
 *   sessionId: 'session-123',
 *   timestamp: Date.now(),
 *   recoveryAttempted: true
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.fatal(Sentry.logger.fmt`Critical system failure in ${service}`, {
 *   service: 'payment-processor',
 *   errorCode: 'CRITICAL_FAILURE',
 *   affectedUsers: 150,
 *   timestamp: Date.now()
 * });
 * ```
 */ function fatal(message, attributes, { scope } = {}) {
    captureLog('fatal', message, attributes, scope);
}
;
 //# sourceMappingURL=public-api.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/parameterize.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Tagged template function which returns parameterized representation of the message
 * For example: parameterize`This is a log statement with ${x} and ${y} params`, would return:
 * "__sentry_template_string__": 'This is a log statement with %s and %s params',
 * "__sentry_template_values__": ['first', 'second']
 *
 * @param strings An array of string values splitted between expressions
 * @param values Expressions extracted from template string
 *
 * @returns A `ParameterizedString` object that can be passed into `captureMessage` or Sentry.logger.X methods.
 */ __turbopack_context__.s([
    "fmt",
    ()=>fmt,
    "parameterize",
    ()=>parameterize
]);
function parameterize(strings, ...values) {
    const formatted = new String(String.raw(strings, ...values));
    formatted.__sentry_template_string__ = strings.join('\x00').replace(/%/g, '%%').replace(/\0/g, '%s');
    formatted.__sentry_template_values__ = values;
    return formatted;
}
/**
 * Tagged template function which returns parameterized representation of the message.
 *
 * @param strings An array of string values splitted between expressions
 * @param values Expressions extracted from template string
 * @returns A `ParameterizedString` object that can be passed into `captureMessage` or Sentry.logger.X methods.
 */ const fmt = parameterize;
;
 //# sourceMappingURL=parameterize.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/public-api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debug",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["debug"],
    "error",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["error"],
    "fatal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fatal"],
    "fmt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parameterize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmt"],
    "info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["info"],
    "trace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["trace"],
    "warn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["warn"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/public-api.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$parameterize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/parameterize.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/public-api.js [app-client] (ecmascript) <export * as logger>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$logs$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/logs/public-api.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metrics/public-api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "count",
    ()=>count,
    "distribution",
    ()=>distribution,
    "gauge",
    ()=>gauge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metrics/internal.js [app-client] (ecmascript)");
;
/**
 * Options for capturing a metric.
 */ /**
 * Capture a metric with the given type, name, and value.
 *
 * @param type - The type of the metric.
 * @param name - The name of the metric.
 * @param value - The value of the metric.
 * @param options - Options for capturing the metric.
 */ function captureMetric(type, name, value, options) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$internal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_captureMetric"])({
        type,
        name,
        value,
        unit: options?.unit,
        attributes: options?.attributes
    }, {
        scope: options?.scope
    });
}
/**
 * @summary Increment a counter metric. Requires the `_experiments.enableMetrics` option to be enabled.
 *
 * @param name - The name of the counter metric.
 * @param value - The value to increment by (defaults to 1).
 * @param options - Options for capturing the metric.
 *
 * @example
 *
 * ```
 * Sentry.metrics.count('api.requests', 1, {
 *   attributes: {
 *     endpoint: '/api/users',
 *     method: 'GET',
 *     status: 200
 *   }
 * });
 * ```
 *
 * @example With custom value
 *
 * ```
 * Sentry.metrics.count('items.processed', 5, {
 *   attributes: {
 *     processor: 'batch-processor',
 *     queue: 'high-priority'
 *   }
 * });
 * ```
 */ function count(name, value = 1, options) {
    captureMetric('counter', name, value, options);
}
/**
 * @summary Set a gauge metric to a specific value. Requires the `_experiments.enableMetrics` option to be enabled.
 *
 * @param name - The name of the gauge metric.
 * @param value - The current value of the gauge.
 * @param options - Options for capturing the metric.
 *
 * @example
 *
 * ```
 * Sentry.metrics.gauge('memory.usage', 1024, {
 *   unit: 'megabyte',
 *   attributes: {
 *     process: 'web-server',
 *     region: 'us-east-1'
 *   }
 * });
 * ```
 *
 * @example Without unit
 *
 * ```
 * Sentry.metrics.gauge('active.connections', 42, {
 *   attributes: {
 *     server: 'api-1',
 *     protocol: 'websocket'
 *   }
 * });
 * ```
 */ function gauge(name, value, options) {
    captureMetric('gauge', name, value, options);
}
/**
 * @summary Record a value in a distribution metric. Requires the `_experiments.enableMetrics` option to be enabled.
 *
 * @param name - The name of the distribution metric.
 * @param value - The value to record in the distribution.
 * @param options - Options for capturing the metric.
 *
 * @example
 *
 * ```
 * Sentry.metrics.distribution('task.duration', 500, {
 *   unit: 'millisecond',
 *   attributes: {
 *     task: 'data-processing',
 *     priority: 'high'
 *   }
 * });
 * ```
 *
 * @example Without unit
 *
 * ```
 * Sentry.metrics.distribution('batch.size', 100, {
 *   attributes: {
 *     processor: 'batch-1',
 *     type: 'async'
 *   }
 * });
 * ```
 */ function distribution(name, value, options) {
    captureMetric('distribution', name, value, options);
}
;
 //# sourceMappingURL=public-api.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metrics/public-api.js [app-client] (ecmascript) <export * as metrics>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "metrics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metrics$2f$public$2d$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metrics/public-api.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metadata.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addMetadataToStackFrames",
    ()=>addMetadataToStackFrames,
    "getMetadataForUrl",
    ()=>getMetadataForUrl,
    "stripMetadataFromStackFrames",
    ()=>stripMetadataFromStackFrames
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/worldwide.js [app-client] (ecmascript)");
;
/** Keys are source filename/url, values are metadata objects. */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
const filenameMetadataMap = new Map();
/** Set of stack strings that have already been parsed. */ const parsedStacks = new Set();
function ensureMetadataStacksAreParsed(parser) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]._sentryModuleMetadata) {
        return;
    }
    for (const stack of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]._sentryModuleMetadata)){
        const metadata = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$worldwide$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GLOBAL_OBJ"]._sentryModuleMetadata[stack];
        if (parsedStacks.has(stack)) {
            continue;
        }
        // Ensure this stack doesn't get parsed again
        parsedStacks.add(stack);
        const frames = parser(stack);
        // Go through the frames starting from the top of the stack and find the first one with a filename
        for (const frame of frames.reverse()){
            if (frame.filename) {
                // Save the metadata for this filename
                filenameMetadataMap.set(frame.filename, metadata);
                break;
            }
        }
    }
}
/**
 * Retrieve metadata for a specific JavaScript file URL.
 *
 * Metadata is injected by the Sentry bundler plugins using the `_experiments.moduleMetadata` config option.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMetadataForUrl(parser, filename) {
    ensureMetadataStacksAreParsed(parser);
    return filenameMetadataMap.get(filename);
}
/**
 * Adds metadata to stack frames.
 *
 * Metadata is injected by the Sentry bundler plugins using the `_experiments.moduleMetadata` config option.
 */ function addMetadataToStackFrames(parser, event) {
    event.exception?.values?.forEach((exception)=>{
        exception.stacktrace?.frames?.forEach((frame)=>{
            if (!frame.filename || frame.module_metadata) {
                return;
            }
            const metadata = getMetadataForUrl(parser, frame.filename);
            if (metadata) {
                frame.module_metadata = metadata;
            }
        });
    });
}
/**
 * Strips metadata from stack frames.
 */ function stripMetadataFromStackFrames(event) {
    event.exception?.values?.forEach((exception)=>{
        exception.stacktrace?.frames?.forEach((frame)=>{
            delete frame.module_metadata;
        });
    });
}
;
 //# sourceMappingURL=metadata.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/moduleMetadata.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "moduleMetadataIntegration",
    ()=>moduleMetadataIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metadata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
;
;
;
/**
 * Adds module metadata to stack frames.
 *
 * Metadata can be injected by the Sentry bundler plugins using the `moduleMetadata` config option.
 *
 * When this integration is added, the metadata passed to the bundler plugin is added to the stack frames of all events
 * under the `module_metadata` property. This can be used to help in tagging or routing of events from different teams
 * our sources
 */ const moduleMetadataIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(()=>{
    return {
        name: 'ModuleMetadata',
        setup (client) {
            // We need to strip metadata from stack frames before sending them to Sentry since these are client side only.
            client.on('beforeEnvelope', (envelope)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
                    if (type === 'event') {
                        const event = Array.isArray(item) ? item[1] : undefined;
                        if (event) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripMetadataFromStackFrames"])(event);
                            item[1] = event;
                        }
                    }
                });
            });
            client.on('applyFrameMetadata', (event)=>{
                // Only apply stack frame metadata to error events
                if (event.type) {
                    return;
                }
                const stackParser = client.getOptions().stackParser;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMetadataToStackFrames"])(stackParser, event);
            });
        }
    };
});
;
 //# sourceMappingURL=moduleMetadata.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/third-party-errors-filter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "thirdPartyErrorFilterIntegration",
    ()=>thirdPartyErrorFilterIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/metadata.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/stacktrace.js [app-client] (ecmascript)");
;
;
;
;
/**
 * This integration allows you to filter out, or tag error events that do not come from user code marked with a bundle key via the Sentry bundler plugins.
 */ const thirdPartyErrorFilterIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])((options)=>{
    return {
        name: 'ThirdPartyErrorsFilter',
        setup (client) {
            // We need to strip metadata from stack frames before sending them to Sentry since these are client side only.
            client.on('beforeEnvelope', (envelope)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachEnvelopeItem"])(envelope, (item, type)=>{
                    if (type === 'event') {
                        const event = Array.isArray(item) ? item[1] : undefined;
                        if (event) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripMetadataFromStackFrames"])(event);
                            item[1] = event;
                        }
                    }
                });
            });
            client.on('applyFrameMetadata', (event)=>{
                // Only apply stack frame metadata to error events
                if (event.type) {
                    return;
                }
                const stackParser = client.getOptions().stackParser;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$metadata$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMetadataToStackFrames"])(stackParser, event);
            });
        },
        processEvent (event) {
            const frameKeys = getBundleKeysForAllFramesWithFilenames(event);
            if (frameKeys) {
                const arrayMethod = options.behaviour === 'drop-error-if-contains-third-party-frames' || options.behaviour === 'apply-tag-if-contains-third-party-frames' ? 'some' : 'every';
                const behaviourApplies = frameKeys[arrayMethod]((keys)=>!keys.some((key)=>options.filterKeys.includes(key)));
                if (behaviourApplies) {
                    const shouldDrop = options.behaviour === 'drop-error-if-contains-third-party-frames' || options.behaviour === 'drop-error-if-exclusively-contains-third-party-frames';
                    if (shouldDrop) {
                        return null;
                    } else {
                        event.tags = {
                            ...event.tags,
                            third_party_code: true
                        };
                    }
                }
            }
            return event;
        }
    };
});
function getBundleKeysForAllFramesWithFilenames(event) {
    const frames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$stacktrace$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFramesFromEvent"])(event);
    if (!frames) {
        return undefined;
    }
    return frames// Exclude frames without a filename or without lineno and colno,
    // since these are likely native code or built-ins
    .filter((frame)=>!!frame.filename && (frame.lineno ?? frame.colno) != null).map((frame)=>{
        if (frame.module_metadata) {
            return Object.keys(frame.module_metadata).filter((key)=>key.startsWith(BUNDLER_PLUGIN_APP_KEY_PREFIX)).map((key)=>key.slice(BUNDLER_PLUGIN_APP_KEY_PREFIX.length));
        }
        return [];
    });
}
const BUNDLER_PLUGIN_APP_KEY_PREFIX = '_sentryBundlerPluginAppKey:';
;
 //# sourceMappingURL=third-party-errors-filter.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/zoderrors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyZodErrorsToEvent",
    ()=>applyZodErrorsToEvent,
    "flattenIssue",
    ()=>flattenIssue,
    "flattenIssuePath",
    ()=>flattenIssuePath,
    "formatIssueMessage",
    ()=>formatIssueMessage,
    "zodErrorsIntegration",
    ()=>zodErrorsIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/is.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/string.js [app-client] (ecmascript)");
;
;
;
const DEFAULT_LIMIT = 10;
const INTEGRATION_NAME = 'ZodErrors';
/**
 * Simplified ZodIssue type definition
 */ function originalExceptionIsZodError(originalException) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$is$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isError"])(originalException) && originalException.name === 'ZodError' && Array.isArray(originalException.issues);
}
/**
 * Formats child objects or arrays to a string
 * that is preserved when sent to Sentry.
 *
 * Without this, we end up with something like this in Sentry:
 *
 * [
 *  [Object],
 *  [Object],
 *  [Object],
 *  [Object]
 * ]
 */ function flattenIssue(issue) {
    return {
        ...issue,
        path: 'path' in issue && Array.isArray(issue.path) ? issue.path.join('.') : undefined,
        keys: 'keys' in issue ? JSON.stringify(issue.keys) : undefined,
        unionErrors: 'unionErrors' in issue ? JSON.stringify(issue.unionErrors) : undefined
    };
}
/**
 * Takes ZodError issue path array and returns a flattened version as a string.
 * This makes it easier to display paths within a Sentry error message.
 *
 * Array indexes are normalized to reduce duplicate entries
 *
 * @param path ZodError issue path
 * @returns flattened path
 *
 * @example
 * flattenIssuePath([0, 'foo', 1, 'bar']) // -> '<array>.foo.<array>.bar'
 */ function flattenIssuePath(path) {
    return path.map((p)=>{
        if (typeof p === 'number') {
            return '<array>';
        } else {
            return p;
        }
    }).join('.');
}
/**
 * Zod error message is a stringified version of ZodError.issues
 * This doesn't display well in the Sentry UI. Replace it with something shorter.
 */ function formatIssueMessage(zodError) {
    const errorKeyMap = new Set();
    for (const iss of zodError.issues){
        const issuePath = flattenIssuePath(iss.path);
        if (issuePath.length > 0) {
            errorKeyMap.add(issuePath);
        }
    }
    const errorKeys = Array.from(errorKeyMap);
    if (errorKeys.length === 0) {
        // If there are no keys, then we're likely validating the root
        // variable rather than a key within an object. This attempts
        // to extract what type it was that failed to validate.
        // For example, z.string().parse(123) would return "string" here.
        let rootExpectedType = 'variable';
        if (zodError.issues.length > 0) {
            const iss = zodError.issues[0];
            if (iss !== undefined && 'expected' in iss && typeof iss.expected === 'string') {
                rootExpectedType = iss.expected;
            }
        }
        return `Failed to validate ${rootExpectedType}`;
    }
    return `Failed to validate keys: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncate"])(errorKeys.join(', '), 100)}`;
}
/**
 * Applies ZodError issues to an event extra and replaces the error message
 */ function applyZodErrorsToEvent(limit, saveZodIssuesAsAttachment = false, event, hint) {
    if (!event.exception?.values || !hint.originalException || !originalExceptionIsZodError(hint.originalException) || hint.originalException.issues.length === 0) {
        return event;
    }
    try {
        const issuesToFlatten = saveZodIssuesAsAttachment ? hint.originalException.issues : hint.originalException.issues.slice(0, limit);
        const flattenedIssues = issuesToFlatten.map(flattenIssue);
        if (saveZodIssuesAsAttachment) {
            // Sometimes having the full error details can be helpful.
            // Attachments have much higher limits, so we can include the full list of issues.
            if (!Array.isArray(hint.attachments)) {
                hint.attachments = [];
            }
            hint.attachments.push({
                filename: 'zod_issues.json',
                data: JSON.stringify({
                    issues: flattenedIssues
                })
            });
        }
        return {
            ...event,
            exception: {
                ...event.exception,
                values: [
                    {
                        ...event.exception.values[0],
                        value: formatIssueMessage(hint.originalException)
                    },
                    ...event.exception.values.slice(1)
                ]
            },
            extra: {
                ...event.extra,
                'zoderror.issues': flattenedIssues.slice(0, limit)
            }
        };
    } catch (e) {
        // Hopefully we never throw errors here, but record it
        // with the event just in case.
        return {
            ...event,
            extra: {
                ...event.extra,
                'zoderrors sentry integration parse error': {
                    message: 'an exception was thrown while processing ZodError within applyZodErrorsToEvent()',
                    error: e instanceof Error ? `${e.name}: ${e.message}\n${e.stack}` : 'unknown'
                }
            }
        };
    }
}
const _zodErrorsIntegration = (options = {})=>{
    const limit = options.limit ?? DEFAULT_LIMIT;
    return {
        name: INTEGRATION_NAME,
        processEvent (originalEvent, hint) {
            const processedEvent = applyZodErrorsToEvent(limit, options.saveZodIssuesAsAttachment, originalEvent, hint);
            return processedEvent;
        }
    };
};
/**
 * Sentry integration to process Zod errors, making them easier to work with in Sentry.
 */ const zodErrorsIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(_zodErrorsIntegration);
;
 //# sourceMappingURL=zoderrors.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript) <export _setSpanForScope as _INTERNAL_setSpanForScope>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_INTERNAL_setSpanForScope",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_setSpanForScope"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$spanOnScope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/spanOnScope.js [app-client] (ecmascript)");
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/transports/offline.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIN_DELAY",
    ()=>MIN_DELAY,
    "START_DELAY",
    ()=>START_DELAY,
    "makeOfflineTransport",
    ()=>makeOfflineTransport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/debug-build.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/envelope.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$ratelimit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/ratelimit.js [app-client] (ecmascript)");
;
;
;
;
const MIN_DELAY = 100; // 100 ms
const START_DELAY = 5000; // 5 seconds
const MAX_DELAY = 3.6e6; // 1 hour
/**
 * Wraps a transport and stores and retries events when they fail to send.
 *
 * @param createTransport The transport to wrap.
 */ function makeOfflineTransport(createTransport) {
    function log(...args) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$debug$2d$build$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBUG_BUILD"] && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$debug$2d$logger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debug"].log('[Offline]:', ...args);
    }
    return (options)=>{
        const transport = createTransport(options);
        if (!options.createStore) {
            throw new Error('No `createStore` function was provided');
        }
        const store = options.createStore(options);
        let retryDelay = START_DELAY;
        let flushTimer;
        function shouldQueue(env, error, retryDelay) {
            // We want to drop client reports because they can be generated when we retry sending events while offline.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["envelopeContainsItemType"])(env, [
                'client_report'
            ])) {
                return false;
            }
            if (options.shouldStore) {
                return options.shouldStore(env, error, retryDelay);
            }
            return true;
        }
        function flushIn(delay) {
            if (flushTimer) {
                clearTimeout(flushTimer);
            }
            flushTimer = setTimeout(async ()=>{
                flushTimer = undefined;
                const found = await store.shift();
                if (found) {
                    log('Attempting to send previously queued event');
                    // We should to update the sent_at timestamp to the current time.
                    found[0].sent_at = new Date().toISOString();
                    void send(found, true).catch((e)=>{
                        log('Failed to retry sending', e);
                    });
                }
            }, delay);
            // We need to unref the timer in node.js, otherwise the node process never exit.
            if (typeof flushTimer !== 'number' && flushTimer.unref) {
                flushTimer.unref();
            }
        }
        function flushWithBackOff() {
            if (flushTimer) {
                return;
            }
            flushIn(retryDelay);
            retryDelay = Math.min(retryDelay * 2, MAX_DELAY);
        }
        async function send(envelope, isRetry = false) {
            // We queue all replay envelopes to avoid multiple replay envelopes being sent at the same time. If one fails, we
            // need to retry them in order.
            if (!isRetry && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$envelope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["envelopeContainsItemType"])(envelope, [
                'replay_event',
                'replay_recording'
            ])) {
                await store.push(envelope);
                flushIn(MIN_DELAY);
                return {};
            }
            try {
                if (options.shouldSend && await options.shouldSend(envelope) === false) {
                    throw new Error('Envelope not sent because `shouldSend` callback returned false');
                }
                const result = await transport.send(envelope);
                let delay = MIN_DELAY;
                if (result) {
                    // If there's a retry-after header, use that as the next delay.
                    if (result.headers?.['retry-after']) {
                        delay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$ratelimit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseRetryAfterHeader"])(result.headers['retry-after']);
                    } else if (result.headers?.['x-sentry-rate-limits']) {
                        delay = 60000; // 60 seconds
                    } else if ((result.statusCode || 0) >= 400) {
                        return result;
                    }
                }
                flushIn(delay);
                retryDelay = START_DELAY;
                return result;
            } catch (e) {
                if (await shouldQueue(envelope, e, retryDelay)) {
                    // If this envelope was a retry, we want to add it to the front of the queue so it's retried again first.
                    if (isRetry) {
                        await store.unshift(envelope);
                    } else {
                        await store.push(envelope);
                    }
                    flushWithBackOff();
                    log('Error sending. Event queued.', e);
                    return {};
                } else {
                    throw e;
                }
            }
        }
        if (options.flushAtStartup) {
            flushWithBackOff();
        }
        return {
            send,
            flush: (timeout)=>{
                // If there's no timeout, we should attempt to flush the offline queue.
                if (timeout === undefined) {
                    retryDelay = START_DELAY;
                    flushIn(MIN_DELAY);
                }
                return transport.flush(timeout);
            }
        };
    };
}
;
 //# sourceMappingURL=offline.js.map
}),
"[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integrations/featureFlags/growthbook.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "growthbookIntegration",
    ()=>growthbookIntegration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/integration.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/featureFlags.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@sentry+core@10.29.0/node_modules/@sentry/core/build/esm/utils/object.js [app-client] (ecmascript)");
;
;
;
/**
 * Sentry integration for capturing feature flag evaluations from GrowthBook.
 *
 * Only boolean results are captured at this time.
 *
 * @example
 * ```typescript
 * import { GrowthBook } from '@growthbook/growthbook';
 * import * as Sentry from '@sentry/browser'; // or '@sentry/node'
 *
 * Sentry.init({
 *   dsn: 'your-dsn',
 *   integrations: [
 *     Sentry.growthbookIntegration({ growthbookClass: GrowthBook })
 *   ]
 * });
 * ```
 */ const growthbookIntegration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$integration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineIntegration"])(({ growthbookClass })=>{
    return {
        name: 'GrowthBook',
        setupOnce () {
            const proto = growthbookClass.prototype;
            // Type guard and wrap isOn
            if (typeof proto.isOn === 'function') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'isOn', _wrapAndCaptureBooleanResult);
            }
            // Type guard and wrap getFeatureValue
            if (typeof proto.getFeatureValue === 'function') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$object$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fill"])(proto, 'getFeatureValue', _wrapAndCaptureBooleanResult);
            }
        },
        processEvent (event, _hint, _client) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_copyFlagsFromScopeToEvent"])(event);
        }
    };
});
function _wrapAndCaptureBooleanResult(original) {
    return function(...args) {
        const flagName = args[0];
        const result = original.apply(this, args);
        if (typeof flagName === 'string' && typeof result === 'boolean') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_insertFlagToScope"])(flagName, result);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$core$40$10$2e$29$2e$0$2f$node_modules$2f40$sentry$2f$core$2f$build$2f$esm$2f$utils$2f$featureFlags$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_INTERNAL_addFeatureFlagToActiveSpan"])(flagName, result);
        }
        return result;
    };
}
;
 //# sourceMappingURL=growthbook.js.map
}),
]);

//# debugId=1a0cd62f-76dc-3e05-a9ab-e6b61b6b3f1f
//# sourceMappingURL=e64cf_%40sentry_core_build_esm_cedcb229._.js.map