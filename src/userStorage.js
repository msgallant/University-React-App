

const userStorage = () => {

}

export const getUserLoggedIn = (accs) => {

    console.log("this is where we need to find the loged in user")
        let studentAcc = null
        accs.forEach(acc => {
            if (acc.accountType === "Student Account")
            {   
                studentAcc = acc
                return acc
            }
        })

        return studentAcc
}