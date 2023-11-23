const authMiddelware = require('./authMiddelware.js');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const con = require('./Connection');
const multer = require('multer');
const moment = require('moment-timezone');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const sdk = require('api')('@msg91api/v5.0#6n91xmlhu4pcnz');
const axios = require('axios');
const jwt = require('jsonwebtoken');
var app = express();

app.use(cors({
    origin: process.env.BASE_URL,
    methods: 'GET, POST, OPTIONS, PUT',
    credentials: true,
    allowedHeaders: 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
}));

var port = process.env.PORT;

global.totalCarton;
global.mobile;
global.basePrice;
global.orderID;
global.encryptKey, global.iv, global.encryptPass;
global.additionalBox;
global.base64UrlKey, global.sha256Hash, global.base64;
global.paymentStatus, global.merchantUser;
global.paymentResponse;

let mobileNumber = process.env.MOBILE_NUMBER;
let templateId = process.env.template_id;
let authKey = process.env.authkey;
let otp = process.env.OTP;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

con.connect((err) => {
    if (err) throw err;
});

app.get(`/api/login`, (req, res) => {

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
                    "COMMIT;";
                con.query(q9, (error, result) => {
                    if (error) throw error;
                    mobileNo = mobile;
                    // const token = jwt.sign({mobile: result.rows[0].user_mobile}, secreKey, {expiresIn: '1h'});
                    // console.log("JWT Token: ",token);
                    // res.json({token});
                });


            }
        });
    }
    catch (error) {
        console.error(error.message);

    }
});

app.get(`/api/logout`, (req, res) => {
    try {
        if (error) throw error;
        res.redirect('./homepage.html');
    }
    catch (error) {
        console.error(error.message);
    }
})

