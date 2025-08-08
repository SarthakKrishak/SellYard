import React, { useContext, useState } from 'react';
import { ShopContext } from "../context/ShopContext.jsx";
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [extraCount, setExtraCount] = useState(0); // For additional products beyond the default 10

  const handleLoadMore = () => {
    setExtraCount((prev) => prev + 10);
  };

  // First 10 products always
  const defaultProducts = products.slice(0, 10);
  // Next extra products if any
  const extraProducts = products.slice(10, 10 + extraCount);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, tempora
        </p>
      </div>

      {/* Default 10 products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {defaultProducts.map((item, index) => (
          <ProductItem
            key={`default-${index}`}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
        {extraProducts.map((item, index) => (
          <ProductItem
            key={`extra-${index}`}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Show "More" button if more products are available */}
      {10 + extraCount < products.length && (
        <div className='text-center mt-8'>
          <button
            onClick={handleLoadMore}
            className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-300'
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
