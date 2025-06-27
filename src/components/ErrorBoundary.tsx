import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Bug,
  Mail,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Generate a unique error ID for tracking
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would send this to your error reporting service
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // This would integrate with services like Sentry, LogRocket, etc.
    const errorReport = {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: "anonymous", // This would come from your auth context
    };

    // Example: Send to monitoring service
    if (process.env.NODE_ENV === "production") {
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport)
      // }).catch(() => {
      //   // Fail silently if error reporting fails
      // });
    }

    // Store in localStorage as backup
    try {
      const existingErrors = JSON.parse(
        localStorage.getItem("errorLogs") || "[]",
      );
      existingErrors.push(errorReport);
      // Keep only last 10 errors
      const recentErrors = existingErrors.slice(-10);
      localStorage.setItem("errorLogs", JSON.stringify(recentErrors));
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private handleReportBug = () => {
    const subject = encodeURIComponent(`Bug Report: ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
Error Message: ${this.state.error?.message}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}

Steps to reproduce:
1. 
2. 
3. 

Additional details:

    `);

    window.open(
      `mailto:support@savanna-marketplace.com?subject=${subject}&body=${body}`,
    );
  };

  private copyErrorDetails = () => {
    const errorDetails = `
Error ID: ${this.state.errorId}
Message: ${this.state.error?.message}
Stack: ${this.state.error?.stack}
Component Stack: ${this.state.errorInfo?.componentStack}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
    `.trim();

    navigator.clipboard
      .writeText(errorDetails)
      .then(() => {
        alert("Error details copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy error details");
      });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            {/* Main Error Card */}
            <Card className="border-red-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-800">
                  Oops! Something went wrong
                </CardTitle>
                <p className="text-red-600">
                  We're sorry, but something unexpected happened in the Savanna
                  Marketplace.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error ID */}
                <Alert>
                  <Bug className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>
                        Error ID:{" "}
                        <code className="font-mono text-sm">
                          {this.state.errorId}
                        </code>
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={this.copyErrorDetails}
                        className="h-6 px-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Error Message */}
                {this.state.error && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Error Details:
                    </h4>
                    <p className="text-sm text-gray-600 font-mono">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button onClick={this.handleReload} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reload Page
                  </Button>

                  <Button
                    variant="outline"
                    onClick={this.handleGoHome}
                    className="w-full"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>

                  <Button
                    variant="outline"
                    onClick={this.handleReportBug}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Report Bug
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-center text-sm text-gray-600">
                  <p>
                    If this problem persists, please contact our support team.
                  </p>
                  <p className="mt-1">
                    <a
                      href="https://savanna-marketplace.com/help"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      Visit Help Center <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>

                {/* Development Details */}
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <details className="mt-6">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                      Developer Details (Development Only)
                    </summary>
                    <div className="mt-3 p-4 bg-gray-100 rounded-lg text-xs">
                      <div className="mb-3">
                        <strong>Stack Trace:</strong>
                        <pre className="mt-1 whitespace-pre-wrap text-red-600">
                          {this.state.error.stack}
                        </pre>
                      </div>

                      {this.state.errorInfo && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 whitespace-pre-wrap text-blue-600">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  What happened?
                </h4>
                <p className="text-sm text-blue-700">
                  A technical error occurred while processing your request. This
                  has been automatically logged and our development team will
                  investigate. Your data and account remain secure.
                </p>
              </CardContent>
            </Card>

            {/* Safari/Wildlife themed encouragement */}
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">🦁</div>
              <p className="text-sm">
                Even the strongest lions sometimes stumble on the savanna.
                <br />
                Let's get you back on track!
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Higher-order component for easy wrapping
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void,
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// Hook for programmatic error reporting
export const useErrorReporting = () => {
  const reportError = (error: Error, context?: string) => {
    // This would be called programmatically to report errors
    console.error("Manual error report:", error, context);

    // In production, send to error reporting service
    if (process.env.NODE_ENV === "production") {
      // Implementation would go here
    }
  };

  return { reportError };
};
