
import React, { useState,  } from 'react';
import { ActionProvider } from "../utilities/comments/ActionContext";
import SignField from "../utilities/comments/SignField";
import Input from "../utilities/comments/Input";
import Question from "../utilities/comments/Question";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function QASection({ commentsArray, currentUser }) {
    const [open, setOpen] = useState(false)

    return (
        <ActionProvider
            currentUser={currentUser}
            _comments={commentsArray}
        >
            {commentsArray &&
                <div className="bg-gray-50 mt-20">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">Customer questions and answers</h2>
                            <dl className=" mt-6 space-y-6 divide-y divide-gray-200">
                                {commentsArray.map((comment, index) => (
                                    <div key={index} className="pt-2">
                                        <div className="">
                                            <div className="">
                                                <div onClick={() => setOpen(!open)}>
                                                    <Question question={comment} />

                                                </div>


                                            </div>
        
                                        </div>
                                        
                                    </div>
                                ))}
                            </dl>

                        </div>



                    </div>
                    <div className="py-8 w-full flex justify-center">
                        {!currentUser ? <SignField placeholder='to ask a question' /> : <Input placeholder='Ask a question here' />}
                    </div>
                </div>
            }
        </ActionProvider>
    )
}
