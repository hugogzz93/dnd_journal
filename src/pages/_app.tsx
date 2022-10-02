import { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider} from 'react-query'

import { queryClient } from 'services'
import '../styles/globals.css';


const MyApp = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
        </Hydrate>
    </QueryClientProvider>
);

export default MyApp;
