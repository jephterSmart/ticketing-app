import mongoose, { Document, Model } from "mongoose";
import { hash } from "../services/password";

export interface UserAttributes {
  password: string;
  email: string;
}

export interface UserDoc extends Document {
  password: string;
  email: string;
}

export interface UserModel extends Model<UserDoc> {
  build(attr: UserAttributes): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    toJSON: {
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.statics.build = (attr: UserAttributes) => {
  return new User(attr);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await hash(this.get("password")!);
    this.set("password", hashedPassword);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
