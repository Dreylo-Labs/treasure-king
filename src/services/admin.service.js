const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const AppError = require('../utils/app-error');
const { gEnv } = require('../utils/env');

class AdminService {
  constructor() {
    this.model = Admin;
  }

  async login(email, password) {
    const admin = await Admin.findOne({ email }).select('+password');
   
    if (!admin) throw new AppError('Admin not found', 404);

    const isPasswordValid = bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new AppError('Invalid credentials', 401);

    const payload = { userId: admin._id, email: admin.email };
    const secretKey = process.env.ADMIN_JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });

    return token;
  }

  async signup(email, password) {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) throw new AppError('Admin with this email already exists', 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ email, password: hashedPassword, isAdmin: true });

    return { id: newAdmin._id, email: newAdmin.email };
  }
}

module.exports = new AdminService()
