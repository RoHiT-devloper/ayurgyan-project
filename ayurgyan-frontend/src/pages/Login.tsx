import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-logo">
          <div className="logo-icon">A</div>
        </div>
        <h2 className="login-title">Sign in to AyurGyan</h2>
        <p className="login-subtitle">
          Or{' '}
          <Link to="/register" className="login-link">
            create a new account
          </Link>
        </p>
      </div>

      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading && <LoadingSpinner size="sm" />}
            <span>{loading ? 'Signing in...' : 'Sign in'}</span>
          </button>
        </form>

        <div className="login-divider">
          <div className="divider-line"></div>
          <div className="divider-text">Important Notice</div>
        </div>

        <div className="login-notice">
          <p className="notice-text">
            Always consult healthcare professionals before using herbal remedies. 
            This platform is for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;