import React from "react";
import { SessionProvider } from "next-auth/react";

const withSessionProvider = (Component: React.ComponentType) => {
  return function WithSessionProvider(props: Record<string, unknown>) {
    return (
      <SessionProvider>
        <Component {...props} />
      </SessionProvider>
    );
  };
};

export default withSessionProvider;
