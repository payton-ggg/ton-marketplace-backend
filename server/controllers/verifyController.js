import CryptoJS from "crypto-js";
import { User } from "../db.js";

export const verifyTelegramWebAppData = async (telegramInitData) => {
  console.log("telegramInitData", telegramInitData);
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get("hash");

  const userData = {
    query_id: initData.get("query_id"),
    user: JSON.parse(initData.get("user")),
    auth_date: initData.get("auth_date"),
  };
  console.log("userData", userData);
  let dataToCheck = [];

  initData.sort();
  initData.forEach(
    (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`)
  );

  const secret = CryptoJS.HmacSHA256(process.env.TELEGRAM_API, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(
    CryptoJS.enc.Hex
  );

  const isVerify = _hash === hash;

  return { isVerify, userData };
};

export const verifyTelegramInitData = async (req, res) => {
  try {
    const { initData, tg } = req.body;
    console.log("res");

    const { isVerify, userData } = await verifyTelegramWebAppData(initData);

    if (isVerify) {
      
      const user = await User.findOne({ username: userData?.user?.username });
      const data = { ...userData };
      if (user?.username) {
        data.account = user;
      } else {
        data.account = await User.create({
          username: userData?.user?.username,
          isXComplete: false,
          isTelegramComplete: false,
          isMessComplete: false,
          balance: 0,
          balanceSec: 0,
        });
      }
      console.log("asdhas", data)
      res.status(200).json(data);
    } else {
      res
        .status(403)
        .json({
          message:
            "Зайдите через официальный webapp P.S. У нас нет слабых сторон)",
        });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так", error: e });
  }
};
