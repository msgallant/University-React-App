export const createUniqueDefaultEmail = (account, allAccounts) => {
    const defaultEmailSuffix = "@uni.com"
    const emailPrefix = account.firstName.substring(0,1) + account.middleName.substring(0,1) + account.lastName

    return findUniqueDefaultEmail(emailPrefix, defaultEmailSuffix, allAccounts)   

}

//if there are emails with the same email prefix, must add a number to it so it becomes unique
const findUniqueDefaultEmail = (emailPrefix, emailSuffix, allAccounts) => {
    //similar emails would be like ABCarter@uni.com, ABCarter1@uni.com, etc
    const similarEmailAccs = allAccounts.filter(acc => 
        (acc.email.substring(0,emailPrefix.length) === emailPrefix))

    
    
    if (similarEmailAccs === 0)
    {
        return emailPrefix + emailSuffix
    }
    else 
    {
        let validEmail = false
        let similarEmailPrefixID = 0
        let newEmailPrefix = emailPrefix
        let newEmail = newEmailPrefix + emailSuffix
        

        while (!validEmail)
        {
            validEmail = isEmailUnique(newEmail, similarEmailAccs)

            if (validEmail === false) //not valid email, add number to prefix and then loop to see 
            //if it is unique
            {
                similarEmailPrefixID++
                newEmailPrefix = emailPrefix + similarEmailPrefixID
                newEmail = newEmailPrefix + emailSuffix
            }
        }
        
        return newEmail

    }
}

export const isEmailUnique = (newEmail, existingAccs) => {
    let validEmail = true
            
    existingAccs.forEach(acc => {
        if (acc.email === newEmail)
        {
            validEmail = false
        }
    })

    return validEmail

}

