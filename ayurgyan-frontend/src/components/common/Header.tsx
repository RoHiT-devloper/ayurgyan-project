import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Herb Catalog', href: '/herbs' },
    { name: 'Search', href: '/search' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AyurGyan</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="btn btn-secondary text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-500">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;