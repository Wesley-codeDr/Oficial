"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 dark:bg-gray-900">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <svg
                className="h-10 w-10 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Erro Crítico
            </h1>

            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Ocorreu um erro inesperado no sistema. Nossa equipe foi
              notificada automaticamente.
            </p>

            {error.digest && (
              <p className="mb-6 rounded bg-gray-100 p-2 font-mono text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                Referência: {error.digest}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Tentar novamente
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Ir para o início
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}