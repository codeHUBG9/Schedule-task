const User = require("../models/user");
const { EmailConfig } = require("./config");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const mailService = require("../email/mailService");

const sendEmailAllUser = () => {
	try {
		//send email after 1 minute
		cron.schedule("*/15 * * * * *", async () => {
			// setting credentials
			let mailDetails = {
				from: `${process.env.SMTP_FROM_NAME} <${EmailConfig.Email}>`,
				to: "vy.code92@gmail.com",
				subject: "Test Mail using Cron Job",
				text: "Node.js Cron Job Email Demo Test from Reflectoring Blog",
			};
			await mailService(mailDetails);
		});
	} catch (err) {
		console.log(`Error : ${err}`);
	}
};

const getAllUser = async () => {
	try {
		const user = await User.find();
		return user;
	} catch (err) {
		console.log(`Error : ${err}`);
	}
};

module.exports = { sendEmailAllUser };
