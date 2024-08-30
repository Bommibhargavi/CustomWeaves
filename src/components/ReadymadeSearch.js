import React from 'react'
// import useFetch from '../api'
import Searchdata from './Searchdata';
const ReadymadeSearch = () => {
    // const [data,setdata]=useState([]);
    
  return (
    <div>
      <Searchdata datatype={"/readymade"} isReadymade={true}/>

    </div>
  )
}

export default ReadymadeSearch
