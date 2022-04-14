const db = require("../../models");
const Trees = db.trees;
const CsvParser = require("json2csv").Parser;


const downloadTree = (req, res) => {
  Trees.findAll().then((objs) => {
    let allTrees = [];
    objs.forEach((obj) => {
      const { Plot_ID, Scientific_Name } = obj;
      allTrees.push({ Plot_ID, Scientific_Name });
    });
    const csvFields = ["Plot_ID", "Scientific_Name"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(allTrees);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=allTrees.csv");
    res.status(200).end(csvData);
  });
};
module.exports = {
  downloadTree
};