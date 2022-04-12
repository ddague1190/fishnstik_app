import React from "react";
import "./addressbox.styles.scss";

const AddressBox = ({
  index,
  input,
  highlighted,
  selectedAddress,
  className,
  disabled,
}) => {
  if (!input) return "";

  const {
    firstName,
    lastName,
    company,
    streetAddress,
    apartment,
    city,
    state,
    postalCode,
    phone,
    email,
  } = input;

  return (
    <address>
      <ul
        className={`${className} ${
          highlighted ? "addressbox--highlighted" : ""
        } addressbox`}
        onClick={!disabled ? () => selectedAddress(input, index) : null}>
        <li>
          {firstName} {lastName}
        </li>
        <li>{company}</li>
        <li>{streetAddress}</li>
        {apartment && <li>{apartment}</li>}
        <li>
          {city}, {state} {postalCode}
        </li>
        <li>USA</li>
      </ul>
    </address>
  );
};

export default AddressBox;
