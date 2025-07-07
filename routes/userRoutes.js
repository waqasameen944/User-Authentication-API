// GET /profile
const userProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: req.user,
  });
};

export default userProfile;
