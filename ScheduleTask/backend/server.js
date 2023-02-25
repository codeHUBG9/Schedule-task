const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const { sendEmailAllUser } = require("./config/cron");
const app = require("./app");
const Play = require("./PlayWithIt");

/**
 * Handle Uncaught Exception
 */
process.on("uncaughtException", (err) => {
	console.log(`Message: ${err.message}`);
	console.log(`Error: ${err.stack}`);
	console.log("Shuting down server due to uncaught Exception");
	process.exit(1);
});

/**
 * Configure db connection & env process
 */
dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

/**
 * Setting up cron-job with nodemailer
 */
// sendEmailAllUser();

/**
 * Testing code
 */
// Play();

/**
 * Starting server
 */
const PORT = process.env.PORT || 4800;
const server = app.listen(PORT, () => {
	console.log(
		`Server is running on the PORT: ${PORT} in ${process.env.NODE_ENV} mode.`
	);
});

/**
 * Handle Unhandled Promise Rejection
 */
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log("Shuting down the server due to Unhandled Promise Rejection");
	server.close(() => {
		process.exit(1);
	});
});
