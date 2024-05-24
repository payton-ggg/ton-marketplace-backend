import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  balance: { type: Number, required: true },
  balanceSec: { type: Number, required: true },
  isTelegramComplete: { type: Boolean, require: true},
  isXComplete: { type: Boolean, require: true},
  isMessComplete: { type: Boolean, require: true},
  isWalComplete: { type: Boolean, require: true},
});

export const User = model("Users", userSchema);
