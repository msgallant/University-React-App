import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { accountActionCreators } from "../actions";

const SignIn = ({ onAccountRecieved }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)
    const accounts = useSelector(state => state.accounts.items)

    useEffect(() => {
        fetchAccounts()
    }, [])

    const onSubmit = () => {
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
        <form onSubmit={onSubmit}>
            <div>
                <label>Sign In</label>
            </div>
            <label>Email: </label>
            <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

            <label>Password: </label>
            <input
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            <div>
                <input type='submit' value='Sign In' />
            </div>
        </form>
    )
}

export default SignIn