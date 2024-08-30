import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Sizecomponent from './Sizecomponent';
import BuyNow from './BuyNow';
import AddtoCart from './AddtoCart';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const location = useLocation();
  const item = location.state?.item;
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  const handleSize = (S) => {
    setSize(S)
  }
  
  return (
    <div className='productdetails-div'>
      <div>
        <img src={item.link} alt={item.name} className='productDetails-img' />
      </div>

      <div className='product-detailsDiv'>
        <h2 className='productName'>{item.name}</h2>
        <p className='ProductDiscription'>{item.description}</p>
        <p className='ProductPrice'>&#8377;{item.price}</p>

        <Sizecomponent sendSize={handleSize} />
        <div className='ProductDetailsBtns'>
          <div className='quantity'>
          <button className='decrement'  onMouseDown={decrement}>-</button>
            <p>{quantity}</p>
            <button className="increment" onMouseDown={() => setQuantity(quantity + 1)}>+</button>
          </div>

            {/* <Checkout product={item} size={size} quantity={quantity} /> */}
            <div className='BuynowAddtoCartbtns'>
            <BuyNow product={item} size={size} quantity={quantity}  />
            <AddtoCart product={item} size={size} quantity={quantity} />
            </div>  
        </div>
      </div>   
    </div>
  )
}

export default ProductDetails
