import { catchasyncerr } from "../middleWares/middlewares.js";
import errorHandler from "../middleWares/errMiddle.js";
import { User } from "../models/UserSchema.js";
import { generateToken } from "../utils/JwtToken.js";
import cloudinary from "cloudinary";

export const patientRegistered = catchasyncerr(async (req, res, next) => {
  const {
    firstName,
    lastName,
    middleName,
    email,
    phone,
    password,
    gender,
    dob,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !middleName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !role
  ) {
    return next(new errorHandler("please fill all field", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new errorHandler("user already Registered", 400));
  }
  user = await User.create({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role
  });
  generateToken(user, "user Registered", 200, res);
});



export const login = catchasyncerr(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new errorHandler("Please Provide All details", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("Invalid Email or Password", 400));
  }
  const isPasswordMatches = await user.comparePassword(password);
  if (!isPasswordMatches) {
    return next(new errorHandler("Invalid Email or Password", 400));
  }
  if (role !== user.role) {
    return next(new errorHandler("User with this role not found", 400));
  }
  generateToken(user, "user LoggedIn", 201, res);
});



export const newAdmin = catchasyncerr(async (req, res, next) => {
  const {
    firstName,
    lastName,
    middleName,
    email,
    phone,
    password,
    gender,
    dob,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !middleName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob
  ) {
    return next(new errorHandler("please fill all field", 400));
  }
  let isRegisterd = await User.findOne({ email });
  if (isRegisterd) {
    return next(new errorHandler("user already Registerd with this id"));
  }
 admin = await User.create({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    role:'Admin'
  });
  res.status(200).json({
    success:true,
    message:"new Admin Registered",
    admin
  })
});

export const addNewDoctor = catchasyncerr(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new errorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg","image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new errorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !middleName||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment|| 
    !docAvatar
  ) {
    return next(new errorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new errorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new errorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

export const getDoctorsDetails = catchasyncerr(async(req,res,next)=>{
  const doctors=await User.find({role:"Doctor"});
  res.status(200).json({
sucess:true,
doctors
  })
})

export const getUserDetail = catchasyncerr(async(req,res,next)=>{
  const user = req.user
  res.status(200).json({
    success:true,  
    user
  })
})

export const adminlogout = catchasyncerr(async(req,res,next)=>{
  res.status(200).cookie("adminToken","",{
    httpOnly:true,
    expires:new Date(Date.now())
  })
  .json({
    sucess:true,
    message:"admin logged out"
  })
})
export const patientlogout = catchasyncerr(async(req,res,next)=>{
  res.status(200).cookie("patientToken","",{
    httpOnly:true,
    expires:new Date(Date.now())
  })
  .json({
    sucess:true,
    message:"patient logged out"
  })
})