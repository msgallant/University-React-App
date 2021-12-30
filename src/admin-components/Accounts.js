import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../actions";

const Accounts = () => {
    const dispatch = useDispatch()
    const { fetchAccounts } = bindActionCreators(actionCreators, dispatch)
    const accounts = fetchAccounts()
}