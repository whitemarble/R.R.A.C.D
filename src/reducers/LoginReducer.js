const initialState = {
    token:"",
}

const LoginReducer = (state=initialState,action)=>{
    switch(action.type)
    {
        case 'C':
        if(action.payload.data === undefined)
            return {
                token: "",
                message: "NoResponse",
                loading:false
            };
        else{
            if(action.payload.data.code === 200)
                return {
                    token: action.payload.data.token,
                    message: "Success",
                    loading:false
                };
            else
                return {
                    token: "",
                    message: "Incorrect",
                    loading:false
                };
        }
            
        default:
        return state;
    }
    
}

export default LoginReducer