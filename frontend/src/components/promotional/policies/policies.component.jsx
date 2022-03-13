import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../aboutusscreen/aboutusscreen.styles.scss";
import RodSVG from "../../svg/frontpagebanner/RodSVG";
import Emotive from "../../svg/emotive/emotive.component";

export const ShippingReturns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='aboutus'>
      <Emotive />
      <div className='aboutus__box'>
        <span className='aboutus__header featured__title'>Return policy</span>
        <ul
          className='aboutus__title'
          style={{
            fontSize: "2.3rem",
            textAlign: "left",
            listStyleType: "initial",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <li>
            <u>No Hassle returns.</u>{" "}
          </li>
          <li>
            If you are not totally satisfied with your order, send it back to us
            and we will make it right - either with a full refund or expedited
            shipping of another product.
          </li>
          <li>
            At this time, we have no automated way to offer paid return
            shipping.
          </li>
        </ul>
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [seeAll, setSeeAll] = useState(false);
  return (
    <div className='aboutus'>
      <Emotive />

      <div className='aboutus__box'>
        <span className='aboutus__header featured__title'>Privacy policy</span>
        <ul
          className='aboutus__title'
          style={{
            fontSize: "2.3rem",
            textAlign: "left",
            listStyleType: "initial",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <li>
            The only information we require to register is a verified email.
          </li>
          <li>
            We will not share this information nor any information pertaining to
            orders (i.e. items ordered and shipping address) with anyone.
          </li>
          <li>
            Payment for online orders will be handled by entirely by Paypal.
          </li>
        </ul>
        <h5 className='u-center-text' style={{ marginBottom: "3rem" }}>
          By using this site, you consent to these terms. See the expanded
          privacy policy below:
        </h5>

        <div
          style={{
            margin: "0 auto",
            maxWidth: "80rem",
            backgroundColor: "white",
            color: "black",
            padding: "3rem",
            fontSize: "1.5rem",
          }}>
          <h5>Expanded Privacy Policy for FishNStik</h5>

          <p>
            At fishnstik.com, accessible from www.fishnstik.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by fishnstik.com and how we use it.
          </p>

          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>

          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in fishnstik.com. This policy is not
            applicable to any information collected offline or via channels
            other than this website. Our Privacy Policy was created with the
            help of the{" "}
            <a href='https://www.privacypolicygenerator.info'>
              Free Privacy Policy Generator
            </a>
            .
          </p>

          {!seeAll ? (
            <div style={{ textAlign: "center", paddingTop: "2.5rem" }}>
              <button className='button' onClick={() => setSeeAll(!seeAll)}>
                Expand +
              </button>
            </div>
          ) : (
            <>
              <h4>Consent</h4>

              <p>
                By using our website, you hereby consent to our Privacy Policy
                and agree to its terms.
              </p>

              <h4>Information we collect</h4>

              <p>
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to
                you at the point we ask you to provide your personal
                information.
              </p>
              <p>
                If you contact us directly, we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
              </p>
              <p>
                When you register for an Account, we may ask for your contact
                information, including items such as name, company name,
                address, email address, and telephone number.
              </p>

              <h4>How we use your information</h4>

              <p>
                We use the information we collect in various ways, including to:
              </p>

              <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>
                  Develop new products, services, features, and functionality
                </li>
                <li>
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes
                </li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>

              <h4>Log Files</h4>

              <p>
                fishnstik.com follows a standard procedure of using log files.
                These files log visitors when they visit websites. All hosting
                companies do this and a part of hosting services' analytics. The
                information collected by log files include internet protocol
                (IP) addresses, browser type, Internet Service Provider (ISP),
                date and time stamp, referring/exit pages, and possibly the
                number of clicks. These are not linked to any information that
                is personally identifiable. The purpose of the information is
                for analyzing trends, administering the site, tracking users'
                movement on the website, and gathering demographic information.
              </p>

              <h4>Advertising Partners Privacy Policies</h4>

              <p>
                You may consult this list to find the Privacy Policy for each of
                the advertising partners of fishnstik.com.
              </p>

              <p>
                Third-party ad servers or ad networks uses technologies like
                cookies, JavaScript, or Web Beacons that are used in their
                respective advertisements and links that appear on
                fishnstik.com, which are sent directly to users' browser. They
                automatically receive your IP address when this occurs. These
                technologies are used to measure the effectiveness of their
                advertising campaigns and/or to personalize the advertising
                content that you see on websites that you visit.
              </p>

              <p>
                Note that fishnstik.com has no access to or control over these
                cookies that are used by third-party advertisers.
              </p>

              <h4>Third Party Privacy Policies</h4>

              <p>
                fishnstik.com's Privacy Policy does not apply to other
                advertisers or websites. Thus, we are advising you to consult
                the respective Privacy Policies of these third-party ad servers
                for more detailed information. It may include their practices
                and instructions about how to opt-out of certain options.{" "}
              </p>

              <h4>CCPA Privacy Rights (Do Not Sell My Personal Information)</h4>

              <p>
                Under the CCPA, among other rights, California consumers have
                the right to:
              </p>
              <p>
                Request that a business that collects a consumer's personal data
                disclose the categories and specific pieces of personal data
                that a business has collected about consumers.
              </p>
              <p>
                Request that a business delete any personal data about the
                consumer that a business has collected.
              </p>
              <p>
                Request that a business that sells a consumer's personal data,
                not sell the consumer's personal data.
              </p>
              <p>
                If you make a request, we have one month to respond to you. If
                you would like to exercise any of these rights, please contact
                us.
              </p>

              <h4>GDPR Data Protection Rights</h4>

              <p>
                We would like to make sure you are fully aware of all of your
                data protection rights. Every user is entitled to the following:
              </p>
              <p>
                The right to access You have the right to request copies of your
                personal data. We may charge you a small fee for this service.
              </p>
              <p>
                The right to rectification You have the right to request that we
                correct any information you believe is inaccurate. You also have
                the right to request that we complete the information you
                believe is incomplete.
              </p>
              <p>
                The right to erasure You have the right to request that we erase
                your personal data, under certain conditions.
              </p>
              <p>
                The right to restrict processing You have the right to request
                that we restrict the processing of your personal data, under
                certain conditions.
              </p>
              <p>
                The right to object to processing You have the right to object
                to our processing of your personal data, under certain
                conditions.
              </p>
              <p>
                The right to data portability You have the right to request that
                we transfer the data that we have collected to another
                organization, or directly to you, under certain conditions.
              </p>
              <p>
                If you make a request, we have one month to respond to you. If
                you would like to exercise any of these rights, please contact
                us.
              </p>

              <h2>Children's Information</h2>

              <p>
                Another part of our priority is adding protection for children
                while using the internet. We encourage parents and guardians to
                observe, participate in, and/or monitor and guide their online
                activity.
              </p>

              <p>
                fishnstik.com does not knowingly collect any Personal
                Identifiable Information from children under the age of 13. If
                you think that your child provided this kind of information on
                our website, we strongly encourage you to contact us immediately
                and we will do our best efforts to promptly remove such
                information from our records.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
