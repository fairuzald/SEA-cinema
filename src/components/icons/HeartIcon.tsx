import React from "react";

const HeartIcon = ({ style }: { style?: string }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <path
        d="M2.32422 14.668L11.1475 22.9053C11.5137 23.2471 11.9971 23.4375 12.5 23.4375C13.0029 23.4375 13.4863 23.2471 13.8525 22.9053L22.6758 14.668C24.1602 13.2861 25 11.3476 25 9.32128V9.03807C25 5.62499 22.5342 2.71483 19.1699 2.15331C16.9434 1.78221 14.6777 2.50975 13.0859 4.10155L12.5 4.68749L11.9141 4.10155C10.3223 2.50975 8.05664 1.78221 5.83008 2.15331C2.46582 2.71483 0 5.62499 0 9.03807V9.32128C0 11.3476 0.839844 13.2861 2.32422 14.668Z"
      />
    </svg>
  );
};
HeartIcon.defaultProps = {
    style: "fill-white",
  };
export default HeartIcon;