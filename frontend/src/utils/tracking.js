import axios from "axios";

const tracking = ()=>{
    axios.get('/api/tracking/firstsession')
    .then(result => console.log(result))
}

export {tracking}; 