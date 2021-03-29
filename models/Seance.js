const mongoose=require('mongoose');
const joi =require('joi');
const seanceSchema=new mongoose.Schema({
    date:  Date,
    temps: String,
    placeDispo: Number 
});

const Seance=mongoose.model('seance',seanceSchema);

let seance_validation_schema={
    date: joi.date().required() ,
    temps:  joi.string().required(),
    placeDispo: joi.number().min(10).max(20)

}
function validate_seance(body){
   return joi.validate(body,seance_validation_schema);
}



let seance_validation_schema_update={
    date: joi.date(),
    temps:  joi.string(),
    placeDispo: joi.number() 
}
function validate_update_seance(body){
  return joi.validate(body,seance_validation_schema_update);
}

module.exports.validate_seance=validate_seance;
module.exports.validate_update_seance=validate_update_seance;
module.exports.Seance=Seance;