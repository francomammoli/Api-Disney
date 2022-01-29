const express = require ("express");
const app = express();
const morgan = require('morgan');

const key = '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';
//require api rutes
const usersApi = require('./routes/usersApi');
const personajesApiRouter = require('./routes/charactersApi');
const peliculasApiRouter = require('./routes/moviesApi');

//settings
app.set('port',process.env.PORT || 3000);
app.set('json spaces', 2);

//volvemos accesible la capeta public para todo el proyecto
app.use(express.static('public'));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes Api
app.use('/api/auth',usersApi);
app.use('/api/characters',personajesApiRouter);
app.use('/api/movies',peliculasApiRouter);

//catch 404 and forward to error handler
app.use((req,res,next)=>{
    res.status(404);
});

//starting the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});