import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "@/store";
import AuthInitializer from "@/components/auth/AuthInitializer";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </Provider>
  );
}