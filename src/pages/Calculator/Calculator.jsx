import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import './Calculator.css'; // Import the CSS file
import { ScrollTrigger } from "gsap/all";
import { gsap } from 'gsap/gsap-core';
import { getNumberToCurrencyText } from '../../utils/utils';
gsap.registerPlugin(ScrollTrigger);
ChartJS.register(ArcElement, Tooltip, Legend);


const textCenterPlugin = {
    id: 'textCenter',
    beforeDraw: function (chart) {
        const ctx = chart.ctx;
        ctx.save();

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, chart.width, chart.height);
        gradient.addColorStop(0, '#a0c1d1'); // Light blue
        gradient.addColorStop(1, '#c2c6f3'); // Light purple

        // Draw the gradient circle
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        const innerRadius = chart.innerRadius;
        const outerRadius = chart.outerRadius;

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Draw the total amount above the center
        ctx.font = 'bold .7em Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'gray';
        const totalAmountLabel = `Total Amount`;
        ctx.fillText(totalAmountLabel, centerX, centerY - 10);

        ctx.font = 'bold .8rem Arial';
        // Draw the total amount value below the center
        // const totalAmountValue = `₹ ${(chart.data.datasets[0].data[0] + chart.data.datasets[0].data[1]).toLocaleString()}`;
        const totalAmountValue = parseFloat(chart.data.datasets[0].data[0] + chart.data.datasets[0].data[1]);
        ctx.fillStyle = '#000';
        ctx.fillText(getNumberToCurrencyText(totalAmountValue, 1), centerX, centerY + 10);
    }
};

const Calculator = () => {
    const chartRef = useRef(null);
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interest, setInterest] = useState(0);
    const [interestRate, setInterestRate] = useState(8);
    const [loanTenure, setLoanTenure] = useState(12);
    const [emi, setEMI] = useState(0);

    const calculateEMI = () => {
        const principal = loanAmount;
        const annualInterestRate = interestRate;
        const months = loanTenure;

        if (principal > 0 && annualInterestRate > 0) {
            const monthlyInterestRate = annualInterestRate / 100 / 12;
            const emiValue = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months) / (Math.pow(1 + monthlyInterestRate, months) - 1);
            setEMI(parseFloat(emiValue.toFixed(2)));
        } else {
            setEMI(0);
        }
    };

    const data = {
        labels: ['Principal', 'Interest'],
        datasets: [
            {
                data: [loanAmount, emi * loanTenure - loanAmount],
                backgroundColor: ['#49A584', 'grey'], // Customize these colors
                hoverBackgroundColor: ['#096254', '#000'], // Customize hover colors


            },
        ],
    };

    useEffect(() => {
        const chartInstance = chartRef.current;

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTenure]);

    useEffect(() => {
        setInterest(parseFloat((emi * loanTenure - loanAmount).toFixed(2)))
    }, [emi])

    const handleLoanAmountChange = (e) => {
        setLoanAmount(parseInt(e.target.value));
    };

    const handleInterestRateChange = (e) => {
        setInterestRate(parseFloat(e.target.value));
    };

    const handleLoanTenureChange = (e) => {
        setLoanTenure(parseInt(e.target.value));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        gsap.fromTo(
            ".content-gsap",
            {
                y: 0,
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
                duration: 1,
                ease: "none",
                stagger: 0.3,
                opacity: 1,
                scrollTrigger: {
                    trigger: ".content-gsap-trigger",
                    toggleActions: "play none none none ",
                    once: true,
                     
                },
            }
        );
    }, [])

    return (
        <div className='pt-16 md:pt-24'>
            <div className="text-white py-10 px-5" id="calculator-range-slider">
                <div className="text-white flex justify-start">
                    <h2 className="text-base md:text-xl content-text">EMI Calculator</h2>
                </div>

                <div className="text-borderColor flex pb-5">
                    <p className="text-gray list-disc text-sm content-text">
                        Find the Perfect EMI Fit for You.
                    </p>
                </div>

                {/* calculator */}
                <div className="text-black bg-white content-gsap-trigger flex flex-col md:flex-row items-center border border-[#ececec] p-6 rounded-lg shadow-2xl shadow-black w-full max-w-md md:max-w-5xl mx-auto">
                    <div className="flex justify-center items-center w-full md:w-1/2 md:mr-6">
                        <div className="w-48 h-48 md:w-full md:h-full content-gsap">
                            <Doughnut data={data} options={{ borderWidth: 5, hoverBorderWidth: 0, cutout: '70%', plugins: { textCenter: {} } }} plugins={[textCenterPlugin]} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left mt-4 md:mt-0">
                        <h2 className="text-xs md:text-sm lg:text-base font-normal content-gsap "><strong className='font-semibold text-green-body font-josefin text-xl md:text-2xl lg:text-2xl'>{getNumberToCurrencyText(emi, 2)}</strong> per month</h2>
                        <div className="flex justify-between mt-4">
                            <div className="flex flex-col items-center">
                                <p className="text-black smaller-header-text text-sm md:text-sm lg:text-base">Principal</p>
                                <p className="text-base md:text-base lg:text-lg font-semibold content-gsap font-josefin text-green-body">{getNumberToCurrencyText(loanAmount)}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-black smaller-header-text text-sm md:text-sm lg:text-base">Interest</p>
                                {/* <p className="text-lg font-semibold">₹ {(emi * loanTenure - loanAmount).toFixed(2)}</p> */}
                                <p className="text-base md:text-base lg:text-lg font-semibold content-gsap font-josefin text-green-body">{getNumberToCurrencyText(interest, 2)}</p>
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-black smaller-header-text text-xs md:text-sm lg:text-base">Loan Amount</label>
                            <input type="range" className="range-slider__range" min="100000" max="10000000"
                                step={10000} value={loanAmount} onChange={handleLoanAmountChange} />
                            <span className='content-gsap  font-bold font-josefin text-green-body'>{getNumberToCurrencyText(loanAmount)}</span>
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-black smaller-header-text text-xs md:text-sm lg:text-base">Rate of Interest</label>
                            <input type="range" className="range-slider__range" min="1" max="25" step="0.1" value={interestRate} onChange={handleInterestRateChange} />
                            <span className='content-gsap  font-bold font-josefin text-green-body'>{interestRate} %</span>
                        </div>
                        <div className="mt-4 w-full">
                            <label className="block text-black smaller-header-text text-xs md:text-sm lg:text-base">Loan Tenure</label>
                            <input type="range" className="range-slider__range" min="12" max="84" value={loanTenure} onChange={handleLoanTenureChange} />
                            <span className='content-gsap  font-bold font-josefin text-green-body'>{loanTenure} months</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Calculator;
