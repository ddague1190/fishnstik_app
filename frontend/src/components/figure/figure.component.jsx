import {useState} from 'react';
import './figure.styles.scss';


const Figure = ({icon, height, description, image, alt, disable}) => {
    const [showModal, setShowModal] = useState(false);
    const toggleShow = () => setShowModal(!showModal); 
 
    return (
        <div onClick={toggleShow} style={{'width': height, 'height': height}} className='figure'>
            {!icon ? (
                <img src={image}  alt={`image_of_${alt}`} />
            ) : (
                <span className='figure__icon'><i class="fas fa-camera"></i></span>
            )}

            {!disable && 
                showModal && (
                    <div 
                    className='figure__modal'
                    onClick={toggleShow}
                    >
                        <img src={image} alt={`image_of_${alt}`} />                       
                        <p className='figure__description'>{description}</p>
                        <div className='figure__closebutton' onClick={toggleShow}>Close</div>
                    </div>
                )
                
            }
        </div>
    )
}

export default Figure;