import { Message } from "../models/messageSchema.js";
import { catchasyncerr } from "../middleWares/middlewares.js";
import errorHandler from "../middleWares/errMiddle.js";
export const SendMessage = catchasyncerr(async (req, res, next) => {
  const { firstName, lastName, middleName, email, phone, message } = req.body;
  if (!firstName || !lastName || !middleName || !email || !phone || !message) {
    return next(new errorHandler("Please fill full form", 400));
  }
  await Message.create({
    firstName,
    lastName,
    middleName,
    email,
    phone,
    message,
  });
  res.status(200).json({
    success: true,
    message: "Message send successfully",
  });
});

export const getMessage = catchasyncerr(async (req, res, next) => {
  const message = await Message.find();
  res.status(200).json({
    success: true,
    message,
  });
});
