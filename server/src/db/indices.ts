// naming convention: <index or key type>_<table name>_<column 1>_<column 2>_<column n>
// ux: unique index

export const INDEX_NAMES = {
  UX_USER_EMAIL: 'ux_user_email',
};

export const INDEX_FIELDS = {
  [INDEX_NAMES.UX_USER_EMAIL]: ['email'],
};
