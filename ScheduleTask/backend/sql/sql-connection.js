const sql = require("mssql");
const { sqlConfig } = require("../config/config");
const lookup = require("../utils/enums");

const getRecordset = async (cmdtxt, isRecordSets = false) => {
	try {
		const db = await sql.connect(sqlConfig);
		const request = await db.request();
		const result = await request.query(cmdtxt);
		const response = isRecordSets ? result.recordsets : result.recordset;
		db.close();
		return response;
	} catch (err) {
		console.log(err);
	}
};

module.exports = { getRecordset };
