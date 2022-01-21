import Figure from '../figure/figure.component';
import Rating from '../rating/rating.component';
import './productdetails.styles.scss';

const ProductDetails = ({product, height}) => {


    return (

    <div className='productdetails'>
        <Figure image={product.image} height={height} alt={product.name} />
        <div className='productdetails__details'>
            <div className='productdetails__wedge'></div>
            <h3>{product.name}</h3>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'black'} />
            <span className='productdetails__description'>{product.description}</span>
        </div>
    </div>

    )
}

export default ProductDetails;