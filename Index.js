const express = require('express');
const con = require('./Connection');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');

var path = require('path');
var app = express();                           //totalBoxes and basePrice api need to be work on
var port = 3000;


var bodyParser = require('body-parser');
const { userInfo } = require('os');
var totalBoxes = 1;
var totalFloorCharges = 1;
var mobileNo;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
}));


// This api insert user mobile no and create sesison of mobile no
const userNo={
    mobile:mobileNo
}
app.post('/login',(req,res)=>{
    
    // This code is for checking connection
    con.connect((err) => {
        if (err) throw err;
    });

    mobileNo = req.body.mobileNo;

    var q7 = "INSERT INTO user_info (user_mobile) VALUES('"+mobileNo+"')";

    con.query(q7, (error,result)=>{
        if(error) throw error;
        req.session.userNo = userNo.mobile;
        req.session.save();
        return res.send(req.session.user);
    });

});

// This api get total no. of boxes
app.get('/totalNoBoxes', (req, res) => {
    req.session.userNo = userNo;
    req.session.save();
    
    var familyType = req.body.familyType;
    var houseType = req.body.houseType;

    // To check if connection from database 
    con.connect((error) => {
        if (error) throw error;
    });

    var q1 = "SELECT boxes_qty FROM boxFixedPrice WHERE family_type = '" + familyType + "' AND house_type = '" + houseType + "'";

    con.query(q1, (error, result) => {
        if (error) {
            console.log("error");
            throw error;

        }
        else {
            res.send(result.rows);
        }
    });
});


// This api get total floor w/o lift charges
app.post('/floorCharges', function (req, res) {
    req.session.userNo = userNo;
    req.session.save();

    var familyType = req.body.familyType;
    var houseType = req.body.houseType;
    var members = req.body.members;
    var fromFloor = req.body.fromFloor;
    var fromLift = req.body.fromLift;
    var toFloor = req.body.toFloor;
    var toLift = req.body.toLift;

    // To check connection from database 
    con.connect((error) => {
        if (error) throw error;
    });

    //  This query is for inserting data into pricing table 
    var q2 = "INSERT INTO pricing(house_type, family_type, to_lift, to_floor, from_lift, from_floor, members )"
        + "VALUES('" + houseType + "','" + familyType + "','" + toLift + "','" + toFloor + "','" + fromLift + "','" + fromFloor + "', '" + members + "')"

    con.query(q2, (error, result) => {
        if (error) throw error;

    });
    
    // This logic will give the pricing of floor
    if (fromFloor > 2 && fromLift == 'no') {
            var fromFloorCharges = (fromFloor - 2) * 250;
        }
        else {
            res.send("No Charges");
        }
    if(toFloor > 2 && toLift == 'no'){
        var toFloorCharges = (toFloor-2) * 250;
    }
    else{
        res.send("No Charges");
    }
    totalFloorCharges = fromFloorCharges + toFloorCharges;
    return(totalFloorCharges);

});

// This api is for save user info in "user_info" table

const storage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./upload/profile");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + ".jpg");
        }
    })
}).single("profile");

app.post('/saveUserInfo', storage, (req, res) => {

    req.session.userNo = userNo;
    req.session.save();

    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var mobileNo = req.body.mobileNo;
    var profile = req.file.path;

    var q3 = "INSERT INTO user_info(user_f_name,user_l_name,user_email,user_mobile,user_profile)" +
        "VALUES('" + fName + "','" + lName + "','" + email + "','" + mobileNo + "','" + profile + "')";

    con.query(q3, (error, result) => {
        if (error) throw error;
        console.log("Data uploded sucessfully");
        res.send(result.rows);
    });
});

// This is for getting user info base on user's id
app.get('/getUserInfo', (req, res) => {

    var id = req.body.id;

    // This code is for checking connection
    con.connect((err) => {
        if (err) throw err;
    });

    var q4 = "SELECT user_mobile FROM " +
        "user_info WHERE user_id = '" + id + "'";

    con.query(q4, (err, result) => {
        if (err) throw err;
        req.session.userNo = userNo;
        req.session.save();
        res.send(result.rows);
    });
});


// This api is for update the user details   WORK IN PROGRESS, NEED TO CREATE SESSION 

const updateProfile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./upload/profile");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + ".jpg");
        }
    })
}).single("profile");
app.put('/updateUser', updateProfile,(req, res) => {

    req.session.userNo = userNo;
    req.session.save();

    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var profile = req.file.path;
    var mobile = req.session.userNo.mobile;
    // This code is for checking connection
    con.connect((err) => {
        if (err) throw err;
    });

    var q6 = "UPDATE user_info SET user_f_name = '"+fName+"', user_l_name='"+lName+"', user_email='"+email+"'," +
            "user_profile='"+profile+"' WHERE  user_mobile = '"+mobile+"'";
    
            con.query(q6, (err, result) => {
                if (err) throw err;
                console.log(mobile);
                res.send("Rows updated"+result.rows);
            });

});


// This api destroy session and redirect to home page after click on logout 
app.get('/logout',(req,res)=>{

    // This code is for checking connection
    con.connect((err) => {
        if (err) throw err;
    });

    req.session.destroy();
   // mobileNo = null;
    res.send("Cookie destroy"+userNo);
    //return res.redirect('/homePage.html');  // Need to change the homePage.html to actual home page path 

})

// This code is used for running a server to a spefic port number
app.listen(port, () => {
    console.log(`Server is running ${port}`);
});