import {useState} from 'react';
import {Modal, Image, Button} from 'react-bootstrap';
import './figure.styles.scss';


const Figure = ({height, image, alt, disable}) => {

    const [showModal, setShowModal] = useState(false);
    const toggleShow = () => setShowModal(!showModal); 

    
    

    return (
        <div onClick={toggleShow} style={{'width': height, 'height': height}} className='figure__component'>
            <img src={image}  alt={`image_of_${alt}`} />
            {!disable && (
                <Modal show={showModal}>
                    <Modal.Body>
                        <Image src={image} alt={`image_of_${alt}`} fluid className='modalImage fullsize'/>                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleShow}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default Figure;