import { User } from "../db.js";
import { Bot } from "../../index.js";
import { calculateBalance } from "../helpers/balance.js";
import { calculateBalanceSec } from "../helpers/balanceSec.js";


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так", error: e });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { data, query_id } = req.body;
    const { username, isXComplete, isTelegramComplete, isMessComplete, isWalComplete } = data;
    console.log("req.body", req.body);

    const user = await User.create({
      username,
      isXComplete,
      isTelegramComplete,
      isMessComplete,
      isWalComplete,
    });

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так", error: e });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user: userData, account, query_id } = req.body;

    const user = await User.findOne({ username: account.username });

    const newBalance = calculateBalance(account, user);
    const newBalanceSec = calculateBalanceSec(account, user);
    const updatedUser = await User.findOneAndUpdate(
      { username: account.username },
      {
        isXComplete: account.isXComplete,
        isTelegramComplete: account.isTelegramComplete,
        isMessComplete: account.isMessComplete,
        balance: newBalance,
        balanceSec: newBalanceSec,
      }
    );

    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так", error: e });
  }
};
