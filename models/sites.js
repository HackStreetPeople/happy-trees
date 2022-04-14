// create plant data table

module.exports = function (sequelize, DataTypes) {
    const sites = sequelize.define('sites', {
      Plot_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      Scientific_Name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      Performance_Standard_Approval: {
        type: DataTypes.STRING,
        allowNull: false
      },

      Planted_or_Volunteer: {
        type: DataTypes.STRING,
        allowNull: false
      },

      X_Coordinate: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },

      Y_Coordinate: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },

      MY0_Height: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },

      MY1_Height: {
        type: DataTypes.STRING,
      },

      MY2_Height: {
        type: DataTypes.STRING,
      },

      MY3_Height: {
        type: DataTypes.STRING,
      },

      MY4_Height: {
        type: DataTypes.STRING,
      },

      MY5_Height: {
        type: DataTypes.STRING,
      },

      MY6_Height: {
        type: DataTypes.STRING,
      },

      MY7_Height: {
        type: DataTypes.STRING,
      },

      MY8_Height: {
        type: DataTypes.STRING,
      },

      MY9_Height: {
        type: DataTypes.STRING,
      },

      MY10_Height: {
        type: DataTypes.STRING,
      },

      MY11_Height: {
        type: DataTypes.STRING,
      },

      MY12_Height: {
        type: DataTypes.STRING,
      },

      Map_ID: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, { timestamps: false});

    // sites.associate = function (models) {
    //   sites.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

  

    return sites;
}