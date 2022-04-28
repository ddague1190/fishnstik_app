import React, { useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import {
    modal,
    modalClose,
    modalHeader,
    modalContent,
    modalActions,
    modalActionBtn,
    modalDelBtn
} from './ModalStyles'
import { ActionContext } from './QASectionActionContext.jsx'
import InputField from "./InputField"
import Answers from "./Answers"
import { useEffect } from "react"

const Question = ({ question, index }) => {
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const actions = useContext(ActionContext)
    const colors = [
        'red',
        'gray',
        'green',
        'purple',
        'yellow',
        'pink',
    ]
    const color = colors[index % 5]



    // console.log(actions, 'actions')
    // console.log(question, 'question')

    return (
        <>
            <div className="flex w-full">
                <div
                    className="py-4 flex flex-row justify-center items-center w-full"
                >
                    <p className="text-2xl w-20 ml-2 text-blue-500 font-extrabold">Q:</p>
                    {!edit ?
                        <>
                            <div className="cursor-pointer w-full"
                                onClick={() => setOpen(!open)}>
                                <div >
                                    <p className="w-full text-blue-500">{question.text}</p>
                                    <div className="flex items-center gap-2 -mt-1">
                                        <span className="text-xs">posted by</span>
                                        <div className="bg-white rounded-md w-max flex gap-2 items-center">
                                            <div className="flex ml-2 text-xs text-black ">{question.fullName} </div>

                                            <div>
                                                {question.avatarUrl ?
                                                    <img
                                                        src={question.avatarUrl}
                                                        style={{ width: 20, height: 20, borderRadius: 24 / 2 }}
                                                        alt='userIcon'
                                                    /> :
                                                    <i style={{ backgroundColor: color }}
                                                        className="fa-solid fa-user text-xs rounded-full w-6 flex items-center justify-center h-6"></i>
                                                }
                                            </div>
                                        </div>
                                        <span className="text-xs">on</span>

                                        <time className="text-black text-xs" dateTime={question.createdAt}>{question.createdAt.slice(0, 10)}</time>
                                    </div>
                                </div>
                            </div>
                            <div className="-mt-4 ml-auto">
                                {actions.userId == question.fullName && actions.user && (
                                    <Popup
                                        role='tooltip'
                                        trigger={
                                            <button className="font-light text-xs bg-transparent border-none px-2 py-3 rounded-full cursor-pointer hover:outline-none hover:bg-white focus:outline-0">
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
                                                    onClick={()=>setEdit(true)}
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
                                                                        actions.onDelete(question.comId)
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
                        </>
                        :
                        <InputField                                        
                            cancellor={question.comId}
                            parentId={question.comId}
                            value={question.text}
                            edit
                            setEdit={setEdit}
                        />

                    }

                </div>
            </div>
            {open &&
                <dd as="div" className="bg-white rounded-md">
                    <Answers parentId={question.comId} answers={question.replies} />
                </dd>

            }
        </>
    )
}

export default Question