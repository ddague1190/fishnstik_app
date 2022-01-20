import Figure from '../figure/figure.component';
import Rating from '../rating/rating.component';
import './productdetails.styles.scss';

const ProductDetails = ({product, height}) => {


    return (

    <div className='productdetails'>
        <Figure image={product.image} height={height} alt={product.name} />
        <div className='productdetails__details'>
            <div>{product.name}</div>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'black'} />
            <div>{product.description}</div>
        </div>
    </div>

    )
}

export default ProductDetails;