import { useState } from "react";
import RatingStar from "./RatingStar";

type RateModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function RateModal({ isOpen, onClose }: RateModalProps) {
  const [rate, setRate] = useState(2.5);
  const percentage = rate / 5 * 100;

  if (!isOpen) return null;

  return (
    <div>
      <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 w-[304px] p-[24px] flex flex-col gap-[32px] m-auto z-90 h-max bg-white text-secondary">
        <div className="w-full flex flex-col items-center">
          <span className="text-custom-yellow text-center font-medium text-[32px] mb-[12px]">
            {rate}
          </span>
          <RatingStar rate={rate} />
        </div>
        <div>
          <input
            id="volume"
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full bg-primary appearance-none h-[2px] cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 "
            style={{
              background: `linear-gradient(
            to right,
            #C96129 ${percentage}%,
            #C8C8C8 ${percentage}%
          )`,
            }}
          />
        </div>
        <button onClick={onClose} className="bg-secondary mx-[28px] text-white py-[12px] text-[18px] cursor-pointer">
          Submit
        </button>
      </div>
      <div onClick={onClose} className="w-full h-full fixed inset-0 bg-[#00000099] z-80"></div>
    </div>
  );
}
