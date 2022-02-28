import React from 'react';
import {Link} from 'react-router-dom';
import './footer.styles.scss';
import { useSelector } from 'react-redux';
import {ReactComponent as Sailfish} from './sailfish.svg';

const Footer = () => { 
    const {width} = useSelector(state=>state.dimensions);
    const breakpoint = 570;

    return (

<footer className='footer'>

        <div className='footer__image'>
            <Sailfish />
        </div>

        <section className='footer-info'>
                <article className='footer-info__col footer-info__col--wide'>
    
                    <h4 className='footer-info__heading'>Connect With Us</h4>
                    <ul className='socialLinks'>
                        <li className='socialLinks__item'>
                            <i className='fab fa-facebook'></i>
                        </li>
                    </ul>
    
                    <h4 className='footer-info__heading'>Information</h4>
                    <ul className='footer-info__list'>
                            <li>
                                <span>FishNWire Store Hours</span>
                            </li>
                            <li>
                                <span>Contact Us</span>
                            </li>
                            <li>
                                <span>Custom tackle services</span>
                            </li>
                            <li>
                                <span>About Us</span>
                            </li>
                            <li>
                                <span>Shipping &amp; Returns</span>
                            </li>
                            <li>
                                <span>Privacy Policy</span>
                            </li>
                            <li>
                                <span>Great Angler Gift Idea</span>
                            </li>
                    </ul>
                </article>
    
                <article className='footer-info__col '>
                    <h4 className='footer-info__heading'>Categories</h4>
                    <ul className='footer-info__list'>
                            <li>
                                <Link to='/products/snaps/'>Snaps</Link>
                            </li>
                            <li>
                                <Link to='/products/swivels/'>Swivels</Link>
                            </li>
                            <li>
                                <Link to='/products/hooks/'>Hooks</Link>
                            </li>
                            <li>
                                <Link to='/products/lures/'>Lures</Link>
                            </li>
                            <li>
                                <Link to='/products/fishingline/'>Fishing Line</Link>
                            </li>
                            <li>
                                <Link to='/products/accessories/'>Accessories</Link>
                            </li>
                            <li>
                                <Link to='/products/apparel/'>Apparel</Link>
                            </li>
                    </ul>
                </article>
                <article className='footer-info__col '>
                    <h4 className='footer-info__heading'>Brands</h4>
                    <ul className='footer-info__list'>
                            <li>
                                <Link to='/brands/fishnstik'>FishNStik</Link>
                            </li>
                            <li>
                                <Link to='/brands/rosco'>Rosco</Link>
                            </li>
                            <li>
                                <Link to='/brands/aftco'>AFTCO</Link>
                            </li>
                            <li>
                                <Link to='/brands/sampo'>Sampo</Link>
                            </li>
                    </ul>
                </article>

                <article className={`footer-info__col footer-info__col--address ${width < breakpoint && 'footer-info__col--offset'}`}>
                       
 
                        <div className='footer__address'>
                            <address>
                                1 Paco De Lucia Terrace
                                <br/>
                                Segovia, Florida 01234
                                <br/>
                                United States of America
                            </address> 
                            <strong>Call us at (123) 456-7890</strong>
                        </div>
                </article>
        </section>
            <div className='footer__copyright'>
                <p className='powered-by'>No copyright - this is a fictional company for a porfolio project</p>
            </div>

        </footer>
    )
}

export default Footer
