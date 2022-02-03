import React from 'react';
import {Link} from 'react-router-dom';
import './footer.styles.scss';

function Footer() { 
    return (

<footer className='footer'>

        <section class="footer-info">
                <article class="footer-info__col">
    
                    <h4 class="footer-info__heading">Connect With Us</h4>
                    <ul class="socialLinks socialLinks--alt">
                        <li class="socialLinks-item">
                            <a class="icon icon--facebook" href="https://www.facebook.com/alltackle" target="_blank">
                                facebookicon
                            </a>
                        </li>
                    </ul>
    
                    <h4 class="footer-info__heading">Information</h4>
                    <ul class="footer-info__list">
                            <li>
                                <a href="https://alltackle.com/alltackle-store-hours/">FishNStik Store Hours</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/contact-us/">Contact Us</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/saltwater-fishing-tackle/">Custom tackle services</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/alltackle-com-fishing-tackle-and-gear-about-us/">About Us</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/shipping-returns/">Shipping &amp; Returns</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/privacy-policy/">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/great-angler-gift-idea/">Great Angler Gift Idea</a>
                            </li>
                        <li>
                            <a href="/sitemap.php">Sitemap</a>
                        </li>
                    </ul>
                </article>
    
                <article class="footer-info__col " data-section-type="footer-categories">
                    <h4 class="footer-info__heading">Categories</h4>
                    <ul class="footer-info__list">
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
                <article class="footer-info__col " data-section-type="footer-brands">
                    <h4 class="footer-info__heading">Brands</h4>
                    <ul class="footer-info__list">
                            <li>
                                <a href="https://alltackle.com/brands/Garmin.html">FishNStik</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/brands/Ancor.html">Rosco</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/brands/Black-Bart.html">AFTCO</a>
                            </li>
                            <li>
                                <a href="https://alltackle.com/brands/Blue-Sea-Systems.html">Sampo</a>
                            </li>
                    </ul>
                </article>

                <article class="footer-info__col">
                    <h4 class="footer-info__heading">Info</h4>
                        <strong>fishnstik.com</strong>
                        <address>
                        5407 Haverhill Rd, Unit 339
                            <br/>
                            West Palm Beach, FL 33407
                            <br/>
                        United States of America
                        </address>
                            <strong>Call us at (561) 686-7845</strong>
                </article>
        </section>
            <div class="footer-copyright">
                <p class="powered-by">&copy; 2022 fishnstik.com </p>
            </div>




        </footer>
    )
}

export default Footer
