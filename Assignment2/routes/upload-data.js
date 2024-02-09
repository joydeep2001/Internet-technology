const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fname = `${Date.now()}-${file.originalname}` ;
    console.log(fname);
    return cb(null, fname);
  },
});

//const upload = multer({dest:"/uploads"})
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  res.render("upload-data");
});

function saveFileNameInData(filePath, fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) reject(err);
      const obj = JSON.parse(data);
      obj.push(fname);
      console.log(obj);
      fs.writeFile(filePath,JSON.stringify(obj),'utf-8',(err)=>{
        if(err){
          reject(err)
        } else {
          resolve("Success")
        }
      })
    });
  })
  
}

router.post("/", upload.single("fileInput"), async (req, res) => {
  console.log("upload success");
  console.log(req.file.filename);
  const filePath = path.resolve(__dirname, "..") + "/data-history.json";
  try {
    await saveFileNameInData(filePath, req.file.filename);
  } catch(err) {
    console.log(err);
    res.status(500).send("Internal server error! Please retry");
    return;
  }
  
  res.render('sucess-page');
  
});

module.exports = router;
