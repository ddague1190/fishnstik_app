import React, { useEffect, useState } from 'react'
import './Style.scss'
import DisplayComments from './DisplayComments'
import { ActionProvider } from './ActionContext'
import SignField from './SignField'
import Input from './Input'

export const CommentSection = ({
  commentsArray,
  currentUser,
  setComment,
  signinUrl,
  signupUrl,
  customInput
}) => {
  const [comments, setComments] = useState(commentsArray)
  useEffect(() => {
    setComments(commentsArray)
  }, [commentsArray])

  return (
    <ActionProvider
      currentUser={currentUser}
      setComment={setComment}
      comments={comments}
      signinUrl={signinUrl}
      signupUrl={signupUrl}
      customInput={customInput}
    >
      <div className="ring-1 ring-gray-400 mt-8 flex flex-col w-full">
      <h2 className="text-md ml-6 mb-6 font-medium text-gray-900">Product discussion board</h2>
        <div className="w-full">
          {signupUrl && !currentUser ? <SignField /> : <Input />}
        </div>
        <div className=" w-full mt-4 p-2">
          <DisplayComments comments={comments} />
        </div>
      </div>
    </ActionProvider>
  )
}