import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sizecomponent from './Sizecomponent';
import { addcustomDesign } from '../Redux/Authslice';
import BuyNow from './BuyNow';
import btnicon from '../icons/btn-icon.png';
import PriceTag from '../icons/PriceTag.png';
import Popup from './popup';
import { resetSize } from '../Redux/blouseSlice';


function CustomDetails() {
  const fabric = useSelector((state) => state.blouse.fabric);
  const color = useSelector((state) => state.blouse.color);
  const design = useSelector((state) => state.blouse.design);
  const embroidery = useSelector((state) => state.blouse.embroidery);
  const size = useSelector((state) => state.blouse.size); // Updated from Redux
  const [clicked, setClicked] = useState(false);
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();
  const [id, setId] = useState(100);
  const [isClicked, setIsClicked]=useState(false);
  const [ShowToast, setShowToast]=useState(false)
  const [fitSize, setFitSize]=useState(null)
  const [cost, setCost]=useState(false)

  let customDesign = {
    id: id,
    fabric: fabric,
    color: color,
    design: design,
    embroidery: embroidery,
    size: size, // Updated from Redux
    price: fabric?.price + color?.price + design?.price + embroidery?.price,
  };

  const handleClick=() => {
      if (userId && size && cost) {
        setId(id + 1);
        dispatch(addcustomDesign({ userId, customDesign }));
        dispatch(resetSize())
        setIsClicked(true)
      }  
        setShowToast(true)
  };

  const handlePrice=()=>{
    if(fitSize)
    {
      setClicked(true);
      setCost(true)
    } 
    else{
      setShowToast(true)
    }   
  }
  const handleSize=(data)=>{
    setFitSize(data)
  }

  return (
    <div>
      <div className="CustomDiv">
        {/* Fabric */}
        <div className="card">
          <img src={fabric?.link} className="Fabric-img-container" alt={fabric?.name} />
          <p className="blousename">{fabric?.name}</p>
        </div>

        {/* Color */}
        <div className="card">
          <img src={color?.link} className="Fabric-img-container" alt={color?.name} />
          <p className="blousename">{color?.name}</p>
        </div>

        {/* Design */}
        <div className="card">
          <img src={design?.link} className="Fabric-img-container" alt={design?.name} />
          <p className="blousename">{design?.name}</p>
        </div>

        {/* Embroidery */}
        <div className="card">
          <img src={embroidery?.link} className="Fabric-img-container" id="EmbroideryImg" alt={embroidery?.name} />
          <p className="blousename">{embroidery?.name}</p>
        </div>
      </div>

      <div className='customSubDiv'>
        <Sizecomponent SizeCall={clicked && true} sendSize={handleSize}/>
        <button onClick={handlePrice} className="pricebtn">Get Price</button>
        <div className='Price'>
        {clicked ? (
          <p className='CustomPrice'>&#8377;{fabric?.price + color?.price + design?.price + embroidery?.price}</p>
        ) : (

          <p className='CustomPrice'>&#8377;---</p>
          
        ) }<img  className="PriceTag" src={PriceTag} alt="PriceTag"/>
          
        </div>
        
       <BuyNow product={customDesign} size={size} priceSet={cost}/>

        <button id="Designsbtns" onClick={handleClick}>Add to <img className="Custobtnimage" src={btnicon}/></button>
      </div>
      <Popup
      message={isClicked?"Product added to designes":"please Select Size"}
      show={ShowToast}
      isClicked={isClicked}
      setShow={setShowToast}
      />
      
      <Popup
      message={!cost&&"please get your design price"}
      show={ShowToast}
      isClicked={isClicked}
      setShow={setShowToast}
      />
      <Popup
      message={!fitSize&&"please select size"}
      show={ShowToast}
      isClicked={isClicked}
      setShow={setShowToast}
      />

      
    </div>
  );
}

export default CustomDetails;