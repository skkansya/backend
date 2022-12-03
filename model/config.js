const dotenv = require("dotenv");

dotenv.config();
// const URL= process.env.MONGO_URL
const URL= "mongodb://localhost:27017/monthly-shopping"
const mongoose= require('mongoose');
mongoose.connect(URL).then(()=> {console.log('mongo Atlas connected')})
.catch((err)=>console.log(err))
const conn= mongoose.createConnection(URL)
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
let gfs;
conn.once('open', ()=>{
    //init stream
    gfs= Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
  });

  //create storage engine
  const storage = new GridFsStorage({
    url: URL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });
