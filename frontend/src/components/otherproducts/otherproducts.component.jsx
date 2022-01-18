import React,{useState} from 'react';

const OtherProducts = () => {
    const [showOtherProductsNav, setShowOtherProductsNav] = useState(false)

    return (
        <div 
        onClick={()=>{
            setShowOtherProductsNav(!showOtherProductsNav)
        }}
        className={`navBarElement ${showOtherProductsNav ? '' : ''}`}
        >
            Other Products
        </div>
    )
}

export default OtherProducts;