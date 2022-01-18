import React from 'react';
import {Link} from 'react-router-dom';
import './footer.styles.scss';

function Footer() { 
    return (
        <footer className='footer'>
            <div>Copyright &copy; Fish N Stik</div>
            <Link to='aboutus'>About us</Link>
            <Link to='terms'>Terms and Conditions</Link>

        </footer>
    )
}

export default Footer
