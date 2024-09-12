export const CarousalIndicator = ({
    totalSlidesCount = 0,
    currSlideIndex = 0,
    onClickIndicator,
    className = ""
  }) => {
    return (
      <div className={`z-10 mt-6 flex gap-[6px] ${className}`}>
        {Array.from({ length: totalSlidesCount }, (_, index) => (
          <span
            key={index}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              currSlideIndex === index
                ? "w-[30px] h-[10px] bg-green"
                : "w-[10px] h-[10px] bg-green-300"
            }`}
            onClick={() => onClickIndicator(index)}
          ></span>
        ))}
      </div>
    );
  };
  