import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "Current User is not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `getCurrentUser error: ${err.message}` });
  }
};
