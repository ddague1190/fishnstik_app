import React from 'react';
import {Link} from 'react-router-dom';
import './footer.styles.scss';

function Footer() { 
    return (
        <footer className='footer'>
            <Link to='/'>
                <img className='footer__logo' src={require('../../images/fishnstik.jpeg')}/>
            </Link>

            <table className='footer__contactinfo'>
                <tr>
                    <span className='u-font-style-italic'>Address</span>
                    <div>
                        <span>5407 Haverhill Rd</span>
                        <span>Unit 339</span>
                        <span>West Palm Beach, FL 33407</span>
                    </div>
                </tr>
                <tr>
                    <span className='u-font-style-italic'>Phone</span>
                    <span>(561) 686-7845</span>
                </tr>
                <tr>
                    <span className='u-font-style-italic'>Email</span>
                    <span>fishnstik@gmail.com</span>
                </tr>
            </table>
            <div className='footer__info'>
                <Link to='aboutus'>About us</Link>
                <Link to='terms'>Terms and Conditions</Link>
                <div className='u-font-style-italic'>Copyright &copy; Fish N Stik</div>

            </div>


        </footer>
    )
}

export default Footer
