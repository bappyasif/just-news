import { BackgroundImage } from '@/components/background';
import { FooterElement } from '@/components/footer';
import { AppNavigations } from '@/components/navbar';
import '@/styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
// import { useDehydratedState } from 'use-dehydrated-state';

export default function App({ Component, pageProps }) {
  // const queryClient = new QueryClient();
  // const [queryClient] = useState(() => new QueryClient())

  // const dehydratedState = useDehydratedState();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 86400000
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <BackgroundImage />
        <AppNavigations />
        <Component {...pageProps} />
        <FooterElement />
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}
