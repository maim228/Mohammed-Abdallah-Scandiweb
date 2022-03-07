import React from "react";
import Attributes from "../header/cart-button/attributes";
import './cart.css';
import next from './left-arrow.svg';
import previous from './right-arrow.svg';

class Product extends React.Component{
    state={
        galleryIndex:1
    }
    //gallery slider in cart
    handleSwip(action,gallery){
        if(action === 'next'){
            gallery.length === this.state.galleryIndex?
            this.setState({galleryIndex:1})
            :this.setState({galleryIndex:this.state.galleryIndex+1})
        }else{
            this.state.galleryIndex === 1?
            this.setState({galleryIndex:[gallery.length]})
            :this.setState({galleryIndex:this.state.galleryIndex-1})
        }
    }
    render(){
        let {product,increase,descrease,currency} = this.props;
        //change price depend on active currency
        const dynamicPrice = product.prices.filter((p)=>p.currency.label === currency.label)[0];
        //for gallery slider
        const galleryIndex = this.state.galleryIndex;
        return(   
                <div className='item-cart'>
                    <div className="item-cart-grid" >
                        
                        <div>
                        <div className="item-cart-info">
                            {product.brand} 
                            <br /> {product.name} 
                            <br /> {dynamicPrice.currency.symbol}{dynamicPrice.amount}
                            <br /> <Attributes attributes={product.attributes} selected={product.selectedAttrs} />
                        </div>
                        </div>

                        <div className="grid-container">
                            <div className="item-cart-count">
                                <button onClick={()=>{descrease({id:product.unique})}}>-</button>
                                <div>{product.count}</div>
                                <button onClick={()=>{increase({"id":product.id,"action":"add-more","unique":product.unique})}}>+</button>
                            </div>
                            <div className="image-cart">
                                <img src={product.gallery[galleryIndex -1]} alt={product.name} />
                                {product.gallery.length>1?
                                <>
                                <button className="next-button" onClick={()=>{this.handleSwip("next",product.gallery)}}><img src={previous} alt='previous' height='15px' width='15px' /></button>
                                <button className="prev-button" onClick={()=>{this.handleSwip("prev",product.gallery)}}><img src={next} alt='next' height='15px' width='15px' /></button>
                                </>:''                           
                                }                                
                            </div>
                            <button className="remove-btn" onClick={()=>{descrease({id:product.unique,action:'remove'})}}>X</button>

                        </div>
                    </div>
                </div>
        )
    }
}

export default Product