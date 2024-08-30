
import React, { useState,useEffect} from 'react';
import Searchcomponent from './Searchcomponent';
import useFetch from '../api';
import { useNavigate } from 'react-router-dom';
import AddtoFav from './AddtoFav';
import AddtoCart from './AddtoCart';

const Searchdata = ({datatype,setCustomization,isReadymade}) => {
    const navigate=useNavigate();

    
    const [filteredData, setFilteredData]=useState([]);
    
    const {data:blouses}=useFetch("/readymade")
    console.log(blouses)
   
   
        useEffect(()=>{
            if (blouses) {
                setFilteredData(blouses);
              }
           
        }
           
        ,[blouses])
        console.log(setFilteredData)

       
    
    const handleClick=()=>{
        setCustomization()

    }
    const handleReadymade=(item)=>{
      
            navigate("/ProductDetails",{state:{item}})
        
       
    }

    const handleSearch = (query) => {
        if (query === '') {
            setFilteredData(blouses); // Reset to original data if query is empty
        } else {
            const filtered = blouses.filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase()) // Adjust property name according to your data structure
            );
            setFilteredData(filtered);
        }
    };

    console.log(filteredData);
  return (
    <div>
           
            <Searchcomponent onClick={handleSearch} />

            <div class="card-container">
                {filteredData.map((item, index) => (
                    <div key={index} className='card1' onClick={isReadymade? ()=> handleReadymade(item):undefined}>
                        <img src={item.link} className='img-container'/>
                        <AddtoFav product={item}/>
                        <p className='blousename'>{item.name}</p>
                        <div className='AddtoCartdiv'>
                        <span className='price'>&#8377;{item.price}</span>
                        <button className='AddToCartBtn'>Add To <i class='bx bxs-shopping-bag'></i></button>
                        </div>   
                    </div> // Adjust property name according to your data structure
                ))}
            </div>

        </div>
  )
}

export default Searchdata
