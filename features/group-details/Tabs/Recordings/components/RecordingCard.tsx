import Image from "next/image";

function RecordingCard() {
  return (
    <div className="flex gap-[12px] items-center border border-gray-light p-[24px]">
      <Image
        src={"download.svg"}
        alt="download"
        width={32}
        height={32}
        className="w-[32px] h-[32px]"
      />
      <span className="text-[20px]">06.02.2025</span>
    </div>
  );
}

export default RecordingCard;
