import React, { useEffect, useRef } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const InfoVideoHeader = () => {
    const headerRef = useRef(null);
    const leftSideRef = useRef(null);
    const rightSideRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 80%",  // Adjust this based on when you want the animation to start
                end: "top 50%",
                toggleActions: "restart",
                scrub: true,
            }
        });
    
        tl.fromTo(leftSideRef.current, 
            {
                x: '-100vw',  // Start off-screen to the left
                opacity: 0,   // Start fully transparent
            },
            {
                x: '0vw',     // End at the original position
                opacity: 1,   // End fully visible
                duration: 1.5,  // Increase duration for smoother animation
                ease: "power2.out",  // Smooth easing
            }
        ).fromTo(rightSideRef.current, 
            {
                x: '100vw',   // Start off-screen to the right
                opacity: 0,   // Start fully transparent
            },
            {
                x: '0vw',     // End at the original position
                opacity: 1,   // End fully visible
                duration: 1.5,  // Ensure both sides have the same duration
                ease: "power2.out",  // Same easing for consistency
            }, "<"
        );  // The '<' makes both animations start at the same time
    
    }, []);
    

    return (
        <div ref={headerRef} className='w-full md:flex justify-center px-20 md:px-60 pt-10 md:pt-28'>
            <div ref={leftSideRef} className='w-full md:w-1/2 flex items-center text-center text-3xl md:text-6xl pb-3 md:pb-0'>
                <p className=''>
                    An extraordinary model range
                </p>
            </div>
            <div ref={rightSideRef} className='w-full md:w-1/2 flex justify-center items-center'>
                <button
                    className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r  text-white transition-all ease-out duration-300"
                >
                    {/* <button
                    className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r from-[#6e6d6d] to-gray-400 relative hover:bg-gradient-to-r hover:from-green hover:to-green-300 text-black transition-all ease-out duration-300"
                > */}
                    <span
                        className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease"
                    ></span>
                    <span className="relative text-base md:text-xl font-normal">Discover Vehicles</span>
                    <FaChevronRight className='flex self-center' />
                </button>
            </div>
        </div>
    );
};

export default InfoVideoHeader;
