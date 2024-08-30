
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Redux/Authslice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BuyNow from './BuyNow';
import { FaTrash } from 'react-icons/fa';
import Popup from './popup';

const Cart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [itemRemoved, setItemRemoved] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const [ShowToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`https://customweavesapi.onrender.com/users/${userId}`);
          const user = response.data;
          setData(user.cart);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart({ userId, product }));
    // Update the state immediately after dispatching the action
    setData((prevData) => prevData.filter((item) => item.id !== product.id));
    setItemRemoved(true)
    setShowToast(true)

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cart data.</p>;

  return (
    !userId?<h3>Please Login to view cart</h3>:(
      <div>

        {(data.length === 0) ?
          <h3>Your Cart is Empty</h3> : (
           <div> <h2>Your Cart</h2>

           { data.map((product) => (
              <div>
               
                <div className='productdetails-div' key={product.id}>
                  <div>
                    <img src={product.link} alt={product.name} className='productDetails-img' />
                  </div>
                  <div className='product-detailsDiv'>
                    <h2 className='productName'>{product.name}</h2>
                    <p className='ProductDiscription'>{product.description}</p>
                    <p className='ProductPrice'><span className='one'>Price :</span>&#8377;{product.price}</p>
                    <p className='Product Size'><span className='one'>Size : </span>{product.size}</p>
                    <div className='buynowbtnDiv'>
                      <BuyNow product={product} size={product.size} quantity={product.quantity} />
                      <button style={{ backgroundColor: 'transparent' }} onClick={() => handleRemoveFromCart(product)}>
                        <FaTrash
                          style={{ cursor: 'pointer', color: '#d9534f', fontSize: '30px' }}
                          title="Delete"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
           
            ))
          }
        </div>

          )
        
        }
      
        <Popup
          message={itemRemoved && "Item Removed from Cart"}
          show={ShowToast}
          setShow={setShowToast}
        />
      </div>


    )
  );
};

export default Cart;
