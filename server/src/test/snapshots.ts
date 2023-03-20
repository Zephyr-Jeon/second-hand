const fieldsToSnapshot = (fieldArray: string[]) => fieldArray.join('\n');

const COMMON_FIELDS = ['createdAt', 'updatedAt'];

const USER_FULL_FIELDS = [...COMMON_FIELDS, 'id', 'email'];

export const SNAPSHOTS = {
  USER_FULL_SNAPSHOT: fieldsToSnapshot(USER_FULL_FIELDS),
};
