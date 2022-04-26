import React, { createContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../../redux/actions/userActions"
import axiosInstance from "../../../redux/axiosInstance"
import { addComment, editComment, deleteComment } from "../../../redux/actions/commentsActions"
import { useParams } from "react-router"

export const ActionContext = createContext()
export const ActionProvider = ({
  children,
  currentUser,
  comments,
}) => {


  const { id } = useParams()
  const dispatch = useDispatch()
  const { user: { username='' } } = useSelector(state => state.userDetails);

  // useEffect(() => {
  //   if (!username) {
  //     // dispatch(getUserDetails())
  //   }
  // }, [])


  const [replies, setReplies] = useState([])
  const [user, setUser] = useState()
  const [editArr, setEdit] = useState([])

  useEffect(() => {
    if (currentUser) {
      setUser(true)
    } else {
      setUser(false)
    }
  })

  const handleAction = (id, edit) => {
    edit ? setEdit([...editArr, id]) : setReplies([...replies, id])
  }
  const handleCancel = (id, edit) => {
    if (edit) {
      const list = [...editArr]
      const newList = list.filter((i) => i !== id)
      setEdit(newList)
    } else if (!edit) {
      const list = [...replies]
      const newList = list.filter((i) => i !== id)
      setReplies(newList)
    }
  }

  const onSubmit = (text, parentId, child) => {
    if (text.length > 0) {
      if (!parentId && !child) {
        const newComment = {
          userId: username,
          text: text
        }

        dispatch(addComment(id, { ...newComment, parent: parentId }));
      } else if (parentId && child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const newComment = {

          userId: username,
          text: text,
        }
        newList[index].replies.push(newComment)
        dispatch(addComment(id, { ...newComment, parent: parentId }))
      } else if (parentId && !child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const newReplies =
          newList[index].replies === undefined
            ? []
            : [...newList[index].replies]
        const newComment = {
          userId: username,
          text: text
        }
        newReplies.push(newComment)
        newList[index].replies = newReplies
        dispatch(addComment(id, { ...newComment, parent: parentId }))
      }
    }
  }

  const editText = (id, text, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === id)
      newList[index].text = text
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const replyIndex = newList[index].replies.findIndex((i) => i.comId === id)
      newList[index].replies[replyIndex].text = text
    }
    dispatch(editComment({ id, text }))
  }

  const deleteText = (id, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const filter = newList.filter((x) => x.comId !== id)

    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const filter = newList[index].replies.filter((x) => x.comId !== id)
      newList[index].replies = filter
    }
    dispatch(deleteComment(id))
  }

  const submit = (cancellor, text, parentId, edit, setText, child) => {

    if (edit) {
      editText(cancellor, text, parentId)
      handleCancel(cancellor, edit)
      setText('')
    } else {
      onSubmit(text, parentId, child)
      handleCancel(cancellor)
      setText('')
    }
  }

  return (
    <ActionContext.Provider
      value={{
        onSubmit: onSubmit,
        userImg: currentUser && currentUser.avatarUrl,
        userId: currentUser && username,
        handleAction: handleAction,
        handleCancel: handleCancel,
        replies: replies,
        setReplies: setReplies,
        editArr: editArr,
        onEdit: editText,
        onDelete: deleteText,
        user: user,
        submit: submit
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}