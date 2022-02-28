import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./loader.styles.scss";
import { css } from "@emotion/react";

import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  const override = css`
    position: fixed;
    top: 0%;
    left: 50%;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -70%);
    border-color: black;
    border-color: #BB1515;
  `;

  return ReactDOM.createPortal(
    <div className='loader'>
      <ClipLoader css={override} size={150}></ClipLoader>
    </div>,
    document.body
  );
};

export default Loader;
