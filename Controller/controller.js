const path = require('path');
const fs = require('fs')

const getcourse =(req,res)=>{
    const filepath = path.join(__dirname,"../temp/course.js");
    fs.readFile(filepath,"utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({
                message:'failed to read data'
            })
        }
        res.status(200).json(JSON.parse(data));
    })

}
const getstudentdetail =(req,res)=>{
    const filepath = path.join(__dirname,"../temp/student.js");
    fs.readFile(filepath,"utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({
                message:'failed to read data'
            })
        }
        res.status(200).json(JSON.parse(data));
    })

}
const getteacherdetail =(req,res)=>{
    const filepath = path.join(__dirname,"../temp/teacher.js");
    fs.readFile(filepath,"utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({
                message:'failed to read data'
            })
        }
        res.status(200).json(JSON.parse(data));
    })

}
module.exports ={ getcourse,getstudentdetail,getteacherdetail}