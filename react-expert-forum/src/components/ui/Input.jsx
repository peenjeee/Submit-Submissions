import PropTypes from 'prop-types';

function Input({
  type = 'text',
  className = '',
  ...props
}) {
  const baseClasses = 'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
  const combinedClassName = `${baseClasses} ${className}`.trim();

  return (
    <input
      type={type}
      className={combinedClassName}
      {...props}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
