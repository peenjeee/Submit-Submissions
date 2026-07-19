import PropTypes from 'prop-types';

function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function CardTitle({ className = '', children, ...props }) {
  return (
    <h3
      className={`font-semibold leading-none tracking-tight text-lg ${className}`.trim()}
      {...props}
    >
      {children}
    </h3>
  );
}

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function CardDescription({ className = '', children, ...props }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}

CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-6 pt-0 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function CardFooter({ className = '', children, ...props }) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
