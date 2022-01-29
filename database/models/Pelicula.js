module.exports = function(sequelize,dataTypes){
    let alias = "Pelicula";

    let cols = {
        idpelicula:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        fecha_creacion:{
            type: dataTypes.DATE,
            allowNull: false,
        },
        calificacion:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        genero_idgenero:{
            type: dataTypes.INTEGER,
        },
        img:{
            type: dataTypes.STRING,
        },
    }

    let config = {
        tableName:"pelicula",
        timestamps:false,
    }

    let Pelicula = sequelize.define(alias,cols,config);

    Pelicula.associate = function(models){
        Pelicula.belongsTo(models.Genero,{
            as:"Genero",
            foreignKey: "genero_idgenero",
        });
        Pelicula.belongsToMany(models.Personaje,{
            as:"personajes",
            through:"personajePelicula",
            foreignKey:"pelicula_idpelicula",
            otherKey:"personaje_idpersonaje",
            timestamps:false,
        });
    }

    return Pelicula;
}