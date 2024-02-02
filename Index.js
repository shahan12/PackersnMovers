const authmiddleware = require('./authmiddleware');  // Assuming authmiddleware.js is in the same directory
require('dotenv').config();

const IP = require('ip');
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
// const base64json = require('base64json');
var app = express();

app.use(cors({
    origin: process.env.BASE_URL,
    methods: 'GET, POST, OPTIONS, PUT',
    credentials: true,
    allowedHeaders: 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization',
}));

const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

con.connect((err) => {
    if (err) throw err;
});


function getCurrentDate(format) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const yyyy = today.getFullYear();
    if (format) {
        return yyyy + '-' + mm + '-' + dd;
    }
    else return dd + mm + yyyy;
}

// Function to generate a random 6-digit number
function getRandNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Function to extract the last 4 digits of a phone number 
function getLast4Digitmobile(mobile) {
    if (typeof mobile === 'string' && mobile.length >= 4) {
        return mobile.slice(-4);
    }
}

function circularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return; // If circular reference, return undefined
            }
            seen.add(value);
        }
        return value;
    };
}

function getOrderSessionID(mobileNumber) {
    var randNum = getRandNumber();
    var last4Digits = getLast4Digitmobile(mobileNumber);
    var orderSessionID = randNum + last4Digits;
    return orderSessionID
}

app.get(`/api/health`, (req, res) => {
    try {
        res.send('OK');
    }
    catch (error) {
        console.error(error.message);
    }
});
app.get(`/api/stat`, (req, res) => {
    try {
        res.send(`running on - :${port}`);
    }
    catch (error) {
        console.error(error.message);
    }
});

app.post(`/api/login`, (req, res) => {                                                          //// DONE
    const token = req.headers.authorization.split(' ')[1];

    const currentTimeUTC = new Date();
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const currentTimeIST = new Date(currentTimeUTC.getTime() + ISTOffset);
    const currentTime = currentTimeIST.toISOString();

    const decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        const mobileNumber = authmiddleware.decryptIdentifier(req.body.encData, "/login");
        const orderSessionId = getOrderSessionID(mobileNumber);
        console.log(" login ", mobileNumber, orderSessionId);
        try {
            var q8 = "SELECT user_mobile FROM userprofile WHERE user_mobile = '" + mobileNumber + "'";
            con.query(q8, (error, result) => {
                if (error) throw error;
        
                if (result.rows.length <= 0) {
                    // Insert into userinfo, inventoryData, and userprofile
                    var q9 = "BEGIN;" +
                        "INSERT INTO userInfo(user_mobile, order_session_id, time_of_update) VALUES ('" + mobileNumber + "', '" + orderSessionId + "', '" + currentTime + "');" +
                        "INSERT INTO inventoryData(user_mobile,order_session_id) VALUES ('" + mobileNumber + "',  '" + orderSessionId + "');" +
                        "INSERT INTO userprofile(user_mobile) VALUES ('" + mobileNumber + "');" +
                        "COMMIT;";
        
                    con.query(q9, (error, result) => {
                        if (error) throw error;
                        res.json({ type: 'success', message: 'Login Successful...', data: orderSessionId }).status(200);
                    });
                } else {
                    // User profile already exists, only insert into userinfo and inventoryData
                    var q12 = "BEGIN;" +
                        "INSERT INTO userInfo(user_mobile, order_session_id, time_of_update) VALUES ('" + mobileNumber + "', '" + orderSessionId + "', '" + currentTime + "');" +
                        "INSERT INTO inventoryData(user_mobile,order_session_id) VALUES ('" + mobileNumber + "',  '" + orderSessionId + "');" +
                        "COMMIT;";
        
                    con.query(q12, (error, result) => {
                        if (error) throw error;
                        res.json({ type: 'success', message: 'Login Successful...', data: orderSessionId }).status(200);
                    });
                }
            });
        } 
        
        catch (error) {
            console.error(error.message);
            res.json({ type: 'serverError', message: 'Server Error' }).status(200);

        }
    } else {
        // Token verification failed
        res.json({ type: 'invalidToken', message: 'Invalid token' }).status(200);
    }
});


