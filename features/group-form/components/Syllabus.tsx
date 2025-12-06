import Image from "next/image";

function Syllabus() {
  return (
    <div className="flex-1 w-full">
      <label htmlFor="syllabus" className="block mb-[8px]">
        Syllabus *
      </label>
      <label
        htmlFor="syllabus"
        className="flex items-center h-[43px] border border-gray-light cursor-pointer"
      >
        <div className="h-[43px] w-[43px] flex items-center justify-center border-r border-gray-light">
          <Image
            src="/upload.svg"
            alt="upload"
            width={20}
            height={20}
            className="min-w-[20px] h-[20px]"
          />
        </div>
        <span className="flex-1 px-[12px] text-gray-400">Upload File</span>
        <input id="syllabus" type="file" className="hidden" />
      </label>
    </div>
  );
}

export default Syllabus;