import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import FilterSearch from '../../components/FilterSearch';
import { axiosAPI } from '../../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_ALL_VEHICLES } from '../../utils/urls';


const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
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


        {/* filter */}
        <FilterSearch {...filterProps} />
        {/* filter */}

        <div className='pt-5'>
          <h2 className='text-xl md:text-4xl'>Make Your Choice</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {datas.map((product) => (
            <div key={product.id} className="group bg-white border rounded-lg shadow-sm">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={`${BASE_IMAGE_URL}${product.image}`}
                    alt={product.image}
                    className="h-full w-full object-cover object-center group-hover:opacity-85 hover:scale-105 transition-transform duration-1000 ease-in"
                  />
                </div>
                <div className="absolute top-0 left-0 m-4">
                  <span className="bg-white text-black px-2 py-1 text-xs font-semibold rounded">
                    {product.new ? 'NEW' : ''}
                  </span>
                </div>
                {product.approved && (
                  <div className="absolute top-0 right-0 m-4">
                    <span className="bg-black text-white px-2 py-1 text-xs font-semibold rounded">
                      FERRARI APPROVED
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span>{product.year}</span>
                  <span>{product.mileage} MI</span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {product.brand} {product.model}
                </h3>

                <p className="mt-2 text-2xl font-semibold text-gray-900">{product.price}</p>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>EXTERIOR: {product.exterior}</span>
                  <span>INTERIOR: {product.interior}</span>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  <span>AVAILABLE AT: {product.location}</span>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="bg-green text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                    ENQUIRE
                  </button>
                  <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300">
                    MORE DETAILS
                  </button>
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