app.post(`/api/rebook`, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const currentTimeUTC = new Date();
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const currentTimeIST = new Date(currentTimeUTC.getTime() + ISTOffset);
    const currentTime = currentTimeIST.toISOString();

    const decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        const mobile = authmiddleware.decryptIdentifier(req.body.data);
        const orderSessionId = getOrderSessionID(mobile);
        console.log(" login ", mobile, orderSessionId);
        
        try {
            // Only insert into userinfo and inventoryData
            var q12 = "BEGIN;" +
                "INSERT INTO userInfo(user_mobile, order_session_id, time_of_update) VALUES ('" + mobile + "', '" + orderSessionId + "', '" + currentTime + "');" +
                "INSERT INTO inventoryData(user_mobile,order_session_id) VALUES ('" + mobile + "',  '" + orderSessionId + "');" +
                "COMMIT;";

            con.query(q12, (error, result) => {
                if (error) throw error;
                res.json({ type: 'success', message: 'generated new session ID', data: orderSessionId }).status(200);
            });
        } catch (error) {
            console.error(error.message);
            res.json({ type: 'serverError', message: 'Server Error' }).status(500);
        }
    } else {
        // Token verification failed
        res.json({ type: 'invalidToken', message: 'Invalid token' }).status(401);
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
});

app.put(`/api/totalNoBoxes`, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    const houseTypes = [
        "1 RK",
        "1 BHK",
        "2 BHK",
    ];
    const requiredValues = ["1 RK", "1 BHK", "2 BHK"];
    const valuesExist = requiredValues.every(value => houseTypes.includes(value));
    let additionalBox;
    if (decoded && req.body.orderSessionId) {
        try {

            
            const currentTimeUTC = new Date();
            const ISTOffset = 5.5 * 60 * 60 * 1000;
            const currentTimeIST = new Date(currentTimeUTC.getTime() + ISTOffset);
            const currentTime = currentTimeIST.toISOString();

            var houseType = req.body.houseType.replace(' ', '').toLowerCase();
            var familyType = (req.body.familyType).toLowerCase();
            var members = parseInt(req.body.familyNumber);
            var fromFloorNum = '';
            if (req.body.floorNumber === 'Ground Floor') {
                fromFloorNum = 0;
            } else {
                fromFloorNum = parseInt(req.body.floorNumber);
            }
            var fromLift = req.body.fromLift;

            var toFloorNum = '';
            if (req.body.toFloor === 'Ground Floor') {
                toFloorNum = 0;
            } else {
                toFloorNum = parseInt(req.body.toFloor);
            }
            var tolift = req.body.toLift;
            var fromAdd = req.body.fromAddress;
            var toAdd = req.body.toAddress;
            var totalDistance = req.body.distance;
            let identifier = req.body.phoneNumber;
            const mobileNumber = authmiddleware.decryptIdentifier(identifier);
            const orderSessionId = req.body.orderSessionId;

            const q13 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', from_floor = '" + fromFloorNum + "' " +
    ", to_floor = '" + toFloorNum + "', from_lift = '" + fromLift + "', to_lift = '" + tolift + "', family_type = '" + familyType + "', house_type = '" + houseType + "' " +
    ", total_distance= '" + totalDistance + "', time_of_update = '" + currentTime + "' WHERE user_mobile = '" + mobileNumber + "' AND order_session_id = '" + orderSessionId + "' ";

            con.query(q13, (error, result) => {
                if (error) throw error;
            });
            if (houseTypes.includes(req.body.houseType)) {
                console.log("in if")
                var q10 = "SELECT boxes_qty FROM boxfixedprice WHERE family_type = '" + familyType + "' AND house_type = '" + houseType + "'";
                con.query(q10, (error, result) => {
                    if (error) { additionalBox = 0; throw error; }
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

                    res.json(additionalBox).status(200);
                });
            }
            else {
                additionalBox = 0;
                let orderID;
                const prefix = 'SK';
                const currentDate = getCurrentDate()
                const currentDate1 = getCurrentDate(true);
                const randomDigits = getRandNumber();
                const last4Digits = getLast4Digitmobile(mobileNumber);
                orderID = `${prefix}${currentDate}-${last4Digits}${randomDigits}`;


                var q27 = "BEGIN;" +
                "UPDATE userinfo SET order_id = '" + orderID + "', time_of_update = '" + currentTime + "' WHERE user_mobile = '" + mobileNumber + "' AND order_session_id = '" + orderSessionId + "';" +
                "UPDATE inventorydata SET order_id = '" + orderID + "', booking_type = 'class2', time_of_booking = '" + currentTime + "' WHERE user_mobile = '" + mobileNumber + "' AND order_session_id = '" + orderSessionId + "';" +
                "COMMIT;";
                con.query(q27, (error, result) => {
                    if (error) throw error;

                    res.json(additionalBox).status(200);
                });

            }
        }

        catch (error) {

            console.error(error.message);
            return res.status(200).json({ type: 'serverError', message: 'Server Error' }); // added
        }
    } else {
        // Token verification failed
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }
});

