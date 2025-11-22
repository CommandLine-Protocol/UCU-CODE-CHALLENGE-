import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state and validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules object
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Update form field value
   */
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  /**
   * Mark field as touched
   */
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    validateField(name, values[name]);
  }, [values]);

  /**
   * Validate a single field
   */
  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return true;

    let error = null;

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      error = rule.requiredMessage || `${name} is required`;
    }
    // Custom validation function
    else if (rule.validate && typeof rule.validate === 'function') {
      const customError = rule.validate(value, values);
      if (customError) {
        error = customError;
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error || undefined
    }));

    return !error;
  }, [validationRules, values]);

  /**
   * Validate all fields
   */
  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const rule = validationRules[name];
      if (rule.required && (!values[name] || (typeof values[name] === 'string' && !values[name].trim()))) {
        newErrors[name] = rule.requiredMessage || `${name} is required`;
        isValid = false;
      } else if (rule.validate) {
        const error = rule.validate(values[name], values);
        if (error) {
          newErrors[name] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * Set form values (useful for prefilling)
   */
  const setFormValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues: setFormValues
  };
};

