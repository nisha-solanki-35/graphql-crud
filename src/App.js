import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client';
import Routes from './Routes/index'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'https://apollo-graphql-chat-app.herokuapp.com/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://apollo-graphql-chat-app.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('gql_token');

  operation.setContext({
    headers: {
      authorization: token ? token : ''
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
}

export default App;
