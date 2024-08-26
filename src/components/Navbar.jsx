import React, { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import blackLogo from "/images/blackLogo.png"
import whiteLogo from "/images/logo-white.png"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import { FiEdit, FiChevronDown, FiTrash, FiShare, FiPlusSquare, FiPhone } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger)


const DropDown = ({ name, items, isHomePage, handleNavigation }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const dropdownElement = dropdownRef.current;
        const iconElement = iconRef.current;

        if (open) {
            gsap.to(dropdownElement, {
                scaleY: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.1,
                transformOrigin: 'top',
            });
            gsap.to(iconElement, {
                rotate: 180,
                duration: 0.3,
                ease: 'power2.out',
            });
        } else {
            gsap.to(dropdownElement, {
                scaleY: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                stagger: 0.1,
                transformOrigin: 'top',
            });
            gsap.to(iconElement, {
                rotate: 0,
                duration: 0.3,
                ease: 'power2.in',
            });
        }
    }, [open]);


    return (

        <div className={`flex items-center justify-center ${isHomePage ? '' : 'bg-white'}`}>
            <div className="relative">
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="flex items-center gap-2 px-3 rounded-md  transition-colors"
                >
                    <span className="font-semibold text-sm">More</span>
                    <span ref={iconRef}>
                        <FiChevronDown />
                    </span>
                </button>

                <ul
                    ref={dropdownRef}
                    className={`border border-1 flex flex-col gap-2 p-2 bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden origin-top ${open ? 'block' : 'hidden'}`}
                >
                    {items.map((item, index) => (
                        <NavLink key={index} to={item.path} onClick={() => handleNavigation(item.path)} className={({ isActive }) => `${isActive ? 'text-green-300' : 'text-slate-700'} flex  items-start my-1.5 mx-auto w-full`} >
                            <li
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-gray-100  hover:text-green-300 transition-colors cursor-pointer"
                            >
                                <span>{item.name}</span>
                            </li>
                        </NavLink>
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
    const location = useLocation();
    const isHomePage = location.pathname === '/';
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
        <nav className={`w-full top-0 border-gray-200 pb-2 z-10 transition-colors duration-300  ${isHomePage ? (isScrolled ? 'sticky bg-black' : nav ? 'absolute bg-black' : 'absolute bg-transparent') : isScrolled ? 'sticky bg-white' : 'absolute bg-white'}`}>
            <div className="w-full flex flex-wrap items-center justify-between mx-auto px-5 md:px-10 ">

                <div className={`w-full md:items-center md:w-1/3 hidden md:flex`}>
                    <div className="text-sm flex md:flex-grow font-semibold ">
                        <NavLink to='/' onClick={() => handleNavClick('/')} className={({ isActive }) => `${isActive ? 'text-green-300' : isHomePage ? 'text-white' : 'text-black'} block mt-4 md:inline-block md:mt-0 hover:text-green-300 `} >
                            <span className=" ">Home</span>
                        </NavLink>
                        <NavLink to='/vehicles' onClick={() => handleNavClick('/vehicles')} className={({ isActive }) => `${isActive ? 'text-green-300' : isHomePage ? 'text-white' : 'text-black'} px-5 block mt-4 md:inline-block md:mt-0 hover:text-green-300 `} >
                            <span className=" ">Buy Used Cars</span>
                        </NavLink>
                        <span className={`block mt-4 md:inline-block md:mt-0 ${isHomePage ? 'text-white' : 'text-black'} hover:text-green-300  `}>
                            <DropDown name={'More'} items={moreList} isHomePage={isHomePage} handleNavigation={handleNavClick} />
                        </span>
                    </div>
                </div>

                {/* Logo */}
                <Link to="/" className={`w-1/3 flex flex-col items-center text-xl font-semibold focus:outline-none focus:opacity-80 
                text-white`}>
                    <img src={`${isHomePage ? whiteLogo : blackLogo}`} className="mt-2 w-12 h-8  md:w-16 md:h-10 rounded-xl logo " alt=" Logo" />
                    <div className='flex flex-col '>
                        {/* <div className='flex flex-col mt-[-1.1rem] md:mt-[-1.4rem]'> */}
                        <span className={`${isHomePage ? 'text-white' : 'text-black'}`}>LUXE MOTO</span>
                    </div>
                </Link>
                {/* Logo */}

                <div className="w-1/3 hidden md:flex ">
                    <div className={`w-full flex justify-end gap-2 ${isHomePage ? 'text-white' : 'text-black'}`}>
                        <a href="https://wa.me/919037696969" target='blank'>
                            <FaWhatsapp size={20} className=" cursor-pointer" />
                        </a>
                        <a href="https://www.facebook.com/people/Amani-Motors/61555223155190/" target='blank'>
                            <FaFacebook size={20} className=" cursor-pointer" />
                        </a>
                        {/* <FaTwitter className=" w-6 h-6 cursor-pointer" /> */}
                        <a href="https://www.youtube.com/watch?v=D3kcFp9i_cE" target='blank'>
                            <FaYoutube size={20} className=" cursor-pointer" />
                        </a>
                        <a href="https://www.instagram.com/amani_motors/" target='blank'>
                            <FaInstagram size={20} className=" cursor-pointer" />
                        </a>
                        <a href={`tel:${phoneNumber}`} className='pl-1'>
                            <p className="flex items-center  ">
                                <FiPhone size={18} className=" cursor-pointer" /> +91-9037696969
                            </p>
                        </a>
                    </div>
                </div>

                {/* Hamburger Menu */}
                <div className='block md:hidden '>
                    <button
                        className={`w-11 menu-trigger ${nav ? 'menu-close' : 'h-10'} ${!isHomePage && 'menu-trigger-black menu-close-black'}`}
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
                            <ul className={`p-4 font-josefin font-medium h-full flex flex-col justify-center items-center gap-5 w-full ${isHomePage ? 'text-white' : 'text-black'}`}>

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
