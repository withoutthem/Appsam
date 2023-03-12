import axios from "axios";

const tracking = ()=>{
    axios.get('/api/tracking')
    .then(result => console.log(result))
}

export {tracking}; 