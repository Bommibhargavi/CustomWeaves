import React, { useEffect, useState } from 'react'
import axios from 'axios'


const useFetch = (endpoint) => {
    const [data,setData]=useState([])
    const [error,setError]=useState("")
    const [loading, setLoading]=useState(true)
    
useEffect(()=>{
  
    const fetchData= async()=>{
        try{
            const response=await axios.get(`https://customweavesapi.onrender.com${endpoint}`,
              
            )
            setData(response.data)
        }
        catch(error){setError(error)
        }
        finally{
            setLoading(false)        
        }
    } 
    fetchData()   
},[endpoint]
)

return{
    data, loading, error
}  
}

export default  useFetch

