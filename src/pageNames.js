//account types
//are "Admin Account", "Professor Account", "Student Account", pageNames involving accounts name determines what the account
//type is and shouldn't be changed

//admin menu bar page names
export const pageNames = [" Create Admin Account", " View Admin Accounts", " Create Professor Account", " View Professor Accounts",
                        " Create Student Account", " View Student Accounts", " Create Subject", " View Subjects", 
                        " Create Building", " View Buildings", " Create Time Slot", " View Time Slots",
                        " Create Course", " View Courses", " Create Course for the Semester", " View Courses for the Semester",
                        //student menu bar page names start here (View Class Schedule is also used for professor menu bar)
                        " Search for Courses", " View Class Schedule", " View Transcript",
                    //Professor menu bar page names start here (view class schedule is also used in student menu bar)
                        " Assign Student Grades"]

                        //menu bar prefixes
export const pageNamesPrefixes = [" Create ", " View ", 
                                " Search ", " Assign "]

                                //admin suffixes (course is both for admin & student)
export const pageNamesSuffixes = ["Account", "Subject", "Building", "Time Slot", "Course", "Semester",
                                //student menu bar suffixes
                                "Class Schedule", "Transcript",
                            //professor menu bar suffixes (also use "Class Schedule" like student menu bar)
                                "Grades"]