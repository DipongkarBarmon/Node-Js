

async function handleUploadFile(req,res) {
     console.log(req.body)
     console.log(req.file);
}


module.exports={
  handleUploadFile,
}