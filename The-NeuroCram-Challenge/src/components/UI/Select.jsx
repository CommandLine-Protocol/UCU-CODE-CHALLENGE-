/**
 * Reusable Select component with glassmorphism styling
 */
const Select = ({
  name,
  value,
  onChange,
  onBlur,
  options = [],
  label,
  error,
  required = false,
  placeholder = 'Select an option',
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur ? () => onBlur(name) : undefined}
        className={`input-field ${error ? 'border-infrared focus:ring-infrared/50' : ''} ${className}`}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option 
            key={option.value || option} 
            value={option.value || option}
            className="bg-graphite text-soft-gray"
          >
            {option.label || option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-infrared">{error}</p>
      )}
    </div>
  );
};

export default Select;

