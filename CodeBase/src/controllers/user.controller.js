import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import { uploadOnCloud } from "../utils/cloudinary.js";

const optionsForCookie = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  
  let { fullName, email, username, password } = req.body;
  if (
    [username, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    res.status(400).json(new ApiError(400, "All the fields are required"));
  }

  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExist) {
    res
      .status(400)
      .json(
        new ApiError(400, "User already Exist With this Username Or Email")
      );
  }

  let ImgUrl;
  if (req?.file?.path) {
    let Image = await uploadOnCloud(req?.file?.path);
    ImgUrl = Image.secure_url;
  }

  const user = await User.create({
    fullName,
    profileImage:
      ImgUrl ||
      "https://res.cloudinary.com/niteshdk11/image/upload/v1712225022/Assests/WhatsApp_Image_2024-04-04_at_15.23.36_090e3920_bdejlr.jpg",
    email,
    password,
    username: username?.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password "
  );

  if (!createdUser) {
    res
      .status(500)
      .json(new ApiError(500, "SOmething Went while regestring the user"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();


    return { accessToken };
  } catch (error) {
    res
      .status(400)
      .json(new ApiError(400, "something went wrong while generating tokens"));
  }
};

const logInUser = asyncHandler(async (req, res) => {
  // req,body se data and validate
  // find user and  useranme or passwrod  if not exitst give error
  //  check the passo , if not throe error
  // generate  access token
  // remove password 
  // give response with status cookie and data

  const { username, email, password } = req.body;

  if (!username && !email) {
    res.status(400).json(new ApiError(400, "Username or Email is Required "));
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    res.status(400).json(new ApiError(400, "User does not exist"));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    res.status(400).json(new ApiError(400, "Password Is Invalid"));
  }

  const {  accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const logInUser = await User.findById(user._id).select(
    "-password "
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, optionsForCookie)
    .json(
      new ApiResponse(
        200,
        { user: logInUser},
        "User Logged In Successfully "
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {

  return res
    .status(200)
    .clearCookie("accessToken", optionsForCookie)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

// first cresate middleware fpr auth  if user login then only log out

const deleteUser = asyncHandler(async (req, res) => {
  
  let user = await User.findById(req.user._id);
  if (!user) {
    res.status(200).json(new ApiResponse(400, "User does not exist")); // throw new ApiError(400 , "User does not exist")
  }

  user = await User.findByIdAndDelete(req.user._id);

  res
    .status(200)
    .clearCookie("accessToken", optionsForCookie)
    .json(new ApiResponse(200, {}, "User Deleted Successfully"));

})



export { registerUser, logInUser, logOutUser  , deleteUser};
