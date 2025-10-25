import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import AuthProvider from "./components/Providers/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { ToastContainer } from "react-toastify";       
import "react-toastify/dist/ReactToastify.css";       
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}> 
            <PrimeReactProvider value={{ pt: Tailwind }}>
              <AuthProvider>
                <AppRouter />
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss pauseOnHover draggable  theme='light' />
              </AuthProvider>
            </PrimeReactProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
