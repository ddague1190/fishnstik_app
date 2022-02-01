import Figure from '../figure/figure.component';
import './productdetails.styles.scss';
import Rating from '../rating/rating.component';

const ProductDetails = ({product, height}) => {

    return ( 

    <div className='productdetails u-margin-bottom-small'>
        <Figure image={product.image} height='10rem' alt={product.name} />
        <div className='productdetails__details'>
            <p className='productdetails__name'>{product.name}</p>
            <Rating />
            <p className='u-font-weight-bold'>{product.catchPhrase}</p>
            <p className='paragraph u-margin-top-small'>{product.description}</p>
        </div>
    </div>

    )
}

export default ProductDetails;