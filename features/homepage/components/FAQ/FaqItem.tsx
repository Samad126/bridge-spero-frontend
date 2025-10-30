"use client";

import Image from "next/image";
import { FAQItemType } from "../../homepageTypes";
import { useState } from "react";

function FaqItem(faq: FAQItemType) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="px-[20px] py-[18px] lg:px[32px] lg:py-[24px]">
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={`flex justify-between items-center select-none ${
          isOpened ? "mb-[16px]" : ""
        }`}
      >
        <h5>{faq.name}</h5>
        <Image
          className={`${isOpened ? "rotate-45" : "rotate-0"}`}
          src={"/plus.svg"}
          alt="plus icon"
          width={24}
          height={24}
        />
      </div>
      <p
        className={`${
          isOpened ? "overflow-visible max-h-none" : "overflow-hidden max-h-0"
        }`}
      >
        {faq.description}
      </p>
    </div>
  );
}

export default FaqItem;
