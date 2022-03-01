import React from "react";
import './cart-button.css';

class Atrributes extends React.Component{
    render(){
        const {attributes,selected} = this.props;
        //function to find matched products
        const findMatch = (selectedArray,id)=>{
            let filtered =(selectedArray.filter((s)=>s.name === id))[0]
            return filtered?filtered.value:'none'
        }
        return(
            <div className='attributes-cart'>
                {attributes.map((p)=>
                <div key={p.id}>
                    <div className="attribute-value-cart">
                        <h4>{p.id}</h4>
                        {p.type === 'text'?
                            p.items.map((a)=>
                            <div key={a.id} className={findMatch(selected,p.id) === a.value ? 'selected': 'not-selected'}>{a.value}</div>)
                            :p.items.map((a)=>
                            <div key={a.id} style={{backgroundColor: a.value}} className={`swatch-attribute ${findMatch(selected,p.name) === a.value ? 'selected-swatch': 'not-selected'}`}></div>)}
                    </div>
                    <br />
                </div>
                )}
            </div>
        )
    }
}

export default Atrributes