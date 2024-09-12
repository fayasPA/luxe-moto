import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { POST_SELL_VEHICLE_FORM } from '../utils/urls';
import '../assets/css/sell-car-form.css'
import cardBg from '/images/cardBg.jpg'
import { capitalizeWord } from '../utils/helperFunctions';

const ThreeStepForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    make: '',
    model: '',
    year: '',
    kms: '',
    regNo: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const renderCarDetailsForm = () => (
    <div className=''>
      <h2 className="text-xs md:text-sm lg:text-base text-white font-light mb-4">{capitalizeWord("Fill Your Car Details")}</h2>
      <div className="space-y-4 flex flex-col items-end font-josefin">
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm py-2 font-light" type="text" name="make" placeholder={capitalizeWord("Car Make")} value={formValues.make} onChange={handleInputChange} />
        {errors.make && <span style={{ fontSize: '1em' }} className="error pr-2 text-yellow-600 font-light">{errors.make}</span>}
        </div>
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm py-2 font-light" type="text" name="model" placeholder={capitalizeWord("Car Model")} value={formValues.model} onChange={handleInputChange} />
        {errors.model && <span style={{ fontSize: '1em' }} className="error pr-2 text-yellow-600  font-light">{errors.model}</span>}
        </div>
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm py-2 font-light" type="text" name="year" placeholder={capitalizeWord("Manufacturing Year")} value={formValues.year} onChange={handleInputChange} />
        {errors.year && <span style={{ fontSize: '1em' }} className="error pr-2 text-yellow-600  font-light">{errors.year}</span>}
        </div>
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm py-2 font-light" type="text" name="kms" placeholder={capitalizeWord("KMs Driven")} value={formValues.kms} onChange={handleInputChange} />
        {errors.kms && <span style={{ fontSize: '1em' }} className="error pr-2 text-yellow-600  font-light">{errors.kms}</span>}
        </div>
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm py-2 font-light" type="text" name="regNo" placeholder={capitalizeWord("Registration No.")} value={formValues.regNo} onChange={handleInputChange} />
      </div>
        </div>
    </div>
  );

  const renderPersonalDetailsForm = () => (
    <div>
      <h2 className="text-xs md:text-sm lg:text-base font-semibold mb-4">Fill Your Personal Details</h2>
      <div className="space-y-4 font-josefin">
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm font-light" type="text" name="name" placeholder={capitalizeWord("Name")} value={formValues.name} onChange={handleInputChange} />
        {errors.name && <span style={{ fontSize: '1em' }} className="error pr-2 text-yellow-600  font-light">{errors.name}</span>}
        </div>
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm font-light" type="email" name="email" placeholder={capitalizeWord("Email ID")} value={formValues.email} onChange={handleInputChange} />
        </div >
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm font-light" type="text" name="mobile" placeholder={capitalizeWord("Mobile No.")} value={formValues.mobile} onChange={handleInputChange} />
        {errors.mobile && <span style={{ fontSize: '1em' }} className="error pr-2 text-yellow-600  font-light">{errors.mobile}</span>}
        </div>
        <div className='w-full flex flex-col items-end'>

        <input className="sell-car-input placeholder-black text-xs md:text-sm font-light" type="text" name="location" placeholder={capitalizeWord("Location")} value={formValues.location} onChange={handleInputChange} />
      </div>
        </div>
    </div>
  );

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.make) newErrors.make = 'Vehicle Make is required';
    if (!formValues.model) newErrors.model = 'Vehicle Model is required';
    if (!formValues.year) newErrors.year = 'Year of Manufacture is required';
    if (!formValues.kms) newErrors.kms = 'km is required';
    if (!formValues.name) newErrors.name = 'Name is required';
    if (!formValues.mobile) newErrors.mobile = 'Mobile No is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const transformedValues = {
          Make: formValues.make,
          Model: formValues.model,
          Year: formValues.year,
          Kms: formValues.kms,
          Name: formValues.name,
          Mobile: formValues.mobile,
        };
        await toast.promise(
          axios.post(POST_SELL_VEHICLE_FORM,
            new URLSearchParams(transformedValues).toString()
          ),
          {
            pending: 'Please Wait...',
            success: {
              render: 'Done :)',
              icon: '👌',
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: { fontSize: '0.8em' }
            },
            error: {
              render: 'Server Error! TRY LATER',
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: { fontSize: '0.8em' }
            }
          }
        );
        
        setStep(1)
        setFormValues({
          make: '',
          model: '',
          year: '',
          kms: '',
          regNo: '',
          name: '',
          email: '',
          mobile: '',
          city: '',
          code: ''
        });
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
    else {
      setStep(1)
      toast.error("Error! Check Your Form.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { fontSize: '0.8em' }
      });
    }
  }

  return (
    <div className="flex justify-center items-center  w-full pb-8 md:pb-10">
      <div className="w-[97vw] md:w-3/5 bg-black border-[1px] border-black shadow-xl shadow-black rounded " style={{
        backgroundImage: `url(${cardBg})`,
      }}>
        <div className='p-4 md:p-8 backdrop-blur-xl bg-[#12472f69]/60'>
        <div className='w-full flex mb-6 justify-center'>
        <div className="w-fit flex gap-5 text-xs md:text-base lg:text-lg">
          <div className={`step ${step === 1 ? 'active' : 'inactive text-borderColor2/50'}`}>{capitalizeWord("Car Details")} </div>
          <div className='border-[1px] border-borderColor'></div>
          <div className={`step ${step === 2 ? 'active' : 'inactive text-borderColor2/50'}`}>{capitalizeWord("Personal Details")} </div>
        </div>
        </div>
        {step === 1 && renderCarDetailsForm()}
        {step === 2 && renderPersonalDetailsForm()}
        <div className="flex justify-between mt-6">
          {step > 1 && <button onClick={prevStep} className="px-2 z-30 py-1 bg-green/70 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-300/40 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#000;]  text-sm ">PREVIOUS</button>}
          {step < 2 && <button onClick={nextStep} className="px-2 z-30 py-1 bg-green/70 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-300/40 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#000;]  text-md">NEXT</button>}
          {step === 2 && <button onClick={handleSubmit} className="px-2 z-30 py-1 bg-green-950 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green/70 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#000;]  text-lg">SUBMIT</button>}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeStepForm;
