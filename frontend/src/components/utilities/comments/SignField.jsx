import React, { useContext } from 'react'
import styles from './Style.scss'
import { ActionContext } from './ActionContext'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router"

const SignField = () => {
  const actions = useContext(ActionContext)
  const navigate = useNavigate()
  const productId = useParams();

  const loginAndComeBack = () => {
    navigate(`/login?redirect=/product/${productId.id}`);
  };
  const registerAndComeBack = () => {
    navigate(`/login?redirect=/product/${productId.id}`);
  };

  return (
    <div className="bg-gray-50 h-20 flex items-center justify-center">
      <div className="mt-1 text-gray-500 text-sm">

        <button className="px-1 font-semibold outline-none border-transparent" onClick={loginAndComeBack}>
        Log in
        </button>
        
        or 
        
        <button className="px-1 font-semibold outline-none border-transparent" onClick={registerAndComeBack}>
        Register
        </button>
        to join discussion

      </div>

    </div>
  )
}

export default SignField