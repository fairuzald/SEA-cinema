const ArrowIcon = ({ style }: { style?: string }) => {
  return (
    <svg
      width="51"
      height="39"
      viewBox="0 0 51 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style ? style : "fill-white"}

    >
      <path
        d="M1.07017 17.2488C-0.352818 18.4939 -0.352818 20.516 1.07017 21.7611L19.2845 37.6986C20.7074 38.9438 23.0184 38.9438 24.4414 37.6986C25.8644 36.4535 25.8644 34.4314 24.4414 33.1863L12.4313 22.6875H47.3572C49.3722 22.6875 51.0001 21.2631 51.0001 19.5C51.0001 17.7369 49.3722 16.3125 47.3572 16.3125H12.4427L24.43 5.81367C25.853 4.56856 25.853 2.54649 24.43 1.30137C23.007 0.0562516 20.6961 0.0562516 19.2731 1.30137L1.05879 17.2389L1.07017 17.2488Z"
      />
    </svg>
  );
};

export default ArrowIcon;
