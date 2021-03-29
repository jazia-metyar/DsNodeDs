const router=require('express').Router();
const {Senace,validate_seance,validate_update_seance, Seance}=require('../models/Seance');
const _=require('lodash');  
const { validate_update_film } = require('../models/Film');

router.get('',async(req,res)=>{
    res.send(await Seance.find());
});


router.get('/:id',async(req,res)=>{

   let film= await Seance.findById(req.params.id);
                          
   res.send(film);             
});



router.post('',async(req,res)=>{
   let validation=validate_seance(req.body);
   if(validation.error)
         return res.status(400).send(validation.error.details[0].message);
    
         let seance=new Seance(_.pick(req.body,'date','temps','placeDispo'));
    try {         
        res.send(await seance.save());
    } catch (error) {
        res.status(400).send("save in db eroor : "+error.message);
    }
    res.send(seance);
});




router.put('/:id',async(req,res)=>{
    let validation=validate_update_film(req.body);
    if(validation.error)
          return res.status(400).send(validation.error.details[0].message);
 
    let seance=await Seance.findById(req.params.id);
    seance=_.merge(seance , req.body);
    seance=await seance.save();
    res.send(seance); 
});


router.delete('/:id',async(req,res)=>{


   let seance=await Seance.findById(req.params.id);

   await Seance.deleteOne({_id:req.params.id});
    res.send(seance);
});

module.exports=router;