app.put(`/api/basePrice`, (req, res) => {
    let basePrice = 0;
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        try {
            var totalDistance = parseFloat(req.body.distance.replace(/[^\d.]/g, ''));

            var houseType = req.body.houseType.replace(' ', '').toLowerCase();

            if (houseType == "1rk") {
                if (totalDistance <= 5) { basePrice = 2199; }
                if (totalDistance >= 5 && totalDistance <= 10) { basePrice = 2499; }
                if (totalDistance >= 10 && totalDistance <= 15) { basePrice = 2799 }
                if (totalDistance >= 15 && totalDistance <= 20) { basePrice = 2999; }
                if (totalDistance >= 20 && totalDistance <= 25) { basePrice = 3349; }
                if (totalDistance >= 25 && totalDistance <= 30) { basePrice = 3699; }
                if (totalDistance >= 30 && totalDistance <= 35) { basePrice = 4099; }
                if (totalDistance >= 35 && totalDistance <= 40) { basePrice = 4499; }
                if (totalDistance >= 40 && totalDistance <= 45) { basePrice = 4849; }
                if (totalDistance >= 50) { basePrice = 5199; }
            }

            else if (houseType == "1bhk") {
                if (totalDistance <= 5) { basePrice = 3199; }
                if (totalDistance >= 5 && totalDistance <= 10) { basePrice = 4499; }
                if (totalDistance >= 10 && totalDistance <= 15) { basePrice = 4999; }
                if (totalDistance >= 15 && totalDistance <= 20) { basePrice = 5299; }

                if (totalDistance >= 20 && totalDistance <= 25) { basePrice = 6499; }
                if (totalDistance >= 25 && totalDistance <= 30) { basePrice = 6999; }
                if (totalDistance >= 30 && totalDistance <= 35) { basePrice = 7499; }
                if (totalDistance >= 35 && totalDistance <= 40) { basePrice = 7999; }
                if (totalDistance >= 40 && totalDistance <= 45) { basePrice = 8499; }
                if (totalDistance >= 50) { basePrice = 8999; }
            }

            else if (houseType == "1bhkHeavy") {
                if (totalDistance <= 5) { basePrice = 3899; }
                if (totalDistance >= 5 && totalDistance <= 10) { basePrice = 4499; }
                if (totalDistance >= 10 && totalDistance <= 15) { basePrice = 5499; }
                if (totalDistance >= 15 && totalDistance <= 20) { basePrice = 5999; }
                if (totalDistance >= 20 && totalDistance <= 25) { basePrice = 6549; }
                if (totalDistance >= 25 && totalDistance <= 30) { basePrice = 7099; }
                if (totalDistance >= 30 && totalDistance <= 35) { basePrice = 7649; }
                if (totalDistance >= 35 && totalDistance <= 40) { basePrice = 8199; }
                if (totalDistance >= 40 && totalDistance <= 45) { basePrice = 8749; }
                if (totalDistance >= 50) { basePrice = 9299; }
            }

            else if (houseType == "2bhk") {
                if (totalDistance <= 5) { basePrice = 7999; }
                if (totalDistance >= 5 && totalDistance <= 10) { basePrice = 12999; }
                if (totalDistance >= 10 && totalDistance <= 15) { basePrice = 13999; }
                if (totalDistance >= 15 && totalDistance <= 20) { basePrice = 13999; }
                if (totalDistance >= 20 && totalDistance <= 25) { basePrice = 14899; }
                if (totalDistance >= 25 && totalDistance <= 30) { basePrice = 15799; }
                if (totalDistance >= 30 && totalDistance <= 35) { basePrice = 16699; }
                if (totalDistance >= 35 && totalDistance <= 40) { basePrice = 17599; }
                if (totalDistance >= 40 && totalDistance <= 45) { basePrice = 18499; }
                if (totalDistance >= 50) { basePrice = 19399; }
            }

            else if (houseType == "2bhkHeavy") {
                if (totalDistance <= 5) { basePrice = 8999; }
                if (totalDistance >= 5 && totalDistance <= 10) { basePrice = 14999; }
                if (totalDistance >= 10 && totalDistance <= 15) { basePrice = 16999; }
                if (totalDistance >= 15 && totalDistance <= 20) { basePrice = 17999; }
                if (totalDistance >= 20 && totalDistance <= 25) { basePrice = 18999; }
                if (totalDistance >= 25 && totalDistance <= 30) { basePrice = 19999; }
                if (totalDistance >= 30 && totalDistance <= 35) { basePrice = 20999; }
                if (totalDistance >= 35 && totalDistance <= 40) { basePrice = 21999; }
                if (totalDistance >= 40 && totalDistance <= 45) { basePrice = 22999; }
                if (totalDistance >= 50) { basePrice = 23999; }
            }
            else basePrice = 0;
            res.json(basePrice).status(200);
        }
        catch (error) {
            res.status(200).json({ type: 'Server Error', message: 'Something went wrong! PLease try again later' }); // added
            console.error(error.message);
        }

    } else {
        // Token verification failed
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
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

app.get(`/api/getUserInfo`, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {

        const mobileNumber = authmiddleware.decryptIdentifier(req.query.id);
        try {
            var q4 = "SELECT * FROM " +
                "userprofile WHERE user_mobile = '" + mobileNumber + "'";
            con.query(q4, (err, result) => {
                if (err) throw err;
                let books = result.rows;
                const ebooks = authmiddleware.encryptData(books);
                res.send(ebooks);
            });
        }
        catch (error) {
            res.status(200).json({ type: 'serverError', message: 'server Error' });
            console.error(error.messaege);
        }
    } else {
        // Token verification failed
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
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

app.post(`/api/myBooking`, (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        const mobile = authmiddleware.decryptIdentifier(req.body.data);
        try {
            const q17 = `SELECT 
                userinfo.house_type, 
                userinfo.total_distance, 
                userinfo.from_address,
                userinfo.to_address,userinfo.time_of_update,
                inventorydata.book_date,
                inventorydata.book_slot_time,
                inventorydata.total_items,
                inventorydata.final_amount,
                inventorydata.additional_box,
                inventorydata.order_id,
                inventorydata.total_cost,
                inventorydata.booking_type,
                inventorydata.user_inventory,
                inventorydata.time_of_booking,
                inventorydata.addons,
                payments.transaction_id,
                payments.final_payment_code,
                payments.initial_payment_code,
                payments.time_of_payment,
                payments.merchant_user
            FROM userinfo
            LEFT JOIN payments ON userinfo.order_id = payments.order_id
            INNER JOIN inventorydata ON userinfo.order_id = inventorydata.order_id
            WHERE userinfo.user_mobile = $1
            AND (payments.order_id IS NOT NULL OR inventorydata.order_id IS NOT NULL);`;
console.log("User Mobile Number in myBooking API: ", mobile);


            con.query(q17, [mobile], (error, results) => {
                if (error) throw error;
                if (results.rows.length >= 1) {
                    let books = results.rows;
                    const ebooks = authmiddleware.encryptData(books);
                    const responseData = {
                        ebooks: ebooks,
                        type: 'success'
                    }
                    res.send(responseData);
                }
                else res.status(200).json({ type: 'empty', message: 'No Bookings Found' });
            });
                }
                catch (error) {
    console.error(error.message);
}
            } else {
    // Token verification failed
    res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
}
        });


app.post(`/api/selectedOrder`, (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        const mobile = authmiddleware.decryptIdentifier(req.body.data.userMobile);
        const orderId = authmiddleware.decryptIdentifier(req.body.data.orderID);
        try {

            const q11 = ` SELECT inventorydata.user_inventory, inventorydata.book_date, inventorydata.book_slot_time, inventorydata.user_mobile, inventorydata.addons, inventorydata.user_current_date,
                    inventorydata.additional_box, inventorydata.total_items, inventorydata.total_cost, payments.transaction_id, payments.merchant_user, payments.final_payment_code
                     FROM inventorydata INNER JOIN payments ON inventorydata.order_id = payments.order_id WHERE inventorydata.user_mobile = payments.user_mobile 
                    AND inventorydata.user_mobile = $1 AND payments.order_id = $2 `;

            con.query(q11, [mobile, orderId], (error, results) => {
                if (error) throw error;
                const inventoryAndPaymentResponse = results.rows;

                res.send(inventoryAndPaymentResponse);
            });
        }

        catch (error) {
            console.error(error.message);
        }
    } else {
        // Token verification failed
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
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
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        let { firstName: fName, lastName: lName, email: email, identifier: identifier } = authmiddleware.decryptIdentifier(req.body.encData);
        const mobileNumber = authmiddleware.decryptIdentifier(identifier);
        try {
            var profile = "";
            var q5 = "UPDATE userprofile SET user_f_name = '" + fName + "', user_l_name='" + lName + "', user_email='" + email + "'," +
                "user_profile='" + profile + "' WHERE  user_mobile = '" + mobileNumber + "'";
            con.query(q5, (err, result) => {
                if (err) throw err;
                res.json("updated").status(200);
            });
        }
        catch (error) {
            console.error(error.message);
        }
    } else {
        // Token verification failed
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }
});

app.post(`/api/inventory`, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        try {

            let identifier = req.body.mobile;
            const mobile = authmiddleware.decryptIdentifier(identifier);


            var addons = JSON.stringify(req.body.addons);
            var user_inventory = JSON.stringify(req.body.user_inventory);
            var dataTime = JSON.stringify(req.body.dataTime);
            var totalCost = JSON.stringify(req.body.totalCost);
            var parsedTotalCost = JSON.parse(totalCost); // Parsing the string back to an object
            var final_amount = parsedTotalCost.surgedTotalCost; 
            var orderSessionID = req.body.orderSessionId;
            console.log("inventory", mobile, orderSessionID,final_amount);
            // Concatenate the components to create the order ID
            let orderID;
            const prefix = 'SK';
            const currentDate = getCurrentDate();
            const randomDigits = getRandNumber();
            const phone = mobile;
            const last4Digits = getLast4Digitmobile(phone);

            orderID = `${prefix}${currentDate}-${last4Digits}${randomDigits}`;

            const encOrderID = authmiddleware.encryptData(orderID);
            let value = req.body.totalCost.totalBox;
            console.log(encOrderID, "new", orderSessionID,)

            const currentTimeUTC = new Date();
            const ISTOffset = 5.5 * 60 * 60 * 1000;
            const currentTimeIST = new Date(currentTimeUTC.getTime() + ISTOffset);
            const currentTime = currentTimeIST.toISOString();

            if (isNaN(value) || value === undefined) {
                value = 0;
            }

            var q21 = "UPDATE inventoryData SET user_inventory = '" + user_inventory + "', book_date = '" + req.body.dataTime.selectedDay.bookingDate + "', total_cost = '" + totalCost + "', final_amount = '" + final_amount + "', book_slot_time = '" + req.body.dataTime.selectedTime.label + "', addons = '" + addons + "', order_id = '" + orderID + "', user_current_date = '" + currentDate + "', additional_box = '" + value + "', total_items = '" + req.body.totalCost.totalItemCount + "', time_of_booking = '" + currentTime + "' WHERE user_mobile = '" + mobile + "' AND order_session_id = '" + orderSessionID + "'";


            var q26 = "INSERT INTO payments (user_mobile, order_id) VALUES('" + mobile + "', '" + orderID + "')";


            con.query(q21, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    con.query(q26, (error, result) => {
                        if (error) throw error;
                    })

                    var q22 = "UPDATE userinfo SET order_id = '" + orderID + "' WHERE user_mobile = '" + mobile + "' AND order_session_id = '" + orderSessionID + "'";

                    con.query(q22, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            res.json(encOrderID).status(200);
                        }
                    });
                }
            });


        }

        catch (error) {
            res.status(200).json({ response: "Internal Server Error", type: "failed" });
            console.log("error");
            console.error(error.messaege);
        }
    } else {
        // Token verification failed
        console.log("new error");
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
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
                    type: response.data.type,
                    token: token
                    // Add other relevant properties as needed
                };
                res.status(200).json(responseData);
            })
            .catch(function (error) {
                res.status(200).json({ data: error, type: "failed" })
                console.error(error);
            });
    }
    catch (error) {
        res.status(200).json({ response: "Internal Server Error", type: "failed" })
        console.error(error.message);
    }
});

