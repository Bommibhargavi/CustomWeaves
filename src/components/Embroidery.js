
import React, { useState} from 'react';
import { useSelector } from 'react-redux';

import Customization from './Customization';

const Embroidery = () => {
  const [selectedEmbroidery, setSelectedEmbroidery] = useState(null);

  const handleEmbroiderySelect = (Embroidery) => {
    setSelectedEmbroidery(Embroidery);

  };
  
  const fabric = useSelector((state) => state.blouse.fabric);
  const color = useSelector((state) => state.blouse.color);
  const design = useSelector((state) => state.blouse.design);
  const embroidery = useSelector((state) => state.blouse.embroidery);
  console.log(fabric, color, design, embroidery)
  

  return (
    <div className='Embroidery'>
      <h2>Select your Desired Embroidery</h2>
      <Customization 
        endpoint={"/embroideryOptions"}
        onItemSelect={handleEmbroiderySelect} // Pass a handler to customize the selection
        selectedItem={selectedEmbroidery} // Pass the selected item to the component
      />
    </div>
  );
};

export default Embroidery;
