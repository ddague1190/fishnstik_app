import React, { createContext, useEffect, useState, useReducer } from 'react'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../../redux/actions/userActions"
import axiosInstance from "../../../redux/axiosInstance"
import { addComment, editComment, deleteComment } from "../../../redux/actions/commentsActions"
import { useParams } from "react-router"
import QASection from "../../productpresentation/QASection"

export const ActionContext = createContext()

export const QASectionActionProvider = ({ currentUser, _comments }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [replies, setReplies] = useState([])
  const [editArr, setEdit] = useState([])

  const reducer = (state, action) => {
    switch (action.type) {
      case 'EDIT_QUESTION':
        const newList = state
        const index = newList.findIndex((comment) => comment.comId === action.parentId)
        newList[index] = action.text
        dispatch(editComment(action.id, action.text));
        return newList
      case 'EDIT_ANSWER':
        return ''
      case 'POST_QUESTION':
        return ''
      case 'POST_ANSWER':
        return ''
      default:
        return state
    }
  }

  const [comments, dispatchQASectionActions] = useReducer(reducer, _comments)

  return (
    <ActionContext.Provider
      value={{
        userImg: currentUser && currentUser.avatarUrl,
        userId: currentUser && currentUser.name,
        comments: comments,
        dispatch: dispatchQASectionActions
      }}
    >
      <QASection />
    </ActionContext.Provider>
  )
}