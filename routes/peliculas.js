var express = require("express");
var router = express.Router();
const peliculasController = require('../controllers/peliculasController');

/* GET users listing. 
router.get("/", function (req, res, next) {
  res.send("estoy en peliculas");
});*/

//creacion
router.get('/crear', peliculasController.crear);
router.post("/crear", peliculasController.guardar);

//lectura

router.get('/', peliculasController.listar)

router.get("/detalle/:id", peliculasController.detalle);

router.get("/recomendadas", peliculasController.recomendadas);

router.get("/nuevas", peliculasController.nuevas);

router.get("/buscar", peliculasController.buscar);

router.post("/buscar", peliculasController.buscar);

router.get("/editar/:id", peliculasController.lecturaEditar);

router.post("/editar/:id", peliculasController.escrituraEditar);

router.post("/eliminar/:id", peliculasController.eliminar)



module.exports = router;
