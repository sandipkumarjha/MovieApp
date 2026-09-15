import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (!formData.email || !formData.password) {
      setError('Please enter email and password.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      console.log('Signup successful:', data);

      setMessage(
        'Account created! Please check your email to confirm your account.'
      );

      setFormData({
        email: '',
        password: '',
      });

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-6 sm:p-8">

        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center mt-2">
          Join NEXA Movie App
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-zinc-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-[#6556CD]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-[#6556CD]"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="text-green-400 text-sm">
              {message}
            </p>
          )}

          {/* Signup button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6556CD] hover:bg-[#574bc4] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p className="text-zinc-400 text-center mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#6556CD] hover:underline"
          >
            Login
          </Link>
        </p>

        <button
          onClick={() => navigate('/')}
          className="block mx-auto mt-4 text-zinc-500 hover:text-white text-sm"
        >
          ← Continue browsing
        </button>

      </div>
    </div>
  );
};

export default Signup;