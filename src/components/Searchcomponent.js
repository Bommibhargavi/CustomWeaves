
import React, { useState } from 'react';

const Searchcomponent = ({onClick}) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    const handleInputChange = (event) => {
        setQuery(event.target.value);
        // onClick(event.target.value);

    }
   const handleSearch=()=>{
    onClick(query);
      
    }
   
  return (
    <div className="searchComponent">
    <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search" 
        className="searchInput"
    />
    <button className='inputsearchbtn' onClick={handleSearch}><i class='bx bx-search'></i></button>
</div>
  )
}

export default Searchcomponent
