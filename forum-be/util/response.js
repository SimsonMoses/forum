

export const handleResponse = (res,status,message,data)=>{
    const response = {
        status,message,data
    }
    res.statusCode=status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}
// todo: error message