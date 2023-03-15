const User = require('../models/User')

const getProfileImgById = async (userId) => {
    try {
      const user = await User.findOne({ id: userId }).select('profile_img').exec();
  
      if (!user || !user.profile_img) {
        return 'none';
      }
  
      return user.profile_img;
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return 'none';
    }
  }

module.exports = { getProfileImgById };