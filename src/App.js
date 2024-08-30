import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Login from './components/Login';
import "./styles/styles.css";
import ReadymadeSearch from './components/ReadymadeSearch';
import ProductDetails from './components/ProductDetails';
import Footer from './components/footer';
import Register from './components/Register';
import Designs from './components/Designs';
import Coloroptions from './components/Coloroptions';
import Fabric from './components/Fabric';
import Embroidery from './components/Embroidery';
// import CustomDesigns from './components/CustomDesigns';
import CustomDetails from './components/CustomDetails';
import CustomDesigns from './components/CustomDesigns';
import Orders from './components/Orders';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './components/Payment';
import Address from './components/Address';
import Favourites from './components/Favourites';

// import Carousel from './components/Carousel';
// import Api from './api';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />
      <div>
       
        <Routes>

          <Route  path="/" element={<HomePage/>} />
          {/* <Route path="/customize" element={<BlouseCustomization/>} /> */}
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
         <Route path='/ReadymadeSearch' element={<ReadymadeSearch/>}/>
         <Route path='/ProductDetails' element={<ProductDetails/>}/>
         <Route path='/Register' element={<Register/>}/>
         <Route path='/Embroidery' element={<Embroidery/>}/>
         <Route path='/Designs' element={<Designs/>}/>
         <Route path='/Coloroptions' element={<Coloroptions/>}/>
         <Route path='/Fabric' element={<Fabric/>}/>
         <Route path='/CustomDetails' element={<CustomDetails/>}/>
         <Route path='/customDesigns' element={<CustomDesigns/>}/>
         <Route path="/Orders" element={<Orders/>}/>
         <Route path="/Checkout" element={<Checkout/>}/>
         <Route path="/Address" element={<Address/>}/>
         <Route path='/Favourites' element={<Favourites/>}/>
        </Routes>
     
      </div>
      <Footer/>
    </BrowserRouter>
    
     {/* <Carousel/> */}
     </>
    
    
    
   
   
  );
};

export default App;

