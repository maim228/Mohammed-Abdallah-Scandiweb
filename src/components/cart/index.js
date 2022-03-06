import React from "react";
import Product from "./product";

class Cart extends React.Component{
    render(){
        let {increase,descrease,cart,currency}= this.props;
        cart = cart.filter((p)=>p.count > 0)
        return(
            <div className="cartContainer">
                <h1>CART</h1>
                {cart.length===0?
                <h2>No products here try to add some products and try again</h2>
                :cart.map((p)=>
                <Product key={p.unique} currency={currency} product={p} increase={increase} descrease={descrease} />
                )}
            </div>
        )
    }
}

export default Cart