const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/DsNodeJs-db',
{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('mongo is up'))
.catch((err)=>console.log('mongo is down. raison:',err));