app.post(`/api/verifyOTP`, (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
        let { OTP: otp, phoneNumber: mobileNumber } = authmiddleware.decryptIdentifier(req.body.encData);
        console.log("OTP is ", otp, mobileNumber);
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
                    const responseData = {
                        status: response.status,
                        type: response.data.type,
                        // Add other relevant properties as needed
                    };
                    // console.log("Response Data from verify otp: ", responseData);
                    // console.log("Verify Response: ",response);
                    res.status(200).json(responseData);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        catch (error) {
            console.error(error.message);
            res.status(200).json({ type: 'serverError', message: 'Server Error' });
        }
    } else {
        // Token verification failed
        console.error('Invalid token verifyOTP');
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }

});
app.post('/api/reSendOTP', (req, res) => {
    let { identifier } = req.body;

    const mobileNumber = authmiddleware.decryptIdentifier(identifier);

    const token = authmiddleware.generateToken({ mobileNumber });
    try {
        const options = {
            method: 'POST',
            url: `https://control.msg91.com/api/v5/otp/retry?retrytype=text&mobile=91${mobileNumber}`,
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
                    type: response.data.type,
                    token: token
                    // Add other relevant properties as needed
                };
                res.status(200).json(responseData);
            })
            .catch(function (error) {
                res.status(200).json({ data: error, type: "failed" })
                console.error(error);
            });
    }
    catch (error) {
        res.status(200).json({ response: "Internal Server Error", type: "failed" })
        console.error(error.message);
    }
});
app.post(`/api/payment`, async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {

        let { fullPayment: fullPayment, identifier: identifier, savedOrderID: savedOrderID, orderSessionId: orderSessionId } = authmiddleware.decryptIdentifier(req.body.encData);
        const mobileNumber = authmiddleware.decryptIdentifier(identifier);
        const OrderID = authmiddleware.decryptIdentifier(savedOrderID);
        // const intialAmount = parseFloat(fullPayment) * 0.15 ;
        const intialAmount = parseFloat(fullPayment);
        console.log("Full payment: ", fullPayment, OrderID);
        const salt = {
            "keyIndex": process.env.SALT_KEY_INDEX,
            "key": process.env.SALT_KEY
        }

        var minm6 = 100000; var maxm6 = 999999;
        let randomNumSix = Math.floor(Math.random() * (maxm6 - minm6 + 1)) + minm6;
        var minm4 = 1000; var maxm4 = 9999;
        let randomNumFour = Math.floor(Math.random() * (maxm4 - minm4 + 1)) + minm4;
        let merchantPrefix = process.env.MerchantPrefix;
        let MerchantPrefixUser = process.env.MerchantPrefixUser;
        let merchantTransaction = merchantPrefix + mobileNumber + randomNumFour + randomNumSix;
        let merID = merchantTransaction;
        let merchantUser = MerchantPrefixUser + mobileNumber + randomNumFour + randomNumSix;
        const paymentData = {
            "merchantId": process.env.MerchantID,
            "merchantTransactionId": merchantTransaction,
            "merchantUserId": merchantUser,
            "amount": (intialAmount * 100),
            "redirectUrl": "https://shiftkart.co/payments",
            "redirectMode": "REDIRECT",
            "callbackUrl": "https://shiftkart.co/payments",
            "mobileNumber": mobileNumber,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }
        const paymentAPI = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

        let paymentDataBase64 = btoa(JSON.stringify(paymentData, null, 1));
        let paymentDataBase64Xverify = paymentDataBase64 + "/pg/v1/pay" + salt.key;
        let xverify = crypto.createHash('sha256').update(paymentDataBase64Xverify).digest('hex');
        let payRes = ""
        xverify += "###1";
        let paymentres = await axios.post(paymentAPI, { request: paymentDataBase64 }, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xverify
            }
        })
        payRes = JSON.stringify(paymentres.data, circularReplacer());
        xverify = "";
        let isSuccess = paymentres.data.success;
        let code = paymentres.data.code;
        
        const currentTimeUTC = new Date();
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const currentTimeIST = new Date(currentTimeUTC.getTime() + ISTOffset);
        const currentTime = currentTimeIST.toISOString();

    
        console.log("PAYMENT code", code, "isSuccess", isSuccess, "currentTime", currentTime);
        
        if (isSuccess) {
            const paymentURL = paymentres.data.data.instrumentResponse.redirectInfo.url;

            const q28 = "UPDATE payments SET transaction_id = '" + merchantTransaction + "', merchant_user = '" + merchantUser + "', total_amount = '" + '99' + "', paid_amount = '" + intialAmount + "', initial_payment_code = '" + code + "', initial_payment_response = '" + payRes + "', time_of_payment = '" + currentTime + "' WHERE user_mobile = '" + mobileNumber + "' AND order_id = '" + OrderID + "' ";


            con.query(q28, (error, result) => {
                if (error) throw error;
            });
            console.log("in payment", paymentURL, merID, paymentres.data);
            const encOrderID = authmiddleware.encryptData({ paymentURL, merID });
            res.status(200).json(encOrderID);
        } else {
            res.status(200).json("URLResponseError");
        }
    } else {
        // Token verification failed
        console.error('Invalid token verifyOTP');
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }
});

