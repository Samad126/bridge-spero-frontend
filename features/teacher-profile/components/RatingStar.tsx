import Image from "next/image";

type RatingStarProps = {
  rate: number;
}

export default function RatingStar({ rate }: RatingStarProps) {
  return (
    <div className="flex items-center gap-[24px]">
      {Array.from({length: 5}, (_, i) => {
        const starNumber = i + 1;

        if(rate >= starNumber) {
          return (
            <Image
                src={"/star.svg"}
                width={32}
                height={32}
                alt={`star`}
                key={i}
                className="w-[32px] h-[32px]"
              />
          );
        }

        if (rate >= starNumber - 0.5) {
          return (
            <Image
                src={"/half-star.svg"}
                width={32}
                height={32}
                key={i}
                alt={`star`}
                className="w-[32px] h-[32px] block translate-y-[1px]"
              />
          );
        }

        return (
          <Image
                src={"/white-star.svg"}
                key={i}
                width={32}
                height={32}
                alt={`star`}
                className="w-[32px] h-[32px]"
              />
        );
      })}
    </div>
  );
}
