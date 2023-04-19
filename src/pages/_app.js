import { BackgroundImage } from '@/components/background';
import { FooterElement } from '@/components/footer';
import { AppNavigations } from '@/components/navbar';
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundImage />
      {/* <div className='flex flex-col justify-between'>
        <div className='h-full'>
          <AppNavigations />
          <Component {...pageProps} />
        </div>
        <FooterElement />
      </div> */}
      <AppNavigations />
      <Component {...pageProps} />
      <FooterElement />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