app.put(`/api/totalNoBoxes`, (req, res) => {

    try {
        var houseType = req.body.houseType.replace(' ', '').toLowerCase();
        var familyType = (req.body.familyType).toLowerCase();
        var members = parseInt(req.body.familyNumber);
        console.log("total box backend :", houseType, familyType, members, global.mobile);
        var q10 = "SELECT boxes_qty FROM boxfixedprice WHERE family_type = '" + familyType + "' AND house_type = '" + houseType + "'";


        con.query(q10, (error, result) => {
            if (error) throw error;
            var flag = result.rows[0].boxes_qty;
            if (familyType == 'bachelor' && members > 1) {
                global.additionalBox = (members - 1) * 4;
            }
            if (familyType == 'family' && members > 4) {
                global.additionalBox = (members - 4) * 4;
            }
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

app.put(`/api/basePrice`, (req, res) => {
    try {
        var fromAdd = req.body.fromAddress;
        var toAdd = req.body.toAddress;
        var totalDistance = Math.round(parseFloat(req.body.distance));
        var houseType = req.body.houseType.replace(' ', '').toLowerCase();;
        console.log("From Address: ", fromAdd);
        console.log("To Address: ", toAdd);
        console.log("Total Distance: ", totalDistance)
        console.log("House Type: ", houseType)
        console.log("User Mobile Number: ", global.mobile);
        var q11 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', total_distance = '" + totalDistance + "' WHERE user_mobile='" + global.mobile + "'";
        con.query(q11, (error, result) => {
            if (error) throw error;
            if (true) {
                if (houseType == "1rk") {
                    if (totalDistance <= 5) {
                        global.basePrice = 2199;
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 2499;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 2799;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 2999;
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 3349;
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 3699;
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 4099;
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 4499;
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 4849;
                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 5199;
                    }
                }

                if (houseType == "1bhk") {
                    if (totalDistance <= 5) {
                        global.basePrice = 3199;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 4499;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 4999;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 5299;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 6499;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 6999;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 7499;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 7999;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 8499;

                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 8999;

                    }
                }

                if (houseType == "1bhkHeavy") {
                    if (totalDistance <= 5) {
                        global.basePrice = 3899;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 4499;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 5499;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 5999;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 6549;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 7099;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 7649;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 8199;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 8749;

                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 9299;

                    }
                }

                if (houseType == "2bhk") {
                    if (totalDistance <= 5) {
                        global.basePrice = 7999;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 12999;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 13999;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 13999;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 14899;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 15799;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 16699;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 17599;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 18499;

                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 19399;

                    }
                }

                if (houseType == "2bhkHeavy") {
                    if (totalDistance <= 5) {
                        global.basePrice = 8999;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        global.basePrice = 14999;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        global.basePrice = 16999;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        global.basePrice = 17999;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        global.basePrice = 18999;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        global.basePrice = 19999;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        global.basePrice = 20999;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        global.basePrice = 21999;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        global.basePrice = 22999;

                    }
                    if (totalDistance >= 50) {
                        global.basePrice = 23999;

                    }
                }
                res.setHeader('Content-Type', 'application/json');
                console.log("Base Price: ", global.basePrice);
                res.json(global.basePrice).status(200);
            }
        });
    }
    catch (error) {
        console.error(error.message);
    }


})

app.put(`/api/floorCharges`, function (req, res) {
    try {
        var floorNumber = RequirementData.floorNumber;
        var fromLift = RequirementData.fromLift;
        var toFloor = RequirementData.toFloor;
        var toLift = RequirementData.toLift;
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
app.put(`/api/saveUserInfo`, storage, (req, res) => {

    try {
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        var profile = req.file.path;

        var q3 = "UPDATE userInfo  SET user_f_name='" + fName + "', user_l_name= '" + lName + "', user_email='" + email + "',user_profile='" + profile + "' WHERE user_mobile='" + global.mobile + "'";

        con.query(q3, (error, result) => {
            if (error) throw error;
            console.log("User Data uploded sucessfully");
            res.send(result.rows);
        });
    }
    catch (error) {
        console.log(error.messaege);
    }
});

app.get(`/api/getUserInfo`, (req, res) => {

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

app.put(`/api/addons`, (req, res) => {
    const insertData = {
        addons: addons,
    };
    var add_on = JSON.stringify(insertData);
    var q16 = "UPDATE inventoryData SET addons='" + add_on + "'::jsonb WHERE user_mobile='" + global.mobile + "'";
    con.query(q16, (error, result) => {
        if (error) throw error;
        res.send("User added Addons: " + result.rows);
    })
});

app.get(`/api/myBooking`, (req, res) => {

    try {
        const q17 = ` SELECT u.house_type, u.total_distance, u.from_address, u.to_address, 
    i.book_date, i.book_slot_time, i.total_items, i.additional_box, i.order_id 
    FROM userInfo u INNER JOIN inventoryData i ON u.user_mobile = i.user_mobile 
    WHERE u.user_mobile = $1 `;

        console.log("User Mobile Number in myBooking API: ", global.mobile);
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
app.put(`/api/updateUser`, updateProfile, (req, res) => {

    try {
        var fName = req.body.firstName;
        var lName = req.body.lastName;
        var email = req.body.email;
        var profile = "";
        var q5 = "UPDATE userInfo SET user_f_name = '" + fName + "', user_l_name='" + lName + "', user_email='" + email + "'," +
            "user_profile='" + profile + "' WHERE  user_mobile = '" + global.mobile + "'";
        con.query(q5, (err, result) => {
            if (err) throw err;
            console.log("User Mobile Number in Update User API: ", global.mobile);
            res.send("Rows updated" + result.rows);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

app.put(`/api/inventory`, (req, res) => {

    try {
        var mobile = req.body.mobile;
        console.log("All Inventory Data: ", req.body);
        console.log("Addons: ");
        console.log(req.body.addons);

        console.log("Data Time: ");
        console.log(req.body.dataTime);

        console.log("User Inventory: ");
        console.log(req.body.user_inventory);

        console.log("User Selected Date: ");
        console.log(req.body.dataTime?.selectedDay?.date);

        console.log("User Selected Time: ");
        console.log(req.body.dataTime?.selectedTime?.label);

        console.log("User Mobile in Inventory API: ")
        console.log(req.body.mobile);

        console.log("Current Date: ")
        console.log(req.body.dataTime?.selectedDay?.currentDate)

        console.log("Booking Date: ")
        console.log(req.body.dataTime?.selectedDay?.bookingDate)

        console.log("Total Items: ")
        console.log(req.body.totalCost?.totalItemCount)

        console.log("Additional boxes: ")
        console.log(req.body.totalCost?.totalBox);

        var addons = JSON.stringify(req.body.addons);
        var user_inventory = JSON.stringify(req.body.user_inventory);
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
        console.log("User Order ID: ", global.orderID);
        let value = req.body.totalCost.totalBox;
        if (isNaN(value) || value === undefined) {
            value = 0;
        }
        q21 = "INSERT INTO inventoryData (user_inventory, book_date, book_slot_time, addons,order_id, user_current_date, additional_box ,total_items, user_mobile) VALUES ('" + user_inventory + "','" + req.body.dataTime.selectedDay.bookingDate + "','" + req.body.dataTime.selectedTime.label + "', '" + addons + "', '" + global.orderID + "', '" + currentDate + "', '" + value + "' ,'" + req.body.totalCost.totalItemCount + "','" + req.body.mobile + "' )";

        con.query(q21, (error, result) => {
            if (error) throw error;
            console.log("Inventory Succefully Added: ", result.rows);
            res.send(result.rows);
        })
    }

    catch (error) {
        console.error(error.messaege);
    }
});

app.post('/api/sendOTP', (req, res) => {
    let { mobileNumber } = req.body;
    let headerSent = false;
    global.mobile = mobileNumber;
    console.log("Send OTP TO: ", mobileNumber);
    try {
        const options = {
            method: 'POST',
            url: `https://control.msg91.com/api/v5/otp?template_id=${process.env.templateId}&mobile=91${mobileNumber}`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: `${process.env.authKey}`
            }
        };
        axios
            .request(options)
            .then(function (response) {
                res.status(200).json(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });

        var q8 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + global.mobile + "'";
        con.query(q8, (error, result) => {
            if (error) throw error;
            if (result.rows.length > 0) {
                q6 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + global.mobile + "' ";
                con.query(q6, (error, result) => {
                    if (error) throw error;
                    if (result.rows.length > 0) { console.log("Login Sucessfull..."); }
                    else { console.log("Mismatched data..."); }
                });
            }
            else {
                var q9 = "BEGIN;" +
                    "INSERT INTO userInfo(user_mobile) VALUES ('" + global.mobile + "');" +
                    "INSERT INTO inventoryData(user_mobile) VALUES ('" + global.mobile + "');" +
                    "COMMIT;";
                con.query(q9, (error, result) => {
                    if (error) throw error;
                    else {

                        mobileNo = global.mobile;
                    }

                });
            }
        });
    }
    catch (error) {
        console.error(error.message);
    }
});
let mobileNo = global.mobile;

const secretkey = process.env.secretKey;
var payload = global.mobile;
// Function to generate a JWT token
function generateToken(payload) {

    const token = jwt.sign(payload, secretkey, { expiresIn: '1h' });
    if (payload != null){
        console.log("generateToken Token value: ",token);
        console.log("generateToken Secret Key: ",secretkey);
        return token;
    }
    else
        return "Invalid User, Because user information is not there";

}
// Function to verify a JWT token
function verifyToken(token) {
    jwt.verify(token, secretkey, (err, decode) => {
        if (err)
            return "Failed to authenticate user";
            console.log("verifyToken Decode Value: ",decode);
            console.log("verifyToken Token value: ",token);
            console.log("verifyToken Secret Key value: ",secretkey);
        req.payload = decode;
        next();
    });
}


app.post(`/api/verifyOTP`, (req, res) => {
    console.log("User Entered Data: ", req.body.data);
    let { OTP: otp, phoneNumber: mobileNumber } = req.body.data;
    console.log("To Verify OTP and Mobile Number: ", otp, mobileNumber);
    try {
        const options = {
            method: 'GET',
            url: `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=91${mobileNumber}`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: `${process.env.authKey}`
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


app.get(`/api/resendOTP`, (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://control.msg91.com/api/v5/otp/retry?retrytype=${otp}&mobile=91${mobileNumber}`,
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

app.post(`/api/payment`, async (req, res) => {
    const paymentAmount = req.body.paymentAmount;

    const salt = {
        "keyIndex": process.env.SALT_KEY_INDEX,
        "key": process.env.SALT_KEY
    }

    console.log("payment amount : ", paymentAmount);
    var minm6 = 100000; var maxm6 = 999999;
    let randomNumSix = Math.floor(Math.random() * (maxm6 - minm6 + 1)) + minm6;
    var minm4 = 1000; var maxm4 = 9999;
    let randomNumFour = Math.floor(Math.random() * (maxm4 - minm4 + 1)) + minm4;
    let merchantPrefix = process.env.MerchantPrefix;
    global.merchantTransaction = merchantPrefix + randomNumFour + randomNumSix;
    global.merchantUser = merchantPrefix + randomNumFour;

    const paymentData = {
        "merchantId": process.env.MerchantID,
        "merchantTransactionId": global.merchantTransaction,
        "merchantUserId": global.merchantUser,
        "amount": (paymentAmount * 100),
        "redirectUrl": "https://shiftkart.co/bookings",
        "redirectMode": "REDIRECT",
        "callbackUrl": "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
        "mobileNumber": global.mobile,
        "paymentInstrument": {
            "type": "PAY_PAGE"
        }
    }
    console.log("merchant tarnsaction :",merchantTransaction)
    console.log("merchant user id :",merchantUser)
    console.log("payment amount :",paymentAmount*100);

    const paymentAPI = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

    let paymentDataBase64 = base64json.stringify(paymentData, null, 1);
    let paymentDataBase64Xverify = paymentDataBase64 + "/pg/v1/pay" + salt.key;
    let xverify = hash.sha256().update(paymentDataBase64Xverify).digest('hex');
    xverify += "###1";
    const paymentres = await axios.post(paymentAPI, { request: paymentDataBase64 }, {
        headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xverify
        }
    });
    let isSuccess = paymentres.data.success;
    if (isSuccess) {
        const paymentURL = paymentres.data.data.instrumentResponse.redirectInfo.url;
        q23 = "UPDATE INTO inventorydata SET payment_url_response = '"+ paymentres.data+"' WHERE user_mobile = '"+global.mobile +"' ";
        con.query(q23, (error,result)=>{
            if(error) throw error;
        });
        // console.log(paymentres.data.data.instrumentResponse.redirectInfo.url);
        res.status(200).json(paymentURL, paymentData.merchantId, paymentData.merchantTransactionId);
    } else {
        res.status(200).json("payment failed");
    }
});



app.get("/api/checkPaymentStatus", async (req, res) => {

    var minm6 = 100000; var maxm6 = 999999;
    let randomNumSix = Math.floor(Math.random() * (maxm6 - minm6 + 1)) + minm6;
    var minm4 = 1000; var maxm4 = 9999;
    let randomNumFour = Math.floor(Math.random() * (maxm4 - minm4 + 1)) + minm4;
    const checkStatusAPi = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MerchantID}/${global.merchantTransactionId}`;
    let xverify = hash.sha256("pg/v1/status/{process.env.MerchantID}/{global.merchantTransaction}" + process.env.SALT_KEY) + "###" + process.env.SALT_KEY_INDEX;
    global.paymentStatus = await axios.post(checkStatusAPi, {
        headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': xverify,
            'X-MERCHANT-ID': process.env.MerchantID
        }
    });
    let isSuccess = paymentres.data.success;
    if (isSuccess) {
        const paymentStatus = paymentres.data;
        q24 = "BEGIN ;" + 
            "INSERT INTO payments (order_id, user_mobile) SELECT (order_id, user_mobile) FROM inventorydata WHERE user_mobile = '"+global.mobile +"' ;" +
            "INSERT INTO payments (merchant_id, transaction_id, total_amount, payment_status, payment_response) VALUES ('"+process.env.MerchantID+"', '"+global.merchantTransaction+"', '"+ paymentres.data.data.amount +"', '"+ paymentres.data.code +"', '"+ paymentres.data +"') ;" +
            "COMMIT ;";
        con.query(q24, (error, result) => {
            if (error)
                throw error;
            global.paymentResponse = result.rows;
            q25 = "INSERT INTO inventorydata (payment_url_response) VALUES ('"+ global.paymentResponse +"')";
            con.query(q25,(error,result)=>{
                if(error) throw error;
            });
        });
        

    }
    // check status of payment using the merchant transition ID
    // periodically check status untill we get response
});


app.listen(port, () => {
    console.log("Server running on", port);
});
