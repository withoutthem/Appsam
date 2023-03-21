
const addProduct = async (req, res) => {
  try{
    console.log(req.body);
    res.send({stat:true, message:'성공해써요'})
  }
  catch(e){

  }
}

module.exports = {addProduct};