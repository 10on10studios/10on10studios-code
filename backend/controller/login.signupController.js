require("dotenv").config();
const { userRegister, kidinfo, shows } = require('../models')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const { where } = require('sequelize');


class userSignup {

    async user_sign_up(req, res) {
        try {
            if (!req.body.email) {
                return res.json({
                    msg: "Please provide us valid email address"
                })


            }
            const existUser = await userRegister.findOne({
                where: { email: req.body.email }
            })
            if (existUser) {
                return res.json({
                    msg: "This email address has been already exist"
                })
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.start_date = new Date().toISOString().slice(0, 10);
                const token = await jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
                req.body.token = token;
                const data = await userRegister.create(req.body)

                let otp = Math.random();
                otp = parseInt(otp * 1000000)
                console.log(otp)

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: "USER_NAME",
                        pass: "PASSWORD"
                    }
                });

                // send mail with defined transport object


                // send mail with defined transport object

                var mailOptions = {
                    to: req.body.email,
                    from: 'EMAIL',
                    subject: "OTP for Registration - " + otp,
                    html: "<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2'><div style='margin:50px auto;width:70%;padding:20px 0'><div style='border-bottom:1px solid #eee'><a href='' style='font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600'>Your Brand</a> </div><p style='font-size:1.1em'>Hi,</p><p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><h2 style='background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;'>" + otp + "</h2><p style='font-size:0.9em;'><br /></p><hr style='border:none;border-top:1px solid #eee' /><div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'>           <p>Your Brand Inc</p><p>1600 Amphitheatre Parkway</p><p>California</p></div></div></div>" // html body
                };
                const data1 = await userRegister.update({ otp }, { where: { email: req.body.email } })

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err)
                        return
                    }
                    console.log("sent" + info.response)
                    // res.render('otp')
                })
                res.json({
                    msg: "OTP has been sent on your email address",
                    data: data1,
                    data: data
                })


            }
        } catch (e) {

            console.log(e)

        }
    }

    
    async verify_otp(req, res) {
        const { email, otp } = req.body
        try {
            const data = await userRegister.findOne({ where: { email, otp } })
            if (data) {
                res.json({
                    msg: "Otp verified",
                    data: data
                })
            } else {
                res.json({
                    msg: "invalid otp or email address",
                    data: data
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async user_login(req, res) {
        const { email, password } = req.body;
        try {
            const findUser = await userRegister.findOne({ where: { email } })
            if (findUser) {
                const matchPass = await bcrypt.compare(password, findUser.password);
                if (matchPass) {
                    const token = await jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
                    req.body.token = token;
                    res.json({
                        status: "Success",
                        msg: "Logged in",
                        token: token
                    })
                } else {
                    res.json({
                        status: "failed",
                        msg: "email or password is incorrect"
                    })
                }
            }
        } catch {

        }
    }

    async shows(req, res) {
        const { show_name, showUrl, imageUrl, overview, rating, age_group } = req.body
        try {
            const data = await shows.create({ show_name, showUrl, imageUrl, overview, rating, age_group })
            if (data) {
                res.json({
                    msg: "success",
                    data: data
                })
            } else {
                res.json({
                    msg: "faliure"
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


}


module.exports = new userSignup();