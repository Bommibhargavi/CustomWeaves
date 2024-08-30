import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlaceOrder } from '../Redux/Authslice';
import Popup from './popup';



const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 const{product,quantity,size}=location.state||{};

  const userId=useSelector((state)=>state.auth.user?.id)
  const [count, setCount]=useState(0);
  const [ischecked, setIsChecked]=useState(false)
  const [ShowToast, setShowToast]=useState(false)  

  const handleOrderPlacement = () => {
    console.log(ischecked)
    if(ischecked && userId)
    {
     
      dispatch(PlaceOrder({userId,product,quantity:quantity, size:size}))
      setCount(count+1)
    }
    setShowToast(true)
    
  };

  return (
    
      <div className="order-summary-section">
          {!userId?<h3>Please login to checkout</h3>:
          (
            <div>
        <h3>Order Summary</h3>
        {
          (product?.name === undefined) ? (<div className='CustomDetailsInnerDiv'>
            <div className="card">
              <img src={product?.fabric?.link} className="Fabric-img-container" alt={product?.fabric?.name} />
              <p className="blousename">{product?.fabric?.name}</p>
            </div>

            {/* Color */}
            <div className="card">
              <img src={product?.color?.link} className="Fabric-img-container" alt={product?.color?.name} />
              <p className="blousename">{product?.color?.name}</p>
            </div>

            {/* product */}
            <div className="card">
              <img src={product?.design?.link} className="Fabric-img-container" alt={product?.design?.name} />
              <p className="blousename">{product?.design?.name}</p>
            </div>

            {/* Embroidery */}
            <div className="card">
              <img src={product?.embroidery?.link} id="SummaryEmbrioderyImg" className="Fabric-img-container" alt={product?.embroidery?.name} />
              <p className="blousename">{product?.embroidery?.name}</p>
            </div>
            <div className='three'>
              <p><span className='one'>size : </span>{product?.size}</p>
              <p><span className='one'>price : </span>{product?.fabric?.price+product?.color?.price+product?.design?.price+product?.embroidery?.price}</p>
         
              <div className='PaymentDiv'>
                <h2>Payment</h2>  
              </div>

              <div className="d-flex justify-content-between w-100 mt-3">
              <div>
              <input type="checkbox" checked={ischecked}  onChange={(event)=>{setIsChecked(event.target.checked)}}/>
              <span className="checkmark">Cash on Delivery</span> 
              </div>
                <button type="button" className="btn btn-dark" onClick={handleOrderPlacement}>BUY NOW</button>
              </div>


            </div>
          </div>) :

            <div className='productdetails-div'>
              <div>
                <img src={product.link} alt={product.name} className='productDetails-img' />
              </div>

              <div className='product-detailsDiv'>
                <h2 className='productName'>{product.name}</h2>
                <p className='ProductDiscription'>{product.description}</p>
                <div className="order-item d-flex justify-content-between align-items-center border p-2 mb-2">
                  <div className="item-details">
                    <h4>{product.name}</h4>
                    <p>Quantity: {quantity}</p>
                    <p>Size:{size}</p>
                    <p>Price: <FaIndianRupeeSign />{product.price}</p>
                  </div>
                  <div className="item-total-price">
                    Total: <FaIndianRupeeSign />{product.price * quantity}
                  </div>
                </div>
                <div id="PaymentDiv">
                  <h3>Payment</h3>    
                </div>

                <div className="d-flex justify-content-between w-100 mt-3">
                <div>
                <input type="checkbox"  checked={ischecked}  onChange={(event)=>{setIsChecked(event.target.checked)}}/>
                <span className="checkmark">Cash on Delivery</span>
                </div>
                <button type="button" className="btn btn-dark" onClick={handleOrderPlacement}>BUY NOW</button>
                </div>

              </div>
          
            </div>
        
          }
           <Popup 
    message={ischecked?"Order Confirmed":"please Select Payment method"}
    show={ShowToast}
    setShow={setShowToast}
    isClicked={ischecked}
    duration={2000}
    />
    </div>
    )
        }
        </div>
    

      );
};


      export default Checkout;