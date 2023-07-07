const ChevronIcon = ({ style }: { style?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style ? style : "fill-white"}
    >
      <path d="M18 9.70492L16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492Z" />
    </svg>
  );
};

export default ChevronIcon;
