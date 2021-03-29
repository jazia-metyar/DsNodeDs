const router=require('express').Router();
const {Film,validate_film,validate_update_film}=require('../models/Film');
const _=require('lodash');  
const Seance=require('../models/Seance');

router.get('',async(req,res)=>{

    res.send(await Film.find());

});


router.get('/:id',async(req,res)=>{

   let film= await Film.findById(req.params.id)
                        .populate('seances.id');
                          
   res.send(film);             
});



router.post('',async(req,res)=>{
   let validation=validate_film(req.body);
   if(validation.error)
         return res.status(400).send(validation.error.details[0].message);


req.body.seances.forEach(async(s) => {
    let seance=await Seance.findById(s.id);
    if(!seance) 
          return res.status(400).send("seance id is not found");
s.placeDispo=s.placeDispo-1;  
});
     


    let film =new Film(_.pick(req.body,'nom','seances','acteurs'));
    try {
        res.send(await film.save());
    } catch (error) {
        res.status(400).send("save in db eroor : "+error.message);
    }
  return  res.send(film);
});



router.put('/:id',async(req,res)=>{
    let validation=validate_update_film(req.body);
    if(validation.error)
          return res.status(400).send(validation.error.details[0].message);
 
    let film=await Film.findById(req.params.id);
    film=_.merge(film , req.body);
    film=await film.save();
    res.send(film); 
});


router.delete('/:id',async(req,res)=>{


   let film=await Film.findById(req.params.id);

   await Film.deleteOne({_id:req.params.id});
    res.send(film);
});

module.exports=router;