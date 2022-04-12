import React, { useEffect, useState } from "react";
import { Fragment } from "react";

export const ProductDetailsImages = ({ mainImages, variants, currVariant }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const onImageLeftClick = () => {
    let { index } = selectedImage;
    if (index > 0) {
      setSelectedImage(images[index - 1]);
      return;
    } else {
      setSelectedImage(images[images.length - 1]);
      return;
    }
  };
  const onImageRightClick = () => {
    let { index } = selectedImage;

    if (index < images.length - 1) {
      setSelectedImage(images[index + 1]);
      return;
    } else {
      setSelectedImage(images[0]);
      return;
    }
  };

  useEffect(() => {
    if (currVariant) {
      const image = {
        image: currVariant.image,
        description: currVariant.title,
        index: images.findIndex((el) => el.image === currVariant.image),
      };
      setSelectedImage(image);
    }
  }, [currVariant]);

  useEffect(() => {
    const images = [];
    let startIndex = 0;
    mainImages.map((image, index) => {
      images.push({
        image: image,
        description: `Main picture ${index + 1}`,
        index,
        mainImage: true,
      });
      startIndex++;
    });
    variants.map((variant, index) => {
      if (variant.image) {
        images.push({
          image: variant.image,
          description: variant.title,
          index: index + startIndex,
          mainImage: false,
        });
      }
    });
    setImages(images);
    setSelectedImage(images[0]);
  }, []);
 
  return (
    <div className="flex flex-col overflow-scroll h-full mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-3 relative gap-1">
        <img
          src={selectedImage?.image}
          alt={selectedImage?.description}
          className="lg:mb-10 col-span-3 row-span-3 self-center rounded-lg mx-auto md:w-full h-96 object-contain"
        />
        {images.map((image, index) => {
          if (index != selectedImage.index && index <10) {
            return(
              <Fragment key={index}>
                <span className="sr-only">{image.description}</span>
                <span className="hidden lg:block inset-0 bg-gray-200 h-12 lg:h-24 rounded-md overflow-hidden">
                  <img
                  key={index}
                  value={index}
                    src={image.image}
                    alt={image.description}
                    className="w-full h-full object-center object-contain"
                  />
                </span>
              </Fragment>
            )
          }
        })}
        

{images.length > 1 && (
        <>
          <div className="absolute top-1/2 w-full flex mt-auto items-center rounded-md py-1 justify-between px-6  text-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={onImageLeftClick}
              className="h-8 w-8 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>

            <svg
              onClick={onImageRightClick}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke='gray'
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </>
      )}
      </div>


    </div>
  );
};
