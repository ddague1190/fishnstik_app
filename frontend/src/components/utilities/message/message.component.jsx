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
        <div class={`message-box message-box-${type}`}>
            <i class="fa fa-info-circle fa-2x"></i>
            <span class="message-text">{children}</span>
            <i class="fa fa-times fa-2x exit-button" onClick={()=>setShowMessage(false)}></i>
        </div>
    }
  </div>;
};

export default Message;
{/* <div class="message-box message-box-info">
  <i class="fa fa-info-circle fa-2x"></i>
  <span class="message-text"><strong>Info:</strong> User pending action</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div>
<div class="message-box message-box-warn">
  <i class="fa fa-warning fa-2x"></i>
  <span class="message-text"><strong>Warning:</strong> User has to be admin</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div>
<div class="message-box message-box-error">
  <i class="fa fa-ban fa-2x"></i>
  <span class="message-text"><strong>Error:</strong> Internal Server Error</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div>
<div class="message-box message-box-success">
  <i class="fa fa-check fa-2x"></i>
  <span class="message-text"><strong>Success:</strong> Updated member status</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div> */}