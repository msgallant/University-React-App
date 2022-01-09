//account types
//are "Admin Account", "Professor Account", "Student Account", pageNames involving accounts name determines what the account
//type is and shouldn't be changed

//admin menu bar page names
export const pageNames = [" Create Admin Account", " View Admin Accounts", " Create Professor Account", " View Professor Accounts",
                        " Create Student Account", " View Student Accounts", " Create Subject", " View Subjects", 
                        " Create Building", " View Buildings", " Create Time Slot", " View Time Slots",
                        " Create Course", " View Courses", " Create Course for the Semester", " View Courses for the Semester",
                        //student menu bar page names start here
                        " Search for Courses", " View Class Schedule", " View Transcript"]

                        //menu bar prefixes
export const pageNamesPrefixes = [" Create ", " View ", 
                                " Search "]

                                //admin suffixes (course is both for admin & student)
export const pageNamesSuffixes = ["Account", "Subject", "Building", "Time Slot", "Course", "Semester",
                                //student menu bar suffixes
                                "Class Schedule", "Transcript"]