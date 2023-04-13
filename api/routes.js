"use strict";

const express = require("express");
const router = express.Router();

const { User, Course } = require("./models");

const { authenticateUser } = require("./middleware/auth-user");

// Handler function to wrap each route. Reused from previous Treehouse project.
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

//GET - return the currently authenticated user (auth required)
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    });
  })
);

//POST - create users (no auth required)
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      // Create a new user using the extracted data
      await User.create(req.body);
      res.location("/");
      // Return 201 status/no content
      res.status(201).end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//GET all courses - no authentication required here
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    // for testing purposes - to remove
    // return res.status(500).send('Internal Server Error');
    const courses = await Course.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            //added: exclude password from the response for security reasons
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
    });
    res.status(200).json(courses);
  })
);

//GET course by id - no authentication required here
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    //TODO: Amend to try and catch if needed
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            //added: exclude password from the response for security reasons
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
    });
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: "This course cannot be found" });
    }
  })
);

//POST - create courses - authentication required
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      // Create a new course using the extracted data
      const course = await Course.create(req.body);
      res.location(`/courses/${course.id}`);
      // Return 201 status/no content
      res.status(201).end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//PUT - update a particular course - authentication required
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (course.userId === req.currentUser.id) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ message: "Unauthorised User - Edit Denied" });
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);
//DELETE - delete a particular course - authentication required
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (course.userId === req.currentUser.id) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(403).json({ message: "Unauthorised User - Delete Denied" });
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
