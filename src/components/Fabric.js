

import React, { useState } from 'react';
import Customization from './Customization';

const Fabric = () => {
  const [selectedFabric, setSelectedFabric] = useState(null);

  const handleFabricSelect = (fabric) => {
    setSelectedFabric(fabric);
  };

  return (
    <div className='Fabrics'>
      <h2>Select Your Fabric</h2>
      <Customization 
        endpoint={"/fabricOptions"}
        onItemSelect={handleFabricSelect} // Pass a handler to customize the selection
        selectedItem={selectedFabric} // Pass the selected item to the component
      />
    </div>
  );
};

export default Fabric;
