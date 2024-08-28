import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import FilterSearch from '../../components/FilterSearch';
import { axiosAPI } from '../../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_ALL_VEHICLES } from '../../utils/urls';
import { TbPhoneCall } from 'react-icons/tb';
import { capitalizeWord, getNumberToCurrencyText } from '../../utils/helperFunctions';

const products = [
  {
    id: 1,
    brand: 'Earthen Bottle',
    href: '#',
    price: '$48',
    image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    brand: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    brand: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    brand: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
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
            <div key={product.id} className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
              <NavLink to={`/vehicles/${product.id}`} >
                <img
                  className="w-full"
                  src={`${BASE_IMAGE_URL}${product.image}`}
                  alt={product.image}
                />
                <div className="p-4">
                  <div className="text-xl font-semibold mb-2">{getNumberToCurrencyText(product.price)}</div>
                  <div className="text-lg font-bold">{product.year} {capitalizeWord(`${product.brand} ${product.model}`)}</div>
                  <div className="mt-4 flex justify-between text-gray-700">
                    <div className="flex flex-wrap justify-between w-full">
                      <div className="w-fit">
                        <div className="text-xs">REG. YEAR</div>
                        <div className="text-sm font-semibold">{product.year}</div>
                      </div>
                      <div className='w-[1px] border border-gray-300'></div>

                      <div className="w-fit ">
                        <div className="text-xs">KMS</div>
                        <div className="text-sm font-semibold">12700</div>
                      </div>
                      <div className='w-[1px] border border-gray-300'></div>

                      <div className="w-fit ">
                        <div className="text-xs">FUEL TYPE</div>
                        <div className="text-sm font-semibold">{capitalizeWord(product.fuel_type)}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </NavLink>
            </div>
          ))}
        </div>



      </div>
    </div>
  )
}

export default UsedVehicles
