import PropTypes from 'prop-types';

function Avatar({
  src,
  alt = 'Avatar',
  fallback = 'U',
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  const combinedClassName = `relative flex shrink-0 overflow-hidden rounded-full border border-border bg-secondary items-center justify-center font-semibold text-secondary-foreground uppercase ${sizes[size] || sizes.md} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      <span className="absolute z-0">{fallback.slice(0, 2)}</span>
      {src && (
        <img
          src={src}
          alt={alt}
          className="relative z-10 aspect-square h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Avatar;
