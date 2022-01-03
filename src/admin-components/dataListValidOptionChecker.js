//this checks is userInputData (string) matches data which is an array of strings
export const dataListValidOptionChecker = (data, userInputData) => {
    let isValidObj = false

        data.some(validData => {
            if (userInputData === validData)
            {
                isValidObj = true
            }
        })

        return isValidObj
}

//this checks is userInputData (string) matches objData which is an array of objects which all have .name which is a string
export const dataListValidOptionObjectNameChecker = (objData, userInputData) => {
    const data = objData.map(obj => {
        return obj.name
    })
    return dataListValidOptionChecker(data, userInputData)
}