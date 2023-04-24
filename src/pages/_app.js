import { BackgroundImage } from '@/components/background';
import { FooterElement } from '@/components/footer';
import { AppNavigations } from '@/components/navbar';
import { AppContextProvider } from '@/contexts';
import '@/styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 86400000
      }
    }
  });

  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <BackgroundImage />
          <div className='flex flex-col' style={{ minHeight: "100vh" }}>
            <AppNavigations />
            <Component {...pageProps} />
            <FooterElement />
          </div>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </AppContextProvider>
  )
}
