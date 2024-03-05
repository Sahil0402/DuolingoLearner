const Alert = ({ message, type, onClose }) => {
  return (
    <div
    className={`absolute top-15 left-1/2 transform -translate-x-1/2 ${
        type === "Success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
      } px-4 py-3 rounded w-96 max-w-md z-10`}
      role="alert"
    >
      <strong className="font-bold">{type}</strong>
      <span className="block">{message}</span>
      {onClose && (
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default Alert;
