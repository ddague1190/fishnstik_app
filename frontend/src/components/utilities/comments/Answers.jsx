import React, { useContext, useState } from 'react'
import { ActionContext } from "./QASectionActionContext.jsx"
import InputField from "./InputField"
import Input from "./Input";
import SignField from "./SignField";
import Popup from "reactjs-popup";
import { motion } from "framer-motion"
import {
    modal,
    modalClose,
    modalHeader,
    modalContent,
    modalActions,
    modalActionBtn,
    modalDelBtn
} from './ModalStyles'

const Answer = ({ answer, parentId, index }) => {
    const actions = useContext(ActionContext)
    const [edit, setEdit] = useState(false)
    const colors = [
        'red',
        'gray',
        'green',
        'purple',
        'yellow',
        'pink',
    ]

    return (
        <>
            {!edit ? <div className="flex flex-row py-2">

                <div className="">
                    <p className="w-full text-black">{answer.text}</p>
                    <div className="flex items-center gap-2 ">
                        <span className="text-xs">posted by</span>
                        <div className="bg-white rounded-md w-max flex gap-2 items-center">
                            <div className="flex ml-2 text-black text-xs ">{answer.fullName} </div>

                            <div>
                                {answer.avatarUrl ?
                                    <img
                                        src={answer.avatarUrl}
                                        style={{ width: 20, height: 20, borderRadius: 24 / 2 }}
                                        alt='userIcon'
                                    /> :
                                    <i style={{ backgroundColor: colors[index] }}
                                        className="fa-solid fa-user text-xs rounded-full w-6 flex items-center justify-center h-6"></i>
                                }
                            </div>
                        </div>
                        <span className="text-xs">on</span>

                        <time className="text-xs text-black" dateTime={answer.createdAt}>{answer.createdAt.slice(0, 10)}</time>
                    </div>

                </div>

                <div className=" ml-auto">
                    {actions.userId == answer.fullName && actions.user && (
                        <Popup
                            role='tooltip'
                            trigger={
                                <button className="font-light text-xs bg-transparent border-none px-2 py-3 rounded-full cursor-pointer hover:outline-none hover:bg-gray-50 focus:outline-0">
                                    Edit
                                </button>
                            }
                            position='left center'
                            nested
                        >
                            <div className=" w-20">
                                <div>
                                    <button
                                        className="bg-transparent outline-none border-none cursor-pointer"
                                        onClick={() => setEdit(true)}
                                    >
                                        {' '}
                                        Edit
                                    </button>
                                </div>
                                <div>
                                    <Popup
                                        trigger={
                                            <button className="bg-transparent outline-none border-none cursor-pointer"> Delete</button>
                                        }
                                        modal
                                        nested
                                    >
                                        {(close) => (
                                            <div className="text-sm bg-white h-max w-max p-4">
                                                <button
                                                    className="cursor-pointer absolute block px-.5 py-1 leading-[20px] -right-[2.5] -top-2.5 font-lg bg-white border-r-8 border-2 border-[#cfcece] outline-none"
                                                    onClick={close}
                                                >
                                                    &times;
                                                </button>
                                                <div className='header' style={modalHeader}>
                                                    {' '}
                                                    Delete Comment{' '}
                                                </div>
                                                <div className='content' style={modalContent}>
                                                    {' '}
                                                    Delete your comment permanently?
                                                </div>
                                                <div className='actions' style={modalActions}>
                                                    <button
                                                        className='button'
                                                        style={modalActionBtn}
                                                        onClick={() => {
                                                            actions.onDelete(answer.comId)
                                                            close()
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className='bg-red-500 button'
                                                        style={modalDelBtn}
                                                        onClick={() => {
                                                            console.log('canceledit')
                                                            close()
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                        </Popup>
                    )}
                </div>
            </div>
                :
                <InputField
                    cancellor={answer.comId}
                    value={answer.text}
                    child={answer.comId}
                    parentId={parentId.comId}
                    edit
                    setEdit={setEdit}
                    placeholder={answer.text}
                />
            }
        </>
    )

}

const Answers = ({ answers, parentId }) => {
    const actions = useContext(ActionContext)
    const [showInput, setShowInput] = useState(false)

    return (<div className="relative">
        <div className="flex">
            <span className="ml-2 text-2xl w-20 mt-2 font-extrabold">A:</span>

            <div className="w-full h-full min-h-['25px']   ">
                {answers.map((answer, index) => (
                    <Answer key={index} index={index} parentId={parentId} answer={answer} />
                ))}
                {answers.length > 0 && <br />}
                {showInput ?

                    <motion.div initial={{ x: 200 }} animate={{ x: 0 }} className=" w-full flex justify-center">
                        {!actions.currentUser ? <SignField placeholder='to add an answer' /> : <Input parentId={parentId} placeholder='Have an answer?' />}
                    </motion.div> :
                    <em onClick={() => { setShowInput(true) }} className="cursor-pointer font-extrabold text-blue-900 text-center w-full block p-4 text-sm">Answer it!</em>

                }
            </div>

        </div>

    </div>
    )

}

export default Answers