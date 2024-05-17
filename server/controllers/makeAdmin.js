import { Admin } from "../db.js";
import { Bot } from "../../index.js";

export const makeAdmin = async (req, res) => {
  try {
    const { username, adminUsername, query_id } = req.body;
    const isAdmin = await Admin.findOne({ username: adminUsername });

    if (isAdmin) {
      const user = await Admin.create({ username });

      if (query_id) {
        Bot.answerWebAppQuery(query_id, {
          type: "article",
          id: query_id,
          title: "Пользователь сделан админом",
          input_message_content: {
            message_text: `Пользователь ${username} теперь админ`,
          },
        });
      }

      res.status(200).json(user);
    } else {
      res.status(403).json({ message: "Нет прав" });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так", error: e });
  }
};
