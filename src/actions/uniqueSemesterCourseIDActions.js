import { UPDATE_UNIQUE_SEMESTER_COURSE_ID, FETCH_UNIQUE_SEMESTER_COURSE_ID} from "./types";
import useFetch from "../actions-methods/useFetch";
import useUpdate from "../actions-methods/useUpdate";

const serverURL = 'http://localhost:5000/UniqueSemesterCourseID'


export const FetchUniqueSemesterCourseID = () => {
  useFetch(serverURL, FETCH_UNIQUE_SEMESTER_COURSE_ID)
  }

  export const UpdateUniqueSemesterCourseID = (nextID) => {
    useUpdate(nextID, serverURL, UPDATE_UNIQUE_SEMESTER_COURSE_ID)
    //updateMethod(nextID, serverURL, UPDATE_UNIQUE_SEMESTER_COURSE_ID)

  }


