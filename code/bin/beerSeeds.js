const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.public.env') });

const mongoose = require("mongoose");
const Beer = require("../models/Beer");

mongoose
  .connect(`mongodb://localhost/BEER-APP`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let beers = [
  {
    name: "Estrella Galicia Especial",
    description: "Cerveza de color dorado brillante que parte de una selección de maltas y lúpulo especialmente amargos y su proceso de cocción, fermentación, y maduración transcurre a lo largo  de más de 20 días. Ello hace que esta cerveza tenga un agradable y característico sabor lupulado",
    brewery: "5c10054245362b7fc29cb469",
    vol: "5,5%",
    ingredients: ["Agua", "Malta de cebada", "Maíz", "Lúpulo"],
    beertype: "Lager",
    fermentation: "",
    taste: "",
    maridaje: ["Quesos frescos", "Verduras y hortalizas frías", "Setas",  "Pescados blancos", "Carnes"],
    verified: true
  },
  {
    name: "Estrella de Navidad",
    description: "Los Maestros Cerveceros de Estrella Galicia modifican todos los años la receta de esta cerveza de temporada. Buscan materias primas diferentes y/o incorporan nuevas técnicas de elaboración para lograr una cerveza celebración diferente cada año",
    brewery: "5c10054245362b7fc29cb469",
    vol: "5,5%",
    ingredients: ["Agua", "Malta de cebada", "Lúpulo"],
    beertype: "Lager",
    fermentation: "",
    isSeasonal: true,
    taste: "",
    verified: true
  },
  {
    name: "1906",
    description: "La cerveza fortiña de los gallegos",
    brewery: "5c10054245362b7fc29cb469",
    vol: "5,5%",
    ingredients: ["Agua", "Malta de cebada", "Lúpulo"],
    beertype: "Lager",
    fermentation: "",
    taste: "",
    verified: true
  },
  {
    name: "Alhambra",
    description: "La cerveza de los andaluces",
    brewery: "5c10054245362b7fc29cb467",
    vol: "5,5%",
    ingredients: ["Agua", "Malta de cebada", "Lúpulo"],
    beertype: "Lager",
    fermentation: "",
    taste: "",
    verified: true
  },
  {
    name: "La Virgen Castañas",
    description: "La cerveza navideña de las rozas",
    brewery: "5c10054245362b7fc29cb46b",
    vol: "5,5%",
    ingredients: ["Agua", "Malta de cebada", "Lúpulo"],
    beertype: "Lager",
    isSeasonal: true,
    fermentation: "",
    taste: "",
    verified: true
  },
  {
    name: "Delirium Red",
    description: "La cerveza roja de los belgas",
    brewery: "5c10054245362b7fc29cb46c",
    vol: "5,5%",
    ingredients: ["Agua", "Malta de cebada", "Lúpulo"],
    beertype: "Lager",
    fermentation: "",
    taste: "",
    verified: true
  },
]

Beer.deleteMany()
.then(() => {
  return Beer.create(beers)
})
.then(beersCreated => {
  console.log(`${beersCreated.length} beers created with the following id:`);
  console.log(beersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})