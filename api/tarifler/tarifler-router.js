const express = require("express");
const Tarifler = require("./tarifler-model");
const md = require("./tarifler-middleware");
const router = express.Router();

router.get("/:tarif_id", md.checkTarifId, (req, res, next) => {
  try {
    Tarifler.getTarifId(req.params.tarif_id).then((tarifler) => {
      res.json(tarifler);
    });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
