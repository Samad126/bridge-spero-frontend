import Image from "next/image";

interface IconButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

export function IconButton({
  icon,
  alt,
  onClick,
  ariaLabel,
  className = "",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-[62px] border-r border-gray-light flex justify-center items-center cursor-pointer h-full ${className}`}
      aria-label={ariaLabel}
    >
      <Image
        src={icon}
        alt={alt}
        width={22}
        height={22}
        priority
        className="min-w-[22px] min-h-[22px]"
      />
    </button>
  );
}
