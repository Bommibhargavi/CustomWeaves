import React from 'react'
import btnicon from '../icons/btn-icon.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Customizebtn = () => {
  const userId=useSelector((state)=>state.auth.user?.id);
  const navigate=useNavigate();
  const handleClick=()=>{
    if(userId)
    {
      navigate("/Fabric")
    }
    else{
      navigate("/login")
    }
   
  }

  return (
    <div class="customizediv">
      
         <button className='customizebtn' onClick={handleClick}>Customize &nbsp;&nbsp;<img className="btnimage" src={btnicon}/></button>
    </div>
     
    
  )
}

export default Customizebtn
