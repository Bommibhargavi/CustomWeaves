import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCustomization } from '../Redux/blouseSlice';
import useFetch from '../api';

const Sizecomponent = ({ SizeCall, sendSize }) => {
    const [size, setSize] = useState(null);
    const { data: sizes } = useFetch('/sizes');
    const dispatch = useDispatch();
    const [selectedCellIndex, setSelectedCellIndex] = useState(null);

    useEffect(() => {
        if (SizeCall && size) {
            dispatch(setCustomization({ size: size }));
        }
    }, [SizeCall, size, dispatch]);

    const handleClick = (S, index) => {
        setSize(S);
        setSelectedCellIndex(index);
        sendSize(S)
        // if(SizeCall===undefined)
        // {
        //     sendSize(S)

        // }
        
    };
    
    return (
        <div>
            <table className='sizestable'>
                <thead>
                    <tr>
                        <th colSpan={6}>Select Size</th>
                    </tr>        
                </thead>
                <tbody>
                    <tr>
                        {sizes && sizes.map((item, index) => (       
                            <td key={index}
                                style={{
                                    backgroundColor: selectedCellIndex === index ? "#11998E" : 'transparent',
                                    color: selectedCellIndex === index ? "white" : 'black'
                                }}
                                onClick={() => handleClick(item.size, index)}>
                                {item.size}
                            </td>
                        ))}
                    </tr>         
                </tbody>
            </table>
        </div>
    );
};

export default Sizecomponent;