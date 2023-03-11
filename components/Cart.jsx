import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';


import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

// import getPaystack from '@/lib/getPaystack';
// import handleCheckout from '@/pages/api/paystack';



const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  const email = 'joshuainioluwa15@gmail.com'
  const handleCheckout = () => {
    const processData = [cartItems.name, totalPrice]
    {console.log(processData)}
    const handler = PaystackPop.setup({
      key: 'pk_test_ab3f07a112dc82d6aba72751ded06b06020c0042',
      email,
      amount: totalPrice * 100,
      onClose: () =>{
        alert('Window closed.');
      },
      callback: () => {
          const message = 'Payment complete! Reference: ' + response.reference;
          alert(message);
        }
      });
    handler.openIframe();

  }


  // const handleCheckout = async () => {
  //   const paystack = await getPaystack();

  //   const responce = await fetch('/api/paystack', {
  //     method: 'POST',
  //     headers: {
  //       'content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if(responce.statusCode === 500) return;
  //   const data = await responce.json();
  //   toast.loading('Redirecting...');
  //   paystack.redirectToCheckout({ sessionId: data.id});
  // }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      
                                                                                            
      
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>N{item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>N{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={() => handleCheckout()}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart