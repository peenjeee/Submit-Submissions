import PropTypes from 'prop-types';

function Badge({
  children,
  variant = 'secondary',
  className = '',
  onClick,
  ...props
}) {
  const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none';

  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'text-foreground border-border hover:bg-accent',
  };

  const interactiveClass = onClick ? 'cursor-pointer' : '';
  const combinedClassName = `${baseClasses} ${variants[variant] || variants.secondary} ${interactiveClass} ${className}`.trim();

  return (
    <span
      className={combinedClassName}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'secondary', 'outline']),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Badge;
