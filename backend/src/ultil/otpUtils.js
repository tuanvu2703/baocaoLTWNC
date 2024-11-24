import crypto from 'crypto';
import { updateOTP, findUserByIdentifier } from '../models/userModel';

const otpExpiration = parseInt(process.env.OTP_EXPIRATION) || 120000;

const hashOtp = (otp) => {
    return crypto.createHmac('sha256', process.env.OTP_SECRET)
                 .update(otp)
                 .digest('hex');
};

const saveOtpToDatabase = async (email, otp) => {
    const hashedOtp = hashOtp(otp); 
    const user = await findUserByIdentifier(email);
    if (user) {
        await updateOTP(email, hashedOtp, Date.now() + otpExpiration);
    }
};

import crypto from 'crypto';

const verifyOtp = async (email, otp) => {
    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await findUserByIdentifier(email);
        if (user && user.OTPEXPRIES > Date.now()) {

            const hashedOtp = crypto
                .createHmac('sha256', process.env.OTP_SECRET)  
                .update(otp)
                .digest('hex');  


            return hashedOtp === user.OTP;
        }

        // Nếu không tìm thấy người dùng hoặc OTP đã hết hạn
        return false;
    } catch (error) {
        console.error(`Error verifying OTP for email ${email}:`, error);
        // Trả về false nếu có lỗi trong quá trình kiểm tra OTP
        return false;
    }
};


 const resetUserPassword = async (email, newPassword) => {
    const user = await findUserByIdentifier(email);
    if (user) {
        user.password = newPassword; // Bạn nên hash mật khẩu trước khi lưu
        user.OTP = undefined;
        user.OTPEXPRIES = undefined;
        await user.save();
    }
};

export { saveOtpToDatabase, verifyOtp, resetUserPassword };