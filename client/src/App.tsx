import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';
import { apolloClient } from './services/apolloClient';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activity  from './pages/Activity';
import Product from './pages/Product';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider>
        <AuthProvider>
          <Router>
          <Notifications position='top-right'/>
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
                    <Product />
                  </>
                  }
                />
                <Route
                  path="/activity"
                  element={
                    <>
                      <Activity />
                    </>
                }
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