app.post("/api/checkPaymentStatus", async (req, res) => {
    console.log('In check Paymnt');
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {

        let { savedOrderID: savedOrderID, identifier: identifier, merTID: merTID, orderSessionId: orderSessionId } = authmiddleware.decryptIdentifier(req.body.encData);

        const OrderID = authmiddleware.decryptIdentifier(savedOrderID);
        const mobileNumber = authmiddleware.decryptIdentifier(identifier, "/checkPaymentStatus");

        const finalXHeader = `${crypto.createHash('sha256').update(`/pg/v1/status/${process.env.MerchantID}/${merTID}${process.env.SALT_KEY}`).digest('hex')}###${process.env.SALT_KEY_INDEX}`;

        const response = await axios.get(`https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MerchantID}/${merTID}`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-VERIFY': finalXHeader,
                'X-MERCHANT-ID': process.env.MerchantID,
            },
        });
        console.log(response, "new");

        let isSuccess = true;
        let finalCode = response.data.code;
        let finalResponse = JSON.stringify(response.data.data, circularReplacer());
        console.log("RETRY PAYMENT finalResponse", finalResponse, "finalCode", finalCode, "isSuccess", isSuccess);
        if (isSuccess) {

            var q24 = "UPDATE payments SET final_payment_code = '" + finalCode + "',  final_payment_response = '" + finalResponse + "' WHERE user_mobile = '" + mobileNumber + "' AND order_id = '" + OrderID + "' ";

            con.query(q24, (error, result) => {
                if (error)
                    throw error;
            });
            res.status(200).json({ type: 'success', message: 'success' });
        }
        else
            res.status(200).json({ type: 'server Error', message: 'Error' });
    } else {
        // Token verification failed
        console.error('Invalid token verifyOTP');
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }

});


