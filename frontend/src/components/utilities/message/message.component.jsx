import React, {useState} from 'react';
import './message.styles.scss'

const Message = ({children, variant}) => {
    const [showMessage, setShowMessage] = useState(true);
    let type = 'info'
    switch (variant) {
        case 'danger':
          type = 'error'
          break;
        // case 'info':
        //   type = "info";
        //   break;
      }
  return <div>
    {showMessage && 
        <div className={`message-box message-box-${type}`}>
            <i className="fa fa-info-circle fa-2x"></i>
            <span className="message-text">{children}</span>
            <i className="fa fa-times fa-2x exit-button" onClick={()=>setShowMessage(false)}></i>
        </div>
    }
  </div>;
};

export default Message;
