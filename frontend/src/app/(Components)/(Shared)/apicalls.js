const postReq = async(url,obj) =>{
    let response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    response = await response.json();
    return response;
}
const getReqNote = async(url,token) =>{
    let response = await fetch(url,{
        method:'GET',
        headers:{
            'auth-token':token
        }
    })
    response = await response.json();
    console.log(response);
    return response;
}
const getAllNote = async(url) =>{
    let response = await fetch(url,{
        method:'GET',
    })
    response = await response.json();
    console.log(response);
    return response;
}
const delReq = async(url,obj) =>{
    let response = await fetch(url,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    response = await response.json();
    console.log(response);
    return response;
}


const addReq = async(url,token,obj) =>{
    let response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':token
        },
        body:JSON.stringify(obj)
    })
    response = await response.json();
    console.log(response);
    return response;
}
const updateReq = async(url,obj) =>{
    let response = await fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(obj)
    })
    response = await response.json();
    console.log(response);
    return response;
}

module.exports = {postReq,getReqNote,delReq,addReq,updateReq}