module.exports = function(sequelize,dataTypes){
    let alias = "Usuario";

    let cols = {
        idusuario:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        pasword:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: dataTypes.STRING,
        },
    }

    let config = {
        tableName:"usuario",
        timestamps:false,
    }

    let Usuario = sequelize.define(alias,cols,config);

    return Usuario;
}