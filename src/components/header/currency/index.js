import React from "react";
import "./currency.css";
import arrowDown from '../images/down-arrow.svg'
import arrowUp from '../images/up-arrow.svg'

class Currency extends React.Component{
    //if switch currency is poen or not
    state={
        isOpen:false
    }
    render(){
        const {currencies, currency, update} = this.props;
        const isOpen = this.state.isOpen;
        return(
            <div className="currency-container"  onMouseEnter={()=>this.setState({isOpen:true})} onMouseLeave={() => this.setState({isOpen:false})}>
                <button className="switch-button">
                    <span>{currency.symbol}</span> 
                    <img src={isOpen?arrowUp:arrowDown} height='10px' width='10px' alt='switch' />
                </button>
                <div className="currency-content" style={{display:`${isOpen?'block':'none'}`}}>
                    {currencies.map((elm)=>
                    <button 
                    key={elm.symbol} 
                    className={elm.label === currency.label?'active-currency':'currency'} 
                    onClick={()=>{
                        update(elm,currencies)
                        this.setState({isOpen:false})
                    }}>

                        {elm.symbol} {elm.label}
                    </button>)}
                </div>
            </div>
        )
    }
}

export default Currency