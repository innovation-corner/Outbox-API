const userRouter = require("./UserRoutes");
const authRouter = require("./AuthRouter");
const businessRouter = require("./BusinessRouter");
const locationRouter = require("./LocationRouter");
const bookingRouter = require("./BookingRouter");
const roomRouter = require("./RoomRouter");

module.exports = {
  userRouter,
  locationRouter,
  // deskRouter,
  roomRouter,
  businessRouter,
  bookingRouter,
  authRouter
};
