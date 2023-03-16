export interface I_SERVER_ENUMS {
  COOKIE_NAMES: { [key in COOKIE_NAMES]: COOKIE_NAMES };
}

enum COOKIE_NAMES {
  TOKEN = 'TOKEN',
}

export const SERVER_ENUMS: I_SERVER_ENUMS = {
  COOKIE_NAMES,
};
