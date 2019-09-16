/**
 * AuthController
 *
 * :: Server-side logic for managing authentication
 */

const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Business = require("../models/business");
const Location = require("../models/location");
const JwtService = require("../modules/auth.module");
const Email = require("../Emails");

module.exports = {
  async registerAdmin(req, res) {
    try {
      const { email, password, businessName, firstName, lastName } = req.body;
      let orgDetails = { name: businessName, email };
      let data = { email, password, firstName, lastName };

      const checkUserEmail = await User.findOne({
        where: { email }
      });
      const checkBusinessEmail = await Business.findOne({
        where: { email }
      });

      if (checkUserEmail || checkBusinessEmail) {
        return res.status(400).json({ message: "email already exists" });
      }

      const newOrg = await Business.create(orgDetails);

      const generateCode = (length, chars) => {
        if (!chars) {
          chars = "0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ";
        }
        let result = "";
        for (let i = length; i > 0; --i) {
          result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
      };

      data.role = "systemAdmin";
      data.businessId = newOrg.id;
      const verificationCode = await generateCode(6);
      data.verificationCode = verificationCode;

      const user = await User.create(data);
      const emailData = { email, token: verificationCode };

      Email.registrationEmail(emailData);

      return res.status(200).json({
        success: true,
        message: "registration successful",
        user
      });
    } catch (error) {
      return res.status(400).json({ message: "an error occured", error });
    }
  },

  async verifyUser(req, res) {
    try {
      const { id } = req.params;

      await User.update(
        { isVerified: true },
        { where: { verificationCode: id } }
      );
      const user = await User.findOne({
        where: { verificationCode: id },
        include: [{ all: true }]
      });
      const token = await JwtService.issueToken({
        id: user.id,
        role: user.role,
        email: user.email
      });
      const responseObj = { user, token };
      return res
        .status(200)
        .json({
          message: "verification successful",
          success: true,
          responseObj
        });
    } catch (error) {
      return res.status(400).json({ message: "an error occured", error });
    }
  },

  async login(req, res) {
    try {
      passport.authenticate("local", async (err, user, info) => {
        if (!user) {
          let message = info ? info.message : "An error occured";
          let data = info ? info.data : err;
          return res.status(401).json({ message, data });
        }

        const token = await JwtService.issueToken({
          id: user.id,
          role: user.role,
          email: user.email
        });

        const payload = { user };
        payload.token = token;
        const data = { last_login: new Date() };

        await User.update(data, { where: { id: user.id } });

        return res.status(200).json({
          success: true,
          message: "login successful",
          payload
        });
      })(req, res);
    } catch (err) {
      return res.status(401).json({ message: "An error occured", err });
    }
  },

  // for when we get a mail service and are able to send an email
  async resetLink(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        email
      });

      if (!user) {
        return res.status(400).json({ message: "invailid user" });
      }

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

      const verificationCode = await generateCode(11);

      const emailData = { email, verificationCode };
      await User.update({ verificationCode }, { where: { email } });

      await Email.sendResetEmail(emailData);

      return res.status(200).json({ message: "reset email sent" });
    } catch (error) {
      return res.status(401).json({ message: "An error occured", err });
    }
  },

  async verifyCode(req, res) {
    try {
      const verificationCode = req.params.id;

      const user = await User.findOne({ where: verificationCode });

      if (!user) {
        return res.status(400).json({ message: "invalid code" });
      }

      return res.status(200).json({
        message: "valid code",
        user
      });
    } catch (error) {
      return res.status(400).json({ message: "An error occured" });
    }
  },

  async resetPassword(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;

      const user = await User.findOne({
        verificationCode: id
      });
      if (!user) {
        return false;
      }

      if (data.password) {
        if (data.password.trim() !== "") {
          const hash = bcrypt.hashSync(data.password, 8);
          data.password = hash;
        } else {
          return false;
        }
      }

      await User.update(
        {
          id: req.user.id
        },
        data
      );

      return res
        .status(200)
        .json({ message: "Password reset successfully", user });
    } catch (e) {
      return res.status(400).json({ message: "An error occured" });
    }
  }
};
