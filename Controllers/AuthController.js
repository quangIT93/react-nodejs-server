const User = require('../model/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
class AuthController {
    async home(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password');
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' });
            res.json({ success: true, user });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    async register(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'thieu TEN DANG NHAP hoac/va MAT KHAU',
            });
        }

        try {
            // check for exiting user
            // kiem tra xem co ton tai 1 username nao cung ten vs username cua ban khong
            const user = await User.findOne({ username });

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'ten nguoi dung da ton tai',
                });
            }
            // tat ca deu ok thi hash mat khau
            // hash cung bat dong bo nen dung async
            // const hashedpassword = await argon2.hash(password)

            const salt = await bcrypt.genSalt(10);

            const hashedpassword = await bcrypt.hash(password, salt);

            const newUser = new User({ username, password: hashedpassword });

            await newUser.save();

            const token = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.json({
                success: true,
                message: 'ban da khoi tao thanh cong',
                token,
            });
        } catch (error) {
            // check het r chi co nuoc la loi server

            res.status(500).json({ success: false, message: 'loi server' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'thieu TEN DANG NHAP hoac MAT KHAU',
            });
        }
        try {
            // check for exiting user
            // kiem tra xem co ton tai 1 username nao cung ten vs username cua ban khong
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'ban nhap sai ten nguoi dung hay mat khau',
                });
            }

            const passwordValid = await bcrypt.compare(password, user.password);

            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'sai ten dang nhap hoac mat khau',
                });
            }

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.json({
                success: true,
                message: 'ban da dan nhap thanh cong',
                token: accessToken,
            });
        } catch (error) {
            // check het r chi co nuoc la loi server

            res.status(500).json({ success: false, message: 'loi server' });
        }
    }
}

module.exports = new AuthController();
