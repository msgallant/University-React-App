import { bindActionCreators } from "redux";
import { genericActionCreators } from "../actions";
import { useEffect } from "react";
import { CreateDispatch } from "./CreateDispatch";
const useDelete = (id, serverURL, actionType) => {
    let dispatch = CreateDispatch()
    let method = GetDeleteObj(dispatch)
    

    useEffect(() => {
        method(id, serverURL, actionType)
    }, [])
}

const GetDeleteObj= (dispatch) => {
    const { deleteObj } = bindActionCreators(genericActionCreators, dispatch)
    return deleteObj
}

export default useDelete