const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const pick = require('ramda/src/pick');
const generateToken = require('../helpers/generateToken');
const getdefaultProfilePic = require('../helpers/getProfilePic');
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 8,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    profilePic: {
      type: String,
      default: getdefaultProfilePic(this.email)
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  /**
   * hashing password before being saved
   */
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods = {
  /**
   * password check
   * @param {String} password - input password
   */
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },

  /**
   * Returns user object with the selected fields to the client
   */
  transform() {
    // below are the feilds to be returned to the caller
    const fields = ['id', 'name', 'email', 'profilePic', 'isAdmin'];
    return pick(fields, this);
  },

  // Generates token and return to the client
  getToken() {
    return generateToken(this._id);
  },

  async update(obj) {
    for (key in obj) {
      this[key] = obj[key];
    }
    await this.save();
    return this;
  }
};

UserSchema.statics = {
  /**
   *
   * @param {{}} options
   */
  async loginAndGenerateToken(options) {
    const { email, password } = options;
    if (!email) {
      throw new Error({
        message: 'Email is required'
      });
    }

    const user = await this.getByEmail(email);
    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: `Bearer ${user.getToken()}` };
      }
      err.message = 'Incorrect Credentials';
    }
    throw new Error({
      status: httpStatus.UNAUTHORIZED,
      isPublic: true
    });
  },
  /**
   *
   * @param {String} email
   * @returns {Promise<UserSchema>}
   */
  async getByEmail(email) {
    let user = await this.findOne({
      email
    }).exec();
    return user;
  },
  async getById(id) {
    try {
      const user = await this.findById(id).exec(); //returns user if found otherwise null
      if (user) {
        return user;
      }
      return user; //user will be null here
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = mongoose.model('User', UserSchema);
