import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';
import { apolloClient } from './services/apolloClient';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Placeholder from './pages/Placeholder';
import Product from './pages/Product';

import '@mantine/core/styles.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/products"
                  element={
                  <>
                    <Placeholder title="Products" description="This page will be built later" />
                    <Product />
                  </>
                  }
                />
                <Route
                  path="/bought"
                  element={<Placeholder title="Bought Products" description="This page will be built later" />}
                />
                <Route
                  path="/sold"
                  element={<Placeholder title="Sold Products" description="This page will be built later" />}
                />
                <Route
                  path="/rented"
                  element={<Placeholder title="Rented Products" description="This page will be built later" />}
                />
                <Route
                  path="/lent"
                  element={<Placeholder title="Lent Products" description="This page will be built later" />}
                />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default App;
