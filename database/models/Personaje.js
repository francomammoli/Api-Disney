module.exports = function(sequelize,dataTypes){
    let alias = "Personaje";

    let cols = {
        idpersonaje:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        img:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        edad:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        historia:{
            type: dataTypes.STRING,
            allowNull: false,
        },
    }

    let config = {
        tableName:"personaje",
        timestamps:false,
    }

    let Personaje = sequelize.define(alias,cols,config);

    Personaje.associate = function(models){
        Personaje.belongsToMany(models.Pelicula,{
            as:"Peliculas",
            through:"personajePelicula",
            foreignKey:"personaje_idpersonaje",
            otherKey:"pelicula_idpelicula",
            timestamps:false,
        });
    }

    return Personaje;
}