app.post(`/api/retryPayment`, async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {

        let { payAmount:payAmount , identifier:identifier , order_id:order_id } = authmiddleware.decryptIdentifier(req.body.encData);
        // const mobileNumber = authmiddleware.decryptIdentifier(identifier);
        const userMobile = authmiddleware.decryptIdentifier(identifier);
        // const intialAmount = parseFloat(payAmount) * 0.15 ;
        const intialAmount = parseFloat(payAmount);
        const totalAmt = payAmount; 
        console.log("Retry Payment: ",intialAmount, payAmount, order_id);
        const salt = {
            "keyIndex": process.env.SALT_KEY_INDEX,
            "key": process.env.SALT_KEY
        }

        var minm6 = 100000; var maxm6 = 999999;
        let randomNumSix = Math.floor(Math.random() * (maxm6 - minm6 + 1)) + minm6;
        var minm4 = 1000; var maxm4 = 9999;
        let randomNumFour = Math.floor(Math.random() * (maxm4 - minm4 + 1)) + minm4;
        let merchantPrefix = process.env.MerchantPrefix;
        let MerchantPrefixUser = process.env.MerchantPrefixUser;
        let merchantTransaction = merchantPrefix + identifier + randomNumFour + randomNumSix;
        let merID = merchantTransaction;
        let merchantUser = MerchantPrefixUser + identifier + randomNumFour + randomNumSix;
        const paymentData = {
            "merchantId": process.env.MerchantID,
            "merchantTransactionId": merchantTransaction,
            "merchantUserId": merchantUser,
            "amount": (intialAmount * 100),
            "redirectUrl": "https://shiftkart.co/retrypayments",
            "redirectMode": "REDIRECT",
            "callbackUrl": "https://shiftkart.co/retrypayments",
            "mobileNumber": userMobile,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }
        const paymentAPI = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

        let paymentDataBase64 = btoa(JSON.stringify(paymentData, null, 1));
        let paymentDataBase64Xverify = paymentDataBase64 + "/pg/v1/pay" + salt.key;
        let xverify = crypto.createHash('sha256').update(paymentDataBase64Xverify).digest('hex');
        let payRes = ""
        xverify += "###1";
        let paymentres = await axios.post(paymentAPI, { request: paymentDataBase64 }, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xverify
            }
        })
        payRes = JSON.stringify(paymentres.data, circularReplacer());
        xverify = "";
        let isSuccess = paymentres.data.success;
        let code = paymentres.data.code; 

        if (isSuccess) {
            const paymentURL = paymentres.data.data.instrumentResponse.redirectInfo.url;

            const q29 = "UPDATE payments SET transaction_id = '" + merchantTransaction + "', merchant_user = '" + merchantUser + "', total_amount = '"+ totalAmt +"' , paid_amount = '" + intialAmount + "' , initial_payment_code = '" + code + "', initial_payment_response = '" + payRes + "' WHERE user_mobile = '" + userMobile + "' AND order_id = '" + order_id + "' ";

            con.query(q29, (error, result) => {
                if (error) throw error;
            });
            console.log("in payment", paymentURL, merID, paymentres.data);
            const encOrderID = authmiddleware.encryptData({ paymentURL, merID });
            res.status(200).json(encOrderID);
        } else {
            res.status(200).json("URLResponseError");
        }
    } else {
        // Token verification failed
        console.error('Invalid token verifyOTP');
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }
});

