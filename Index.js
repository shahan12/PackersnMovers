const authmiddleware = require('./authmiddleware');  // Assuming authmiddleware.js is in the same directory
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
const hash = crypto.createHash('sha256');
const jwt = require('jsonwebtoken');
// const base64json = require('base64json');
var app = express();

app.use(cors({
    origin: process.env.BASE_URL,
    methods: 'GET, POST, OPTIONS, PUT',
    credentials: true,
    allowedHeaders: 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization',
}));

var port = process.env.PORT;

global.mobile;
global.orderID;
global.encryptKey, global.iv, global.encryptPass;
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

app.post(`/api/login`, (req, res) => {                                                          //// DONE
    const token = req.headers.authorization.split(' ')[1];

    const decoded = authmiddleware.verifyToken(token);

    if (decoded) {
    const mobileNumber = authmiddleware.decryptIdentifier(req.body.encData);
    console.log(" login ",mobileNumber);
    try {

        var q8 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobileNumber + "'";
        con.query(q8, (error, result) => {
            if (error) throw error;
            if (result.rows.length > 0) {
                q6 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobileNumber + "' ";
                con.query(q6, (error, result) => {
                    if (error) throw error;
                    if (result.rows.length > 0) { res.send("Login Sucessfull..."); }
                    else { res.send("Mismatched data..."); }

                });
            }
            else {
                var q9 = "BEGIN;" +
                    "INSERT INTO userInfo(user_mobile) VALUES ('" + mobileNumber + "');" +
                    "INSERT INTO inventoryData(user_mobile) VALUES ('" + mobileNumber + "');" +
                    "COMMIT;";
                con.query(q9, (error, result) => {
                    if (error) throw error;
                    mobileNo = mobileNumber;
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
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
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
const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    let additionalBox;
    if (decoded) {
        try {
            var houseType = req.body.houseType.replace(' ', '').toLowerCase();
            var familyType = (req.body.familyType).toLowerCase();
            var members = parseInt(req.body.familyNumber);
            
            let identifier = req.body.phoneNumber;
            const mobileNumber = authmiddleware.decryptIdentifier(identifier);
            console.log("total box backend :", houseType, familyType, members, mobileNumber);
            var q10 = "SELECT boxes_qty FROM boxfixedprice WHERE family_type = '" + familyType + "' AND house_type = '" + houseType + "'";


            con.query(q10, (error, result) => {
                if (error) throw error;
                var flag = result.rows[0].boxes_qty;
                if (familyType == 'bachelor' && members > 1) {
                    additionalBox = (members - 1) * 4;
                }
                if (familyType == 'family' && members > 4) {
                    additionalBox = (members - 4) * 4;
                }
                else {
                    additionalBox = 0;
                }

                var q13 = "UPDATE userInfo SET house_type = '" + houseType + "' , family_type='" + familyType + "' WHERE user_mobile = '" + mobileNumber + "'";
                con.query(q13, (error, result) => {
                    if (error) throw error;
                    console.log("ADDITIONAL BOXES: ", additionalBox);
                });
                res.status(200).json(additionalBox);
            });
        }
        catch (error) {
            res.status(401).json({ type: 'not found', message: 'Invalid' }); // added
            console.error(error.message);
        }
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
    }
});

app.put(`/api/basePrice`, (req, res) => {
    let basePrice;
    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
    try {
        var fromAdd = req.body.fromAddress;
        var toAdd = req.body.toAddress;
        var totalDistance = Math.round(parseFloat(req.body.distance));
        var houseType = req.body.houseType.replace(' ', '').toLowerCase();

        let identifier = req.body.phoneNumber;
        const mobileNumber = authmiddleware.decryptIdentifier(identifier);


        console.log("From Address: ", fromAdd);
        console.log("To Address: ", toAdd);
        console.log("Total Distance: ", totalDistance)
        console.log("House Type: ", houseType)
        var q11 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', total_distance = '" + totalDistance + "' WHERE user_mobile='" + mobileNumber + "'";
        con.query(q11, (error, result) => {
            if (error) throw error;
            if (true) {
                if (houseType == "1rk") {
                    if (totalDistance <= 5) {
                        basePrice = 2199;
                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        basePrice = 2499;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        basePrice = 2799;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        basePrice = 2999;
                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        basePrice = 3349;
                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        basePrice = 3699;
                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        basePrice = 4099;
                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        basePrice = 4499;
                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        basePrice = 4849;
                    }
                    if (totalDistance >= 50) {
                        basePrice = 5199;
                    }
                }

                if (houseType == "1bhk") {
                    if (totalDistance <= 5) {
                        basePrice = 3199;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        basePrice = 4499;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        basePrice = 4999;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        basePrice = 5299;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        basePrice = 6499;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        basePrice = 6999;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        basePrice = 7499;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        basePrice = 7999;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        basePrice = 8499;

                    }
                    if (totalDistance >= 50) {
                        basePrice = 8999;

                    }
                }

                if (houseType == "1bhkHeavy") {
                    if (totalDistance <= 5) {
                        basePrice = 3899;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        basePrice = 4499;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        basePrice = 5499;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        basePrice = 5999;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        basePrice = 6549;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        basePrice = 7099;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        basePrice = 7649;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        basePrice = 8199;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        basePrice = 8749;

                    }
                    if (totalDistance >= 50) {
                        basePrice = 9299;

                    }
                }

                if (houseType == "2bhk") {
                    if (totalDistance <= 5) {
                        basePrice = 7999;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        basePrice = 12999;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        basePrice = 13999;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        basePrice = 13999;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        basePrice = 14899;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        basePrice = 15799;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        basePrice = 16699;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        basePrice = 17599;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        basePrice = 18499;

                    }
                    if (totalDistance >= 50) {
                        basePrice = 19399;

                    }
                }

                if (houseType == "2bhkHeavy") {
                    if (totalDistance <= 5) {
                        basePrice = 8999;

                    }
                    if (totalDistance >= 5 && totalDistance <= 10) {
                        basePrice = 14999;

                    }
                    if (totalDistance >= 10 && totalDistance <= 15) {
                        basePrice = 16999;

                    }
                    if (totalDistance >= 15 && totalDistance <= 20) {
                        basePrice = 17999;

                    }

                    if (totalDistance >= 20 && totalDistance <= 25) {
                        basePrice = 18999;

                    }
                    if (totalDistance >= 25 && totalDistance <= 30) {
                        basePrice = 19999;

                    }
                    if (totalDistance >= 30 && totalDistance <= 35) {
                        basePrice = 20999;

                    }
                    if (totalDistance >= 35 && totalDistance <= 40) {
                        basePrice = 21999;

                    }
                    if (totalDistance >= 40 && totalDistance <= 45) {
                        basePrice = 22999;

                    }
                    if (totalDistance >= 50) {
                        basePrice = 23999;

                    }
                }
                res.setHeader('Content-Type', 'application/json');
                console.log("Base Price: ", basePrice);
                res.json(basePrice).status(200);
            }
        });
    }
    catch (error) {
        res.status(401).json({ type: 'not found', message: 'Invalid' }); // added
        console.error(error.message);
    }

    } else {
        // Token verification failed
        res.status(401).json({ type: 'invalidToken', message: 'Invalid token' });
    }

})

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

    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
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
} else {
    // Token verification failed
    res.status(401).json({ type: 'error', message: 'Invalid token' });
}
});

app.get(`/api/getUserInfo`, (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
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
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
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
    
    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
    const insertData = {
        addons: addons,
    };
    var add_on = JSON.stringify(insertData);
    var q16 = "UPDATE inventoryData SET addons='" + add_on + "'::jsonb WHERE user_mobile='" + global.mobile + "'";
    con.query(q16, (error, result) => {
        if (error) throw error;
        res.send("User added Addons: " + result.rows);
    })
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
    }
});

app.get(`/api/myBooking`, (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
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
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
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

    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
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
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
    }
});

app.put(`/api/inventory`, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
    try {
        
        let identifier = req.body.mobile;
        const mobile = authmiddleware.decryptIdentifier(identifier);

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
        q21 = "INSERT INTO inventoryData (user_inventory, book_date, book_slot_time, addons,order_id, user_current_date, additional_box ,total_items, user_mobile) VALUES ('" + user_inventory + "','" + req.body.dataTime.selectedDay.bookingDate + "','" + req.body.dataTime.selectedTime.label + "', '" + addons + "', '" + global.orderID + "', '" + currentDate + "', '" + value + "' ,'" + req.body.totalCost.totalItemCount + "','" + mobile + "' )";

        con.query(q21, (error, result) => {
            if (error) throw error;
            console.log("Inventory Succefully Added: ", result.rows);
            res.send(result.rows);
        })
    }

    catch (error) {
        console.error(error.messaege);
    }
    } else {
        // Token verification failed
        res.status(401).json({ type: 'error', message: 'Invalid token' });
    }
});

