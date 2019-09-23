const passport = require("passport");
const moment = require("moment");
const User = require("../models/user");
const Business = require("../models/business");
const Attendee = require("../models/attendee");
const JwtService = require("../modules/auth.module");
const Email = require("../Emails");
const _ = require('lodash')
// const { Op } = require("sequelize");

module.exports = {
  async inviteUser(req, res) {
    try {
      const { email, firstName, lastName, location, role, gender } = req.body;
      const { businessId, id } = req.user;

      if (
        _.isEmpty(email) ||
        _.isEmpty(gender) ||
        _.isEmpty(location) ||
        _.isEmpty(firstName) ||
        _.isEmpty(lastName)
      ) {
        throw new Error("incomplete parameters");
      }

      const checkEmail = await User.findOne({ where: { email } });
      const generateCode = (length, chars) => {
        if (!chars) {
          chars = "0123456789abcdefghijklmnopqrstuvwxyz";
        }
        let result = "";
        for (let i = length; i > 0; --i) {
          result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
      };

      const password = await generateCode(7);

      if (checkEmail) {
        return res.status(400).json({ message: "Email Exists" });
      }

      const data = {
        email,
        firstName,
        lastName,
        locationId: location,
        role,
        gender,
        businessId,
        password,
        isVerified: true
      };

      const user = await User.create(data);

      const { name } = await Business.findOne({ where: { id: businessId } });

      const emailData = { email, password, name };

      await Email.notifyNewUser(emailData);

      return res.status(200).json({ message: "User added", user });
    } catch (err) {
      return res.status(400).json({ message: "An error occurred", err:err.toString() });
    }
  },

  async edit(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const reqUser = await User.findOne({ where: { id } });
      if (!reqUser) {
        return res.status(400).json({ message: "invalid selection" });
      }

      if (data.password) {
        if (data.password.trim() === "") {
          return res.status(400).json({ message: "invalid password" });
        }
      }

      await User.update(data, {
        where: { id }
      });
      const updatedUser = await User.findOne({ where: { id } });

      return res.status(200).json({ message: "user updated", updatedUser });
    } catch (error) {
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const reqUser = await User.findOne({ where: { id } });
      if (!reqUser) {
        return res.status(400).json({ message: "invalid selection" });
      }
      await User.destroy({ where: { id } });

      return res.status(200).json({ message: "user deleted" });
    } catch (error) {
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async userAvailability(req, res) {
    try {
      const { id } = req.params;
      const alreadyBooked = [];
      const data = req.body;

      const start = moment(data.time).toDate();
      const end = moment(start)
        .add(data.duration, "m")
        .toDate();

      data.endTime = end;

      const query = {
        userId: id
      };

      const meetings = await Attendee.findAll({ where: query });

      console.log(meetings);
      if (meetings.length) {
        meetings.forEach(meeting => {
          if (
            (start >= meeting.time && start < meeting.endTime) ||
            (end >= meeting.time && end < meeting.endTime)
          ) {
            alreadyBooked.push(meeting.id);
          }
        });
      }

      if (alreadyBooked.length) {
        return res.status(400).json({ message: "user is booked" });
      }

      return res.status(200).json({ message: "user is available" });
    } catch (error) {
      return res.status(400).json({ message: "An error occurred", error });
    }
  }
};
