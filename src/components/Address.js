import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Address = () => {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const[Validate, setValidate]=useState(false);
    const userId=useSelector((state)=>state.auth.user?.id)
    const API_URL=`https://customweavesapi.onrender.com/users/${userId}`;
    const [user, setUser] = useState(null);
    const navigate=useNavigate();
    const location=useLocation();
    const { product, quantity, size } = location.state

    // Fetch the user data from the server
    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

   
    // Handle form submission
    const handleClick= (e) => { 
        e.preventDefault();
        const address={
        address1: address1,
        address2:address2,
        city: city,
        state: state,
        zip: zip,
        }

        if (!user) return;
        if(address1!=""&&address2!=""&&city!=""&&state!=""&&zip!="")
        {
            const updatedUser = { ...user, address };

            // Send the updated user object to the server
            axios.patch(API_URL, updatedUser)
                .then(response => {
                    console.log('Address updated successfully:', response.data);
                    setUser(response.data); // Optionally update the local user state
                    
                    navigate("/Checkout",{state:{product,size,quantity}});

                })
                .catch(error => {
                    console.error('There was an error updating the address!', error);
                });
        }

        else{
            setValidate(true)
        }

    };
        
    
  return (
    
      <div className="checkout-container d-flex justify-content-center gap-5">
      <div className='billing-section d-flex flex-column align-items-center p-4'>
        <h3>Billing Information</h3>
        <form className='AddressForm'>

          <div className="AddressInput">
            <input type="text" className="form-control fs-5" placeholder="1234 Main St" value={address1} onChange={(e) => setAddress1(e.target.value)} />
           
          </div>
          <div className="AddressInput">
          <input type="text" className="form-control fs-5" placeholder="Apartment, studio, or floor" value={address2} onChange={(e) => setAddress2(e.target.value)} />
              <input type="text" className="form-control fs-5" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
              
          </div>
            <div className="AddressInput">
            <input  type="text" className="form-control fs-5" placeholder='State' value={state} onChange={(e) => setState(e.target.value)}/>
              <input type="text" className="form-control fs-5" placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />  
            </div>
        {/* </form> */}
           {(Validate) && 
             <p style={{color:"red"}}>
                Please Fill All the details
             </p>
           }
          
         
          <button onClick={handleClick}>Submit</button>
        </form>
      </div>

      </div>

      
  
  )
}

export default Address
