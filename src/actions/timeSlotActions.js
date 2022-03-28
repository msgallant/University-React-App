import { FETCH_TIME_SLOTS, DELETE_TIME_SLOT, ADD_TIME_SLOT } from "./types"
import useFetch from "../actions-methods/useFetch";
import useCreate from "../actions-methods/useCreate";
import useDelete from "../actions-methods/useDelete";
const serverURL = 'http://localhost:5000/TimeSlots'

export const FetchTimeSlots = () => {
  useFetch(serverURL, FETCH_TIME_SLOTS)
  }
export const CreateTimeSlot = (objData) => {
  useCreate(objData, serverURL, ADD_TIME_SLOT)
    
}

export const DeleteTimeSlot = (id) => {
  useDelete(id, serverURL, DELETE_TIME_SLOT)
}