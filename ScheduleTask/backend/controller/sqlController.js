const sql = require("mssql");
const { sqlConfig } = require("../config/config");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { getRecordset } = require("../sql/sql-connection");

exports.getOrder = catchAsyncErrors(async (req, res, next) => {
	const cmdtxt = "select top 1 * from [ProcessXmlStop] order by CreatedOn desc";
	const recordSet = await getRecordset(cmdtxt, true);
	const data = JSON.parse(JSON.stringify(recordSet));

	if (!data) {
		return next(new ErrorHandler(`No data found`, 400));
	}

	res.status(200).json({
		success: true,
		Order: data,
	});
});

/**
 * Add App user
 */
exports.addAppUser = catchAsyncErrors(async (req, res, next) => {
	const {
		FirstName,
		MiddleName,
		LastName,
		NickName,
		Username,
		Password,
		Email,
		PhoneNumber = "866878787",
	} = req.body;
	const db = await sql.connect(sqlConfig);
	const request = await db.request();

	/**
	 * Using inline query
	 */
	// request
	// 	.input("FirstName", sql.NVarChar(50), FirstName)
	// 	.input("LastName", sql.NVarChar(50), LastName)
	// 	.input("NickName", sql.NVarChar(50), NickName)
	// 	.input("Username", sql.NVarChar(50), Username)
	// 	.input("PasswordHash", sql.NVarChar(50), Password)
	// 	.input("Email", sql.NVarChar(50), Email);

	// cmdtxt =
	// 	"insert into AppUser(FirstName, LastName, NickName, Username, PasswordHash, Email) values(@FirstName, @LastName, @NickName, @Username, @PasswordHash, @Email)";
	// const result = await request.query(cmdtxt);

	/**
	 * Using procedure
	 */
	const result = request
		.input("FirstName", sql.NVarChar(50), FirstName)
		.input("MiddleName", sql.NVarChar(50), MiddleName)
		.input("LastName", sql.NVarChar(50), LastName)
		.input("NickName", sql.NVarChar(50), NickName)
		.input("Username", sql.NVarChar(50), Username)
		.input("PasswordHash", sql.NVarChar(50), Password)
		.input("Email", sql.NVarChar(50), Email)
		.input("PhoneNumber", sql.NVarChar(50), PhoneNumber)
		// .output("Id", sql.Int, 8776)
		.execute("addAppUser");

	res.status(201).json({
		success: true,
		result,
	});
});

exports.addManyAtAtime = catchAsyncErrors(async (req, res, next) => {
	const employeesTable = new sql.Table();
	employeesTable.columns.add("Code", mssql.VarChar(50));
	employeesTable.columns.add("Name", mssql.VarChar(50));
	employeesTable.columns.add("Job", mssql.VarChar(50));
	employeesTable.columns.add("Salary", mssql.Int);
	employeesTable.columns.add("Department", mssql.VarChar(50));

	const employees = req.body;
	employees.forEach((employee) => {
		employeesTable.rows.add(
			employee.Code,
			employee.Name,
			employee.Job,
			employee.Salary,
			employee.Department
		);
	});

	const request = pool.request();
	request.input("Employees", employeesTable);

	const result = await request.execute("AddEmployees");
	const newEmployees = result.recordset;
	res.json(newEmployees);
});
