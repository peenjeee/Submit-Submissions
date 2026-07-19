import PropTypes from 'prop-types';

function Textarea({
  className = '',
  ...props
}) {
  const baseClasses = 'flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
  const combinedClassName = `${baseClasses} ${className}`.trim();

  return (
    <textarea
      className={combinedClassName}
      {...props}
    />
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
};

export default Textarea;
