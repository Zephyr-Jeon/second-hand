import { ICTX } from '../../../types/interfaces';
import { CommonResponse } from '../../common/CommonResponse';
import { UserService } from '../user.service';

export const userSignoutService =
  (userService: UserService) => async (ctx: ICTX) => {
    console.log(13, ctx.req.signedCookies);

    ctx.res.clearCookie('token');

    return CommonResponse.ok();
  };
