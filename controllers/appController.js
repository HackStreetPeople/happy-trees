module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    },


     // Get all examples
     getTree: function (req, res) {
      db.sites.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createTree: function (req, res) {
      db.sites.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteTree: function (req, res) {
      db.sites.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    
    // Get the excel file from the uploader
    getExcelFile: function (req, res) {
      db.sites.create(req.body).then(function (dbSites) {
        res.json(dbSites);
      });
    },

    getTrees: function (req, res) {
      console.log('trees')
      db.sites.post(req.body).then(function (dbSites) {
        res.json(dbSites);
      });
    },

    getTrees2: async (req, res) => {
      const treeSites = await db.sites.findAll()
      
      res.json(treeSites)
    },

  };
};
