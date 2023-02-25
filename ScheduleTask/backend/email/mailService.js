const nodemailer = require("nodemailer");
const { EmailConfig } = require("../config/config");

const mailService = async (detail, isBulk = false) => {
	const mailTransporter = await setupTranport();
	isBulk ? sendBulkEmail(detail) : sendSingleEmail(detail);

	// sending email
	await mailTransporter.sendMail(detail, function (err, data) {
		if (err) {
			console.log("error occurred", err.message);
		} else {
			console.log("---------------------");
			console.log("email sent successfully");
		}
	});
	// const result = await mailTransporter.sendMail(mailDetails);
	// console.log(result);
};

const sendSingleEmail = async (mailDetails) => {};

const sendBulkEmail = async (bulkMailDetails) => {};

const setupTranport = async () => {
	const mailTransporter = await nodemailer.createTransport({
		service: "gmail",
		pool: true,
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // use TLS
		auth: {
			type: "login",
			user: EmailConfig.Email,
			pass: EmailConfig.Password,
		},
	});

	// // mailTransporter.verify(function (error, success) {
	// // 	if (success) {
	// // 		console.log("Server is ready to take our messages");
	// // 	} else {
	// // 		console.log(`Error-${error}`);
	// // 		return false;
	// // 	}
	// // });

	//const isValidTransport = await mailTransporter.verify();
	return mailTransporter;
};

module.exports = mailService;
