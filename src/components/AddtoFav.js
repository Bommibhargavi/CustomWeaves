import React, { useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { addFavorite,removeFavorite } from '../Redux/Authslice';


import Heartred from '../favHearts/HeartRed.png';
import Heartwhite from '../favHearts/HeartWhite.png';


const AddtoFav = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const favorites = user?.favorites || [];
  // const isLogin = useSelector((state) => state.auth.isLogin)
//   const [isFavorite,setIsFavorite] = useState(false);
  const userId=useSelector((state)=>state.auth.user?.id)
  
 let isFavorite = favorites?.some(favorite => favorite.id === product.id)

  const handleFavouriteClick = (event) => {
    event.stopPropagation()
    if(user)
    {
      if(isFavorite)
      {
        
        dispatch(removeFavorite({userId, product}))
        console.log(product)
      }
      else{
        dispatch(addFavorite({userId,product}));

      }
    }
    
  }

  return (
    
      <button onClick={handleFavouriteClick} className="Heartbtn">

        {isFavorite ? <img src={Heartred} className="Heart Red"/> : <img src={Heartwhite} className="Heart white"/>}
      </button>
    

  );
}
export default AddtoFav;