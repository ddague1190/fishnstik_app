import React, { useContext } from 'react'
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
import { ActionContext } from './ActionContext'

const Question = ({ question, parentId, index }) => {
    const actions = useContext(ActionContext)
    const edit = true
    const colors= [
        'red',
        'gray',
        'green',
        'purple',
        'yellow',
        'pink',
      ]  
      const color = colors[index%5]
      console.log(question)
  
    return (
        <div className="flex w-full justify-between">
            {question && <>
            <div
                className="flex flex-col mt-4"
            >
                <div className=''>{question.text}</div>
                <div className="flex items-center gap-2 mt-2 ">
                    <div className="text-xs">posted by</div>
                    <div className="bg-white rounded-md w-max flex gap-2 items-center">
                    <div className="flex ml-2 text-xs ">{question.fullName} </div>

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
                </div>
            </div>
            <div className="">
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
                        <div className="w-0">
                            <div>
                                <button
                                    className="bg-transparent outline-none border-none cursor-pointer"
                                    onClick={() => actions.handleAction(question.comId, edit)}
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
                                        <div className="text-sm">
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
                                                        actions.onDelete(question.comId, parentId)
                                                        close()
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className='button'
                                                    style={modalDelBtn}
                                                    onClick={() => {
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
            </div> </>}
        </div>
    )
}

export default Question