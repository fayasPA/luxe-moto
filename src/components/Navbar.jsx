import React, { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Logo from "/images/luxe_moto_logo.png"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import gsap from "gsap/gsap-core";
import { ScrollTrigger } from 'gsap/all';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import {
    FaCalculator,
    FaCar,
    FaCarSide,
    FaHome,
    FaImage,
} from "react-icons/fa";
import { FaCableCar, FaHelmetSafety, FaPeopleGroup, FaShop } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { FiPhone } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger)



const DropDown = ({ name, items }) => {
    const [swi, setSwi] = useState(false)
    const toggle = () => {
        if (swi) {
            setSwi(false)
        } else {
            setSwi(true)
        }
    }
    return (
        <div className=''>
            <li className={swi ? 'flex items-center hover:text-white cursor-pointer' : 'flex items-center hover:text-green-300 cursor-pointer'} onClick={toggle}>{name}{swi ? <MdKeyboardArrowUp size={20} className=' mx-1' /> : <MdKeyboardArrowDown size={20} className=' mx-1' />}</li>
            <div className={swi ? 'absolute top-16 w-auto px-5 h-auto shadow-2xl rounded-xl flex flex-col justify-center bg-white transition-all duration-700' : 'hidden'}>
                <ul className='flex flex-col text-gray-600 font-epilogue text-[15px]'>
                    {items.map((item, index) => (
                        <NavLink key={index} to={item.path} onClick={() => handleNavClick(item.path)} className={({ isActive }) => `${isActive ? 'text-green-300' : ''} flex  items-start my-1.5 mx-auto`} >
                            <span className=" ">{item.name}</span>
                        </NavLink>
                        // <li key={index} className='flex  items-start my-1.5 mx-auto'>{item.name}</li>

                    ))}
                </ul>
            </div>

        </div>


    )
}

