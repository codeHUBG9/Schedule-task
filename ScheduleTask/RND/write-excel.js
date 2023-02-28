const Excel = require("exceljs");
const { data } = require("../backend/data/write-excel-data");

let workbook = new Excel.Workbook();
let worksheet = workbook.addWorksheet("Debtors", {
	properties: { tabColor: { argb: "FFC0000" } },
});

const AdjustColumnWidth = (worksheet) => {
	worksheet.columns.forEach((column) => {
		const lengths = column.values.map((v) => v.toString().length);
		const maxLength = Math.max(...lengths.filter((v) => typeof v === "number"));

		column.width = maxLength + 5;
	});
};

worksheet.columns = [
	{ header: "First Name", key: "firstName" },
	{ header: "Last Name", key: "lastName" },
	{ header: "Purchase Price", key: "purchasePrice" },
	{ header: "Payments Made", key: "paymentsMade" },
];
worksheet.getRow(1).font = { bold: true };
worksheet.getRow(1);
AdjustColumnWidth(worksheet);

data.forEach((newRow, index) => {
	const rowIndex = index + 2;
	worksheet.addRow({ ...newRow });
});
workbook.xlsx.writeFile("Debtors.xlsx");
