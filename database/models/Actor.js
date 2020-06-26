module.exports = function (sequelize, dataTypes) {
  let alias = "Actor";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true
    },
    first_name: {
      type: dataTypes.STRING,
    },
    last_name: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "actors",
    timestamps: false,
    underscored: false
  };

  let Actor = sequelize.define(alias, cols, config);

  Actor.associate = function (models) {
    Actor.belongsToMany(models.Pelicula, {
      foreingKey: "actor_id",
      as: "peliculas",
      through: "actor_movie",
      otherKey: "movie_id",
      timestamps: false

    });
  };

  return Actor;
};
