import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { store } from './app/store.js';
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SkeletonTheme } from 'react-loading-skeleton';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor='#181818' highlightColor='#282828' borderRadius={15} >
          <App />
        </SkeletonTheme>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster position='top-center' reverseOrder={false} />
    </Provider>
  </StrictMode >,
)
