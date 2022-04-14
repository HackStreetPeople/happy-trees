module.exports = (sequelize, DataTypes) => {
    const projects = sequelize.define('projects', {
      Plot_ID: {
          // from id="plot-id"
        type: DataTypes.INTEGER,
        allowNull: false
      },

      Scientific_Name: {
          // from id="scientific-name"
        type: DataTypes.STRING,
        allowNull: false
      },

      MY0_Height: {
          // from id="height"
        type: DataTypes.DECIMAL,
        allowNull: false
      },

    })
    return projects;
}