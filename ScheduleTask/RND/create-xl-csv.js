var fs = require("fs");

var jsn = [
	{
		name: "Nilesh",
		school: "RDTC",
		marks: "77",
	},
	{
		name: "Sagar",
		school: "RC",
		marks: "99.99",
	},
	{
		name: "Prashant",
		school: "Solapur",
		marks: "100",
	},
];

var data = "";
for (var i = 0; i < jsn.length; i++) {
	data = data + jsn[i].name + "\t" + jsn[i].school + "\t" + jsn[i].marks + "\n";
}
fs.appendFile("Filename2.xlsx", data, (err) => {
	if (err) throw err;
	console.log("File created");
});
