import  UnauthenticatedError  from "../errors/Unauthedicated.js";



const checkPermissions = (requestUser,resourceUserId) => {
    console.log(requestUser.userId)
    console.log(resourceUserId.toString())
    if(requestUser.userId === resourceUserId.toString()) return 

    throw new UnauthenticatedError('not authorized to access')
    
}

export default checkPermissions