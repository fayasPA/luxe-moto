import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { hightPlainsSlides } from '../../constants/constants';
import { bannerVideo, highlightFirstVideo } from '../../utils/utils';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressRef = useRef(null);
  const carouselRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [startPlay, setStartPlay] = useState(false);
  const slideCount = hightPlainsSlides.length + 1; // +1 for the video slide
  const videoRef = useRef(null);
  const defaultAutoPlayDelay = 3000; // Auto play interval
  const [autoPlayDelay, setAutoPlayDelay] = useState(defaultAutoPlayDelay);
  const [videoDuration, setVideoDuration] = useState(0);
  const [slideInterval, setSlideInterval] = useState(null);

  const paginationSpanRef = useRef([]);
  const paginationDivRef = useRef([]);

  useEffect(() => {
    let currentProgress = 0;
    let duration = (currentSlide === 0 && videoDuration > 0) ? videoDuration : defaultAutoPlayDelay / 1000;
    let span = paginationSpanRef.current;
    if (span[currentSlide]) {
      //   // animation to move the indicator
      let anim = gsap.to(span[currentSlide], {
        duration,
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(paginationDivRef.current[currentSlide], {
              width:
                window.innerWidth < 760
                  ? "5vw" // mobile
                  : window.innerWidth < 1200
                    ? "10vw" // tablet
                    : "15vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[currentSlide], {
              width: `${currentProgress}%`,
              backgroundColor: "green",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          gsap.to(paginationDivRef.current[currentSlide], {
            width: "12px",
          });
          gsap.to(span[currentSlide], {
            backgroundColor: "#afafaf",
          });
        },
      });

    }
  }, [currentSlide, autoPlayDelay]);

  
  // const goToSlide = (index) => {
  //   setCurrentSlide(index);
  //   resetProgressBar();
  // };

  const clearGSAPAnimations = () => {
    paginationDivRef.current.forEach((div) => {
      gsap.killTweensOf(div);
    });
    paginationSpanRef.current.forEach((span) => {
      gsap.killTweensOf(span);
    });
  };
  const resetProgressBar = () => {
    gsap.to(progressRef.current, { width: '0%', duration: 0 });
    gsap.to(progressRef.current, { width: '100%', duration: autoPlayDelay / 1000 });
  };

  const nextSlide = () => {
    clearGSAPAnimations();
    if (paginationSpanRef.current[currentSlide]) {
      gsap.to(paginationDivRef.current[currentSlide], {
        width: "12px",
      });
      gsap.to(paginationSpanRef.current[currentSlide], {
        backgroundColor: "#afafaf",
      });
    }
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };
  
  const prevSlide = () => {
    clearGSAPAnimations();
    if (paginationSpanRef.current[currentSlide]) {
      gsap.to(paginationSpanRef.current[currentSlide], {
        backgroundColor: "#afafaf",
      });
      gsap.to(paginationDivRef.current[currentSlide], {
        width: "12px",
      });
    }
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };
  
  useEffect(() => {
    if (slideInterval) clearInterval(slideInterval);
    const interval = setInterval(nextSlide, autoPlayDelay);
    setSlideInterval(interval);
    return () => clearInterval(interval);
  }, [autoPlayDelay]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    if (currentSlide === 0 && videoDuration > 0) {
      setAutoPlayDelay(videoDuration * 1000);
    } else {
      setAutoPlayDelay(defaultAutoPlayDelay);
    }
  }, [currentSlide, videoDuration]);

  useEffect(() => {
    if (loadedData.length > 0) {
      if (currentSlide === 0 && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current?.pause();
      }
    }
  }, [currentSlide, loadedData]);

  const handleLoadedMetaData = (e) => {
    setLoadedData((pre) => [...pre, e])
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setAutoPlayDelay(videoRef.current.duration * 1000);
    }
  };

  return (
    <div className="relative">
      <div className="hs-carousel relative overflow-hidden w-screen h-screen bg-white">


        <div
          ref={carouselRef}
          className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 w-full h-full"
        >

          <div className="hs-carousel-slide w-screen h-screen flex-shrink-0">
            <div className="flex justify-center items-center h-full bg-gray-100 p-6">
              <video
                id="carousel-video"
                playsInline={true}
                className="w-full h-full object-cover"
                preload="auto"
                muted
                ref={videoRef}
                onEnded={nextSlide}
                onLoadedMetadata={handleLoadedMetaData}
              >
                <source src={bannerVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {hightPlainsSlides.map((slide, i) => (
            <div key={i} className="hs-carousel-slide w-screen h-screen flex-shrink-0">
              <div className="flex justify-center items-center h-full bg-gray-100 p-6">
                <span className="text-4xl text-gray-800 transition duration-700">{slide.id} {slide.text}</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      <button
        type="button"
        className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10"
        onClick={prevSlide}
      >
        <span className="text-2xl" aria-hidden="true">
          <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10"
        onClick={nextSlide}
      >
        <span className="sr-only">Next</span>
        <span className="text-2xl" aria-hidden="true">
          <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>


      <div className="relative flex items-center justify-start mt-10">
        <div className="flex items-center justify-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {[...Array(slideCount)].map((_, i) => (

            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer "
              ref={(el) => (paginationDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (paginationSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BannerCarousel;
