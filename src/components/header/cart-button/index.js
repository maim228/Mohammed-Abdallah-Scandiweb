import React from "react";
import {Link} from 'react-router-dom'
import CartIcon from '../images/cart.svg'
import "./cart-button.css";
import Product from "./product";

class CartButton extends React.Component{
    state={
        isOpen:false
    }

    render(){
        let {cart,increase,descrease,currency,updateOverlay} = this.props
        const isOpen = this.state.isOpen;
        //show only products with one or more spices in cart
        cart = cart.filter((p)=>p.count >= 1)
        let sumLength = 0;
        let sumTotal = 0;
        
        cart.map((p)=>sumLength=sumLength+p.count)

        const getTotal=()=>{
            if(cart.length > 0){
            let prices = cart.map((p)=>{return{"price":p.prices.filter((p)=>p.currency.label === currency.label),"count":p.count}});
            prices.map((p)=>sumTotal = sumTotal + p.price[0].amount * p.count)
            return sumTotal
            }else{
                return 0;
            }
        }
        const editOverlay=()=>{
            if(isOpen){
                updateOverlay(false)
            }else{
                updateOverlay(true)
            }
        }
        
        return(
            <div className="cart-container" 
                onMouseEnter={()=>{
                this.setState({isOpen:true})
                editOverlay();
                }}
                onMouseLeave={()=>{
                this.setState({isOpen:false})
                editOverlay();  
                }}
                >

                <button className="cart-button">
                    <img src={CartIcon} height='20px' width='20px' alt='cart' />
                    {cart.length>0?<div className="cart-badge">{sumLength}</div>:''}
                </button>
                <div className="cart-content" style={{display:isOpen?'block':'none'}}>
                    <h5 className="mini-cart-title">
                        My Bag,
                        <span>{cart.length} items</span>
                    </h5>
                    {cart.slice(0,3).map((p)=>
                    <div key={p.unique}>
                        {/* Create product label and buttons for every button */}
                        <Product 
                        product={p} 
                        increase={increase} 
                        descrease={descrease} 
                        currency={currency} />
                    </div>
                    )}

                    {cart.length>3?<h3 style={{textAlign:'left'}}>Check all products in your <Link to='cart'>Bag</Link></h3>:false}
                    <div className="total-container">
                        <div>Total:</div>
                        <div>{getTotal().toFixed(2)} {currency.symbol}</div>
                    </div>
                    
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