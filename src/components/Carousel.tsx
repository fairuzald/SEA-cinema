"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import type SwiperCore from "swiper";
import Image from "next/image";
import ArrowCircle from "./icons/ArrowCircle";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
interface SliderStyleProps {
  width: string;
  height: string;
  objectFit: string;
  backgroundSize: string;
  backgroundPosition: string;
}
interface WindowDimentions {
  width: number;
  height: number;
}
const Carousel = ({ data }: { data: any }) => {
  const swiperRef = useRef<any>(null);
  const [slideAnimation, setSlideAnimation] = useState("left"); // To give animation for next button or prev button
  const [activeIndex, setActiveIndex] = useState(0); // To acceess now index that shown on previour tedx
  const [sliderStyle, setSliderStyle] = useState<SliderStyleProps>({
    width: "250px",
    height: "140px",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
  });
  // Function to get Window Dimension for setup library styling
  function getWindowDimensions(): WindowDimentions {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  // Custom Next Button for Swiper Carousel
  function CustomNextButton({
    className,
    onClick,
  }: {
    className: string;
    onClick: () => void;
  }) {
    return (
      <button className={className} onClick={onClick} aria-label="Next Button">
        <ArrowCircle style="w-[30px] h-[30px] md:w-[38px] md:h-[38px] lg:w-[45px] lg:h-[45px] fill-red  text-red " />
      </button>
    );
  }
  function CustomPrevButton({
    className,
    onClick,
  }: {
    className: string;
    onClick: () => void;
  }) {
    return (
      <button
        className={className}
        onClick={onClick}
        aria-label="Previous Button"
      >
        <ArrowCircle style="w-[30px] h-[30px] md:w-[38px] md:h-[38px] lg:w-[45px] lg:h-[45px] fill-red rotate-180 text-red " />
      </button>
    );
  }
  useEffect(() => {
    function handleResize() {
      const { width } = getWindowDimensions();
      if (width < 640) {
        setSliderStyle({
          width: "100%",
          height: "160px",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
      } else if (width < 768) {
        setSliderStyle({
          width: "100%",
          height: "230px",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
      } else if (width < 1024) {
        setSliderStyle({
          width: "100%",
          height: "300px",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
      } else if (width < 1450) {
        setSliderStyle({
          width: "100%",
          height: "350px",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
      } else {
        setSliderStyle({
          width: "100%",
          height: "480px",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        });
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
      setSlideAnimation("left");
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);
  const handleSlideChange = (swiper: SwiperCore) => {
    const newActiveIndex = swiper.realIndex;
    setActiveIndex(newActiveIndex);
    setSlideAnimation(
      swiper.realIndex > swiper.previousIndex ||
        swiper.realIndex === 1 ||
        swiper.realIndex === 0
        ? "left"
        : "right"
    );
  };
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={false}
      loop={true}
      allowTouchMove={false}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      navigation={{
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
      }}
      className="mySwiper flex items-center justify-center"
      style={{
        paddingTop: "50px",
        paddingBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSlideChange={handleSlideChange}
      breakpoints={{
        320: {
          spaceBetween: -10,
          coverflowEffect: { depth: -100 },
        },
        720: {
          spaceBetween: -25,
          coverflowEffect: { depth: -150 },
        },
        1500: {
          spaceBetween: -70,
          coverflowEffect: { depth: -300 },
        },
        1700: {
          spaceBetween: -70,
          coverflowEffect: { depth: -350 },
        },
      }}
    >
      {data.map((item: any, index: number) => {
        return (
          <SwiperSlide key={index}
          style={sliderStyle as React.CSSProperties}
          
          >
            <Image
              src={item.poster_url}
              width="1920"
              height="1080"
              alt={item.title}
              className={`flex h-full overflow-hidden object-cover object-center
                          ${index == activeIndex && "mx-auto w-[350px]"}
                          ${
                            index !== activeIndex &&
                            "w-[12vw] blur-sm sm:w-[16vw] md:w-[150px] lg:w-[200px]"
                          }
                          ${
                            activeIndex === 0
                              ? index === data.length - 1 &&
                                "justify-right ml-auto flex"
                              : index == activeIndex - 1 &&
                                "justify-right ml-auto flex"
                          } `}
            />
          </SwiperSlide>
        );
      })}
      <div className="absolute top-1/2 z-30 flex w-full items-start justify-between">
        <CustomPrevButton
          className="custom-prev-button"
          onClick={() => setSlideAnimation("right")}
        />
        <CustomNextButton
          className="custom-next-button"
          onClick={() => setSlideAnimation("left")}
        />
      </div>
    </Swiper>
  );
};

export default Carousel;
