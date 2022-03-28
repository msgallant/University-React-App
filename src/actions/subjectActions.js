import { ADD_SUBJECT, DELETE_SUBJECT, FETCH_SUBJECT}  from './types'
import useFetch from "../actions-methods/useFetch";
import useCreate from "../actions-methods/useCreate";
import useDelete from "../actions-methods/useDelete";

const serverURL = 'http://localhost:5000/Subjects'

export const FetchSubjects = () => {
  useFetch(serverURL, FETCH_SUBJECT)
  }

  export const CreateSubject = (subjectData) => {
    useCreate(subjectData, serverURL, ADD_SUBJECT)
}
export const DeleteSubject = (id) => {
  useDelete(id, serverURL, DELETE_SUBJECT)
}
