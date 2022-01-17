import Figure from '../figure/figure.component';
import Rating from '../rating/rating.component';
import './productdetails.styles.scss';

const ProductDetails = ({product, height}) => {


    return (

    <div className='productdetails'>
        <Figure image={product.image} height={height} alt={product.name} />
        <div className='productdetails__details'>
            <h3>{product.name}</h3>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            <h5>Description: {product.description}</h5>
        </div>
    </div>
    
    // <Col md={4}>
    //         <Image onClick={handleShow} src={product.image} alt={product.name} fluid className='productImage'></Image>
    //                         </Col>

    //                         <Modal show={} onHide={handleClose}>
    //                             <Modal.Body>
    //                                 <Image src={product.image} alt={product.name} fluid className='modalImage fullsize'>
    //                                 </Image>                                
    //                             </Modal.Body>
    //                             <Modal.Footer>
    //                                 <Button variant="secondary" onClick={handleClose}>
    //                                     Close
    //                                 </Button>
    //                             </Modal.Footer>
    //                         </Modal>
        
    //                         <Col md={6}>
    //                             <ListGroup variant="flush">
    //                                 <ListGroup.Item>
    //                                     <h3>{product.name}</h3>
    //                                 </ListGroup.Item>
            
    //                                 <ListGroup.Item>
    //                                     
    //                                 </ListGroup.Item>

    //                                 <ListGroup.Item>
    //                                     Description: {product.description}
    //                                 </ListGroup.Item>
    //                             </ListGroup>
    //                         </Col>
    )
}

export default ProductDetails;