import { useState } from "react";
import Image from "next/image";
import { useRateTeacherMutation } from "@/features/profile/api/profileApi";

type RateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  teacherId: number;
};

export default function RateModal({ isOpen, onClose, teacherId }: RateModalProps) {
  const [rate, setRate] = useState(0);
  const [rateTeacher, { isLoading }] = useRateTeacherMutation();

  const handleSubmit = async () => {
    if (rate === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      await rateTeacher({ teacherId, rating: rate }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to rate teacher:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  const handleStarClick = (starNumber: number) => {
    setRate(starNumber);
  };

  if (!isOpen) return null;

  return (
    <div>
      <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 w-[304px] p-[24px] flex flex-col gap-[32px] m-auto z-90 h-max bg-white text-secondary">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-secondary text-center font-medium text-[24px] mb-[24px]">
            Tap to rate
          </h2>
          <div className="flex items-center gap-[24px]">
            {Array.from({ length: 5 }, (_, i) => {
              const starNumber = i + 1;
              const isFilled = rate >= starNumber;

              return (
                <button
                  key={i}
                  onClick={() => handleStarClick(starNumber)}
                  className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                  aria-label={`Rate ${starNumber} star${starNumber > 1 ? 's' : ''}`}
                >
                  <Image
                    src={isFilled ? "/star.svg" : "/white-star.svg"}
                    width={32}
                    height={32}
                    alt={`${starNumber} star`}
                    className="w-[32px] h-[32px]"
                  />
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-secondary mx-[28px] text-white py-[12px] text-[18px] cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div onClick={onClose} className="w-full h-full fixed inset-0 bg-[#00000099] z-80"></div>
    </div>
  );
}
