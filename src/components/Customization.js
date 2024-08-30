
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../api';
// import setCustomization from '../Redux/blouseSlice';
import { setCustomization } from '../Redux/blouseSlice';
import Popup from './popup';

const Customization = ({ endpoint, onItemSelect, selectedItem }) => {
  const [navigateTo, setNavigateTo] = useState(null);
  const { data: blouses, error, loading } = useFetch(endpoint);
  const [ShowToast, setShowToast]=useState(false)
  const [customComponent, setCustomComponent]=useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const handleClick = (item) => {
    onItemSelect(item);
  };

  const handleNext = () => {
    if (selectedItem) {
      console.log("Dispatching:", { type: setCustomization.type, payload: selectedItem });

      switch (endpoint) {
        case '/fabricOptions':
          dispatch(setCustomization({ fabric: selectedItem }));

          setNavigateTo('/Coloroptions');
          break;
        case '/colorOptions':
          dispatch(setCustomization({ color: selectedItem }));
          setNavigateTo('/Designs');
          break;
        case '/designOptions':
          dispatch(setCustomization({ design: selectedItem }));
          setNavigateTo('/Embroidery');
          break;
        case '/embroideryOptions':
          dispatch(setCustomization({ embroidery: selectedItem }));
          setNavigateTo('/CustomDetails');
          break;
        default:
          break;
      }
    } else {
     
      switch (endpoint) {
        case '/fabricOptions':
           setCustomComponent("fabric") 
          break;
        case '/colorOptions':
          setCustomComponent("Color") 
          break;
        case '/designOptions':
          setCustomComponent("Design") 
          break;
        case '/embroideryOptions':
          setCustomComponent("Embroidery") 
          break;
        default:
          break;
      }
      setShowToast(true)
    }
  };

  const handlePrevious = () => {
    switch (endpoint) {
      case '/colorOptions':
        setNavigateTo('/Fabric');
        break;
      case '/designOptions':
        setNavigateTo('/Coloroptions');
        break;
      case '/embroideryOptions':
        setNavigateTo('/Designs');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  }, [navigateTo, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div>
    
      <div className="readymadeCard-container">
        {blouses && blouses.map((item, index) => (
          <div
            key={index}
            className="card2"
            // className={`card`} // Apply selected class
            onClick={() => handleClick(item)}
          >
            <img src={item.link} className={`Fabric-img-container ${selectedItem === item ? 'selected' : ''}`} alt={item.name} />
            <p className="blousename">{item.name}</p>
          </div>
        ))}
        
      </div>
      <div className='NextBtnDiv'>
          {(endpoint !== "/fabricOptions") && <button className='PreviousBtn' onClick={handlePrevious}>Previous</button>}
          <button className='NextBtn' onClick={handleNext}>Next</button>
        </div>
      <Popup
      message={`please select ${customComponent} for your blouse`}
      show={ShowToast}
      
      setShow={setShowToast}
      />
      </div>
    
  );
};

export default Customization;
