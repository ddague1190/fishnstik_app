import React,{useState} from 'react';

const OtherProducts = ({setSeeingAll, setCurrentCategory}) => {
    const [showOtherProductsNav, setShowOtherProductsNav] = useState(false)

    return (
        <div 
        onClick={()=>{
            setSeeingAll(false);
            setCurrentCategory(false);
            setShowOtherProductsNav(!showOtherProductsNav)
        }}
        className={`btn--navbar ${showOtherProductsNav ? '' : ''}`}
        >
            Other Products
        </div>
    )
}

export default OtherProducts;