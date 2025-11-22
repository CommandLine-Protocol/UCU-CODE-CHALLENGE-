/**
 * Reusable Input component with glassmorphism styling
 */
const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-soft-gray mb-2"
        >
          {label}
          {required && <span className="text-infrared ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur ? () => onBlur(name) : undefined}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-infrared focus:ring-infrared/50' : ''} ${className}`}
        required={required}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-infrared">{error}</p>
      )}
    </div>
  );
};

export default Input;

