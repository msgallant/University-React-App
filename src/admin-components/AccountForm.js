import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../actions";
import PropTypes from 'prop-types'
import { newAccount } from "./newAccount";


const AccountForm = ({accType, onComplete}) => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()
    const { CreateAccount } = bindActionCreators(actionCreators, dispatch)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!firstName) {
            alert('First name is missing')
            return
        }
        if (!email) {
            alert('Email is missing')
            return
        }
        if (!password) {
            alert('Password is missing')
            return
        }

        newAccount.accountType = accType
        newAccount.firstName = firstName
        newAccount.middleName = middleName
        newAccount.lastName = lastName
        newAccount.email = email
        newAccount.password = password
        newAccount.id = email
        
        CreateAccount(newAccount)
        onComplete()
    }
    
    return (
        <form onSubmit={onSubmit}> 

            <div>
                <label>Account type: {accType} </label>
            </div>
            <div>
                <label>First name: </label>
                <input
                type='text'
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            
            <div>
                <label>Middle name: </label>
                <input
                type='text'
                placeholder='Middle name'
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                />
            </div>
            
            <div>
                <label>Last name: </label>
                <input
                type='text'
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            
            <div>
                <label>Email: </label>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>
                <label>Password: </label>
                <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />  
            </div>

            <div>
                <input type='submit' value='Create Account' />
            </div>
       
        
        </form>

        
    )
}

AccountForm.propTypes = {
    accType: PropTypes.string.isRequired,
    newAccount: PropTypes.object
}



export default AccountForm