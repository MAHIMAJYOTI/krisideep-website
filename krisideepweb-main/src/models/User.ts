export interface User {
  uid: string;
  phoneNumber: string;
  displayName?: string;
  lastLogin?: Date;
}

export interface UserJson {
  uid: string;
  phoneNumber: string;
  displayName?: string;
  lastLogin?: string;
}

export const userFromJson = (json: UserJson): User => ({
  uid: json.uid,
  phoneNumber: json.phoneNumber,
  displayName: json.displayName,
  lastLogin: json.lastLogin ? new Date(json.lastLogin) : undefined,
});

export const userToJson = (user: User): UserJson => ({
  uid: user.uid,
  phoneNumber: user.phoneNumber,
  displayName: user.displayName,
  lastLogin: user.lastLogin?.toISOString(),
});
