import rp from 'axios';

const checktoken = async (token)=>{
    let result = await rp.get("http://localhost:443/tokencheck/"+token);
    if(result.status !== 200)
        return false;
    if(result.data.code === 200)
        return true;
    else return false;
}

export default checktoken;