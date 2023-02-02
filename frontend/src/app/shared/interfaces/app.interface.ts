export interface IAuth {
  token: string,
  user: IUser
}
export interface ILogin {
  email: string,
  password: string
}

export interface IUser {
  id?: string,
  email: string,
  name: string,
  password?: string
}

export interface IUsers {
  users: IUser[]
}
export interface IMessage {
  id?: string,
  text: string,
  user?: IUser,
  userId?: string,
  user1Id?: string,
  user2Id?: string,
  userName?: string,
  createdAt?: Date,
  updatedAt?: Date,
}
export interface IMessages {
 messages: [IMessage] | []
}

