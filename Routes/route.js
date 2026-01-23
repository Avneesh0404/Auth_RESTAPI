const express = require('express');
const route = express.Router();
const {getcourse,getstudentdetail,getteacherdetail}= require('../Controller/controller')
const {sigin} = require('../Controller/sigin')
const {login,logout} = require('../Controller/login')
const {authmiddleware} = require('../middleware/authc')
const {authz} =require('../middleware/authz')
const {gennewaccesstoken} = require('../Controller/genaccesstoken')


route.get('/courses',authmiddleware,authz("student","teacher"),getcourse);
route.get('/studentdetails',authmiddleware,authz("student"),getstudentdetail);
route.get('/teacherdetails',authmiddleware,authz("teacher"),getteacherdetail);


route.post("/refresh",gennewaccesstoken);
route.post('/signin',sigin);
route.post('/login',login);
route.post('/logout',logout);


module.exports = route;