import React from "react";
import {Link} from 'react-router-dom'
import "./header.css";
import {ReactComponent as Logo} from './images/logo.svg'
import Currency from './currency/index'
import CartButton from "./cart-button";

class Header extends React.Component{
    render(){
        const {menuName, activeMenu, currencies, currency, updateCurrency, cart, increaseProduct,descreaseProduct,updateOverlay} = this.props;
        return(
            <div className="header">
                <div className='nav-container'>
                    {/* Create link for every category in our DB and specific which page user visit now*/}
                    {menuName.map((elm)=>{
                        return(
                            <Link 
                            key={elm.name} 
                            to={`/${elm.name}`} 
                            className={activeMenu === elm.name? 'active-nav':'nav-links'}>
                                {elm.name}
                            </Link>
                        )})}
                    </div>
                <div className='logo-container'>
                    <Logo width="25px" height="25px" />
                </div>
                <div className='cc-container'>

                    {/* Currency switcher button */}
                    <Currency 
                    currencies={currencies} 
                    currency={currency} 
                    update={updateCurrency}/>

                    {/* Mini cart button */}
                    <CartButton 
                    cart={cart} 
                    currency={currency}
                    increase={increaseProduct} 
                    descrease={descreaseProduct}
                    updateOverlay={updateOverlay}
                    />
                </div>
            </div>
        )
    }
}

export default Header