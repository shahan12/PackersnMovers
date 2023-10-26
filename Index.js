const express = require('express');
const con = require('./Connection');
const multer = require('multer');
var path = require('path');
var app = express();                           //totalBoxes and basePrice api need to be work on
var port = 3001;


var bodyParser = require('body-parser');
const { userInfo } = require('os');
const { Console } = require('console');
const { existsSync } = require('fs');
const { STATUS_CODES } = require('http');
var totalBoxes = 1;
var totalFloorCharges = 1;
var mobile;

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This code is for checking connection
con.connect((err) => {
    if (err) throw err;
});

// Demo Data for signup and login
const userSignup = {
    userMobile: "92326511777",
    password: "12345678"
}

// This api signup(post-> initially) the user and check password exist or not 
app.get('/login', (req, res) => {

    // var mobile = userSignup.userMobile;
    // var password = userSignup.password;


    mobile = req.query.userMobile;
    var password = req.query.password;
    var q8 = "SELECT user_mobile FROM userInfo WHERE user_mobile = '" + mobile + "'";


    con.query(q8, (error, result) => {
        if (error) throw error;
        if (result.rows.length > 0) {
            // console.log("user already exist");
            q6 = "SELECT user_mobile,user_password FROM userInfo WHERE user_mobile = '" + mobile + "' AND user_password = '" + password + "'";
            con.query(q6,(error, result)=>{
                if(error) throw error;
                if(result.rows.length > 0) {res.send("Login Sucessfull...");}
                else {res.send("Mismatched data...");}

            });
        }
        else {
            // console.log("new user to register");
            var q9 = "BEGIN;"+
            "INSERT INTO userInfo(user_mobile, user_password) VALUES ('"+mobile+"', '"+password+"');"+
            "INSERT INTO inventoryData(user_mobile) VALUES ('"+mobile+"');"+
            "INSERT INTO userBooking(user_mobile) VALUES ('"+mobile+"');"+
            "COMMIT;";
            con.query(q9, (error, result) => {
                if (error) throw error;
                mobileNo = mobile;
                // res.send("User logged in.." + result.rows);
                res.send("Login Sucessfull...");

            });

        }
    })
});

// This api is for check user mobile and password is exist in db or not
// app.get('/login', (req, res) => {

//     // var mobile = userSignup.userMobile;
//     // var password = userSignup.password;

//     var mobile = req.query.userMobile;
//     var password = req.query.password;

//     q6 = "SELECT user_mobile,user_password FROM userInfo WHERE user_mobile = '" + mobile + "' AND user_password = '" + password + "'";

//     con.query(q6, (error, result) => {
//         if (error) throw error;
//         if (result.rows.length > 0) {
//             res.send("Login Sucessfull...");
//         }
//         else {
//             res.send("Mismatched data...");
//         }

//     });
// });

//Demo data for updating the password
const updatePassword = {
    userMobile: "9232651130",
    newPass: "singh",
    cnfrmPass: "singh"
}

app.put('/updatePassword', (req, res) => {

    // var userNumber = updatePassword.userMobile;
    var newPassword = updatePassword.newPass;
    var cnfrmPassword = updatePassword.cnfrmPass;

    if (newPassword === cnfrmPassword) {
        q7 = "UPDATE userInfo SET user_password = '" + cnfrmPassword + "' WHERE user_mobile = '" + mobile + "'";
        con.query(q7, (error, result) => {
            if (error) throw error;
            res.send("Password updated..." + result.rows);
        });
    }
    else {
        res.send("Password Mismatched...");
    }
});

app.get('/logout', (req, res) => {
    if (error) throw error;
    res.redirect('./homepage.html');
})

// Demo data for calculating total no of boxes
const RequirementData = {
    "familyType": "bachelor",
    "houseType": "2bhk",
    "familyNumber": 5,
    "floorNumber": 3,
    "fromLift": "no",
    "toFloor": 3,
    "toLift": "no"
}

