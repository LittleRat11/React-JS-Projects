import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer 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`,
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