app.post('/api/sendOTP', (req, res) => {
    let { identifier } = req.body;
    
    const mobileNumber = authmiddleware.decryptIdentifier(identifier);

    const token = authmiddleware.generateToken({ mobileNumber });
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
            const responseData = {
            status: response.status,
            data: response.data,
            // Add other relevant properties as needed
            };
            res.status(200).json({ response: responseData, token });
        })
        .catch(function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});


app.post(`/api/verifyOTP`, (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1];
    let  decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        let { OTP: otp, phoneNumber: mobileNumber }  = authmiddleware.decryptIdentifier(req.body.encData);
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
    } else {
        // Token verification failed
        console.error('Invalid token verifyOTP');
        res.status(401).json({ type: 'invalidToken', message: 'Invalid token' });
    }
    
});


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
        "redirectUrl": "https://shiftkart.co/payments",
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

    let paymentDataBase64 = btoa(JSON.stringify(paymentData,null,1));
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
        console.log("Pay API Complete Response: ",paymentURL);
        q23 = "UPDATE INTO inventorydata SET payment_url_response = '"+ paymentres.data+"' WHERE user_mobile = '"+global.mobile +"' ";
        con.query(q23, (error,result)=>{
            if(error) throw error;
            console.log("INserting whole response of PayAPI: ",result.rows);
        });
        console.log("Generated URL: ",paymentres.data.data.instrumentResponse.redirectInfo.url);
        res.status(200).json(paymentURL, paymentData.merchantId, paymentData.merchantTransactionId);
    } else {
        res.status(200).json("Unable to generate payment url");
    }
});



