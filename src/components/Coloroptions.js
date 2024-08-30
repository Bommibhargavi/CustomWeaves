
import React, { useState } from 'react';
import Customization from './Customization';

const Coloroptions = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className='ColorOptions'>
      <h2>Select Color of your Blouse</h2>
      <Customization 
        endpoint={"/colorOptions"}
        onItemSelect={handleColorSelect} // Pass a handler to customize the selection
        selectedItem={selectedColor} // Pass the selected item to the component
      />
    </div>
  );
};

export default Coloroptions;


