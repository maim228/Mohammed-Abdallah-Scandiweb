import React from "react";
import {Link} from 'react-router-dom'
import CartIcon from '../images/cart.svg'
import "./cart-button.css";
import Product from "./product";

class CartButton extends React.Component{
    render(){
        let {cart,increase,descrease,currency} = this.props
        //show only products with one or more spices in cart
        cart = cart.filter((p)=>p.count >= 1)
        return(
            <div className="cart-container">
                <button className="cart-button">
                    <img src={CartIcon} height='20px' width='20px' alt='cart' />
                    {cart.length>0?<div className="cart-badge">{cart.length}</div>:''}
                </button>
                <div className="cart-content">
                    <h5 className="mini-cart-title">My Bag, <span>{cart.length} items</span></h5>
                    {cart.map((p)=>
                    <div key={p.unique}>
                        {/* Create product label and buttons for every button */}
                        <Product product={p} increase={increase} descrease={descrease} currency={currency} />
                    </div>
                    )}
                    <div className="cart-buttons">
                        <Link to='/cart' className="cart-link bag-link">VIEW BAG</Link>
                        <Link to='/ceckout' className="cart-link check-link">CHECK OUT</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartButton