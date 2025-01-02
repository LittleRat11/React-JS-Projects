import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${Token}`,
  },
});

    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    
  </StrictMode>,
)
