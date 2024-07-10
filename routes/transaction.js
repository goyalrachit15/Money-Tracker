const express = require("express");
const {
    getAll,
    addTransaction
} = require("../controllers/transaction");

const router = express.Router();
router.post("/gettransaction", getAll);
router.post("/addtransaction", addTransaction);

module.exports = router;