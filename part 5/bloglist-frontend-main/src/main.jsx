import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from './store/AppProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
);