export default function Navbar() {

    const [nav, setNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const phoneNumber = "+919037696969"
    const navigate = useNavigate();
    const handleNav = () => {
        setNav(!nav)
    }

    const handleNavClick = (path) => {
        handleNav();
        navigate(path);
    };

    useEffect(() => {
        if (nav) {
            gsap.fromTo(
                ".sm-navbar",
                {
                    x: 0,
                    y: '-200%',
                    borderRadius: "0%",
                    yoyo: false,
                    rotation: 0,
                    opacity: 0,
                },
                {
                    x: 0,
                    y: 0,
                    repeat: 0,
                    yoyo: true,
                    rotation: 0,
                    borderRadius: "0%",
                    duration: 0.5,
                    ease: "none",
                    stagger: 0.2,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: ".sm-navbar",
                        toggleActions: "play none none none",
                        once: true
                    },
                }
            );
        }
    }, [nav]);

    const moreList = [
        {
            "name": "Sellcar",
            "path": '/sellcar'
        },
        {
            "name": "Showroom",
            "path": '/showroom'
        },

        {
            "name": "Gallery",
            "path": '/gallery'
        },
        {
            "name": "Insurance",
            "path": '/insurance'
        },
        {
            "name": "Emi-Calculator",
            "path": '/emi-calculator'
        },
        {
            "name": "About",
            "path": '/about'
        },
    ]

    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsScrolled(false);
            } else if (window.scrollY > lastScrollY && window.scrollY > 50) {
                // Scrolling down
                setIsScrolled(false);
            } else if (window.scrollY < lastScrollY) {
                // Scrolling up
                setIsScrolled(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
            <nav className={`w-full top-0 border-gray-200 pb-2 z-10 transition-colors duration-300 ${isScrolled ? 'sticky bg-black' : nav ? 'absolute bg-black' : 'absolute bg-transparent'}`}>
                <div className="w-full flex flex-wrap items-center justify-between mx-auto px-5 md:px-10 ">

                    <div className={`w-full md:items-center md:w-auto hidden md:flex`}>
                        <div className="text-sm flex md:flex-grow font-semibold">
                            <NavLink to='/' onClick={() => handleNavClick('/')} className={({ isActive }) => `${isActive ? 'text-green-300' : 'text-white'} block mt-4 md:inline-block md:mt-0 hover:text-green-300 mr-4`} >
                                <span className=" ">Home</span>
                            </NavLink>
                            <NavLink to='/vehicles' onClick={() => handleNavClick('/vehicles')} className={({ isActive }) => `${isActive ? 'text-green-300' : 'text-white'} px-5 block mt-4 md:inline-block md:mt-0 hover:text-green-300 mr-4`} >
                                <span className=" ">Buy Used Cars</span>
                            </NavLink>
                            <span className={`block mt-4 md:inline-block md:mt-0 text-white hover:text-green-300 mr-4 `}>
                                <DropDown name={'More'} items={moreList} />
                            </span>
                        </div>
                    </div>

                    {/* Logo */}
                    <Link to="/" className={`flex flex-col items-center text-xl font-semibold focus:outline-none focus:opacity-80 
                text-white`}>
                        <img src={Logo} className="w-12 h-w-12  md:w-16 md:h-16 rounded-xl logo " alt=" Logo" />
                        <div className='flex flex-col mt-[-1.1rem] md:mt-[-1.4rem]'>
                            <span className="">LUXE MOTO</span>
                        </div>
                    </Link>
                    {/* Logo */}

                    <div className=" hidden md:flex ">
                        <div className="flex justify-center gap-2">
                            <a href="https://wa.me/919037696969" target='blank'>
                                <FaWhatsapp size={20} className="text-white cursor-pointer" />
                            </a>
                            <a href="https://www.facebook.com/people/Amani-Motors/61555223155190/" target='blank'>
                                <FaFacebook size={20} className="text-white cursor-pointer" />
                            </a>
                            {/* <FaTwitter className="text-white w-6 h-6 cursor-pointer" /> */}
                            <a href="https://www.youtube.com/watch?v=D3kcFp9i_cE" target='blank'>
                                <FaYoutube size={20} className="text-white cursor-pointer" />
                            </a>
                            <a href="https://www.instagram.com/amani_motors/" target='blank'>
                                <FaInstagram size={20} className="text-white cursor-pointer" />
                            </a>
                            <a href={`tel:${phoneNumber}`} className='pl-1'>
                                <p className="flex items-center text-white ">
                                    <FiPhone size={18} className="text-white cursor-pointer" /> +91-9037696969
                                </p>
                            </a>
                        </div>
                    </div>

                    {/* Hamburger Menu */}
                    <div className='block md:hidden '>
                        <button
                            className={`w-11 menu-trigger ${nav ? 'menu-close' : 'h-10'}`}
                            onClick={handleNav}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>


                    {/* Hamburger Menu */}

                </div>
                <div className={`sm-navbar w-full ${nav ? 'block' : 'hidden'}`}
                >
                    <ul className={`items-center justify w-full md:flex md:w-auto md:order-1 gap-3`} id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className='flex'>
                                <ul className=" p-4 font-josefin font-medium h-full flex flex-col justify-center items-center gap-5 w-full text-white">

                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/' onClick={() => handleNavClick('/')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">Home</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/vehicles' onClick={() => handleNavClick('/vehicles')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">Stock Cars</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/sellcar' onClick={() => handleNavClick('/sellcar')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">Sell Cars</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/showroom' onClick={() => handleNavClick('/showroom')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">Showroom</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/gallery' onClick={() => handleNavClick('/gallery')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">Gallery</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/insurance' onClick={() => handleNavClick('/insurance')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">Insurance</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/emi-calculator' onClick={() => handleNavClick('/emi-calculator')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">EMI Calculator</span>
                                        </NavLink>
                                    </li>
                                    <li className="sm-navbar py-3 w-full text-xl">
                                        <NavLink to='/about' onClick={() => handleNavClick('/about')} className={({ isActive }) => `${isActive ? ' text-green-300' : ''} flex justify-start items-start text-left`} >
                                            <span className=" ">About Us</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </ul>
                </div>

                {/* For smaller screens ends */}
            </nav>
    );
}