app.post("/api/retryCheckPaymentStatus", async (req, res) => {
    console.log('In Recheck Paymnt Status');
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {

        let { identifier: identifier, reMerTID:reMerTID, reOrderID: reOrderID } = authmiddleware.decryptIdentifier(req.body.encData);
        console.log("ReMerchID: ",reMerTID, "reOrderID: ",reOrderID);
        // const OrderID = authmiddleware.decryptIdentifier(reOrderID);
        const mobileNumber = authmiddleware.decryptIdentifier(identifier, "/checkPaymentStatus");

        const finalXHeader = `${crypto.createHash('sha256').update(`/pg/v1/status/${process.env.MerchantID}/${reMerTID}${process.env.SALT_KEY}`).digest('hex')}###${process.env.SALT_KEY_INDEX}`;

        const response = await axios.get(`https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MerchantID}/${reMerTID}`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'X-VERIFY': finalXHeader,
                'X-MERCHANT-ID': process.env.MerchantID,
            },
        });
        console.log(response, "new");

        let isSuccess = true;
        let finalCode = response.data.code;
        let finalResponse = JSON.stringify(response.data.data, circularReplacer());
        if (isSuccess) {

            var q24 = "UPDATE payments SET final_payment_code = '" + finalCode + "',  final_payment_response = '" + finalResponse + "', order_id = '"+ reOrderID +"', transaction_id ='"+ reMerTID +"' WHERE user_mobile = '" + mobileNumber + "' AND order_id = '" + reOrderID + "' ";

            con.query(q24, (error, result) => {
                if (error)
                    throw error;
            });
            res.status(200).json({ type: 'success', message: 'success' });
        }
        else
            res.status(200).json({ type: 'server Error', message: 'Error' });
    } else {
        // Token verification failed
        console.error('Invalid token verifyOTP');
        res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
    }

});


