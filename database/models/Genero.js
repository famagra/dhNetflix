module.exports = function (sequelize, dataTypes) {
  let alias = "Genero";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true,
    },
    name: {
      type: dataTypes.STRING,
    },
    ranking: {
      type: dataTypes.INTEGER,
    },
    active: {
      type: dataTypes.BOOLEAN,
    },
  };

  let config = {
    tableName: "genres",
    timestamps: false,
    underscored: false
  };

  let Genero = sequelize.define(alias, cols, config);

  Genero.associate = function(models) {
    Genero.hasMany(models.Pelicula, {
      foreingKey: "genre_id",
      as: "peliculas"
    });
  };

  return Genero;
};
