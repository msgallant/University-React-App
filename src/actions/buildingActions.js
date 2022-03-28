import { ADD_BUILDING, DELETE_BUILDING, FETCH_BUILDINGS, UPDATE_BUILDING}  from './types'
import useFetch from "../actions-methods/useFetch";
import useCreate from "../actions-methods/useCreate";
import useDelete from "../actions-methods/useDelete";
import useUpdate from "../actions-methods/useUpdate";
const serverURL = 'http://localhost:5000/Buildings'


export const FetchBuildings = () => {
  useFetch(serverURL, FETCH_BUILDINGS)
}

export const CreateBuilding = (objData) => {
  useCreate(objData, serverURL, ADD_BUILDING)
}

export const DeleteBuilding = (id) => {
  useDelete(id, serverURL, DELETE_BUILDING)
}

export const UpdateBuilding = (bldg) => {
  useUpdate(bldg, serverURL, UPDATE_BUILDING)
}

