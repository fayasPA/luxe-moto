import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useLocation } from 'react-router-dom';

const useLocomotiveScroll = () => {
  const scrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true
    });

    // Cleanup function to destroy Locomotive Scroll instance
    return () => {
      scroll.destroy();
    };
  }, []);

  useEffect(() => {
    // Reset scroll position when location changes
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
      window.scrollTo(0,0)
    }
  }, [location]);

  return scrollRef;
};

export default useLocomotiveScroll;
