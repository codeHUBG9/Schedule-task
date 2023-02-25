const express = require("express");
const http = require("http");
var cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const index = require("./routes/index");
/**
 * Middleware
 */
//
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));

dotenv.config({ path: "backend/config/config.env" });
const port = process.env.PORT;

app.use(index);
const server = http.createServer(app);
var io = require("socket.io")(http);
let interval;

io.on("connection", (socket) => {
	console.log("New client connected");
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
});

const getApiAndEmit = (socket) => {
	const response = new Date();
	socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
