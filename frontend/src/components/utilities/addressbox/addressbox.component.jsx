import React, { useState } from "react";
import "./addressbox.styles.scss";

const AddressBox = ({
  index,
  input,
  highlighted,
  selectedAddress,
  className,
}) => {
  if (!input) return "";

  const { firstName, lastName, company, streetAddress, apartment, city, state, postalCode, phone, email } = input;

  return (
    <ul
      className={`${className} ${
        highlighted ? "addressbox--highlighted" : ""
      } addressbox`}
      onClick={() => selectedAddress(input, index)}>
      <li>{firstName} {lastName}</li>
      <li>{company}</li>
      <li>{streetAddress}</li>
      {apartment && <li>{apartment}</li>}
      <li>
        {city}, {state} {postalCode}
      </li>
      <li>USA</li>


    </ul>
  );
};

export default AddressBox;