app.get("/api/checkPaymentStatus", async (req, res) => {

    var minm6 = 100000; var maxm6 = 999999;
    let randomNumSix = Math.floor(Math.random() * (maxm6 - minm6 + 1)) + minm6;
    var minm4 = 1000; var maxm4 = 9999;
    let randomNumFour = Math.floor(Math.random() * (maxm4 - minm4 + 1)) + minm4;
    const checkStatusAPi = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MerchantID}/${global.merchantTransactionId}`;
    console.log("Merchant Transaction ID in checkPaymentStatus API: ",global.merchantTransactionId );
    console.log("MerchantID in checkPaymentStatus API: ",global.MerchantID );
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
        console.log("Payment complete response: ",paymentStatus);
        q24 = "BEGIN ;" + 
            "INSERT INTO payments (order_id, user_mobile) SELECT (order_id, user_mobile) FROM inventorydata WHERE user_mobile = '"+global.mobile +"' ;" +
            "INSERT INTO payments (merchant_id, transaction_id, total_amount, payment_status, payment_response) VALUES ('"+process.env.MerchantID+"', '"+global.merchantTransaction+"', '"+ paymentres.data.data.amount +"', '"+ paymentres.data.code +"', '"+ paymentres.data +"') ;" +
            "COMMIT ;";
        con.query(q24, (error, result) => {
            if (error)
                throw error;
            global.paymentResponse = result.rows;
            console.log("Payment url complete response: ",global.paymentResponse);
            q25 = "INSERT INTO inventorydata (payment_url_response) VALUES ('"+ global.paymentResponse +"')";
            con.query(q25,(error,result)=>{
                if(error) throw error;
            });
        });
        res.status(200).json("OK");
    }
    else
        res.status(200).json("Payment Fauiler");

});


app.listen(port, () => {
    console.log("Server running on", port);
});