// This api get total no. of boxes
app.put('/totalNoBoxes', (req, res) => {

    // var houseType = RequirementData.houseType;
    // var familyType = RequirementData.familyType;
    // var members = RequirementData.familyNumber;
    // var mobile = userSignup.userMobile;
    var totalCarton;

    var houseType = req.body.houseType.replace(' ','').toLowerCase();
    var familyType = (req.body.familyType).toLowerCase();
    var members = parseInt(req.body.familyNumber);
    // var mobile = req.body.phoneNumber;
    console.log("total box backend :",houseType, familyType, members, mobile);
    var totalCarton;

    // var q13 = "UPDATE userInfo SET house_type = '" + houseType + "' , family_type='" + familyType + "' WHERE user_mobile = '" + updatePassword.userMobile + "'";
    var q13 = "UPDATE userInfo SET house_type = '" + houseType + "' , family_type='" + familyType + "' WHERE user_mobile = '" + mobile + "'";
    con.query(q13, (error, result) => {
        if (error) throw error;
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200);
    })

    var q10 = "SELECT boxes_qty FROM boxFixedPrice WHERE family_type = '" + familyType + "' AND house_type = '" + houseType + "'";


    con.query(q10, (error, result) => {
        if (error) throw error;

        var flag = result.rows[0].boxes_qty;
        if (familyType == 'bachelor' && members > 1) {
            var check = (members - 1) * 4;
            var totalBachelorBox = flag + check;
            totalCarton = totalBachelorBox;
            res.status(200).json(totalBachelorBox);
        }
        else if (members == 1) {
            // res.setHeader('Content-Type', 'application/json');
            totalCarton = flag ;
            res.status(200).json(flag);
        }
        if (familyType == 'family' && members > 1) {
            var check = (members - 4) * 4;
            var totalFamilyBox = flag + check;
            // res.setHeader('Content-Type', 'application/json');
            totalCarton = totalFamilyBox;
            res.status(200).json(totalFamilyBox);
        }
        else if (members == 4) {
            // res.setHeader('Content-Type', 'application/json');
            totalCarton = flag;
            res.status(200).json(flag);
        }
        
        q19 = "UPDATE inventoryData SET carton='"+totalCarton+"' WHERE user_mobile = '"+mobile+"'";
        con.query(q19,(error,result)=>{
            if(error) throw error;
            // res.status(200);
        });
    });

});

