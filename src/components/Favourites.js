import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddtoFav from './AddtoFav';
import AddtoCart from './AddtoCart';
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
    const userId=useSelector((state)=>state.auth.user?.id);
    const [data, setData]=useState([]);
    const [error, setError]=useState(null);
    const [loading, setLoading]=useState(null)
    const navigate=useNavigate();
    console.log(userId)

    
        const fetchData= async()=>{
          if(userId)
          {
            try{
              const response=await axios.get(`https://customweavesapi.onrender.com/users/${userId}`)
              // setData(response.data.Customproducts)
             const user=response.data
             setData(user.favorites);   
             console.log(data);
          }
          catch(error){setError(error)
          }
          finally{
              setLoading(false)        
          }
          }   
        } 
        fetchData()   
    
    
    const  handleClick=(item)=>{
        navigate("/ProductDetails",{state:{item}})
        }
  return (
    <div>
      {!userId?<h3>Please Login to view Favourites</h3>:
    <div className="card-container">
      
      {(data.length===0)?
      
        <h3>No Favourits added </h3>
      :(
      
                data.map((item, index) => (
                    <div key={index} className='card' onClick={()=>handleClick(item)}>
                       
                        <img src={item.link} className='img-container'/>
                        <AddtoFav product={item}/>
                        <p className='blousename'>{item.name}</p>
                        <div className='AddtoCartdiv'>
                        <p className='price'>&#8377;{item.price}</p>
                        <AddtoCart product={item}/>
                        </div>     
                    </div> // Adjust property name according to your data structure
                )))
              }
     </div>
}
     </div>
  )
}
export default Favourites

