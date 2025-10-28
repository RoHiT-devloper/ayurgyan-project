import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import HerbCatalog from './pages/HerbCatalog';
import HerbDetail from './pages/HerbDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/herbs" element={<HerbCatalog />} />
                <Route path="/herbs/:id" element={<HerbDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;