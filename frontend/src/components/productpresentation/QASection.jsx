/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux"
import React, { useState, useEffect } from 'react';
import { ActionProvider } from "../utilities/comments/ActionContext";
import SignField from "../utilities/comments/SignField";
import Input from "../utilities/comments/Input";
import DisplayComments from "../utilities/comments/DisplayComments";
import Answers from "../utilities/comments/Answers";
import Question from "../utilities/comments/Question";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function QASection({ commentsArray, currentUser }) {
    console.log(commentsArray)
    return (
        <ActionProvider
            currentUser={currentUser}
            comments={commentsArray}
        >
            {commentsArray &&
                <div className="bg-gray-50 mt-20">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">Customer questions and answers</h2>
                            <dl className=" mt-6 space-y-6 divide-y divide-gray-200">
                                {commentsArray.map((comment, index) => (
                                    <Disclosure as="div" key={index} className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt className=" text-lg">
                                                    <Disclosure.Button as='div' className="text-left w-full flex justify-between  text-gray-400">
                                                        {/* comment or question goes here */}
                                                        <Question question={comment} />

                                                        {/* <span className="font-medium text-gray-900">{comment.text}</span> */}
                                                        <span className="ml-6 h-7 flex items-center">
                                                            <ChevronDownIcon
                                                                className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                    <Answers parent={comment.comId} answers={comment.replies} />
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </dl>
                            
                        </div>
                        <div className="py-8">
                        {!currentUser ? <SignField /> : <Input placeholder='Ask a question here'/>}
                        </div>

                    </div>

                </div>
            }
        </ActionProvider>
    )
}
