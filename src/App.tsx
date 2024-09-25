import { Routes } from './routes';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster, ToastPosition } from 'react-hot-toast';
import useAppStore from './lib/store/app.store';
import useResetAllStores from './store/useResetAll.store';
function App() {
  const { logout } = useAppStore();
  const resetAllStores = useResetAllStores();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => {
        if (error.response.status === 401) {
          resetAllStores();
          logout();
        }
      },
    }),
  });
  const { loggedIn } = useAppStore();
  const toastConfig = {
    position: 'top-center' as ToastPosition,
    duration: 3000,
    style: {
      minWidth: '250px',
    },
    success: {
      icon: '👍',
    },
    error: {
      icon: '❌',
    },
    loading: {
      icon: '⏳',
      duration: Infinity,
    },
  } as const;

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={toastConfig} />
      <Routes isAuthorized={loggedIn} />
    </QueryClientProvider>
  );
}

export default App;
