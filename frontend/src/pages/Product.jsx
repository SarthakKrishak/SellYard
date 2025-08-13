import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import assets from '../assets/assets.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

const Product = () => {

  const { productId } = useParams();
  const { products,currency,addToCart } = useContext(ShopContext);
  const [productData, setProdutData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");


  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProdutData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
}, [products,productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} alt={image} key={index} className='w-[24%] sm:w-full sm:mb-3 cursor-pointer shrink-0' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-auto' src={image} alt={image} />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="image" className='w-3'/>
            <img src={assets.star_icon} alt="image" className='w-3' />
            <img src={assets.star_icon} alt="image" className='w-3' />
            <img src={assets.star_icon} alt="image" className='w-3' />
            <img src={assets.star_dull_icon} alt="image" className='w-3' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index) => (
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item == size?"border-orange-500":""} cursor-pointer`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product</p>
              <p>Cash on Delivery is available on this Product</p>
              <p>Easy Return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description and review */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Description</p>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum unde quibusdam qui maiores voluptatibus reprehenderit, dicta, labore cum est numquam quam maxime eum ipsam dolorem soluta recusandae fuga id aspernatur itaque a sit quisquam eligendi! Vel ea eos architecto quibusdam eaque voluptate fugit recusandae? Fuga cumque quaerat harum nam at blanditiis delectus? Earum nihil animi eum rem nulla, ab quo possimus fugit? Minus unde eum earum libero, voluptas ipsa! Magni?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto accusamus dolore, rem ab quia magnam nulla error qui, sequi similique tempora at minus nemo maiores ratione sed, ipsa quo! Eius animi similique aliquam, beatae qui eveniet, aspernatur debitis provident suscipit explicabo aliquid in fuga tenetur iste hic? Tempora, nihil?</p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
  
}

export default Product