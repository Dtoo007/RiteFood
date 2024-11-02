import React, { useCallback, useEffect, useState } from 'react'
import cartIcon from '../assets/images/icon-add-to-cart.svg'

import Cart from './Cart'
import Button from './Button'


function FoodCard() {
    
    const [addToCart, setAddToCart] = useState(null)
    const [orderNumber, setOrderNumber] = useState('')
    const [foodDatas, setFoodDatas] = useState([])
    const [hasItems, setHasItems] = useState(false)



    function handleAddToCart (id) {
        setAddToCart(id)
      
    }

    function handleIncrease (id) {
        setOrderNumber(prev => ({
            ...prev, [id]: {
                ...prev[id],
                quantity: Math.max((prev[id]?.quantity || 0) + 1),
                name: foodDatas.find(item => item.id === id).name,
                price: foodDatas.find(item => item.id === id).price,
                thumbnail: foodDatas.find(item => item.id === id).image.thumbnail
              }
        }));
    }

    function handleDecrease (id) {
        setOrderNumber(prev => ({
            ...prev, [id]: {
                ...prev[id],
                quantity: Math.max((prev[id]?.quantity || 0) - 1, 0),
                name: foodDatas.find(item => item.id === id).name,
                price: foodDatas.find(item => item.id === id).price,
                thumbnail: foodDatas.find(item => item.id === id).image.thumbnail
              }
        }));
        
    }

    function handleInputChange (id, value) {
        const foodItem = foodDatas.find(item => item.id === id);
        const input = value === '' ? 0 : parseInt(value, 10); // converting to integer
            
        if(!isNaN(input) && input >= 0) {
            //updating state with valid number input
            setOrderNumber(prev => ({
                ...prev, [id]: {
                    quantity: input,
                    name: foodItem.name,
                    price: foodItem.price,
                    thumbnail: foodItem.image.thumbnail
                }
            }));
        }
    }

    function handleDelete (id) {
    setOrderNumber(prev => {
        const updatedList = {...prev};
        delete updatedList[id];
        return updatedList;
    });

    }
    useEffect(() => {
        fetch('data/data.json')
        .then((response) => response.json())
        .then((jsonData) => {
            setFoodDatas(jsonData)
        })
    }, [])

    useEffect(() => {
        const hasNonZeroItem = Object.values(orderNumber).some(item => item.quantity > 0);
        setHasItems(hasNonZeroItem);
      }, [orderNumber]);

  return (
    <div className='body'>
    <div className='foodcard-details'>
     <h1>Deserts</h1>
        <div className='foodcard'>
            {foodDatas.map ((foodData, index) => (
                <ul key={index}>
                    <div className='foodcard-body'>
                        <img src={foodData.image.desktop} width={200} className={addToCart !== foodData.id ? 'foodcard-img' : 'foodcard-img-active'} onClick={() => handleAddToCart(foodData.id)}></img>
                        <>
                        {addToCart !== foodData.id?
                        <Button onClick={() => handleAddToCart(foodData.id)} className='primary-btn'><img src={cartIcon}></img>Add to cart</Button> :
                        <div className='cart-number'>
                            <p onClick={() => handleDecrease(foodData.id)}>-</p>
                            <input type='text' 
                            value={orderNumber[foodData.id] !== undefined ? orderNumber[foodData.id].quantity || 0 : 0}
                            onChange={(e) => handleInputChange((foodData.id), e.target.value)}/>
                            <p onClick={() => handleIncrease(foodData.id)}>+</p>
                        </div>
                        }
                        </>
                    </div>
                        
                    <div className='foodcard-info'>
                        <h5>{foodData.category}</h5>
                        <h3>{foodData.name}</h3>
                        <h4>${foodData.price}</h4>
                    </div>
                </ul>
            ))}
        </div>
    </div>
        <div>
           <Cart orderNumber={orderNumber} foodDatas={foodDatas} setHasItems={setHasItems} hasItems={hasItems} handleDelete={handleDelete} setOrderNumber={setOrderNumber}/> 
        </div>

        
    </div>
  )
  
}

export default FoodCard
