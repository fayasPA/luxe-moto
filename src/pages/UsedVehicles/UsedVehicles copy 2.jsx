import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import FilterSearch from '../../components/FilterSearch';
import { axiosAPI } from '../../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_ALL_VEHICLES } from '../../utils/urls';
import './style.css';
import { TbPhoneCall } from 'react-icons/tb';

const products = [
  {
    id: 1,
    brand: 'Earthen Bottle',
    href: '#',
    price: '$48',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    brand: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    brand: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    brand: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

const UsedVehicles = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const filters = {
    brand_id: params.get('brand_id'),
    car_type: params.get('car_type'),
    fuel_type: params.get('fuel_type'),
    min_price: params.get('min_price') && parseInt(params.get('min_price')),
    max_price: params.get('max_price') && parseInt(params.get('max_price'))
  };

  const filterProps = {
    ...(filters.brand_id && { brandSel: filters.brand_id }),
    ...(filters.fuel_type && { fuelTypeSel: filters.fuel_type }),
    ...(filters.car_type && { carTypeSel: filters.car_type }),
    ...(filters.min_price && { minPriceSel: filters.min_price }),
    ...(filters.max_price && { maxPriceSel: filters.max_price }),
  };

  const axiosInstance = axiosAPI();
  const [datas, setDatas] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  // api call
  useEffect(() => {
    setCurrentPage(1)
    get_all_vehicles();
  }, [])

  useEffect(() => {
    if (currentPage > 1) {
      // load_more_vehicles();
    }
  }, [currentPage])

  async function get_all_vehicles() {
    try {
      const params = new URLSearchParams(location.search);
      const response = await axiosInstance.get(`${GET_ALL_VEHICLES}`);
      console.log("@UsedVehicles", response)
      if (response.status === 200) {
        if (response.data.all_cars) {
          setDatas(response.data.all_cars);
          setTotalDataCount(response.data.total_count);
        } else {
          setDatas([])
          setTotalDataCount(0)
        }
      }
    } catch (error) {
      setDatas(products)
      console.log("---------BANNER_ERROR", error);
    } finally {
      // setLoading(false)
      window.scrollTo(0, 0);
    }
  }
  // api call


  return (
    <div className="bg-white pt-10">

      <div className="text-black mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className='flex justify-center '>
          <label
            htmlFor="car-type-filter"
            className="car-type-switch"
            aria-label="toggle car-type filter"
          >
            <input
              type="checkbox"
              id="car-type-filter"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span>PREMIUM</span>
            <span>MINI</span>
          </label>
        </div>

        {/* filter */}
        <FilterSearch {...filterProps} />
        {/* filter */}

        <div className='pt-5'>
          <h2 className='text-xl md:text-4xl'>Make Your Choice</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
  {datas.map((product) => (
    <div
      key={product.id}
      className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-72 w-56 rounded-2xl hover:duration-700"
    >
      <div className="w-56 h-72 bg-lime-400 text-gray-800">
        <div className="flex justify-between p-1">
          <svg
            className="fill-current stroke-current w-8 h-8 p-2 hover:bg-lime-200 rounded-full"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="8"
            />
          </svg>
          <svg
            className="fill-current stroke-current w-8 h-8 p-2 hover:bg-lime-200 rounded-full"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="8"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 duration-500 group-hover:duration-600">
        <span className="text-lime-400 font-bold text-xs">{product.year}</span>
        <span className="text-gray-800 font-bold text-3xl">
          {product.brand} {product.model}
        </span>
        <p className="text-neutral-800">
          {product.mileage} MI - {product.price}
        </p>
        <p className="text-neutral-800">EXTERIOR: {product.exterior}</p>
        <p className="text-neutral-800">INTERIOR: {product.interior}</p>
        <p className="text-neutral-800">AVAILABLE AT: {product.location}</p>
      </div>
    </div>
  ))}
</div>




      </div>
    </div>
  )
}

export default UsedVehicles
