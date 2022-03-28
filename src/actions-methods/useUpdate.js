import { bindActionCreators } from "redux";
import { genericActionCreators } from "../actions";
import { useEffect } from "react";
import { CreateDispatch } from "./CreateDispatch";
const useUpdate = (objData, serverURL, actionType) => {
    let dispatch = CreateDispatch()
    let method = GetUpdateObj(dispatch)
    

    useEffect(() => {
        method(objData, serverURL, actionType)
    }, [])
}

const GetUpdateObj= (dispatch) => {
    const { updateObj } = bindActionCreators(genericActionCreators, dispatch)
    return updateObj
}

export default useUpdate