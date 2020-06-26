const db = require('../database/models');
const { Op } = require("sequelize");

let peliculasController = {
  crear: (req, res) => {
    db.Genero.findAll().then(function (generos) {
      return res.render("crearPeliculas", { generos });
    });
  },

  guardar: (req, res) => {
    db.Pelicula.create({
      title: req.body.titulo,
      awards: req.body.premio,
      release_date: req.body.fecha,
      genre_id: req.body.genero,
      length: req.body.duracion,
    });
    res.redirect("/peliculas");
  },

  listar: (req, res) => {
    db.Pelicula.findAll({
      include: [{association: "actores"}]
    })
      
      .then(function (peliculas) {
        return res.render("listadoPeliculas", { peliculas });
    });
  },

  detalle: (req, res) => {
    db.Pelicula.findByPk(req.params.id).then(function (peliculas) {
      return res.render("detallePeliculas", { peliculas });
    });
  },

  //lista las peliculsa con awards mayores o iguales a 6
  recomendadas: (req, res) => {
    db.Pelicula.findAll({
      where: {
        awards: { [Op.gte]: 6 },
      },
    }).then(function (peliculas) {
      return res.render("recomendadas", { peliculas });
    });
  },

  nuevas: (req, res) => {
    db.Pelicula.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then(function (peliculas) {
      return res.render("nuevasPeliculas", { peliculas });
    });
  },

  buscar: (req, res) => {
    db.Pelicula.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.body.buscar + "%",
        },
      },
      order: [["title", req.body.ordenar]],
    }).then(function (peliculas) {
      return res.render("buscarPeliculas", { peliculas } );
    });
  },

  eliminar: (req, res) => {
    db.Pelicula.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      return res.render("index");
    });
  },

  escrituraEditar: (req, res) => {
    db.Pelicula.update({
      title: req.body.titulo,
      awards: req.body.premio,
      release_date: req.body.fecha,
      length: req.body.duracion,
    },{
      where: {
        id: req.params.id
      }
    }
    )
    res.render("index");
  },

  lecturaEditar: (req, res) => {
    db.Pelicula.findByPk(req.params.id).then(function (peliculas) {
      return res.render("editarPelicula", { peliculas });
    });
  },
};

module.exports = peliculasController;