import React, { useEffect, useLayoutEffect } from 'react'
import { ScrollTrigger } from "gsap/all";
import { gsap } from 'gsap/gsap-core';
import ThreeStepForm from '../../components/ThreeStepForm';
gsap.registerPlugin(ScrollTrigger);

function SellCar() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useLayoutEffect(() => {
        gsap.fromTo(
            ".content-text",
            {
                y: 40,
                borderRadius: "0%",
                yoyo: false,
                rotation: 0,
                opacity: 0,
            },
            {
                y: 0,
                repeat: 0,
                delay: 1,
                yoyo: false,
                rotation: 0,
                borderRadius: "0%",
                duration: 0.5,
                ease: "none",
                stagger: 0.3,
                opacity: 1,
                scrollTrigger: {
                    trigger: ".content-text",
                    toggleActions: "play none none none ",
                    once: true,
                     
                },
            }
        );
    }, [])

    return (
        <div className='h-auto mt-16 md:mt-24'>

            <div className="flex-1 mt-10 p-5 "
            >

                <div className='w-full flex h-full justify-center '>
                    <div className=' w-fit h-full text-borderColor flex flex-col'>
                        <h2 className='content-text text-[0.7rem] md:text-sm lg:text-lg mb-3'><strong className='text-white'>Luxe Moto</strong> OFFERS A TRUSTED DEAL THAT TRULY VALUES YOUR CAR</h2>
                        {/* <h4 className='content-text text-sm md:text-md lg:text-base text-borderColor  mb-3' >Sell your car to us and get best instant price for it. Our scientific and data
                                driven pricing method takes your cars
                                condition and the market trends in account to offer you a price that truly values your car.</h4> */}
                    </div>

                </div>
            </div>

            <div className='w-auto h-auto'>
                <ThreeStepForm className="w-[1000px] " />
            </div>
        </div>
    )
}

export default SellCar
