// Strategy Pattern
const idValExp = /^[a-zA-Z0-9]{5,15}$/
const psValExp = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{5,15}$/
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const nameExp = /^[a-zA-Z0-9가-힣]{3,15}$/

const validation = (type, value)=>{
    // validation 
    switch(type){
        case 'id': //id
            if(idValExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'ps': //ps
            if(psValExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'name': //name
            if(nameExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'email': //email
            if(emailExp.test(value)){
                return true
            }
            else{
                return false
            }
        case 'aors': //aors
            return true
        default :
            console.log('Error!')
    }
}

export {validation}