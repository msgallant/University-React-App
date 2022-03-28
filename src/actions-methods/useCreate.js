import { bindActionCreators } from "redux";
import { genericActionCreators } from "../actions";
import { useEffect } from "react";
import { CreateDispatch } from "./CreateDispatch";
const useCreate = (objData, serverURL, actionType) => {
    let dispatch = CreateDispatch()
    let method = GetCreateObj(dispatch)
    

    useEffect(() => {
        method(objData, serverURL, actionType)
    }, [])
}

const GetCreateObj= (dispatch) => {
    const { createObj } = bindActionCreators(genericActionCreators, dispatch)
    return createObj
}

export default useCreate