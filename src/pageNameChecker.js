export const checkPrefix = (prefix, fullPageName) => {
    if (prefix === fullPageName.substring(0, prefix.length))
    {
        return true
    } 
    return false
}

export const checkSuffix = (suffix, fullPageName) => {
    const num = fullPageName.length - suffix.length
    if (suffix === fullPageName.substring(num) )
    {
        return true
    }
    if (suffix.concat("s") === fullPageName.substring(num-1))
    {
        return true
    }
    return false
}