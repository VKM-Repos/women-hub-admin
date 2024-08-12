import { Routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, ToastPosition } from "react-hot-toast";
import useAppStore from "./lib/store/app.store";
function App() {
  const queryClient = new QueryClient();
  const { loggedIn } = useAppStore();
  const toastConfig = {
    position: "top-center" as ToastPosition,
    duration: 3000,
    style: {
      minWidth: "250px",
    },
    success: {
      icon: "👍",
    },
    error: {
      icon: "❌",
    },
    loading: {
      icon: "⏳",
      duration: Infinity,
    },
  } as const;

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={toastConfig} />
      {/* <Routes isAuthorized={loggedIn} /> */}
      <Routes isAuthorized={true} />
    </QueryClientProvider>
  );
}

export default App;
