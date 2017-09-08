import rp from 'axios'


export const loginClicked = (user,pass)=>{
    return{
        type:'C',
        payload:rp.post('http://anfawechat.azurewebsites.net/login',{username:user,password:pass})
    }
}