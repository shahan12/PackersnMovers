require('dotenv').config();
const express = require('express');
const con = require('./Connection');
const multer = require('multer');
const moment = require('moment-timezone');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const sdk = require('api')('@msg91api/v5.0#6n91xmlhu4pcnz');
const authenticateToken  = require('./authMiddelware');
const jwt = require('jsonwebtoken');
//const Msg91 = require('@msg91/msg91-v5');

//const sdk = new Msg91('393980ANtnyjugl6540b81fP1');

const axios = require('axios');
var app = express();
var port = 3001;
const startUrl = 'https://www.shiftkart.co:3000';

global.totalCarton;
global.mobile;
global.basePrice;
global.orderID;
global.encryptKey, global.iv, global.encryptPass;
global.additionalBox;
global.base64UrlKey, global.sha256Hash, global.base64;

let mobileNumber = process.env.MOBILE_NUMBER;
let templateId = process.env.template_id;
let authKey = process.env.authkey;
let otp = process.env.OTP;

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// This code is for checking connection
con.connect((err) => {
    if (err) throw err;
});


// This api signup(post-> initially) the user and check password exist or not 
app.get(`${startUrl}/login`, (req, res) => {

    try {
        
        var q8 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobile + "'";
        con.query(q8, (error, result) => {
            if (error) throw error;
            if (result.rows.length > 0) {
                q6 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobile + "' ";
                con.query(q6, (error, result) => {
                    if (error) throw error;
                    if (result.rows.length > 0) { res.send("Login Sucessfull..."); }
                    else { res.send("Mismatched data..."); }

                });
            }
            else {
                var q9 = "BEGIN;" +
                    "INSERT INTO userInfo(user_mobile) VALUES ('" + mobile + "');" +
                    "INSERT INTO inventoryData(user_mobile) VALUES ('" + mobile + "');" +
                    "INSERT INTO userBooking(user_mobile) VALUES ('" + mobile + "');" +
                    "COMMIT;";
                con.query(q9, (error, result) => {
                    if (error) throw error;
                    mobileNo = mobile;
                    const token = jwt.sign({mobile: result.rows[0].user_mobile}, secreKey, {expiresIn: '1h'});
                    console.log("JWT Token: ",token);
                    res.json({token});
                });


            }
        });
    }
    catch (error) {
        console.error(error.message);

    }
});


// This api clear cookie(mobile) and redirect user to home page
app.get(`${startUrl}/logout`, (req, res) => {
    try {
        if (error) throw error;
        // res.clearCookie('mobile');
        res.redirect('./homepage.html');
    }
    catch (error) {
        console.error(error.message);
    }
})



