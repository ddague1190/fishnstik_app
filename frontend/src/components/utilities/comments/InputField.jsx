import React, { useContext, useState, useEffect } from 'react'
import styles from './Style.scss'
import { ActionContext } from './ActionContext'

const InputField = ({ cancellor, parentId, child, value, edit, main, placeholder, setEdit }) => {
  const [text, setText] = useState('')
  const actions = useContext(ActionContext)
  return (
    <form
      className="p-2 flex items-center w-full bg-gray-100 pb-5 border-r-8 max-w-2xl text-center"
      style={
        !child && !edit && main === undefined
          ? { marginLeft: 36 }
          : { marginLeft: 8 }
      }
    >
      <figure className="w-20 ">
        {actions.userImg ?
          <img
            src={actions.userImg}
            style={{ width: 38, height: 38, borderRadius: 38 / 2 }}
            alt='userIcon'
          /> :
          <i className="fa-solid fa-user"></i>
        }
      </figure>
      <input
        maxLength={100}
        className="w-full h-10 border-none border-b-[1] bg-transparent ml-1 focus:outline-none focus:border-b-2 focus:border-b-black"
        type='text'
        placeholder={placeholder}
        component='input'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end mt-5 ml-3 gap-2">
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={(e) => {
            setEdit(false)
            if (edit === true) { actions.submit(cancellor, text, parentId, true, setText) }
            else actions.submit(cancellor, text, parentId, false, setText)
          }
          }
          type='button'
          disabled={!text}
          style={
            !text
              ? { backgroundColor: 'blue' }
              : { backgroundColor: '#30c3fd' }
          }
        >
          Post
        </button>
        {(text || parentId) && (
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              setEdit(false)
              if (edit === true) { actions.submit(cancellor, text, parentId, true, setText) }
              else actions.submit(cancellor, text, parentId, false, setText)
            }
            }
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default InputField