import {useState} from 'react';
import {Modal, Image, Button} from 'react-bootstrap';
import './figure.styles.scss';


const Figure = ({height, description, image, alt, disable}) => {

    const [showModal, setShowModal] = useState(false);
    const toggleShow = () => setShowModal(!showModal); 

    
    

    return (
        <div onClick={toggleShow} style={{'width': height, 'height': height}} className='figure'>
            <img src={image}  alt={`image_of_${alt}`} />
            {!disable && (
                <Modal 
                    dialogClassName='figure__modal'
                    show={showModal}
                >
                    <Modal.Body>
                        <Image src={image} alt={`image_of_${alt}`} fluid className='modalImage fullsize'/>                       
                    </Modal.Body>
                    <Modal.Footer>
                        <p>{description}</p>
                        <Button variant="secondary" onClick={toggleShow}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default Figure;