import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ ...this.state, error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <br />
          <h5>Error Details:</h5>
          <hr />
          <p>{this.state.errorInfo}</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
