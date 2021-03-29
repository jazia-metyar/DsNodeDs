require('./db');
const express=require('express');
const port=process.env.PORT||3000;
const app=express(); 
app.use(express.json());
const film_router=require('./routers/Films');
const seance_router=require('./routers/Seances');

app.use('/api/films',film_router);
app.use('/api/seances',seance_router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  }); 