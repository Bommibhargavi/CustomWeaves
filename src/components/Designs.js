import React, { useState } from 'react';
import Customization from './Customization';

const Designs = () => {
  const [selectedDesign, setSelectedDesign] = useState(null);

  const handleDesignSelect = (Designs) => {
    setSelectedDesign(Designs);
  };

  return (
    <div className='designs'>
      <h2>Select a Blouse Design</h2>
      <Customization 
        endpoint={"/designOptions"}
        onItemSelect={handleDesignSelect} // Pass a handler to customize the selection
        selectedItem={selectedDesign} // Pass the selected item to the component
      />
    </div>
  );
};

export default Designs;


