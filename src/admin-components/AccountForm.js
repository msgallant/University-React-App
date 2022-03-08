import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { accountActionCreators } from "../actions";
import PropTypes from 'prop-types'
import { account } from "./account";
import { createUniqueDefaultEmail, isEmailUnique } from "./accountDefaultEmailLogic";
import { useEffect } from 'react'


const AccountForm = ({accType, onComplete}) => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()
    const { CreateAccount, fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)

    const allAccounts = useSelector(state => state.accounts.items)

    useEffect(() => {
        fetchAccounts()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!firstName) {
            alert('First name is missing')
            return
        }
        if (!lastName) {
            alert('Last name is missing')
            return
        }

        if (!checkIfNamesValid() || !checkIfEmailValid()) //these methods send their own alert
        {
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
        if (!isEmailUnique(email, allAccounts)) {
            alert('Email already taken')
            return
        }

        account.accountType = accType
        account.firstName = firstName
        account.middleName = middleName
        account.lastName = lastName
        account.email = email
        account.password = password
        account.id = email
        
        CreateAccount(account)
        onComplete()
    }

    const checkIfEmailValid = () => {
        const msg = checkIfParensUsed(email, "email")
        if (msg !== 'valid') //if it doesn't contain '(' or ')'
        {
            alert(msg)
            setEmail('')
            return false
        }
        return true
    }

    const checkIfNamesValid = () => {
        const names = [firstName, middleName, lastName]
        const namesPlacement = ["firstName", "middleName", "lastName"]
        const nameSetters = [setFirstName, setMiddleName, setLastName]
        let msg = ''
        let valid = true

        names.forEach((name, index )=> {
            msg = checkIfParensUsed(name, namesPlacement[index])
            if (msg !== 'valid')
            {
                nameSetters[index]('')
                valid = false
                alert(msg)
            }
        })
        return valid
    }

    //first name, middle name and last name and email can not contain parenthesis since parenthesis
    //are used in another part of the program to identify professor's, whose teaching a 
    //semester course, email
    const checkIfParensUsed = (name, namePlacement) => { //namePlacement is "firstName", "middleName" or "lastName", name is actually their name
        let msg = 'valid'
        name.split("").forEach(letter => {
            if (letter === '(' || letter === ')')
            {
                msg = "Invalid symbol: " + letter + " in " + namePlacement
                return msg
            }
        })
        return msg
    }

    const setUniqueDefaultEmail = () => {
        if (firstName === '' || lastName === '')
        {
            alert('First name and last name must be filled out before generating a default email.')
            return
        }
        account.firstName = firstName
        account.middleName = middleName
        account.lastName = lastName
        setEmail(createUniqueDefaultEmail(account, allAccounts))
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
                <label>Password: </label>
                <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />  
            </div>

            <div>
                <label>Email: </label>
                <input
                    type='text'
                    placeholder='...@uni.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label> &nbsp; </label>

                <button type="button" onClick={setUniqueDefaultEmail}>Generate Default Email</button>
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