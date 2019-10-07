const Amenities = require("../models/amenities");
const _ = require("lodash");

module.exports = {
  async create(req, res) {
    try {
      const { name } = req.body;
      if (!_.isEmpty(name)) {
        await Amenities.create(name);
        return res.status(200).json({ message: "Amenity has been saved" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async edit(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const amenity = await Amenities.findOne({ where: id });

      if (!amenity) {
        return res.status(400).json({ message: "Invalid id" });
      }

      if (!_.isEmpty(name)) {
        amenity.name = name;
        await amenity.save();

        return res.status(200).json({ message: "Amenity has been updated" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const amenity = await Amenities.findOne({ where: id });

      if (!amenity) {
        return res.status(400).json({ message: "Invalid id" });
      }

      await amenity.destory();

      return res.status(200).json({ message: "Amenity has been deleted" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async viewSingle(req, res) {
    try {
      const { id } = req.params;
      const amenity = await Amenities.findOne({ where: id });

      if (!amenity) {
        return res.status(400).json({ message: "Invalid id" });
      }

      return res.status(200).json({ message: "Amenity fetched", amenity });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async viewAll(req, res) {
    try {
        if (req.user.role != 'outboxAdmin')
        
        await Amenities.findAll({});

      return res.status(200).json({ message: "Amenities fetched" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  }
};
