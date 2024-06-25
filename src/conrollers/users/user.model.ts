import { Schema, model } from 'mongoose';

export type TUserSchema = {
  passwordHash: string;
  photoBase64: string;
  coverBase64: string;
  name: string;
  email: string;
  location: string;
  dateBirthday: string;
  activity: string[];
  specialization: string[];
  price: number;
  sex: string;
  experience: string;
  aboutMe: string;
  picturesBase64: string[];
};

const userSchema = new Schema<TUserSchema>({
  passwordHash: String,
  photoBase64: String,
  coverBase64: String,
  name: String,
  email: String,
  location: String,
  dateBirthday: String,
  activity: [String],
  specialization: [String],
  price: Number,
  sex: String,
  experience: String,
  aboutMe: String,
  picturesBase64: [String],
});

export const UserModel = model<TUserSchema>('User', userSchema);
