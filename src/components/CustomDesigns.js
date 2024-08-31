
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BuyNow from './BuyNow';

function CustomDesigns() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`https://checkered-spiky-catmint.glitch.me/users/${userId}`);
          const user = response.data;
          setData(user.CustomDesigns);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [userId]); // Dependency array ensures fetchData is called when userId changes


  if (data?.length === 0) {
    return <h3>No Designs Added yet</h3>;
  }

  return (
    <div>
      {!userId?<h3>Please login to view your Designs</h3>:
    <div className='CustomDesigns'>
      <h2>Custom Designs</h2>
      {data?.map((design) => (
        <div key={design.id} className='CustomDetailsInnerDiv'>
          {/* Fabric */}
          <div className="card">
            <img src={design?.fabric?.link} className="Fabric-img-container" alt={design?.fabric?.name} />
            <p className="blousename">{design.fabric?.name}</p>
          </div>

          {/* Color */}
          <div className="card">
            <img src={design?.color?.link} className="Fabric-img-container" alt={design?.color?.name} />
            <p className="blousename">{design.color?.name}</p>
          </div>

          {/* Design */}
          <div className="card">
            <img src={design?.design?.link} className="Fabric-img-container" alt={design?.design?.name} />
            <p className="blousename">{design.design?.name}</p>
          </div>

          {/* Embroidery */}
          <div className="card">
            <img src={design?.embroidery?.link} className="Fabric-img-container two" alt={design?.embroidery?.name} />
            <p className="blousename">{design.embroidery?.name}</p>
          </div>
          <div className="three">
            <p><span className='one'>size : </span>{design.size}</p>
            <p><span className='one'>price : </span>{design.price}</p>
            <BuyNow product={design} size={design.size} />
          </div>
        </div>
      ))}
    </div>
}
    </div>
  );
}

export default CustomDesigns;
