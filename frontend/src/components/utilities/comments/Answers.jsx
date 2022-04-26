import React, { useContext } from 'react'
import { ActionContext } from "./ActionContext"
import InputField from "./InputField"
import Input from "./Input";
import SignField from "./SignField";


const Answers = ({ answers, parent }) => {
    const actions = useContext(ActionContext)
    if (!answers) {
        return ''
    }
    return (
        <div>
            {answers.length > 0 ?
                answers.map((a, index) => (
                    <div key={a.comId}>
                        {actions.editArr.filter((id) => id === a.comId).length !==
                            0 ?
                            <InputField
                                cancellor={a.comId}
                                value={a.text}
                                edit
                                parentId={a.comId}
                            />

                            : (
                                <p>{a.text}</p>
                                // <CommentStructure
                                //     i={a}
                                //     index={index}
                                //     reply
                                //     parentId={i.comId}
                                //     handleEdit={() => actions.handleAction}
                                // />
                            )}
                        {actions.replies.filter((id) => id === a.comId).length !==
                            0 &&

                            <InputField
                                cancellor={a.comId}
                                parentId={a.comId}
                                child
                            />
                        }
                    </div>
                ))
                :
                !actions.currentUser ? <SignField /> : <Input placeholder='Have an answer for this question?'/>

                
            }
        </div>
    )
}

export default Answers