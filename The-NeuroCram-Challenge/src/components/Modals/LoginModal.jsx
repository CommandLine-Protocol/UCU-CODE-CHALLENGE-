import { useState } from 'react';
import ModalWrapper from '../UI/ModalWrapper';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useForm } from '../../hooks/useForm';
import { ADMIN_CREDENTIALS, isAdminUser } from '../../data/testData';

const LoginModal = ({ isOpen, onClose, onSignupClick, onLoginSuccess }) => {
  const { values, errors, handleChange, handleBlur, validate } = useForm(
    { email: '', password: '' },
    {
      email: {
        required: true,
        validate: (value) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }
          return null;
        }
      },
      password: {
        required: true,
        validate: (value) => {
          if (value.length < 6) {
            return 'Password must be at least 6 characters';
          }
          return null;
        }
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Check if admin credentials
      const isAdmin = isAdminUser(values.email) && values.password === ADMIN_CREDENTIALS.password;
      
      // Simulate login
      console.log('Login:', values);
      if (onLoginSuccess) {
        // Pass email to identify admin user
        onLoginSuccess(values.email, isAdmin);
      }
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Login"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
          placeholder="Enter your email"
        />

        <Input
          type="password"
          name="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          required
          placeholder="Enter your password"
        />

        <div className="flex flex-col gap-3 pt-4">
          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
          
          <div className="text-center text-sm text-soft-gray">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSignupClick) onSignupClick();
              }}
              className="text-neon-teal hover:underline"
            >
              Create account
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default LoginModal;

