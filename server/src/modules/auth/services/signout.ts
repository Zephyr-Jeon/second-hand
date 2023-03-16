import { ICTX } from '../../../types/interfaces';
import { CommonResponse } from '../../common/CommonResponse';
import { AuthService } from '../auth.service';

export const authSignoutService =
  (authService: AuthService) => async (ctx: ICTX) => {
    authService.clearTokenInCookie(ctx);

    return CommonResponse.ok();
  };
