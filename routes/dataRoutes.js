const router = require('express').Router();
const { sites, projects } = require('../models');


module.export = () => {

    router.get('/', (reg, res)  => {
        sites.findAll({})
    })
    .then(dbPlantsData => res.json(dbPlantsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });


    router.get('/:Scientifc_Name', (reg, res)  => {
        sites.findOne({
            where: {
                Scientific_Name: require.params.Scientific_Name
            }
        })
    })
    .then(dbPlantsData => res.json(dbPlantsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });


    return router;
}
