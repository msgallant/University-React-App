import { useState } from 'react'
import { useSelector } from "react-redux";
import { FetchAccounts } from "../actions/accountActions";

const SignIn = ({ onAccountRecieved }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const accounts = useSelector(state => state.accounts.items)

    FetchAccounts()

    const onSubmit = (e) => {
        e.preventDefault()
        let accountExists = false
        accounts.forEach(account => {
            if (account.email === email) //account exists
            {
                accountExists = true
                if (account.password === password)
                {
                    onAccountRecieved(account)
                }
                else{
                    alert('Your password is incorrect')
                    return
                }
                
            }
            
        })
        if (!accountExists)
        {
                alert('No account with this email address exists')
                return
        }
    }

    return (
        <form className='plain-border' onSubmit={onSubmit}>
            <br></br>
            <div>
                <label className='form-title-size'>Sign in</label>
            </div>
            <br></br>
                <input className='form-font-size'
                    type='text'
                    value={email}
                    placeholder={"Email"}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                <br></br> <br></br>
                <input className='form-font-size'
                    type='text'
                    value={password}
                    placeholder={"Password"}
                    onChange={(e) => setPassword(e.target.value)}
                    /> 
            <div >
                <br></br>
                <input className='form-font-size form-btn' type='submit' value='Sign in' />
            </div>
        </form>
    )
}

export default SignIn