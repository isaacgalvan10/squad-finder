import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import Project from './pages/Project';
import Profile from './pages/Profile';
// import Footer from './components/Footer';
import { GlobalProvider } from './utils/GlobalState';
import Notification from './components/Notification';
// import RequestModal from './components/RequestModal';
import CreatePostModal from './components/CreatePostModal';
import LoginModal from './components/LoginModal';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <GlobalProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/searchResults/:input" element={<SearchResults />} />
              <Route path="/project/:projectId" element={<Project />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Routes>
            {/* <Footer /> */}
            {Auth.loggedIn() ? (
              <>
                <Notification />
                {/* <RequestModal /> */}
                <CreatePostModal />
              </>
            ) : null}
            <LoginModal />
          </GlobalProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
