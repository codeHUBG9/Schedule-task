const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
		maxLength: [30, "Your name can't be exceed more than 30 characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		validate: [validator.isEmail, "Please enter valid email address"],
		unique: true,
	},
	mobile: {
		type: String,
		required: [true, "Please enter your contact"],
	},
	password: {
		type: String,
		required: [true, "Please enter password"],
		minLength: [6, "Your password must be longer than 6 character"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
