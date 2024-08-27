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
        gsap.from(
            ".page-header",
            {
                borderRadius: "0%",
                yoyo: false,
                rotation: 0,
                opacity: 0,
                onComplete: () => {
                    gsap.to(".page-header", {
                        opacity: 1,  // Reset the opacity to 1 after the animation
                    });
                }
            },
        );
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
                    once: true
                },
            }
        );
    }, [])

    return (
        <div className='h-auto pt-28'>

            <header className='w-full flex justify-center items-center h-[20%]'>
                <div className='w-fit'>
                    <h2 className="text-2xl md:text-3xl font-extrabold page-header">Sell Your Car</h2>
                </div>
            </header>

            <div className="flex-1 p-5 "
            // style={{
            //     backgroundImage: "url(/videos/benz.jpg)",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
            >

                <div className='w-full flex h-full'>
                    <div className='p-8 w-full md:w-[60%] h-full md:pl-7 text-black flex flex-col justify-start'>
                        <h2 className='content-text text-base md:text-xl mb-3'>A TRUSTED OFFER THAT</h2>
                        <h1 className='content-text text-xl md:text-3xl  mb-3'>TRULY VALUES YOUR CAR</h1>
                        <h4 className='content-text text-sm md:text-lg  mb-3' >Sell your car to us and get best instant price for it. Our scientific and data
                            driven pricing method takes your cars
                            condition and the market trends in account to offer you a price that truly values your car.</h4>
                    </div>

                </div>
            </div>

            <div className='content-text w-auto h-auto'>
                <ThreeStepForm className="w-[1000px]" />
            </div>
        </div>
    )
}

export default SellCar
