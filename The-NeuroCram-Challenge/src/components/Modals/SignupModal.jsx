import ModalWrapper from '../UI/ModalWrapper';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useForm } from '../../hooks/useForm';

const SignupModal = ({ isOpen, onClose, onLoginClick, onSignupSuccess }) => {
  const { values, errors, handleChange, handleBlur, validate } = useForm(
    { name: '', email: '', password: '', userTag: '' },
    {
      name: { required: true },
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
      },
      userTag: { required: false }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate signup
      console.log('Signup:', values);
      if (onSignupSuccess) {
        onSignupSuccess();
      }
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Create Account"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
          placeholder="Enter your name"
        />

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
          placeholder="Create a password"
        />

        <Input
          type="text"
          name="userTag"
          label="User Tag (Optional)"
          value={values.userTag}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.userTag}
          placeholder="Choose a username"
        />

        <div className="flex flex-col gap-3 pt-4">
          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
          
          <div className="text-center text-sm text-soft-gray">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onLoginClick) onLoginClick();
              }}
              className="text-neon-teal hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default SignupModal;

