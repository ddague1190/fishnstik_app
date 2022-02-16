import { useState, useEffect } from "react";
import "./figure.styles.scss";
import ReactDOM from 'react-dom';


const Modal = ({ image, toggleShow, alt}) => {

    const callback = (e)=>{
        e.preventDefault();
        toggleShow();
    }

        useEffect(()=>{
            document.body.addEventListener('click', callback);
            return ()=> document.body.removeEventListener('click', callback);
        }, [])

  return ReactDOM.createPortal(
    <div className='modal__container'>
      <div
        className='modal'
        onClick={toggleShow}>
        <img src={image} alt={`image_of_${alt}`} />
      </div>
    </div>, document.body
  );
};

const Figure = ({ icon, height, image, alt, disable }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleShow = () => {
      setShowModal(!showModal)
      
  };


  return (
      <>
    <div
      onClick={toggleShow}
      style={{ width: height, height: height }}
      className='figure'>
      {!icon ? (
        <img src={image} alt={`image_of_${alt}`} />
      ) : (
        <span className='figure__icon'>
          <i className='fas fa-camera'></i>
        </span>
      )}
    </div>
    
    {showModal && <Modal image={image} toggleShow={toggleShow} alt={alt} />}
     
    </>
  );
};

export default Figure;
