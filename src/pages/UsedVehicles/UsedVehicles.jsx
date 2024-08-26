import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import FilterSearch from '../../components/FilterSearch';
import { axiosAPI } from '../../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_ALL_VEHICLES } from '../../utils/urls';
import { TbPhoneCall } from 'react-icons/tb';
import { capitalizeFirstLetters, getNumberToCurrencyText } from '../../utils/helperFunctions';
import { IoSpeedometerOutline } from 'react-icons/io5';

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {datas.map((product) => (
            <div
              key={product.id}
              className="border-[1px] border-dashed border-black card shadow-lg h-[400px] w-full sm:w-[280px] group gap-2 rounded-none relative flex flex-col justify-end p-6 overflow-hidden bg-black"
            >
              <div
                className="absolute top-0 left-0 h-full w-full bg-cover bg-center opacity-95 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundImage: `url(${BASE_IMAGE_URL}${product.image})` }}
              ></div>

              <div className="relative z-10 text-white flex flex-col gap-2">

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {product.brand} {product.model}
                  </div>
                </div>

                <div className="flex gap-2 justify-between">
                  <div
                    className="border-2 border-green-300 text-white font-normal px-2 py-1 hover:bg-green-300 hover:text-black transition duration-300 cursor-pointer"
                  >
                    <p>Enquiry</p>
                  </div>

                  <Link to={`/vehicles/${product.id}`}
                    className="border-2 border-white text-white font-normal px-2 py-1 hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                  >
                    <p>More Details</p>
                  </Link>
                </div>
              </div>
              <div className="text-white font-light relative h-0 group-hover:h-[8em] leading-5 transition-height duration-500 overflow-hidden z-10">
                <div className="flex items-center justify-between  text-sm md:text-base">
                  <span>{product.year}</span>
                  <span>{capitalizeFirstLetters(product.fuel_type)}</span>
                </div>

                <p className="mt-2 text-2xl font-semibold ">{getNumberToCurrencyText(product.price)}</p>

                <div className="mt-4 flex items-center justify-between text-sm md:text-base">
                  <div className="flex items-center gap-2 justify-center">
                    <IoSpeedometerOutline size={15} className='text-gray' />
                    <span className='text-gray font-medium'>{product.kms} KMS</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>





      </div>
    </div>
  )
}

export default UsedVehicles
