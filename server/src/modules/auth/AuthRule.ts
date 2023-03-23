import * as TypeGraphQL from 'type-graphql';
import { DI } from '../../di/DI';
import { ERROR_CODES } from '../../error/ErrorCodes';
import { GQLError } from '../../error/GQLError';
import { ICTX } from '../../types/interfaces';

enum AUTH_RULES {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@DI.register()
export class AuthRule implements TypeGraphQL.AuthCheckerInterface<ICTX> {
  private di = DI;

  static get public() {
    return [AUTH_RULES.PUBLIC];
  }

  static get admin() {
    return [AUTH_RULES.ADMIN];
  }

  static get user() {
    return [AUTH_RULES.USER];
  }

  check(
    { root, args, context, info }: TypeGraphQL.ResolverData<ICTX>,
    roles: string[]
  ) {
    if (roles.includes(AUTH_RULES.PUBLIC)) {
      return true;
    }

    // TODO: Handle for admin only APIs

    if (!context.user) {
      throw new GQLError({ code: ERROR_CODES.NOT_PERMITTED });
    }

    return true;
  }
}
