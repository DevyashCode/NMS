const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        color: 'transparent',
        backgroundImage: 'linear-gradient(120deg, rgba(181, 181, 181, 0.64) 40%, rgba(255, 255, 255, 1) 50%, rgba(181, 181, 181, 0.64) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: disabled ? 'none' : `shineEffect ${speed}s ease-in-out infinite`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shineEffect {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ShinyText;
