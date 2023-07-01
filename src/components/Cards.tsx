import Image from "next/image";
import React from "react";
interface CardsProps {
  size: "large";
  isFavorited?: boolean;
  isAge?: boolean;
  imageUrl: string;
  title: string;
}
const Cards: React.FC<CardsProps> = ({
  size,
  isFavorited,
  isAge,
  imageUrl,
  title,
}) => {
  const sizeEffect = {
    large: "w-[358px] h-[480px]",
  };
  return (
    <div className={`${sizeEffect[size]} relative overflow-hidden rounded-2xl`}>
      <Image
        src={imageUrl}
        alt={title}
        width={1920}
        height={1080}
        className="object-center object-cover"
      />
    </div>
  );
};

export default Cards;
