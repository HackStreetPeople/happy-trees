module.exports = function (sequelize, DataTypes) {
    const Tree = sequelize.define('Tree', {
        
      plotId: DataTypes.INTEGER,
      scientificName: DataTypes.STRING,
      height: DataTypes.STRING
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



