const router = require("express").Router();
const fs = require("fs");
const { constrainedMemory } = require("process");
const path = require('path');



router.get("/", async (req, res) => {
  
  const filePath = path.resolve(__dirname, "..") + "/data-history.json";
  let obj;

  try {
    const content = await new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", function (err, data) {
          if (err) reject(err);
          obj = JSON.parse(data);
          resolve(obj);
        });
      });
      res.render('view-data',{ content })
    
  } catch (error) {
    console.log(error)
    res.status(400).send("Bad Request")
  }
  
});

module.exports = router;
