import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./footer.styles.scss";
import { useSelector } from "react-redux";
import { ReactComponent as Sailfish } from "./sailfish.svg";

const Footer = () => {
  const { width } = useSelector((state) => state.dimensions);
  const breakpoint = 570;

  return ReactDOM.createPortal(
    <footer className='footer'>
      {/* <div className='footer__image'> */}
        <Sailfish />
      {/* </div> */}

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
              <Link to='/aboutus'>About Us</Link>
            </li>
            <li>
              <Link to='/shippingreturns'> Returns Policy</Link>
            </li>
            <li>
              <Link to='/privacypolicy'>Privacy Policy</Link>
            </li>
          </ul>
        </article>

        


        <article
          className={`footer-info__col footer-info__col--address ${
            width < breakpoint && "footer-info__col--offset"
          }`}>
          {/* <div className='footer__address'>
            <address>
              5407 Haverhill Rd Unit 339
              <br />
              West Palm Beach, FL 33407
              <br />
              United States of America
            </address>
            <p>Open 8 to 4 weekdays</p>

            <strong>Call us at (561) 685-7845</strong>
          </div> */}
        </article>
      </section>
      <div className='footer__copyright'>
        <p className='powered-by'>&copy; FishNStik</p>
      </div>
    </footer>, document.body
  );
};

export default Footer;
