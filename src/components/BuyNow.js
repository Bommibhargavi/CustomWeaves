import React, {useEffect, useState} from 'react'
import {PlaceOrder} from '../Redux/Authslice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Popup from './popup'
import { resetSize } from '../Redux/blouseSlice'
import axios from 'axios'


const BuyNow = ({product,quantity,size,priceSet}) => {
    const userId=useSelector((state)=>state.auth.user?.id)
    const dispath=useDispatch();
    const navigate=useNavigate();
    const [state, setState]=useState();
    const [ShowToast, setShowToast]=useState(false)
    const [userAddress, setUserAddress]=useState(null)
    const [error, setError]=useState(null);
    const [loading, setLoading]=useState(null)
    console.log(userAddress)
    
    useEffect(()=>{
      const fetchData= async()=>{
        if(userId)
        {
          try{
            const response=await axios.get(`https://customweavesapi.onrender.com/users/${userId}`)
            // setData(response.data.Customproducts)
           const user=response.data
          setUserAddress(user.address);
        }
        catch(error){setError(error)
        }
        finally{
            setLoading(false)        
        }
        }   
      } 
      fetchData()   
  })
    const handleClick=()=>{
      if(userId)
      {
        if(userAddress)
        {
          if(size)
          {
            navigate("/Checkout", {state:{product, quantity, size}})
            dispath(resetSize());
          }
          else{
            setShowToast(true)
          } 
        }
        else{
          navigate("/Address", {state:{product, quantity, size}})
        }
      }
      else{
        navigate("/login")
      }
      
    }
    
  return (
    <div>
      <button className='BuyNowbtn' onClick={handleClick}>{(product.name===undefined)?"Order Now":"Buy Now"}</button>

      <Popup
      message={!size&&"Please Select Size"}
      show={ShowToast}
      setShow={setShowToast}
      />
      <Popup
      message={!priceSet&&"please get your design price"}
      show={ShowToast}
      // isClicked={isClicked}
      setShow={setShowToast}
      />
    </div>
  )
}

export default BuyNow
