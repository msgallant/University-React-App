import { bindActionCreators } from "redux";
import { genericActionCreators } from "../actions";
import { useEffect } from "react";
import { CreateDispatch } from "./CreateDispatch";
const useFetch = (serverURL, actionType) => {
    let dispatch = CreateDispatch()
    let method = GetFetchObjs(dispatch)
    

    useEffect(() => {
        method(serverURL, actionType)
    }, [])
}

const GetFetchObjs = (dispatch) => {
    const { fetchObjs } = bindActionCreators(genericActionCreators, dispatch)
    return fetchObjs
}

export default useFetch