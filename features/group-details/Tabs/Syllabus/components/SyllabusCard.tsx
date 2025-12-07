import Image from "next/image";

function SyllabusCard() {
  return (
    <div className="flex gap-[12px] items-center border border-gray-light p-[24px]">
      <Image
        src={"/file-text.svg"}
        alt="file text"
        width={32}
        height={32}
        className="w-[32px] h-[32px]"
      />
      <span className="text-[20px]">Syllabus</span>
    </div>
  );
}

export default SyllabusCard;
