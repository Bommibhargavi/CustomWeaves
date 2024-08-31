import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Orders = () => {
    const userId=useSelector((state)=>state.auth.user?.id)
    const [data, setData]=useState([]);
    const [error, setError]=useState(null);
    const [loading, setLoading]=useState(null)
    const location=useLocation();
    
    useEffect(()=>{
        const fetchData= async()=>{
          if(userId)
          {
            try{
              const response=await axios.get(`https://checkered-spiky-catmint.glitch.me/users/${userId}`)
              // setData(response.data.Customproducts)
             const user=response.data
             setData(user?.orders);   
          }
          catch(error){setError(error)
          }
          finally{
              setLoading(false)        
          }
          }   
        } 
        fetchData()   
    }
    )    
  return (

   <div>
    {!userId?<h3>Please login to view orders</h3>:
    <div className='OrdersDiv'>
     
      {(data?.length===0)?
      
        <h3>You haven't ordered anything</h3> :(
          <div>
          <h2>Orders</h2>
          {
        data?.map((product)=>(
          <div>
            
            {(product?.name===undefined)?(<div className='CustomDetailsInnerDiv'>
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
          <img src={product?.embroidery?.link} className="Fabric-img-container two" alt={product?.embroidery?.name} />
          <p className="blousename">{product?.embroidery?.name}</p>
        </div>
        <div className='Custom'>
          <p><span className='one'>size : </span>{product?.size}</p>
          <p><span className='one'>price : </span>{product?.fabric?.price+product?.color?.price+product?.design?.price+product?.embroidery?.price}</p>
          <span className='product paymentMode'><span className='one'>Payment Mode : </span>Cash on Delivery</span>
         
        
        </div>
            </div>):
          
      <div className='productdetails-div'>
        <div>
        <img src={product.link} alt={product.name} className='orderDetails-img'/>
        </div>

      <div className='product-detailsDiv'>
      <h2 className='productName'>{product.name}</h2>
      <p className='ProductDiscription'>{product.description}</p>
     
      <div className="ProductDetailsinOrders">
      <span className='Product prices'><span className='one'>Price : </span>&#8377;{product.price}</span>
      <span className='Product Size'><span className='one'>Size : </span>{product.size}</span>
      <span className='product Quantity'><span className='one'>Number of Items : </span>{product.quantity}</span>
      <span className='product paymentMode'><span className='one'>Payment Mode : </span>Cash on Delivery</span>
      </div>
      
      </div>
      </div>
     
}

      </div>
        ))
      }
        </div>
    )}
    </div>
}
    </div>
 
  )
 
}

export default Orders
