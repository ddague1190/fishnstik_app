import Figure from '../figure/figure.component';
import './productdetails.styles.scss';

const ProductDetails = ({product, height}) => {

    return ( 

    <div className='productdetails u-margin-bottom-small'>
        <Figure image={product.image} height='30rem' alt={product.name} />
        <div className='productdetails__details'>
            <p className='productdetails__name u-margin-bottom-small'>{product.name}</p>
            <p className='u-font-weight-bold'>{product.catchPhrase}</p>
            <p className='paragraph u-margin-top-small'>{product.description}</p>
        </div>
    </div>

    )
}

export default ProductDetails;