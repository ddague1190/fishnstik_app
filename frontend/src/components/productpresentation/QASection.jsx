
import SignField from "../utilities/comments/SignField";
import Input from "../utilities/comments/Input";
import Question from "../utilities/comments/Question";
import React, { createContext, useEffect, useState } from 'react'
import { ActionContext } from "../utilities/comments/QASectionActionContext.jsx";
import { useContext } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function QASection({comments}) {

    const [count, setCount] = useState(0)
    const actions = useContext(ActionContext);
    const [open, setOpen] = useState(false)


    return (

        <>
            {actions.comments &&
                <div className="bg-gray-50">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                            <h2 className="text-center text-xl font-extrabold text-gray-900 sm:text-2xl">Customer questions and answers</h2>
                            <dl className=" mt-6 space-y-6 divide-y divide-gray-200">
                                {actions.comments.map((comment, index) => (
                                    <div key={index} className="pt-2">
                                        <div className="">
                                            <div className="">
                                                <div onClick={() => setOpen(!open)}>
                                                    <Question question={comment} index={index} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </dl>
                        </div>

                    </div>
                    <div className="py-8 w-full flex justify-center">
                        {!actions.username ? <SignField placeholder='to ask a question' /> : <Input placeholder='Ask a question here' />}
                    </div>
                </div>
            }
        </>
    )
}
