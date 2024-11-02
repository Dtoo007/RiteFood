import React, { useState } from 'react'
import Button from './Button'

import iconOrderConfirmed from '/icon-order-confirmed.svg'



function Modal({orderNumber, totalOrder, modal, setModal, setHasItems, setOrderNumber}) {
    function handleNewOrder () {
        setModal(false);
        setHasItems(false);
        const resetOrder = Object.keys(orderNumber).reduce((acc, key) => {acc[key] = {...orderNumber[key], quantity: 0};
      
        return acc;
      }, {})

      setOrderNumber(resetOrder)
      };

  return (
    <div className= {!modal ? 'order-confirm' : 'order-confirm-inset'}>
       {modal && <div className='confirm-details'>
            <div className='satisfactory'>
                <div><img src={iconOrderConfirmed}  alt='icon-order-confirmed'></img></div>
                <h1>Order Confirmed</h1>
                <p>we hope you enjoy your food!</p>
            </div>
     {Object.entries(orderNumber).map(([id, item]) => (
        <>
          <div key={id} >
            <div className='b'>
            <div className='a'>
                <div className='c'>
                    <img src={item.thumbnail} alt={item.name} className='thumbnail' />
                    <div className='confirm-items-details'>
                        <h1>{item.name}</h1>
                        <p>
                        <span className='quantity'>{item.quantity}x</span>
                        <span className='price'>@ ${item.price}</span>
                        </p>
                    </div>
                </div>
                <div className='d'>
                <span className='price-total'>${item.quantity * item.price}</span>
                </div>
                <hr></hr>
            </div>
            </div>
          </div>
        </>
      ))}
          <div className='b'>
            <div className='confirm-order-details'>
     
              <p>Order Total</p>
              <h1>${totalOrder}</h1>
         
            </div>
          </div>
            <div className='confirm'>
            {/* <span className='delivery-type'><img src={iconCarbonNeutral}></img>This a <b>carbon-neutral</b> delivery</span> */}
            <Button className='new-order-btn' onClick={handleNewOrder}>Start New Order</Button>
            </div>
    </div>
}
    </div>
  )
}

export default Modal