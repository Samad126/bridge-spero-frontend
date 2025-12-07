import Image from "next/image";

function ResourcesCard({ cardStatus }: { cardStatus: "view-edit" | "add" }) {
  return (
    <div className="border border-gray-light w-full">
      {cardStatus === "view-edit" && (
        <div className="p-[24px] flex items-center justify-between w-full">
          <div className="w-full flex items-center gap-[12px]">
            <Image
              src={"/file-text.svg"}
              alt="file text"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
            <p className="text-[20px]">Resource Name</p>
          </div>
          <button>
            <Image src={"/trash-2.svg"} alt="delete" width={22} height={22} />
          </button>
        </div>
      )}
      {cardStatus === "add" && (
        <button className="p-[24px] flex gap-[12px] w-full h-full items-center">
          <Image src={"/plus.svg"} alt="plus" width={22} height={22} />
          <span className="text-[20px]">Add</span>
        </button>
      )}
    </div>
  );
}
export default ResourcesCard;