// This api calculate total no. of boxes
app.put(`${startUrl}/totalNoBoxes`, authenticateToken, (req, res) => {

    try {

        var houseType = req.body.houseType.replace(' ', '').toLowerCase();
        var familyType = (req.body.familyType).toLowerCase();
        var members = parseInt(req.body.familyNumber);
        // var mobile = req.body.phoneNumber;
        console.log("total box backend :", houseType, familyType, members, global.mobile);
        // var q13 = "UPDATE userInfo SET house_type = '" + houseType + "' , family_type='" + familyType + "' WHERE user_mobile = '" + updatePassword.userMobile + "'";
        var q10 = "SELECT boxes_qty FROM boxfixedprice WHERE family_type = '" + familyType + "' AND house_type = '" + houseType + "'";


        con.query(q10, (error, result) => {
            if (error) throw error;
            var flag = result.rows[0].boxes_qty;
            if (familyType == 'bachelor' && members > 1) {
                global.additionalBox = (members - 1) * 4;
                // var totalBachelorBox = flag + check;
                // global.totalCarton = totalBachelorBox;
            }
            // else if (members == 1) {
            //     // res.setHeader('Content-Type', 'application/json');
            //     global.totalCarton = flag;
            //     res.status(200).json(flag);
            // }
            if (familyType == 'family' && members > 4) {
                global.additionalBox = (members - 4) * 4;
                //var totalFamilyBox = flag + check;
                // res.setHeader('Content-Type', 'application/json');
                //global.totalCarton = totalFamilyBox;
            }
            // else if (members == 4) {
            //     // res.setHeader('Content-Type', 'application/json');
            //     global.totalCarton = flag;
            //     res.status(200).json(flag);
            // }
            else {
                global.additionalBox = 0;
            }

            console.log("Total carton: ", global.totalCarton);
            var q13 = "UPDATE userInfo SET house_type = '" + houseType + "' , family_type='" + familyType + "' WHERE user_mobile = '" + global.mobile + "'";
            con.query(q13, (error, result) => {
                if (error) throw error;
                console.log("ADDITIONAL BOXES: ", global.additionalBox);
            });
            res.status(200).json(global.additionalBox);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

// This api calculate base price based on house type and total distance
app.put(`${startUrl}/basePrice`, authenticateToken, (req, res) => {

    try {
        var fromAdd = req.body.fromAddress;
        var toAdd = req.body.toAddress;
        var totalDistance = Math.round(parseFloat(req.body.distance));
        var houseType = req.body.houseType.replace(' ', '').toLowerCase();;
        // var phoneNumber=req.body.phoneNumber;
        console.log("backend rcvd in base price :");
        console.log("from address :", fromAdd);
        console.log("to address :", toAdd);
        console.log(totalDistance)
        console.log(houseType)
        console.log(global.mobile);

        // var q11 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', total_distance = '" + totalDistance + "' WHERE user_mobile='" + userSignup.userMobile + "'";
        var q11 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', total_distance = '" + totalDistance + "' WHERE user_mobile='" + global.mobile + "'";
        con.query(q11, (error, result) => {
            if (error) throw error;


            // var q12 = "SELECT * FROM userInfo WHERE house_type='"+houseType+"' AND user_mobile='"+userSignup.userMobile+"'";
            // con.query(q12,(error,result)=>{
            //     if(error) throw error;
            // })
            if (true) {
                if (houseType == "1rk") {
                    if (totalDistance <= 5) {
                        global.basePrice = 2199;
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 2499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 2799;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 2999;
                        // res.status(200).json(global.basePrice);
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 3349;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 3699;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 4099;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 4499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 4849;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 5199;
                        // res.status(200).json(global.basePrice);
                    }
                }
                // res.send(global.basePrice);
                if (houseType == "1bhk") {
                    if (totalDistance <= 5) {
                        global.basePrice = 3199;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 4499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 4999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 5299;
                        // res.status(200).json(global.basePrice);
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 6499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 6999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 7499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 7999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 8499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 8999;
                        // res.status(200).json(global.basePrice);
                    }
                }
                // res.send(global.basePrice);
                if (houseType == "1bhkHeavy") {
                    if (totalDistance <= 5) {
                        global.basePrice = 3899;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 4499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 5499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 5999;
                        // res.status(200).json(global.basePrice);
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 6549;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 7099;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 7649;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 8199;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 8749;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 9299;
                        // res.status(200).json(global.basePrice);
                    }
                }
                // res.send(global.basePrice);
                if (houseType == "2bhk") {
                    if (totalDistance <= 5) {
                        global.basePrice = 7999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 12999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 13999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 13999;
                        // res.status(200).json(global.basePrice);
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 14899;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 15799;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 16699;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 17599;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 18499;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 19399;
                        // res.status(200).json(global.basePrice);
                    }
                }
                // res.send(global.basePrice);
                if (houseType == "2bhkHeavy") {
                    if (totalDistance <= 5) {
                        global.basePrice = 8999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 14999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 16999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 17999;
                        // res.status(200).json(global.basePrice);
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 18999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 19999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 20999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 21999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 22999;
                        // res.status(200).json(global.basePrice);
                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 23999;
                        // res.status(200).json(global.basePrice);
                    }
                }
                res.setHeader('Content-Type', 'application/json');
                res.json(global.basePrice).status(200);
            }
        });
    }
    catch (error) {
        console.error(error.message);
    }


})

// This api calculate total floor charges w/o lift
app.put(`${startUrl}/floorCharges`, authenticateToken, function (req, res) {
    try {
        var floorNumber = RequirementData.floorNumber;
        var fromLift = RequirementData.fromLift;
        var toFloor = RequirementData.toFloor;
        var toLift = RequirementData.toLift;
        // var userPhone = updatePassword.userMobile

        var q14 = "UPDATE userInfo SET from_floor='" + floorNumber + "', from_lift='" + fromLift + "', to_floor='" + toFloor + "', to_lift='" + toLift + "' WHERE user_mobile='" + global.mobile + "'";
        con.query(q14, (error, result) => {
            if (error) throw error;
            res.status(200).json("Will reach you shortly");
        });
    }
    catch (error) {
        console.error(error.message);
    }

});

// This api is for save user info with profile picture in folder(./upload) and store path in table
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
app.put(`${startUrl}/saveUserInfo`, authenticateToken, storage, (req, res) => {

    try {
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        // var mobileNo = updatePassword.userMobile;
        var profile = req.file.path;

        var q3 = "UPDATE userInfo  SET user_f_name='" + fName + "', user_l_name= '" + lName + "', user_email='" + email + "',user_profile='" + profile + "' WHERE user_mobile='" + global.mobile + "'";

        con.query(q3, (error, result) => {
            if (error) throw error;
            console.log("Data uploded sucessfully");
            res.send(result.rows);
        });
    }
    catch (error) {
        console.log(error.messaege);
    }
});

// This is for getting user info base on user's mobile number
app.get(`${startUrl}/getUserInfo`, authenticateToken, (req, res) => {

    try {
        var q4 = "SELECT * FROM " +
            "userInfo WHERE user_mobile = '" + global.mobile + "'";
        con.query(q4, (err, result) => {
            if (err) throw err;
            res.send(result.rows);
        });
    }
    catch (error) {
        console.error(error.messaege);
    }
});

var addons = {
    carton: {
        cost: 250,
        count: 2,
        totalPrice: 500
    },
    labour: {
        cost: 200,
        count: 2,
        totalPrice: 500
    },
    splitACInstallation: {
        cost: 500,
        count: 1,
        totalPrice: 500
    },
    splitACUninstallation: {
        cost: 500,
        count: 2,
        totalPrice: 1000
    },
    windowACInstallation: {
        cost: 200,
        count: 1,
        totalPrice: 200
    },
    windowACUninstallation: {
        cost: 200,
        count: 1,
        totalPrice: 200
    },
    carpentry: {
        cost: 500,
        count: 1,
        totalPrice: 500
    },
    electrition: {
        cost: 100,
        count: 2,
        totalPrice: 200
    },
    painting: {
        cost: 800,
        count: 2,
        totalPrice: 1600
    }
}

app.put(`${startUrl}/addons`, authenticateToken, (req, res) => {
    const insertData = {
        addons: addons,
    };
    var add_on = JSON.stringify(insertData);
    //   var mobile = userSignup.userMobile;

    var q16 = "UPDATE inventoryData SET addons='" + add_on + "'::jsonb WHERE user_mobile='" + global.mobile + "'";
    con.query(q16, (error, result) => {
        if (error) throw error;
        res.send("addons added..." + result.rows);
    })
});

// This api is for show user booking from 2 tables 'userInfo' and 'inventoryData' based on mobile no 
app.get(`${startUrl}/myBooking`, authenticateToken, (req, res) => {

    try {
        const q17 = ` SELECT u.house_type, u.total_distance, u.from_address, u.to_address, 
    i.book_date, i.book_slot_time, i.total_items, i.additional_box, i.order_id 
    FROM userInfo u INNER JOIN inventoryData i ON u.user_mobile = i.user_mobile 
    WHERE u.user_mobile = $1 `;

        console.log(global.mobile);
        const userMobile = global.mobile;
        con.query(q17, [userMobile], (error, results) => {
            if (error) throw error;
            if (results.rows.length > 1) {
                let books = results.rows;
                books = books.slice(1);
                res.send(books);
            }
            else res.send([]);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

// This api is for update the user details  
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
app.put(`${startUrl}/updateUser`, updateProfile, authenticateToken, (req, res) => {

    try {
        var fName = req.body.firstName;
        var lName = req.body.lastName;
        var email = req.body.email;
        var profile = "";
        var q5 = "UPDATE userInfo SET user_f_name = '" + fName + "', user_l_name='" + lName + "', user_email='" + email + "'," +
            "user_profile='" + profile + "' WHERE  user_mobile = '" + global.mobile + "'";
        con.query(q5, (err, result) => {
            if (err) throw err;
            console.log(global.mobile);
            res.send("Rows updated" + result.rows);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

// This api update 'inventoryData' table based on user's inventory
app.put(`${startUrl}/inventory`, authenticateToken, (req, res) => {

    try {
        var mobile = req.body.mobile;
        console.log("all inventory data: ", req.body);
        console.log("addons : ");
        console.log(req.body.addons);

        console.log("datatime : ");
        console.log(req.body.dataTime);

        console.log("user_inventory : ");
        console.log(req.body.user_inventory);

        console.log("data :");
        console.log(req.body.dataTime?.selectedDay?.date);

        console.log("label :");
        console.log(req.body.dataTime?.selectedTime?.label);

        console.log("mobile :")
        console.log(req.body.mobile);

        console.log("current data ")
        console.log(req.body.dataTime?.selectedDay?.currentDate)

        console.log("booking data ")
        console.log(req.body.dataTime?.selectedDay?.bookingDate)

        console.log("total items ")
        console.log(req.body.totalCost?.totalItemCount)

        console.log("additional box ")
        console.log(req.body.totalCost?.totalBox);

        var addons = JSON.stringify(req.body.addons);
        var user_inventory = JSON.stringify(req.body.user_inventory);

        // Function to get the current date in 'dd/mm/yyyy' format
        function getCurrentDate() {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const yyyy = today.getFullYear();
            return dd + mm + yyyy;
        }

        // Function to generate a random 6-digit number
        function getRandNumber() {
            return Math.floor(100000 + Math.random() * 900000);
        }

        // Function to extract the last 4 digits of a phone number 
        function getLast4Digitmobile(mobile) {
            if (typeof mobile === 'string' && mobile.length >= 4) {
                return mobile.slice(-4);
            }
        }

        // Concatenate the components to create the order ID
        const prefix = 'SK';
        const currentDate = getCurrentDate();
        const randomDigits = getRandNumber();
        const phone = mobile;
        const last4Digits = getLast4Digitmobile(phone);

        global.orderID = `${prefix}${currentDate}-${randomDigits}${last4Digits}`;
        console.log(global.orderID);
        let value = req.body.totalCost.totalBox;
        // console.log("value -> ",value);
        if (isNaN(value) || value === undefined) {
            value = 0;
        }
        q21 = "INSERT INTO inventoryData (user_inventory, book_date, book_slot_time, addons,order_id, user_current_date, additional_box ,total_items, user_mobile) VALUES ('" + user_inventory + "','" + req.body.dataTime.selectedDay.bookingDate + "','" + req.body.dataTime.selectedTime.label + "', '" + addons + "', '" + global.orderID + "', '" + currentDate + "', '" + value + "' ,'" + req.body.totalCost.totalItemCount + "','" + req.body.mobile + "' )";

        con.query(q21, (error, result) => {
            if (error) throw error;
            console.log(result.rows);
            // if(result.rows.length > 0) {
            //     console.log("inventory data saved successfully");
            // }
            res.send(result.rows);
        })
        // res.status(200); // comment this when the above query runs
    }

    catch (error) {
        console.error(error.messaege);
    }
});

// demoData 
const Demo = {
    mobileNumber:919911791780
}

// This api is used for sending otp     
app.post(`${startUrl}/sendOTP`, (req, res) => {
    global.mobile = req.query.userMobile;
    console.log("send otp to : ", mobileNumber);
    try {
        const options = {
            method: 'POST',
            url: `https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${global.mobile}`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: `${authKey}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
            global.mobile = req.query.userMobile;
            var q8 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobile + "'";
            con.query(q8, (error, result) => {
                if (error) throw error;
                if (result.rows.length > 0) {
                    q6 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobile + "' ";
                    con.query(q6, (error, result) => {
                        if (error) throw error;
                        if (result.rows.length > 0) { res.send("Login Sucessfull..."); }
                        else { res.send("Mismatched data..."); }
    
                    });
                }
                else {
                    var q9 = "BEGIN;" +
                        "INSERT INTO userInfo(user_mobile) VALUES ('" + mobile + "');" +
                        "INSERT INTO inventoryData(user_mobile) VALUES ('" + mobile + "');" +
                        "INSERT INTO userBooking(user_mobile) VALUES ('" + mobile + "');" +
                        "COMMIT;";
                    con.query(q9, (error, result) => {
                        if (error) throw error;
                        mobileNo = mobile;
                        const token = jwt.sign({mobile: result.rows[0].user_mobile}, secreKey, {expiresIn: '1h'});
                        console.log("JWT Token: ",token);
                        res.json({token});
                    });
    
    
                }
            });
    }
    catch (error) {
        console.error(error.message);
    }
});


// This api is used for verify OTP based on OTP and mobile number
app.post(`${startUrl}/verifyOTP`, (req, res) => {
    console.log(req.body.data);
    let {OTP: otp,phoneNumber: mobileNumber}=req.body.data;
    console.log("to verify otp and mobileNumber ", otp,mobileNumber);
    try {
        const options = {
            method: 'GET',
            url: `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=91${mobileNumber}`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: `${authKey}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    catch (error) {
        console.error(error.message);
    }
});


app.get(`${startUrl}/resendOTP`, (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://control.msg91.com/api/v5/otp/retry?retrytype=${otp}&mobile=${mobileNumber}`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: `${authKey}`
            }
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    catch (error) {
        console.error(error.message);
    }
})
app.listen(port, () => {
    console.log("Server running on", port);
})
