import React, { useEffect, useState} from 'react'
import useFetch from '../api'
import Customizebtn from './Customizebtn';
import { Link, useNavigate } from 'react-router-dom';
import AddtoFav from './AddtoFav';
import AddtoCart from './AddtoCart';



const Readymade = () => {
    
    
    const[randomData, setRandomData]=useState([]);
    const navigate=useNavigate();
   const  handleClick=(item)=>{
    navigate("/ProductDetails",{state:{item}})

    }
    let  shuffled;
    const {data:blouses,loading,error}=useFetch("/readymade")
    // console.log(blouses);
    const fetchdata=async()=> {  
        if(blouses && blouses.length>0)
        {
            shuffled = blouses.sort(() => 0.5 - Math.random());
            shuffled=shuffled.slice(0,10);  
            setRandomData(shuffled);
        }    
       
    };
    const handleAdd=(item)=>{
        navigate("/ProductDetails",{state:{item}})

    }
    
    useEffect(()=>{
         
        fetchdata();

    },[blouses]);
    if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

    
  return (
    
    <div>
        <Customizebtn/>
        <h1 className='readymadeheading'>Some Readymade Blouses for You</h1>
        <div className="card-container">
                {randomData.map((item, index) => (
                    <div key={index} className='card1' onClick={()=>handleClick(item)}>
                       
                        <img src={item.link} className='img-container'/>
                        <AddtoFav product={item}/>
                        <p className='blousename'>{item.name}</p>
                        <div className='AddtoCartdiv'>
                        <span className='price'>&#8377;{item.price}</span>
                        <button className='AddToCartBtn' onClick={()=>handleAdd(item)}>Add To <i class='bx bxs-shopping-bag'></i></button>
                        </div>
                       
                        
                    </div> // Adjust property name according to your data structure
                ))}
                <div className='exploreDiv'>
                <Link className="explore" to={"/ReadymadeSearch"}>Explore more readymade designs</Link> 

                </div>
            </div>
           
    </div>
  )
}

export default Readymade
