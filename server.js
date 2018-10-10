// Set up
var express    = require('express');
var app        = express();                               // create our app w/ express
var mongoose   = require('mongoose');                     // mongoose for mongodb
var morgan     = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
// mongoose.connect('mongodb://localhost/reviewking');
// MongoDB:
    // DB: cargatubusqueda
    // Tabla : TipoInmueble
    // mongodb://<dbuser>:<dbpassword>@ds119820.mlab.com:19820/cargatubusqueda    
    // mongodb://carga:tubusqueda1@ds119820.mlab.com:19820/cargatubusqueda

mongoose.connect('mongodb://carga:tubusqueda1@ds119820.mlab.com:19820/cargatubusqueda');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
var tipoInmuebleSchema = new mongoose.Schema({
    item: String
});
                                   // --- Nombre del model en MongoDB, sin la 's' final ¿?
var TipoInmueble = mongoose.model('TipoInmueble', tipoInmuebleSchema);

// Routes

    // Get reviews
    app.get('/api/tiposInmueble', function(req, res) {

        console.log("Trayendo tipos de inmueble");

        // use mongoose to get all reviews in the database
        TipoInmueble.find({}, function(err, data) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(data); // return all reviews in JSON format
        });
    });

    /* 
    // create review and send back all reviews after creation
    app.post('/api/tiposInmueble', function(req, res) {

        console.log("Creando tipo de inmueble");

        // create a review, information comes from request from Ionic
        Review.create({
            id: req.body.id,            
            descripcion : req.body.descripcion,            
        }, function(err, review) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            TipoInmueble.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });

    });

    // delete a review
    app.delete('/api/reviews/:review_id', function(req, res) {
        Review.remove({
            _id : req.params.review_id
        }, function(err, review) {

        });
    });

*/

// listen (start app with node server.js) ======================================

// const PORT = process.env.PORT || 8080; // lo que valga process.env.PORT o, si es nulo, 8080
process.env.PORT = 8080;
const PORT = process.env.PORT;
app.listen(PORT);
// console.log(process.env); // Todas las variables de entorno
console.log('Variable de entorno PORT es:', process.env.PORT);
console.log("App escuchando en puerto ", PORT);