const mongoose=require('mongoose');
const joi =require('joi');
const { array } = require('joi');

const filmSchema=new mongoose.Schema({
    nom:String,
    seances:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'seance'}
             }],
    acteurs:[String]
   
    
});
const Film=mongoose.model('film',filmSchema);


let film_validation_schema={
      nom:joi.string().required(),
    seances:joi.array().items({
                                id:joi.string()
                              }).required(),
    acteurs:joi.array().items(joi.string().min(2).max(20)).required(),
}
 function validate_film(body){
     return joi.validate(body,film_validation_schema);
 }



 let film_validation_schema_update={
    nom:joi.string(),
    seances:joi.array().items({
                                id:joi.string()
                              }),
    acteurs:joi.array().items(joi.string().min(2).max(20)),
}
function validate_update_film(body){
    return joi.validate(body,film_validation_schema_update);
}

module.exports.Film=Film;
module.exports.validate_film=validate_film;
module.exports.validate_update_film=validate_update_film;