app.post('/api/saveUserEmail', (req,res)=>{
        try{
            let userEmail = authmiddleware.decryptIdentifier(req.body.encData);
            var q30 = `INSERT INTO useremail(user_email) VALUES($1)`;
            con.query(q30, [userEmail], (error,result)=>{
                if(error)
                    throw error;
                res.status(200).json({ type: 'success', message: 'success' });
            });
        }
        catch (error) {
            console.error(error.message);
            res.json({ type: 'serverError', message: 'Server Error' }).status(200);
        }
});


app.post('/api/sendSuccessBookingSMS', (req, res) => {
    let { templateID } = process.env.templateId;
    const mobileNumber = authmiddleware.decryptIdentifier(req.body.identifier);
    const token = req.headers.authorization.split(' ')[1];
    let decoded = authmiddleware.verifyToken(token);
    if (decoded) {
    try {
        const options = {
            method: 'POST',
            url: `https://control.msg91.com/api/v5/flow/`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: `${process.env.authKey}`
            },
            body:{
                template_id: process.env.templateId,
                short_url: 1,
                recipients: mobileNumber
            }
        };
        axios
            .request(options)
            .then(function (response) {
                const responseData = {
                    status: response.status,
                    type: response.data.type,
                    token: token
                    // Add other relevant properties as needed
                };
                // console.log("Response data from send otp: ", responseData);
                res.status(200).json(responseData);
            })
            .catch(function (error) {
                res.status(200).json({ data: error, type: "failed" })
                console.error(error);
            });
    }
    catch (error) {
        res.status(200).json({ response: "Internal Server Error", type: "failed" })
        console.error(error.message);
    }
}
else {
    // Token verification failed
    console.error('Invalid token verifyOTP');
    res.status(200).json({ type: 'invalidToken', message: 'Invalid token' });
}
});

app.listen(port, () => {
    console.log("Server running on", port);
});
