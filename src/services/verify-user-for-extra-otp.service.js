import { AccountProviderEnum } from '../enums/account-provider.enum.js';
import AccountModel from '../model/account.model.js';
import UserModel from '../model/user.model.js';
import { NotFoundException } from '../utils/appError.js';

export const verifyUserForExtraOtpService = async (body) => {
  const { email } = body;
  try {
    const account = await AccountModel.findOne({
      provider: AccountProviderEnum.EMAIL,
      providerId: email,
    });

    if (!account) {
      throw new NotFoundException(
        'Account does not exist or cannot get OTP for this account'
      );
    }

    const user = await UserModel.findById(account.userId);

    if (!user) {
      throw new NotFoundException('User not found for the given account');
    }

    const userWithoutPassword = user.omitPassword();
    console.log(userWithoutPassword);
    return { user: userWithoutPassword };
  } catch (error) {
    throw error;
  }
};
