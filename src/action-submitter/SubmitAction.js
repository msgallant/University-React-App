import { UpdateAccount } from "../actions/accountActions";
import { CreateSemesterCourse, UpdateSemesterCourse } from "../actions/semesterCourseActions";
import { UpdateUniqueSemesterCourseID } from "../actions/uniqueSemesterCourseIDActions";
const SubmitAction = ({onComplete, ActionMethod, data, multipleData}) => {
    if (multipleData === true) //more than 1 objs do we need to update?
    {
        if (data.updAcc != null)
        {
            UpdateAccount(data.updAcc)
            console.log("updating acc")
        }
        
        if (data.createSemCourse != null)
        {
            CreateSemesterCourse(data.createSemCourse)
            console.log("updating course")
        }
        
        if (data.updUniqueSemesterID != null)
        {
            UpdateUniqueSemesterCourseID(data.updUniqueSemesterID)
            console.log("updating semester id")
        }
        if (data.updSemCourses != null) //may be more than 1 sem course to update
        {
            data.updSemCourses.forEach(course => {
                UpdateSemesterCourse(course)
            })
            console.log("updating semester courses")
        }
        
    }
    else
    {
        ActionMethod(data)
        console.log("updating server")
    }
    
    onComplete()


    return (
        <div></div>
    )

}


export default SubmitAction