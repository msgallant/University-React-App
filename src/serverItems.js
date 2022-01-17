
import { accountActionCreators } from "./actions"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect} from 'react'

export const GetAccounts = ({wantedServerItems}) => {

    const dispatch = useDispatch()
    const { fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)
    const accs = useSelector(state => state.accounts.items)

    useEffect(() => {
        fetchAccounts()
    }, [])

    return (
        <div>
            {accs != null && accs.length !== 0 &&
            wantedServerItems(accs)}
        </div>
    )
}