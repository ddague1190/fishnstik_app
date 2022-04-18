import React from "react";
import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { RadioGroup } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import { ClockIcon } from "@heroicons/react/solid";
import { ProductDetailsImages } from "./ProductDetailsImages";
import ProductDetailsPricing from "./ProductDetailsPricing";
import SizeChart from "./SizeChart";

export const ProductDetailsDropdowns = ({ product }) => {
  let packOptions = {};
  let typeOptions = {};
  let materialOptions = {};
  const [typeOverride, setTypeOverride] = useState();
  const [currVariant, setCurrVariant] = useState();
  const [whichImage, setWhichImage] = useState();
  const [hasPackOptions, setHasPackOptions] = useState();
  const [hasTypeOptions, setHasTypeOptions] = useState();
  const [hasMaterialOptions, setHasMaterialOptions] = useState();
  const [whichType, setWhichType] = useState();
  const [type, setType] = useState();
  const [material, setMaterial] = useState();
  const [packSize, setPackSize] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const typeRef = useRef();
  const onAddToCartClick = () => {
    dispatch(
      addToCart({
        qty: 1,
        productId: product._id,
        variantId: currVariant._id,
        name: product.name,
        slug: product.slug,
        variantIdentifier: currVariant.identifier,
        variantTitle: currVariant.title,
        image: currVariant.image,
        type: currVariant._type,
        pack: currVariant.pack,
        material: currVariant.material,
        price: currVariant.discountPrice,
        countInStock: currVariant.countInStock,
        leadTime: product.leadTime,
      })
    );
    navigate("/cart");
  };

  //Cross talk between image left and right and the type shown on dropdowns
  useEffect(() => {
    if (typeOverride) {
      setType({
        value: typeOverride,
        label: typeOverride,
        color: redOrGreenDot("type", type),
      });

      setMaterial(null);
      setPackSize(null);
    }
  }, [typeOverride]);

  useEffect(() => {
    const updateFilters = {
      justType: ({ _type }) => {
        return _type && type && _type === type.value;
      },
      typeAndPack: ({ _type, pack }) => {
        return (
          _type &&
          type &&
          _type === type.value &&
          pack &&
          packSize &&
          pack === packSize.value
        );
      },
      typePackMaterial: ({ _type, pack, material: _material }) => {
        return (
          _type &&
          type &&
          _type === type.value &&
          pack &&
          packSize &&
          pack === packSize.value &&
          _material &&
          material &&
          _material === material.value
        );
      },
    };
    if (whichType) {
      setCurrVariant(() => {
        const item = product.variants
          .filter(updateFilters[whichType])
          .filter((v, i, a) => a.indexOf(v) === i)[0];
        return item;
      });

      if (whichType === "justType" || whichType === "typeAndPack") {
        const item = product.variants
          .filter(({ _type }) => type && _type === type.value)
          .filter((v, i, a) => a.indexOf(v) === i)[0];
        if (item) setWhichImage({ image: item.image, title: item.title });
      }
      if (whichType === "typePackMaterial") {
        const item = product.variants
          .filter(
            ({ _type, material: _material }) =>
              type &&
              _type === type.value &&
              material &&
              _material === material.value
          )
          .filter((v, i, a) => a.indexOf(v) === i)[0];
        if (item) setWhichImage({ image: item.image, title: item.title });
      }
    }
  }, [
    type,
    material,
    packSize,
    whichType,
    product.variants,
    setCurrVariant,
    setWhichImage,
  ]);

  useEffect(() => {
    let hasPackOptions = false;
    let hasTypeOptions = false;
    let hasMaterialOptions = false;

    product.variants.forEach((variant, index) => {
      hasTypeOptions = hasTypeOptions || variant._type != null;
      hasPackOptions = hasPackOptions || variant.pack != null;
      hasMaterialOptions = hasMaterialOptions || variant.material != null;
    });

    if (hasTypeOptions) setWhichType("justType");
    if (hasPackOptions) setWhichType("typeAndPack");
    if (hasMaterialOptions) setWhichType("typePackMaterial");
    setHasPackOptions(hasPackOptions);
    setHasTypeOptions(hasTypeOptions);
    setHasMaterialOptions(hasMaterialOptions);
  }, [product.variants]);

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 50,
      content: '" "',
      display: "block",
      marginRight: 10,
      marginLeft: 10,
      height: 15,
      width: 15,
    },
  });

  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        ...dot(data.color),
        padding: "1rem 2rem",
      };
    },
    input: (styles, { data }) => ({
      ...styles,
      ...dot(),
      padding: "8px 12px",
    }),
    placeholder: (styles, { data }) => ({ ...styles, ...dot("white") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const redOrGreenDot = (whichFilter, type, material, pack) => {
    let haveSomeInStock = product.variants
      .filter((el) => {
        switch (whichFilter) {
          case "type":
            return type && type === el._type;

          case "typepack":
            return type && type === el._type && pack === el.pack;

          case "typematerial":
            return type === el._type && material === el.material;

          case "typepackmaterial":
            return (
              type === el._type && material === el.material && pack === el.pack
            );

          default:
            return false;
        }
      })
      .find((el) => el.countInStock > 0);
    return haveSomeInStock ? "green" : "red";
  };

  if (hasTypeOptions && !hasPackOptions) {
    typeOptions = product.variants
      .map((p) => p._type)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((type) => ({
        label: type,
        value: type,
        color: redOrGreenDot("type", type),
      }));
  }
  if (hasTypeOptions && !hasMaterialOptions) {
    typeOptions = product.variants
      .map((p) => p._type)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((type) => ({
        label: type,
        value: type,
        color: redOrGreenDot("type", type),
      }));
    packOptions = product.variants
      .filter((p) => type && p._type === type.value)
      .map((p) => p.pack)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((packsize) => ({
        label: packsize,
        value: packsize,
        color: redOrGreenDot("typepack", type.value, null, packsize),
      }));
  }
  if (hasMaterialOptions) {
    typeOptions = product.variants
      .map((p) => p._type)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((type) => ({
        label: type,
        value: type,
        color: redOrGreenDot("type", type, null, null),
      }));
    materialOptions = product.variants
      .filter((p) => type && p._type === type.value)
      .map((p) => p.material)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((material) => ({
        label: material,
        value: material,
        color: redOrGreenDot("typematerial", type.value, material, null),
      }));
    packOptions = product.variants
      .filter(
        (p) =>
          type &&
          p._type === type.value &&
          material &&
          p.material === material.value
      )
      .map((p) => p.pack)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((pack) => ({
        label: pack,
        value: pack,
        color: redOrGreenDot(
          "typepackmaterial",
          type.value,
          material.value,
          pack
        ),
      }));
  }

  return (
    <>
      <ProductDetailsPricing currVariant={currVariant} name={product.name} />
      <section className="flex flex-col overflow-scroll h-full mt-8  lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
        <ProductDetailsImages
          mainImages={product.images}
          variants={product.variants}
          whichImage={whichImage}
          setTypeOverride={setTypeOverride}
        />
        {product.complete_size_chart?.length > 0 && (
          <SizeChart chart={product.complete_size_chart} />
        )}
      </section>
      <section className="mt-8 lg:col-span-5">
        <form>
          <div>
            {
              {
                justType: (
                  <>
                    <p>Select Type</p>
                    <Select
                      isSearchable={false}
                      styles={customStyles}
                      autoFocus
                      value={type}
                      onChange={(option) => {
                        setType(option);
                      }}
                      options={typeOptions}
                    />
                  </>
                ),
                typeAndPack: (
                  <>
                    <p>Type</p>
                    <Select
                      isSearchable={false}
                      styles={customStyles}
                      autoFocus
                      placeholder="Select type ..."
                      ref={typeRef}
                      value={type}
                      onChange={(option) => {
                        setType(option);
                        setPackSize(null);
                      }}
                      options={typeOptions}
                    />
                    <br />
                    <p>Pack size</p>
                    <Select
                      isSearchable={false}
                      styles={customStyles}
                      value={packSize}
                      placeholder={
                        !type ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}>
                            <i className="fas fa-hand-point-up"></i>
                            <span>Please select type</span>
                          </div>
                        ) : (
                          "Select pack size..."
                        )
                      }
                      onChange={(option) => {
                        setPackSize(option);
                      }}
                      options={packOptions}
                      isDisabled={!type}
                    />
                  </>
                ),
                typePackMaterial: (
                  <>
                    <p>Type</p>
                    <Select
                      isSearchable={false}
                      styles={customStyles}
                      autoFocus
                      value={type}
                      onChange={(option) => {
                        setType(option);
                        setMaterial(null);
                        setPackSize(null);
                      }}
                      options={typeOptions}
                    />
                    <br />
                    <p>Material</p>
                    <Select
                      isSearchable={false}
                      styles={customStyles}
                      value={material}
                      onChange={(option) => {
                        setMaterial(option);
                        setPackSize(null);
                      }}
                      options={materialOptions}
                      isDisabled={!type}
                      placeholder={
                        !type ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}>
                            <i className="fas fa-hand-point-up"></i>
                            <span>Please select type</span>
                          </div>
                        ) : (
                          "Select material..."
                        )
                      }
                    />
                    <br />
                    <p>Pack size</p>
                    <Select
                      isSearchable={false}
                      styles={customStyles}
                      value={packSize}
                      onChange={(option) => {
                        setPackSize(option);
                      }}
                      options={packOptions}
                      isDisabled={!type}
                      placeholder={
                        !material ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}>
                            <i className="fas fa-hand-point-up"></i>
                            <span>Please select material</span>
                          </div>
                        ) : (
                          "Select material..."
                        )
                      }
                    />
                  </>
                ),
              }[whichType]
            }
            <RadioGroup
              //   value={selectedColor}
              //   onChange={setSelectedColor}
              className="mt-2">
              <RadioGroup.Label className="sr-only">
                Choose a color
              </RadioGroup.Label>
            </RadioGroup>
          </div>

          {currVariant &&
            (currVariant.countInStock > 0 ? (
              <p className="text-green-500 text-lg font-semibold">In Stock </p>
            ) : (
              <div className="flex gap-2 mt-4 items-center">
                <ClockIcon
                  className="flex-shrink-0 h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
                <p className="text-red-500 ">
                  {`Special order item. Lead time is ${product.leadTime} weeks.`}
                </p>
              </div>
            ))}

          <button
            onClick={onAddToCartClick}
            disabled={!currVariant}
            type="submit"
            className="disabled:opacity-50 mt-8 w-full bg-[#FF5656] text-white border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium hover:bg-[#FF6767] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
            {!currVariant ? (
              "Please select an option"
            ) : (
              <>
                <i className="fas fa-shopping-cart mr-5"></i>
                <span className="track-widest">ADD TO CART</span>{" "}
              </>
            )}
          </button>
        </form>

        {/* Product details */}

        <div className="mt-10">
          <h2 className="text-md font-medium text-gray-900">Description</h2>

          <div
            className="mt-4 prose prose-sm text-lg lg:text-xl text-gray-500"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        <div className="mt-8 border-t text-lg  border-gray-200 pt-8">
          <h2 className="text-md font-medium text-gray-900">Features</h2>

          <div className="mt-4 ml-10 p text-xl rose prose-sm text-gray-500">
            <ul>
              {product?.details?.map(({ detail }, index) => (
                <li className="list-disc" key={index}>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
