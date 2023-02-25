const address = require("address");

const config = {
	Email: "radhekris43@gmail.com",
	Password: "xejeiuuqjcqabumw",
};

const serverIP = address.ip();

const sqlConfig = {
	type: "mssql",
	user: "sa",
	password: "sa@sa",
	database: "test",
	server: serverIP,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: false, // true for azure
		trustServerCertificate: true, // change to true for local dev / self-signed certs
	},
};

module.exports = { EmailConfig: config, sqlConfig: sqlConfig };
