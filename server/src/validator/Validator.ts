import { SignupInput } from '../modules/user/user.input';
import { inputSchema } from './inputSchema';

export class Validator {
  private static inputSchema = inputSchema;

  static validateInput(input: unknown, inputType: unknown) {
    const { user } = this.inputSchema;
    try {
      switch (inputType) {
        case SignupInput:
          user.signup.parse(input);
          break;
        default:
      }
    } catch (e) {
      throw new Error('Invalid Input');
    }
  }
}
