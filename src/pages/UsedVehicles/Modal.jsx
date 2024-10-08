import React, { useRef, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_IMAGE_URL, POST_ENQUIRY_FORM } from '../../utils/urls';
import { formatTextWithFonts } from '../../utils/helperFunctions';

const EnquiryModal = ({
  isEnquiryModalOpen,
  setIsEnquiryModalOpen,
  selectedEnqProduct,
}) => {
  const enqModalRef = useRef();

  // State to handle form inputs and errors
  const [formValues, setFormValues] = useState({
    name: '',
    phone_number: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Handle form input change
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

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = 'Name is required';
    if (!formValues.phone_number) newErrors.phone_number = 'Phone number is required';
    // No validation for message field as it is optional
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await toast.promise(
          axios.post(POST_ENQUIRY_FORM, new URLSearchParams({
            ...formValues,
            car_name: `${selectedEnqProduct?.brand} ${selectedEnqProduct?.model}`, // Include product details
          }).toString()),
          {
            pending: 'Submitting...',
            success: 'Enquiry submitted successfully!',
            error: 'Error submitting form',
          }
        );
        setIsEnquiryModalOpen(false);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };
  return (
    isEnquiryModalOpen && (
      <div className="enquiry-modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
        {/* Close Button for Desktop */}
        <div className="h-full w-full flex justify-end backdrop-blur-md">
          <div className="justify-center mr-5 hidden md:flex">
            <div className="h-full flex justify-center items-center">
              <button
                onClick={() => setIsEnquiryModalOpen(false)}
                className="enquiry-modal-close-button text-borderColor h-fit text-center md:text-5xl lg:text-7xl"
              >
                <IoMdCloseCircle />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div
            ref={enqModalRef}
            className={`text-black enquiry-modal w-full md:w-1/2 lg:w-1/3 bg-white/50 h-full transform transition-transform duration-500 ease-in-out ${isEnquiryModalOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="enquiry-modal-content p-6">
              <div className='w-full flex justify-end'>
                {/* Close Button for Mobile */}
                <button
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="flex md:hidden enquiry-modal-close-button text-zinc text-2xl"
                >
                  <IoMdCloseCircle className="" />
                </button>
              </div>

              {/* Product Details with Image */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={`${BASE_IMAGE_URL}${selectedEnqProduct?.image}`} // Add product image source
                  alt={`${selectedEnqProduct?.brand} ${selectedEnqProduct?.model}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="enquiry-modal-title text-xl font-bold">
                    {selectedEnqProduct?.brand}  {(selectedEnqProduct?.model)}
                  </h2>
                </div>
              </div>

              {/* Enquiry Form */}
              <h2 className="enquiry-modal-title text-base md:text-xl lg:text-2xl mb-4">Enquiry Form</h2>
              <form onSubmit={handleSubmit} className="enquiry-form space-y-10 text-black">


                <div className="flex items-center justify-center">
                </div>


                <div className="enquiry-form-group">
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formValues.name}
                      onChange={handleInputChange}
                      className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-borderColor2 transition-colors focus:outline-none peer bg-inherit"
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-0 ${formValues.name ? '-top-4 text-xs' : 'top-1'} cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-green-body`}
                    ><strong>*</strong>Name</label>
                  </div>
                  {errors.name && <p className="mt-1 ml-1 text-yellow-500 text-sm">{errors.name}</p>}

                </div>
                <div className="enquiry-form-group">
                  <div className="relative">
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      value={formValues.phone_number}
                      onChange={handleInputChange}
                      className="border-b font-josefin font-semibold border-gray-300 py-1 focus:border-b-2 focus:border-borderColor2 transition-colors focus:outline-none peer bg-inherit"
                    />
                    <label
                      htmlFor="phone_number"
                      className={`absolute left-0 ${formValues.phone_number ? '-top-4 text-xs' : 'top-1'} cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-green-body`}
                    >phone_number</label>
                  </div>
                  {errors.phone_number && <p className="mt-1 ml-1 text-yellow-500 text-sm">{errors.phone_number}</p>}
                </div>
                <div className="enquiry-form-group">
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formValues.message}
                      onChange={handleInputChange}
                      className="font-josefin font-semibold border-b border-gray-300 py-1 focus:border-b-2 focus:border-borderColor2 transition-colors focus:outline-none peer bg-inherit w-full"
                      rows="4"
                    />

                    <label
                      htmlFor="message"
                      className={`absolute left-0 ${formValues.message ? '-top-4 text-xs' : 'top-1'} cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-green-body`}
                    >message</label>
                  </div>
                  {errors.message && <p className="mt-1 ml-1 text-yellow-500 text-sm">{errors.message}</p>}
                </div>

                <button type='submit'
                  className="w-full px-4 py-2 md:px-6 md:py-3 bg-green-body/90 rounded-md text-white font-semibold relative transition-all duration-700 hover:scale-105"
                >
                  APPLY
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EnquiryModal;
