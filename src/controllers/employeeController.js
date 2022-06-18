const employees = require("../utils/employees.storage");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const e = require("express");

exports.getAllEmployees = async (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ message: ReasonPhrases.OK, data: employees });
};

exports.getEmployeeByName = async (req, res) => {
  console.log(req);
  const nameParam = req.params.name;
  const foundEmployee = employees.find(
    (employee) => employee.name === nameParam
  );
  if (foundEmployee) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: foundEmployee,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.createEmployee = async (req, res) => {
  const employee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    designation: req.body.designation,
    tags: req.body.tags,
    age: req.body.age,
  };

  //Add the new user
  employees.push(employee);
  res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED });
};

exports.deleteEmployee = async (req, res) => {
  const nameParam = req.params.name;
  const empIndex = employees.findIndex(
    (employee) => employee.first_name === nameParam
  );
  if (empIndex !== -1) {
    let deletedEmployees = employees.splice(empIndex, 1);
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: deletedEmployees[0],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.updateEmployee = async (req, res) => {
  const nameParam = req.params.name;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const designation = req.body.designation;
  const tags = req.body.tags;
  const age = req.body.age;
  /**
   * last_name: "Bolton",
    designation: "CEO, Co-Founder",
    tags: ["Finance", "San Francisco", "Mentor", "Top Management"],
    age: 45,
   */

  //si no se encuentra el index, devuelve -1
  const employeeIndex = employees.findIndex(
    (employee) => employee.first_name === nameParam
  );
  if (employeeIndex !== -1) {
    employees[employeeIndex] = {
      first_name,
      last_name,
      designation,
      tags,
      age,
    };
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: employees[employeeIndex],
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.getEmployeesByTags = (req, res) => {
  const tags = req.body.tags;

  const result = employees.filter((employee) =>
    employee["tags"].includes(tags)
  );

  if (result) {
    res
      .status(StatusCodes.OK)
      .json({ message: ReasonPhrases.OK, data: result });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.addNewTagAllEmployees = (req, res) => {
  const tag = req.body.tag;

  if (tag) {
    employees.forEach((employee) => {
      employee.tags.push(tag);
    });
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: employees,
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: ReasonPhrases.BAD_REQUEST,
    });
  }
};
