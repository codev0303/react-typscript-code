import React, { Component, ErrorInfo, ReactNode } from "react";

import NotFoundPage from "../NoPageFound/NotFoundPage";

interface Props {
  children?: ReactNode;
  message?: string;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
  errorInfo?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({errorMessage: error as unknown as string})
  }

  public render() {
    if (this.state.hasError) {
     
      return (
      <>
      
     <NotFoundPage title={String(this.state.errorMessage)}/>
     </>
     )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
