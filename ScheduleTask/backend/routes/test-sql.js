const express = require("express");
const router = express.Router();
const { getOrder, addAppUser } = require("../controller/sqlController");

router.get("/order", getOrder);
router.post("/addAppUser", addAppUser);

module.exports = router;
