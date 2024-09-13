import React, { useEffect, useRef } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from 'react-router-dom';

const InfoVideoHeader = () => {
    const headerRef = useRef(null);
    const leftSideRef = useRef(null);
    const rightSideRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 90%",  // Start animation when the top of the component is at 80% of the viewport height
                end: "top 80%",    // End at the same position to ensure it only triggers once
                toggleActions: "play none none none", // Play the animation once and don't reactivate
                // once: false,        // Run the animation only once
                scrub:true,
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
        <div ref={headerRef} className='w-full flex flex-col md:flex-row gap-5 md:gap-0 justify-center items-center px-4 md:px-20 h-44 md:h-64 overflow-hidden'>
            <div ref={leftSideRef} className=' md:h-auto w-full md:w-1/2 flex items-center justify-center text-center text-sm md:text-xl lg:text-2xl'>
                <p className=''>
                    An extraordinary model range
                </p>
            </div>
            <div ref={rightSideRef} className='w-full md:w-1/2 flex justify-center items-center'>
                <NavLink
                    to="/vehicles" // Add the path you want to navigate to
                    className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
                >
                    <span
                        className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
                    ></span>
                    <span className="relative text-xs md:text-sm font-normal">View All Collections</span>
                    <FaChevronRight className='flex self-center' />
                </NavLink>
            </div>
        </div>

    );
};

export default InfoVideoHeader;
