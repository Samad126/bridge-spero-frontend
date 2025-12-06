import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-[60px]">
      <h1 className="text-[48px] font-medium text-primary mb-[24px]">
        Group Not Found
      </h1>
      <p className="text-[20px] text-secondary mb-[32px] text-center max-w-[600px]">
        The group you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/explore-groups"
        className="bg-secondary text-white px-[32px] py-[12px] text-[18px] hover:bg-opacity-90 transition-all"
      >
        Explore Groups
      </Link>
    </div>
  );
}

