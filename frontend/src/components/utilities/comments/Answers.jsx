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

    const colors = [
        'red',
        'gray',
        'green',
        'purple',
        'yellow',
        'pink',
    ]
    return (
        <div className="flex py-2">
            <span className="text-2xl w-20 font-extrabold">A:</span>




            <div className="w-full">

                {answers.map((a, index) => (
                    <div key={a.comId}>
                        {/* {actions.editArr.filter((id) => id === a.comId).length !==
                        0 ?
                        <InputField
                            cancellor={a.comId}
                            value={a.text}
                            edit
                            parentId={a.comId}
                        />

                        : ( */}

                        <div className="">
                            <p className="w-full text-black">{a.text}</p>
                            <div className="flex items-center gap-2 -mt-1">
                                <span className="text-xs">posted by</span>
                                <div className="bg-white rounded-md w-max flex gap-2 items-center">
                                    <div className="flex ml-2 text-black text-xs ">{a.fullName} </div>

                                    <div>
                                        {a.avatarUrl ?
                                            <img
                                                src={a.avatarUrl}
                                                style={{ width: 20, height: 20, borderRadius: 24 / 2 }}
                                                alt='userIcon'
                                            /> :
                                            <i style={{ backgroundColor: colors[index] }}
                                                className="fa-solid fa-user text-xs rounded-full w-6 flex items-center justify-center h-6"></i>
                                        }
                                    </div>
                                </div>
                                <span className="text-xs">on</span>

                                <time className="text-xs text-black" dateTime={a.createdAt}>{a.createdAt.slice(0, 10)}</time>
                            </div>



                        </div>

                    </div>
                ))}
                <br/>

            </div>

        </div>
    )
}

export default Answers