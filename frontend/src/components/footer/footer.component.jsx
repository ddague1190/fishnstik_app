import React from 'react';
import { NavBarElement} from '../navBarElement/navBarElement.component';
import './footer.styles.scss';

function Footer() { 
    return (
        <footer className='footer'>
            <div>Copyright &copy; Fish N Stik</div>
            <NavBarElement to='aboutus'>About us</NavBarElement>
            <NavBarElement to='terms'>Terms and Conditions</NavBarElement>

        </footer>
    )
}

export default Footer
