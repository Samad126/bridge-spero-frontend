interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ 
  message = "Something went wrong. Please try again later.",
  onRetry 
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[60px] px-[20px]">
      <div className="text-center max-w-[400px]">
        <p className="text-secondary text-[18px] mb-[24px]">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="border py-[12px] px-[24px] border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

