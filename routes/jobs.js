const Router = require("express");
const { check } = require("express-validator");
const { getJobs, deleteJob, postJob, putJob } = require("../controllers/jobs");
const { doesJobExistById } = require("../helpers/db-validators");
const { checkFields, checkJWT, doesHaveArole } = require("../middlewares");
const router = Router();

router.get("/", getJobs);

router.post(
  "/",
  [
    checkJWT,
    doesHaveArole("ADMIN_ROLE", "COMPANY_ROLE"),
    check("city", "City is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  checkFields,
  postJob
);
router.delete(
  "/:id",
  [
    checkJWT,
    doesHaveArole("ADMIN_ROLE", "COMPANY_ROLE"),
    check("id", " id not valid").isMongoId(),
    check("id").custom(doesJobExistById),
    checkFields,
  ],
  deleteJob
);

router.put("/:id", putJob);

module.exports = router;
