import React from "react";
import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import styles from "./productviewer.module.scss";
import Rating from "../../utilities/rating/rating.component";
import { cartParser } from "../../../utils/reduxSelectors";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { addToCart } from "../../../redux/actions/cartActions";

export const ProductViewer = ({ product }) => {
  const dispatch = useDispatch();
  const parsedCart = useSelector(cartParser);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const onAddToCartClick = () => {
    dispatch(
      addToCart({
        productId: product._id,
        variantId: selectedVariant._id,
        name: product.name,
        variantIdentifier: selectedVariant.identifier,
        variantTitle: selectedVariant.title,
        image: selectedImage.image,
        type: selectedVariant._type,
        pack: selectedVariant.pack,
        material: selectedVariant.material,
        price: selectedVariant.price,
        countInStock: selectedVariant.countInStock,
      })
    );
  };
  const loginAndComeBack = () => {
    navigate(`/login?redirect=/product/${slug}`);
  };

  let packOptions = {};
  let typeOptions = {};
  let materialOptions = {};

  const [mainImages, setMainImages] = useState({});
  const [variantImages, setVariantImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  const [hasPackOptions, setHasPackOptions] = useState();
  const [hasTypeOptions, setHasTypeOptions] = useState();
  const [hasMaterialOptions, setHasMaterialOptions] = useState();
  const [whichType, setWhichType] = useState();

  const [type, setType] = useState();
  const [material, setMaterial] = useState();
  const [packSize, setPackSize] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const onImageLeftClick = () => {
    let { index, mainImage } = selectedImage;
    if (index > 0) {
      setSelectedImage(
        mainImage ? mainImages[index - 1] : variantImages[index - 1]
      );
      return;
    } else {
      setSelectedImage(
        mainImage
          ? variantImages[variantImages.length - 1]
          : mainImages[mainImages.length - 1]
      );
      return;
    }
  };
  const onImageRightClick = () => {
    const maxMainLength = mainImages.length - 1;
    const maxVariantLength = variantImages.length - 1;
    let { index, mainImage } = selectedImage;
    if (mainImage) {
      if (index < maxMainLength) {
        setSelectedImage(mainImages[index + 1]);
        return;
      }
    }
    if (!mainImage) {
      if (index < maxVariantLength) {
        setSelectedImage(variantImages[index + 1]);
        return;
      }
    }

    setSelectedImage(mainImage ? variantImages[0] : mainImages[0]);
  };

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
      padding: "1rem 2rem",
    }),
    placeholder: (styles, { data }) => ({ ...styles, ...dot("white") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

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

  const updateSelectedItem = () => {
    const item = product.variants
      .filter(updateFilters[whichType])
      .filter((v, i, a) => a.indexOf(v) === i)[0];
    return item;
  };

  const updateImageFilter = ({ _type, material: _material }) => {
    if (type) {
      return _type && type && _type === type.value;
    }
    if (type && material) {
      return (
        _type &&
        type &&
        _type === type.value &&
        _material &&
        material &&
        _material === material.value
      );
    }
  };

  const updateSelectedImage = () => {
    const currVariant = product.variants
      .filter(updateImageFilter)
      .filter((v, i, a) => a.indexOf(v) === i)[0];
    const image = {
      image: currVariant.image,
      description: currVariant.title,
      index: variantImages.findIndex((el) => el.image === currVariant.image),
    };
    return image;
  };

  useEffect(() => {
    if (whichType) {
      setSelectedImage(updateSelectedImage());
      setSelectedVariant(updateSelectedItem());
    }
  }, [type, material, packSize]);

  const typeRef = useRef();

  useEffect(() => {
    const mainImages = [];
    const variantImages = [];
    let hasPackOptions = false;
    let hasTypeOptions = false;
    let hasMaterialOptions = false;
    product.images.map((image, index) => {
      mainImages.push({
        image: image,
        description: `Main picture ${index + 1}`,
        index,
        mainImage: true,
      });
      setMainImages(mainImages);
      product.variants.map((variant, index) => {
        if (variant.image) {
          variantImages.push({
            image: variant.image,
            description: variant.title,
            index,
            mainImage: false,
          });
        }

        hasTypeOptions = hasTypeOptions || variant._type != null;
        if (hasTypeOptions) setWhichType("justType");

        hasPackOptions = hasPackOptions || variant.pack != null;
        if (hasPackOptions) setWhichType("typeAndPack");
        hasMaterialOptions = hasMaterialOptions || variant.material != null;
        if (hasMaterialOptions) setWhichType("typePackMaterial");
      });
      setVariantImages(variantImages);
      setSelectedImage(mainImages[0]);
      setHasPackOptions(hasPackOptions);
      setHasTypeOptions(hasTypeOptions);
      setHasMaterialOptions(hasMaterialOptions);
    });
  }, []);

  const redOrGreenDot = (whichFilter, type, material, pack) => {
    let haveSomeInStock = product.variants
      .filter((el) => {
        switch (whichFilter) {
          case "type":
            return type && type === el._type;

          case "typepack":
            return type && type === el._type && pack === el.pack;

          case "typepackmaterial":
            return type === el._type && pack && pack === el.pack;

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
      .map((type) => ({ label: type, value: type }));
    materialOptions = product.variants
      .filter((p) => material && p.material === type.value)
      .map((p) => p.material)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((material) => ({ label: material, value: material }));
    packOptions = product.variants
      .filter(
        (p) =>
          type &&
          p._type === type.value &&
          material &&
          p.material === material.value
      )
      .map((p) => p.material)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((material) => ({ label: material, value: material }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <div className={styles.images}>
          <div className={styles.mainimage}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <i
                onClick={onImageLeftClick}
                style={{ fontSize: "3rem", cursor: "pointer" }}
                className="fa-solid fa-arrow-left"></i>
              <img className={styles.imagetag} src={selectedImage.image} />
              <i
                onClick={onImageRightClick}
                style={{ fontSize: "3rem", cursor: "pointer" }}
                className="fa-solid fa-arrow-right"></i>
            </div>
            <span style={{ fontStyle: "italic" }}>
              Image: {selectedImage.description || "N/A"}
            </span>
          </div>
        </div>
        <div className={styles.text}>
          <p className={styles.name}>{product.name}</p>
          <span className={styles.rating}>
            <Rating
              value={product.rating}
              color={"#e0dfa7"}
              text={`${product.numReviews} reviews`}
            />{" "}
          </span>

          <div className={styles.selectors}>
            {
              {
                justType: (
                  <>
                    <span>Select Type</span>
                    <Select
                      styles={customStyles}
                      autoFocus
                      value={type}
                      onChange={(option) => {
                        setType(option);
                        updateSelectedItem();
                      }}
                      options={typeOptions}
                    />
                  </>
                ),
                typeAndPack: (
                  <>
                    <span>Type</span>
                    <Select
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
                    <span>Pack size</span>
                    <Select
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
                        updateSelectedItem();
                      }}
                      options={packOptions}
                      isDisabled={!type}
                    />
                  </>
                ),
                typePackMaterial: (
                  <>
                    <span>Type</span>
                    <Select
                      styles={customStyles}
                      autoFocus
                      value={type}
                      onChange={setType}
                      options={typeOptions}
                    />
                    <span>Material size</span>
                    <Select
                      styles={customStyles}
                      value={material}
                      onChange={(option) => {
                        setMaterial(option);
                        updateSelectedItem();
                      }}
                      options={materialOptions}
                      isDisabled={!type}
                    />
                    <span>Pack size</span>
                    <Select
                      styles={customStyles}
                      value={packSize}
                      onChange={(option) => {
                        setPackSize(option);
                        updateSelectedItem();
                      }}
                      options={packOptions}
                      isDisabled={!type}
                    />
                  </>
                ),
              }[whichType]
            }

            <div className={styles.addToCart}>
              <span>$19.99</span>
              <button
                disabled={selectedVariant?.countInStock === 0}
                className={styles.additbutton}>
                <i className="fas fa-shopping-cart"></i> Add to cart
              </button>
            </div>
            {selectedVariant?.countInStock === 0 && (
              <div className={styles.outofstock}>
                <input />
                <button className={styles.additbutton}>NOTIFY ME</button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      {
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: product.description }}></div>
      }
    </div>
  );
};
