const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const uniqid = require('uniqid');

app.use('/uploads',express.static('uploads'));
const multer =require('multer');

//Source of storage of files
const Photostorage =multer.diskStorage({

    destination:function(req,file,cb)
    {
        cb(null,'./uploads/Photos');
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
});
const Videostorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/Videos');
    },
    filename: function (req, file, cb) {
        cb(null, uniqid()+".mp4");
    }
});

const filter=(req,file,cb)=>
{
    //reject
    //cb(null,false);
    //accept
    cb(null,true)
}

const uploadPhoto = multer({storage:Photostorage,limits:{
    fileSize: 629145600
    },
    fileFilter:filter
});

const uploadVideo = multer({
    storage: Videostorage, limits: {
        fileSize: 1073741824 
    },
    fileFilter: filter
});



app.use(cors());
app.use(bodyparser.json());
const port = process.env.PORT || 3000;


//upload endpoint

var urls=[];

//photos

app.put("/uploadCollage", uploadPhoto.array('img',6), (req, res) => {
    console.log(req.body);
    res.send(true);
});

app.put("/uploadVideo", uploadVideo.single('vid'), (req, res) => {
    console.log(req.body);
    res.send(true);
});


app.get("/getfile",(req,res)=>{
    res.send({
        fileurl:url
    });

})

app.listen(port, () => {
    console.log("Server is Live ...");
})

