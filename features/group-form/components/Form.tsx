import Image from "next/image";

function Form() {
  return (
    <div className="container">
      <form action="">
        <div className="grid grid-cols-1 gap-[18px] xxl:grid-cols-4 xxl:gap-x-[12px] xxl:gap-y-[24px]">
          <p>
            <label className="block mb-[8px]" htmlFor="name">
              Group Name
            </label>
            <input
              type="text"
              className="h-[43px] px-[12px] outline-0 w-full border border-gray-light"
            />
          </p>
          <p>
            <label className="block mb-[8px]" htmlFor="name">
              Degree
            </label>
            <select className="h-[43px] px-[12px] outline-0 w-full border border-gray-light">
              <option value="all">Language</option>
            </select>
          </p>
          <p>
            <label className="block mb-[8px]" htmlFor="name">
              Teaching Language
            </label>
            <input
              type="text"
              className="h-[43px] px-[12px] outline-0 w-full border border-gray-light"
            />
          </p>
          <div>
            <label className="block mb-[8px]" htmlFor="name">
              Lesson Start Date *
            </label>
            <div className="flex items-center border border-gray-light gap-[12px]">
              <label
                className="pl-[12px] flex items-center justify-center h-[43px] select-none"
                htmlFor="lesson-start-date"
              >
                <Image
                  src={"/calendar.svg"}
                  alt="calendar"
                  width={22}
                  height={22}
                  className="min-w-[22px] h-[22px]"
                />
              </label>
              <input
                id="lesson-start-date"
                type="date"
                className="h-[43px] pr-[12px] outline-0 w-full"
              />
            </div>
          </div>
          <p>
            <label className="block mb-[8px]" htmlFor="duration">
              Duration (months) *
            </label>
            <select className="h-[43px] px-[12px] outline-0 w-full border border-gray-light">
              <option value="">1</option>
            </select>
          </p>
          <p>
            <label className="block mb-[8px]" htmlFor="min-students">
              Minimum Students *
            </label>
            <select className="h-[43px] px-[12px] outline-0 w-full border border-gray-light">
              <option value="">1</option>
            </select>
          </p>
          <p>
            <label className="block mb-[8px]" htmlFor="max-students">
              Maximum Students *
            </label>
            <select className="h-[43px] px-[12px] outline-0 w-full border border-gray-light">
              <option value="">1</option>
            </select>
          </p>
          <p>
            <label className="block mb-[8px]" htmlFor="price">
              Price (monthly) *
            </label>
            <input
              id="price"
              type="text"
              placeholder="Price"
              className="h-[43px] px-[12px] outline-0 w-full border border-gray-light"
            />
          </p>
        </div>
        <div className="flex items-center gap-[18px] xxl:gap-[12px]">
            {/* PUT HERE */}
        </div>
      </form>
    </div>
  );
}

export default Form;
