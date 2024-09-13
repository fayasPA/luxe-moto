import React, { useEffect, useRef } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const InfoVideoHeader = () => {
    const headerRef = useRef(null);
    const leftSideRef = useRef(null);
    const rightSideRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%", // Start animation when the header is 80% visible
                end: "bottom 20%", // End point for scroll
                toggleActions: "play reverse play reverse", // Animate in both scroll directions
                markers: false // Remove markers in production
            }
        });

        // Animate both left and right elements simultaneously
        tl.fromTo(
            [leftSideRef.current, rightSideRef.current], // Animate both refs at once
            {
                x: (i) => (i === 0 ? -300 : 300), // left side from -300, right side from 300
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                stagger: 0, // Ensure they animate simultaneously
                immediateRender: true,
            }
        );

    }, []);

    return (
        <div ref={headerRef} className='w-full flex flex-col md:flex-row gap-5 md:gap-0 justify-center items-center px-4 md:px-20 h-44 md:h-64 overflow-hidden'>
            <div className=' md:h-auto w-full md:w-1/2 flex items-center justify-center text-center text-sm md:text-xl lg:text-2xl'>
                <p ref={leftSideRef}>
                    An extraordinary model range
                </p>
            </div>
            <div className='w-full md:w-1/2 flex justify-center items-center'>
                <NavLink
                    ref={rightSideRef}
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
