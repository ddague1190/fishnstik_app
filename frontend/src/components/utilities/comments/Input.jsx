
import React, { useContext } from 'react'
import InputField from './InputField'
import { ActionContext } from './QASectionActionContext.jsx'

const Input = ({placeholder, parentId}) => {
  const action = useContext(ActionContext)
  return (
    <InputField authorImg={action.userImg} main placeholder={placeholder} parentId={parentId} />
  )
}

export default Input