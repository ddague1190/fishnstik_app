import Figure from '../figure/figure.component';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './varianttable.styles.scss';

const VariantCards = ({product, selectionVariantTable, checkedState}) => {
    return (
        
        <div className='variantcards'>

        {product.variants.map((variant, index) => (
            <div
            onClick={()=> selectionVariantTable(index)} 
            className={`variantcard u-center-text ${checkedState[index] ? 'variantcard--active' : ''} ${variant.countInStock===0 ? 'variantcard--outofstock' : ''}`}
            key={variant._id}
            > 
                <div className='variantcard__figurecontainer'>
                    <Figure image={variant.image} description={variant.description} alt={variant.name} height='8rem'/>
                </div>
                <span className='variantcard__description'>{variant.identifier}</span>
                        
                    {variant.relatedProductLink && (
                        <Link to={`/product/${product._id}`} className='variantcard__relatedproduct'>Related product link</Link>
                    )}
                <span className='variantcard__price'>${variant.price} ea</span>

            
            </div>
        ))}
        </div>
    )
}

export default VariantCards;