const Address = {
    from: "Mayur vihar phase-3",
    to: "pitampura sector-18",
    houseType: "1bhk",
    distance: 45
}
app.put('/basePrice', (req, res) => {

    // var fromAdd = Address.from;
    // var toAdd = Address.to;
    // var totalDistance = Address.distance;
    // var houseType = RequirementData.houseType;

    var fromAdd = req.body.fromAddress;
    var toAdd = req.body.toAddress;
    var totalDistance = Math.round(parseFloat(req.body.distance));
    var houseType = req.body.houseType.replace(' ','').toLowerCase();;
    // var phoneNumber=req.body.phoneNumber;
    
    console.log("backend rcvd in base price :");
    console.log("from address :",fromAdd);
    console.log("to address :",toAdd);
    console.log(totalDistance)
    console.log(houseType)
    console.log(mobile);

    // var q11 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', total_distance = '" + totalDistance + "' WHERE user_mobile='" + userSignup.userMobile + "'";
    var q11 = "UPDATE userInfo SET from_address = '" + fromAdd + "', to_address = '" + toAdd + "', total_distance = '" + totalDistance + "' WHERE user_mobile='" + mobile + "'";
    con.query(q11, (error, result) => {
        if (error) throw error;


        // var q12 = "SELECT * FROM userInfo WHERE house_type='"+houseType+"' AND user_mobile='"+userSignup.userMobile+"'";
        // con.query(q12,(error,result)=>{
        //     if(error) throw error;
        // })

        if (houseType == "1rk") {
            if (totalDistance <= 5) {
                basePrice = 2199;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 5 && totalDistance <= 10) {
                basePrice = 2499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 10 && totalDistance <= 15) {
                basePrice = 2799;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 15 && totalDistance <= 20) {
                basePrice = 2999;
                res.status(200).json(basePrice);
            }

            if (totalDistance >= 20 && totalDistance <= 25) {
                basePrice = 3349;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 25 && totalDistance <= 30) {
                basePrice = 3699;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 30 && totalDistance <= 35) {
                basePrice = 4099;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 35 && totalDistance <= 40) {
                basePrice = 4499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 40 && totalDistance <= 45) {
                basePrice = 4849;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 50) {
                basePrice = 5199;
                res.status(200).json(basePrice);
            }
        }
        if (houseType == "1bhk") {
            if (totalDistance <= 5) {
                basePrice = 3199;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 5 && totalDistance <= 10) {
                basePrice = 4499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 10 && totalDistance <= 15) {
                basePrice = 4999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 15 && totalDistance <= 20) {
                basePrice = 5299;
                res.status(200).json(basePrice);
            }

            if (totalDistance >= 20 && totalDistance <= 25) {
                basePrice = 6499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 25 && totalDistance <= 30) {
                basePrice = 6999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 30 && totalDistance <= 35) {
                basePrice = 7499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 35 && totalDistance <= 40) {
                basePrice = 7999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 40 && totalDistance <= 45) {
                basePrice = 8499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 50) {
                basePrice = 8999;
                res.status(200).json(basePrice);
            }
        }
        if (houseType == "1bhkHeavy") {
            if (totalDistance <= 5) {
                basePrice = 3899;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 5 && totalDistance <= 10) {
                basePrice = 4499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 10 && totalDistance <= 15) {
                basePrice = 5499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 15 && totalDistance <= 20) {
                basePrice = 5999;
                res.status(200).json(basePrice);
            }

            if (totalDistance >= 20 && totalDistance <= 25) {
                basePrice = 6549;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 25 && totalDistance <= 30) {
                basePrice = 7099;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 30 && totalDistance <= 35) {
                basePrice = 7649;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 35 && totalDistance <= 40) {
                basePrice = 8199;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 40 && totalDistance <= 45) {
                basePrice = 8749;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 50) {
                basePrice = 9299;
                res.status(200).json(basePrice);
            }
        }
        if (houseType == "2bhk") {
            if (totalDistance <= 5) {
                basePrice = 7999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 5 && totalDistance <= 10) {
                basePrice = 12999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 10 && totalDistance <= 15) {
                basePrice = 13999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 15 && totalDistance <= 20) {
                basePrice = 13999;
                res.status(200).json(basePrice);
            }

            if (totalDistance >= 20 && totalDistance <= 25) {
                basePrice = 14899;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 25 && totalDistance <= 30) {
                basePrice = 15799;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 30 && totalDistance <= 35) {
                basePrice = 16699;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 35 && totalDistance <= 40) {
                basePrice = 17599;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 40 && totalDistance <= 45) {
                basePrice = 18499;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 50) {
                basePrice = 19399;
                res.status(200).json(basePrice);
            }
        }
        if (houseType == "2bhkHeavy") {
            if (totalDistance <= 5) {
                basePrice = 8999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 5 && totalDistance <= 10) {
                basePrice = 14999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 10 && totalDistance <= 15) {
                basePrice = 16999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 15 && totalDistance <= 20) {
                basePrice = 17999;
                res.status(200).json(basePrice);
            }

            if (totalDistance >= 20 && totalDistance <= 25) {
                basePrice = 18999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 25 && totalDistance <= 30) {
                basePrice = 19999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 30 && totalDistance <= 35) {
                basePrice = 20999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 35 && totalDistance <= 40) {
                basePrice = 21999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 40 && totalDistance <= 45) {
                basePrice = 22999;
                res.status(200).json(basePrice);
            }
            if (totalDistance >= 50) {
                basePrice = 23999;
                res.status(200).json(basePrice);
            }
        }

    })


})

