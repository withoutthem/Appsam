
const idValExp = /^[a-zA-Z0-9]{5,15}$/
const psValExp = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{5,15}$/
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const nameExp = /^[a-zA-Z0-9가-힣]{3,15}$/

const validation = (type, value)=>{
    // validation 
    switch(type){
        case 'id':
            if(idValExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'ps':
            if(psValExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'name':
            if(nameExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'email':
            if(emailExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'aors':
            return true
        default :
            console.log('Error!')
    }
}

export {validation}