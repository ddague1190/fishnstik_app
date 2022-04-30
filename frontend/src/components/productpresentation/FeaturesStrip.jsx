import React from 'react'
import { useSelector } from "react-redux"
import useViewport from "../../utils/useViewport"
const FeaturesStrip = ({ details }) => {
    useViewport()
    const {width} = useSelector(state=>state.dimensions)
    const SCREEN_WIDTH_BREAKPOINT = 560
    return (
        <>
            {details &&
                <div className="p-2 pt-4 mt-8 border-t text-lg  border-gray-200 bg-[#FF5656]">
                    <h1 className="p-2 font-extrabold absolute">Features...</h1>
                    {width < SCREEN_WIDTH_BREAKPOINT ? 
                    <div className="p-10 ml-10 p text-lg rose prose-sm text-white">
                        <ul>
                            {details.map(({ detail }, index) => (
                                <li className="list-disc" key={index}>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                                'asdf'
                    }
                </div>
            }
        </>
    )
}

export default FeaturesStrip