import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Authslice';
import { useNavigate } from 'react-router-dom';
import Popup from './popup';



const AddtoCart = ({product,quantity, size}) => {
  
    const dispatch=useDispatch();
    const userId=useSelector((state)=>state.auth.user?.id)
    const navigate=useNavigate();
    const [ShowToast, setShowToast]=useState(false)
    const [isClicked, setIsClicked]=useState(false);
    const handleAddItem =(e)=>{
      e.stopPropagation()
      e.preventDefault()
      
      if(userId)
      {
        if(size)
        {

          dispatch(addToCart({userId, product, size:size, quantity:quantity}));
          setIsClicked(true);

        }
       setShowToast(true);
      }
      else{
        navigate("/login")
      }
    }
  return (
    <>
    <button className='AddToCartBtn' onClick={handleAddItem}>Add To <i class='bx bxs-shopping-bag'></i></button>
    <Popup
     message={size?"Product Added to Cart":"Please Select Size"}
     show={ShowToast}
     isClicked={isClicked}
     setShow={setShowToast}
    />


    </>
       
       
  )
}

export default AddtoCart
