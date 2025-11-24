function Search() {
  return (
    <div>
      <div className="container">
        <div className="flex flex-col mx-auto gap-[24px] max-w-[1052px] xxl:flex-row xxl:gap-[12px]">
          <div className="flex flex-1 flex-col xxl:flex-row">
            <p className="flex-1 xxl:max-w-[109px] w-full">
              <select className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-secondary">
                <option className="p-0! rounded-none text-red-500" value="all">
                  Groups
                </option>
              </select>
            </p>
            <p className="flex-1 xxl:max-w-[232.33px] w-full">
              <input
                type="text"
                placeholder="Group Name"
                className="border border-gray-light h-[46px] px-[12px] w-full outline-0 border-spacing-x-2 inline-block placeholder:text-tertiary"
              />
            </p>
            <p className="flex-1 xxl:max-w-[232.33px] w-full">
              <select className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-tertiary">
                <option value="all">Language</option>
              </select>
            </p>
            <p className="flex-1 xxl:max-w-[232.33px] w-full">
              <select className="border border-gray-light h-[46px] px-[12px] w-full inline-block text-tertiary">
                <option value="all">Degree</option>
              </select>
            </p>
          </div>
          <button className="block text-center py-[11px] bg-secondary text-white h-[46px] xxl:w-full xxl:max-w-[234px]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;