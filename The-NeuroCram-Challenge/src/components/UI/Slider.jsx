import { useState } from 'react';

/**
 * Reusable Slider component
 */
const Slider = ({
  name,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value || min);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  const currentValue = value !== undefined ? value : localValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-soft-gray">
            {label}
          </label>
          {showValue && (
            <span className="text-neon-teal font-bold">{currentValue}</span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          name={name}
          value={currentValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-full h-2 bg-graphite rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #29E6D2 0%, #29E6D2 ${percentage}%, #1E1E26 ${percentage}%, #1E1E26 100%)`
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Slider;