// This api get total floor w/o lift charges
app.put('/floorCharges', function (req, res) {

    var floorNumber = RequirementData.floorNumber;
    var fromLift = RequirementData.fromLift;
    var toFloor = RequirementData.toFloor;
    var toLift = RequirementData.toLift;
    // var userPhone = updatePassword.userMobile
    var finalCharges, charges1, charges2;

    var q14 = "UPDATE userInfo SET from_floor='" + floorNumber + "', from_lift='" + fromLift + "', to_floor='" + toFloor + "', to_lift='" + toLift + "' WHERE user_mobile='" + mobile + "'";
    con.query(q14, (error, result) => {
        if (error) throw error;
        res.status(200).json("Will reach you shortly");
    });

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


app.put('/saveUserInfo', storage, (req, res) => {
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    // var mobileNo = updatePassword.userMobile;
    var profile = req.file.path;

    var q3 = "UPDATE userInfo  SET user_f_name='" + fName + "', user_l_name= '" + lName + "', user_email='" + email + "',user_profile='" + profile + "' WHERE user_mobile='" + mobile + "'";

    con.query(q3, (error, result) => {
        if (error) throw error;
        console.log("Data uploded sucessfully");
        res.send(result.rows);
    });
});

// This is for getting user info base on user's mobile number
app.get('/getUserInfo', (req, res) => {

    // var mobile = userSignup.userMobile;
    // var mobile=req.query.phoneNumber;
    // console.log("rcvd phone of user :", mobile);
    
    var q4 = "SELECT * FROM " +
        "userInfo WHERE user_mobile = '" + mobile + "'";

    con.query(q4, (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
});

var dateSelection = {
    Date: "2023-10-18",
    timeSlot: "6AM-8AM"
}

app.put('/dateTimeSelect', (req, res) => {

    var finalDate = dateSelection.Date;
    var finalTime = dateSelection.timeSlot;
    // var mobile = userSignup.userMobile;

    var q15 = "UPDATE inventoryData SET event_date = '" + finalDate + "', event_time='" + finalTime + "' WHERE user_mobile = '"+mobile+"'";
    con.query(q15, (error, result) => {
        if (error) throw error;
        res.status(200).json("Date Selection Completed");
    })
});

var addons={
    carton:{
        cost:250,
        count:2,
        totalPrice:500
    },
    labour:{
        cost:200,
        count:2,
        totalPrice:500
    },
    splitACInstallation:{
        cost:500,
        count:1,
        totalPrice:500
    },
    splitACUninstallation:{
        cost:500,
        count:2,
        totalPrice:1000
    },
    windowACInstallation:{
        cost:200,
        count:1,
        totalPrice:200
    },
    windowACUninstallation:{
        cost:200,
        count:1,
        totalPrice:200
    },
    carpentry:{
        cost:500,
        count:1,
        totalPrice:500
    },
    electrition:{
        cost:100,
        count:2,
        totalPrice:200
    },
    painting:{
        cost:800,
        count:2,
        totalPrice:1600
    }
}

app.put('/addons',(req,res)=>{
    const insertData = {
        addons: addons,
      };
      var add_on = JSON.stringify(insertData);
    //   var mobile = userSignup.userMobile;

    var q16 = "UPDATE inventoryData SET addons='"+add_on+"'::jsonb WHERE user_mobile='"+mobile+"'";
    con.query(q16,(error,result)=>{
        if(error) throw error;
        res.send("addons added..." + result.rows);
    })
});

var booking = {
    houseType:"1bhk",
    carton:"28",
    totalItemsAdded:"30",
    distance:50,
    date:"10-10-2023",
    time:"6AM-8AM"
}
app.get('/myBooking',(req,res)=>{

    // var mobile = userSignup.userMobile;

    var q17 = "BEGIN;"+ 
    "SELECT house_type,total_distance FROM userInfo WHERE user_mobile='"+mobile+"';"+
    "SELECT book_date,book_slot_time FROM inventoryData WHERE user_mobile='"+mobile+"';"+
    "COMMIT;";



con.query(q17,(error,result)=>{
    if(error) throw error;
    const userInfoResult = result[1].rows; // First query result
    const inventoryDataResult = result[2].rows; // Second query result
    const mergedResult = userInfoResult.concat(inventoryDataResult);
    res.send(mergedResult);

}); 

})

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
app.put('/updateUser', updateProfile, (req, res) => {
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var email = req.body.email;
    // var profile = req.file.path;
    var profile = "";
    // var mobile = req.body.phoneNumber;

    // console.log("update user info rcvd : ", fName,lName,email,mobile);

    var q5 = "UPDATE userInfo SET user_f_name = '" + fName + "', user_l_name='" + lName + "', user_email='" + email + "'," +
        "user_profile='" + profile + "' WHERE  user_mobile = '" + mobile + "'";

    con.query(q5, (err, result) => {
        if (err) throw err;
        console.log(mobile);
        res.send("Rows updated" + result.rows);
    });

});

app.put('/inventory',(req,res)=>{
    console.log("all inventory data: ",req.body);
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

    var addons=JSON.stringify(req.body.addons);
    var user_inventory=JSON.stringify(req.body.user_inventory);


    q21 = "UPDATE inventoryData SET user_inventory='" + user_inventory + "', book_date='" + req.body.dataTime.selectedDay.currentDate + "', event_time='" + req.body.dataTime.selectedTime.label + "', addons='" + addons + "' WHERE user_mobile='" + req.body.mobile + "'";

    con.query(q21, (error, result) => {
        if(error) throw error;
        if(result.rows.length>0){
            console.log("inventory data saved successfully");
        }
        res.status(200).json("data saved successfully");
    })

    
   // res.json("data saved"); // comment this when the above query runs
    
})

app.listen(port, () => {
    console.log("Server running on", port);
})
