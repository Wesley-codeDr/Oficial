"use client";

import * as Sentry from "@sentry/nextjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Custom error classes for testing
class SentryExampleFrontendError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleFrontendError";
  }
}

export default function SentryExamplePage() {
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error" | "blocked";
    message: string;
  }>({ type: "idle", message: "" });
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check connectivity by attempting to send a test event
    async function checkConnectivity() {
      try {
        // Simple connectivity check - if Sentry is configured, it should work
        // We'll assume connected by default and let errors show if there's a problem
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    }
    checkConnectivity();
  }, []);

  const handleThrowError = async () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      await Sentry.startSpan(
        {
          name: "Example Frontend/Backend Span",
          op: "test",
        },
        async (span) => {
          span.setAttribute("test_type", "error_demo");
          span.setAttribute("user_action", "button_click");

              const res = await fetch("/api/sentry-example-api");
              if (!res.ok) {
            span.setAttribute("api_error", true);
          }
        }
      );

      throw new SentryExampleFrontendError(
        "This error is raised on the frontend of the example page."
      );
    } catch (error) {
      Sentry.captureException(error);
      setStatus({
        type: "success",
        message: "Erro enviado para o Sentry com sucesso!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSpan = async () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      await Sentry.startSpan(
        {
          op: "ui.click",
          name: "Test Button Click",
        },
        async (span) => {
          const value = "some config";
          const metric = "some metric";

          span.setAttribute("config", value);
          span.setAttribute("metric", metric);

          // Simulate some work
          await new Promise((resolve) => {
            globalThis.setTimeout?.(resolve, 500);
          });
        }
      );

      setStatus({
        type: "success",
        message: "Span criado e enviado para o Sentry!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao criar span: " + String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogs = () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const { logger } = Sentry;

      if (logger) {
        logger.trace("Starting test operation", { operation: "log_test" });
        logger.debug(logger.fmt`Testing debug log with userId: ${"user_123"}`);
        logger.info("Test operation completed", { operationId: 345 });
        logger.warn("Rate limit reached for endpoint", {
          endpoint: "/api/test",
          isEnterprise: false,
        });
        logger.error("Test error log", {
          orderId: "order_123",
          amount: 99.99,
        });

        setStatus({
          type: "success",
          message: "Logs enviados para o Sentry!",
        });
      } else {
        setStatus({
          type: "error",
          message: "Logger não está disponível. Verifique a configuração do Sentry.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao enviar logs: " + String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestAPI = async () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      await Sentry.startSpan(
        {
          op: "http.client",
          name: "GET /api/sentry-example-api",
        },
        async (span) => {
          const response = await fetch("/api/sentry-example-api");
          span.setAttribute("http.status_code", response.status);
          span.setAttribute("http.method", "GET");

          if (!response.ok) {
            span.setAttribute("error", true);
            const error = new Error(`API returned ${response.status}`);
            Sentry.captureException(error);
            throw error;
          }

          return await response.json();
        }
      );

      setStatus({
        type: "success",
        message: "Requisição API rastreada no Sentry!",
      });
    } catch (error) {
      Sentry.captureException(error);
      setStatus({
        type: "error",
        message: "Erro na requisição API (esperado para teste)",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestException = () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const error = new Error("Exceção de teste capturada pelo Sentry");
      error.name = "TestException";
      Sentry.captureException(error, {
        tags: {
          test_type: "manual_exception",
        },
        extra: {
          context: "Sentry Example Page",
          timestamp: new Date().toISOString(),
        },
      });

      setStatus({
        type: "success",
        message: "Exceção capturada e enviada para o Sentry!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao capturar exceção: " + String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestUndefinedFunction = () => {
    setIsLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      throw new ReferenceError("myUndefinedFunction is not defined");
    } catch (error) {
      // Capture the error explicitly to ensure it's sent to Sentry
      Sentry.captureException(error, {
        tags: {
          test_type: "undefined_function",
          error_type: "ReferenceError",
        },
        extra: {
          context: "Sentry Example Page - Undefined Function Test",
          timestamp: new Date().toISOString(),
          function_name: "myUndefinedFunction",
        },
      });

      setStatus({
        type: "success",
        message: "Erro de função indefinida capturado e enviado para o Sentry!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <svg
              height="40"
              width="40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M21.85 2.995a3.698 3.698 0 0 1 1.353 1.354l16.303 28.278a3.703 3.703 0 0 1-1.354 5.053 3.694 3.694 0 0 1-1.848.496h-3.828a31.149 31.149 0 0 0 0-3.09h3.815a.61.61 0 0 0 .537-.917L20.523 5.893a.61.61 0 0 0-1.057 0l-3.739 6.494a28.948 28.948 0 0 1 9.63 10.453 28.988 28.988 0 0 1 3.499 13.78v1.542h-9.852v-1.544a19.106 19.106 0 0 0-2.182-8.85 19.08 19.08 0 0 0-6.032-6.829l-1.85 3.208a15.377 15.377 0 0 1 6.382 12.484v1.542H3.696A3.694 3.694 0 0 1 0 34.473c0-.648.17-1.286.494-1.849l2.33-4.074a8.562 8.562 0 0 1 2.689 1.536L3.158 34.17a.611.611 0 0 0 .538.917h8.448a12.481 12.481 0 0 0-6.037-9.09l-1.344-.772 4.908-8.545 1.344.77a22.16 22.16 0 0 1 7.705 7.444 22.193 22.193 0 0 1 3.316 10.193h3.699a25.892 25.892 0 0 0-3.811-12.033 25.856 25.856 0 0 0-9.046-8.796l-1.344-.772 5.269-9.136a3.698 3.698 0 0 1 3.2-1.849c.648 0 1.285.17 1.847.495Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-3xl font-bold text-foreground">
              Sentry Example Page
            </h1>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Teste as funcionalidades do Sentry nesta página. Clique nos botões
            abaixo e visualize os eventos no{" "}
            <a
              href="https://wellwaveoficial.sentry.io/issues/?project=4510497457831936"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Sentry Dashboard
            </a>
            . Para mais detalhes sobre configuração do Sentry,{" "}
            <a
              href="https://docs.sentry.io/platforms/javascript/guides/nextjs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              leia nossa documentação
            </a>
            .
          </p>
        </div>

        {/* Status Message */}
        {status.type !== "idle" && (
          <div
            className={`p-4 rounded-lg border ${
              status.type === "success"
                ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100"
                : status.type === "error"
                ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100"
                : "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100"
            }`}
          >
            <p className="font-medium">{status.message}</p>
          </div>
        )}

        {/* Connectivity Warning */}
        {!isConnected && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
            <p className="font-medium">
              ⚠️ Requisições de rede para o Sentry estão sendo bloqueadas, o que
              impedirá a captura de erros. Tente desabilitar seu bloqueador de
              anúncios para completar o teste.
            </p>
          </div>
        )}

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleThrowError}
            disabled={!isConnected || isLoading}
            variant="destructive"
            className="w-full"
          >
            {isLoading ? "Enviando..." : "Lançar Erro Completo"}
          </Button>

          <Button
            onClick={handleTestSpan}
            disabled={!isConnected || isLoading}
            variant="default"
            className="w-full"
          >
            {isLoading ? "Criando..." : "Testar Span (UI Click)"}
          </Button>

          <Button
            onClick={handleTestAPI}
            disabled={!isConnected || isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? "Testando..." : "Testar Span (API Call)"}
          </Button>

          <Button
            onClick={handleTestLogs}
            disabled={!isConnected || isLoading}
            variant="secondary"
            className="w-full"
          >
            {isLoading ? "Enviando..." : "Testar Logs"}
          </Button>

          <Button
            onClick={handleTestException}
            disabled={!isConnected || isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? "Capturando..." : "Capturar Exceção Manual"}
          </Button>

          <Button
            onClick={handleTestUndefinedFunction}
            disabled={!isConnected || isLoading}
            variant="destructive"
            className="w-full"
          >
            {isLoading ? "Testando..." : "Testar Função Indefinida"}
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Exceptions</h3>
            <p className="text-sm text-muted-foreground">
              Captura exceções automaticamente ou manualmente usando{" "}
              <code className="text-xs bg-muted px-1 rounded">
                captureException
              </code>
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Spans</h3>
            <p className="text-sm text-muted-foreground">
              Rastreia performance de operações usando{" "}
              <code className="text-xs bg-muted px-1 rounded">startSpan</code>{" "}
              com atributos e métricas
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2">Logs</h3>
            <p className="text-sm text-muted-foreground">
              Envia logs estruturados usando o logger do Sentry com níveis
              trace, debug, info, warn, error e fatal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
