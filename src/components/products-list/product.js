import React from "react";
import { Link } from "react-router-dom";
import CartIcon from './images/cart.png'
import './product-list.css';

class ProductCard extends React.Component{

    //generate very unique key for each product because we might add same product to cart but with different attributes
    generateKey = ()=>{
        let key = Math.random();
        while(this.props.uniqueKeys.includes(key)){
            key = Math.random();
        }
        this.props.updateKey(key)
        return key;
    }

    render(){
        const {id,name,prices,gallery,inStock, attributes,brand} = this.props.details;  
        const activeCurrency = this.props.currency
        const dynamicPrice = prices.filter((p)=>p.currency.label === activeCurrency.label)[0]
        const defaultAttributes= attributes.map((a)=>{return {"name":a.id,"type":a.type,"value":a.items[0].value}})
        return(
            <div className={`product-card ${inStock?true:"out-stock"}`}>
                <div className="layer" style={{display:inStock?"none":"flex"}}>
                    <h1>OUT OF STOCK</h1>
                </div>

                <Link to={`/product/${id}`}>
                    <img src={gallery[0]} className="product-image" alt ={id} />
                </Link>

                <div className={`details-section ${inStock?"details-section-in-stock":""}` }>
                    <button className="add-to-cart"
                    style={{display:inStock?"":"none"}} 
                    onClick={()=>{
                        this.props.addToCart({unique:this.generateKey(),id,name,prices,gallery,brand,attributes,selectedAttrs:defaultAttributes, count:1})
                    }}>

                        <img src={CartIcon} width='25px' height='25px' alt='add to cart'/>

                    </button>
                    <Link to={`/product/${id}`}>
                        <h3>{name}</h3>
                    </Link>
                    <h4>{activeCurrency.symbol}{dynamicPrice.amount}</h4>
                </div>
            </div>
        )
    }
}

export default ProductCard