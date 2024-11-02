import React, { useState } from 'react'
import '../index.css'

import illustrativeEmptyCart from '/illustration-empty-cart.svg'
import iconCarbonNeutral from '/icon-carbon-neutral.svg'
import Button from './Button';
import Modal from './Modal';



function Cart({orderNumber, hasItems, handleDelete, setHasItems, setOrderNumber}) {

  const [modal, setModal] = useState(false)
  function handleModal () {
    const finalOrder = Object.fromEntries(
      Object.entries(orderNumber).filter(([id, item]) => item.quantity > 0)
    )
    setOrderNumber(finalOrder);
    setModal(!false);
  }

  // const itemTotal = Object.values(item[quantity] * item[price]).reduce((acc, curr) => acc + (curr))
  const totalItems = Object.values(orderNumber).reduce((acc, curr) => acc + (curr.quantity || 0), 0);
  const totalOrder = Object.values(orderNumber).reduce((acc, curr) => acc + (curr.price * curr.quantity || 0), 0);
  return (
    <section className='cart-body'>
      <h2>Your cart({totalItems})</h2>
      { hasItems ? Object.entries(orderNumber).map(([id, item]) => (
        <>
          <div key={id} className='order-details'>
            {/* <img src={item.thumbnail} alt={item.name} width="50" /> */}
            <div className='items-details'>
            <h1>{item.name}</h1>
            <p>
              <span className='quantity'>{item.quantity}x</span>
              <span className='price'>@ ${item.price}</span>
              <span className='price-total'>${item.quantity * item.price}</span>
            </p>
            </div>
            <div className='delete' onClick={() => handleDelete(id)}>x</div>
          </div>
          <hr></hr>
        </>
      )) :
      <div className='cart-details'>
        <img src={illustrativeEmptyCart} className='broken-cake-img' alt='broken cake image'></img>
        <p>Your added item will appear here</p>
      </div>
      }
      { hasItems && 
          <div className='total-order'>
            <div className='total-order-details'>
            <p>
              <span>Order Total</span>
              <h1>${totalOrder}</h1>
            </p>
            </div>
            <div className='confirm'>
            <span className='delivery-type'><img src={iconCarbonNeutral}></img>This a <b>carbon-neutral</b> delivery</span>
            <Button className='secondary-btn' onClick={handleModal}>Confirm Order</Button>
            </div>
          </div>}

          <Modal orderNumber={orderNumber} setOrderNumber={setOrderNumber} totalOrder={totalOrder} modal={modal} setModal={setModal} setHasItems={setHasItems} totalItems={totalItems}/>
    </section>
  )
}



export default Cart