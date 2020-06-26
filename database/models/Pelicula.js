module.exports = function (sequelize, dataTypes) {
  let alias = "Pelicula";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true,
    },
    title: {
      type: dataTypes.STRING,
    },
    awards: {
      type: dataTypes.INTEGER,
    },
    length: {
      type: dataTypes.INTEGER,
    },
    release_date: {
      type: dataTypes.DATE,
    },
    genre_id: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "movies",
    timestamps: false,
    underscored: false
  };

  let Pelicula = sequelize.define(alias, cols, config);

  Pelicula.associate = function(models)
  {
    Pelicula.belongsTo(models.Genero,{
      foreingKey:"genre_id",
      as: "genero"
    });

    Pelicula.belongsToMany(models.Actor, {
      foreingKey: "movie_id",
      as: "actores",
      through: "actor_movie",
      otherKey: "actor_id",
      timestamps: false,
    });
  }

  return Pelicula;
};
