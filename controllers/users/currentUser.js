const currentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

export default currentUser;
