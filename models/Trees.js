module.exports = function (sequelize, DataTypes) {
    const Tree = sequelize.define('Tree', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
      scientificName: DataTypes.STRING,
      psa: DataTypes.TEXT,
      planted: DataTypes.BOOLEAN,
      volunteer: DataTypes.BOOLEAN
      
    });
  
    Tree.associate = function (models) {
      Tree.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Tree;
  };
  