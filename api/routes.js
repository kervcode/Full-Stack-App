"use strict";

const express = require("express");
const { sequelize, User, Course } = require("./models");
const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");

const router = express.Router();

// Adding async middleware
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      console.log("============= ERROR ==============");
      console.log(err);
      // res.status(400).json({ message: err.message });
      if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.message });
      } else if (err.fields[0] === "emailAddress") {
        res.status(400).json({ message: err.message });
      } else {
        next();
      }
    }
  };
}

// authentication middleware
const authenticateUser = async (req, res, next) => {
  let message = null;
  const credentials = auth(req);

  const users = await User.findAll();
  // users = users.map(user => user.get({plain: true}))
  // console.log(users.map(u => u.password))

  if (credentials) {
    // console.log(credentials)
    const user = users.find((u) => u.emailAddress === credentials.name);
    // console.log(user.firstName)
    if (user) {
      const authenticated = bcryptjs.compareSync(
        credentials.pass,
        user.password
      );
      // console.log(authenticated)
      if (authenticated) {
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${credentials.name}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};

/** CREATING THE USER ROUTES */

// returning the currently authenticated user
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const currentUser = await req.currentUser;

    // if a users exist
    if (currentUser) {
      const user = await User.findByPk(currentUser.id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      console.log(user);
      res.location("/").json(user);
    }
  })
);

// create a new user
router.post(
  "/users",
  asyncHandler(async (req, res, next) => {
    //hashing user passwords
    const user = req.body;

    if (user.password) {
      user.password = await bcryptjs.hashSync(user.password);
      console.log(user);
    }

    await User.create(req.body);
    res.status(201).location("/").end();
  })
);

/** ROUTES FOR THE COURSE MODEL*/

// GET /api/courses returns all the courses, status=200
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "Owner",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(courses);
  })
);

// GET /api/courses/:id returns the courses for :id user, status=200
router.get(
  "/courses/:id",
  asyncHandler(async (req, res, next) => {
    const courseId = await req.params.id;

    // Find the course by its ID in the database.
    if (courseId) {
      console.log(courseId);
      const course = await Course.findByPk(courseId, {
        include: [
          {
            model: User,
            as: "Owner",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // If the course exist, return it
      if (course) {
        res.json(course);
      } else {
        // else set status code to 404 then
        res
          .status(404)
          .json({ message: "Course not found. Invalid CourseID." });
      }
    } else {
      next();
    }
  })
);
// POST /api/courses creates a course , set the location header for the , status=201
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course = req.body;
    console.log(req.body);

    course = await Course.create(course);
    res
      .status(201)
      .location("/courses/" + course.id)
      .end();
  })
);

// PUT /api/courses/:id updates course for :id, satus=204
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: User, as: "Owner" }],
    });

    if (course) {
      if (course.Owner.emailAddress === req.currentUser.emailAddress) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({
          message: "You do not have authorization to alter this course.",
        });
      }
    } else {
      next();
    }

    // else {
    //   res.status(404).json({ message: "Course Not Found" });
    // }
  })
);

router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    // Find the course to delete by its PK
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "Owner",
        },
      ],
    });

    // if the course exist
    // Delete it and send a status of 204
    // Else, return

    if (course) {
      if (course.Owner.emailAddress === req.currentUser.emailAddress) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(403).json({
          message: "You do not have authorization to alter this course.",
        });
      }
    } else {
      next();
    }
  })
);
module.exports = router;
