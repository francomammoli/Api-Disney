module.exports = function(sequelize,dataTypes){
    let alias = "Genero";

    let cols = {
        idgenero:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        img:{
            type: dataTypes.STRING,
            allowNull: false,
        },
    }

    let config = {
        tableName:"genero",
        timestamps:false,
    }

    let Genero = sequelize.define(alias,cols,config);

    Genero.associate = function(models){
        Genero.hasMany(models.Pelicula,{
            as:"Peliculas",
            foreignKey: "genero_idgenero",
        });
    }

    return Genero;
}