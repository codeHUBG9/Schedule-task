const mongoose = require("mongoose");
const connectDatabase = () => {
	mongoose
		.set("strictQuery", true)
		.connect(process.env.DB_LOCAL_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: true,
			maxPoolSize: 20,
			serverSelectionTimeoutMS: 50000,
			socketTimeoutMS: 95000,
			family: 4,
		})
		.then((con) => {
			console.log(
				`MongoDB Database is connected with HOST: ${con.connection.host}`
			);
		});
};

module.exports = connectDatabase;
