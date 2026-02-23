import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from './store/AppProvider';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
