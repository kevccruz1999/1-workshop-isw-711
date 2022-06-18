const express = require("express");
const employeeController = require("./../controllers/employeeController");

const router = express.Router();

router.get("/employees/tags", employeeController.getEmployeesByTags);
router.put("/employees/tags", employeeController.addNewTagAllEmployees);

router.get("/employees", employeeController.getAllEmployees);
router.post("/employees", employeeController.createEmployee);
router.post("/employees/:name", employeeController.getEmployeeByName);
router.put("/employees/:name", employeeController.updateEmployee);
router.delete("/employees/:name", employeeController.deleteEmployee);

module.exports = router;
