import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const launchBot = () => {
  const Bot = new TelegramBot(process.env.TELEGRAM_API, { polling: true });

  const commands = [

    {

        command: "start",
        description: "Start bot"

    },
    {

        command: "ref",
        description: "Get ref link"

    },
  ]

  Bot.setMyCommands(commands);

  Bot.onText(/\/users/, async (msg, match) => {
    const userId = msg.from.id;
    const { data: users } = await axios.get("http://localhost:3030/api/users");
  
    const createUserList = () =>
      users
        .map(
          (user, iter) =>
            `${iter}. ${user.name} ${user.lastName}. Роль: ${user.role}. ID: ${user._id}`
        )
        .join("\n\n");
  
    Bot.sendMessage(userId, createUserList());
  });

  Bot.onText(/\/start/, async (msg, match) => {
    try {

      const chatId = msg.from.id;

      await Bot.sendMessage(chatId, `Welcome to Connect! 👋\n\nThe Connect quest bot is a product of the <b>Black and White</b> ecosystem, aimed at developing the potential of The Open Network.\n\nPerform simple tasks from many of our partners and get acquaintance with colorful communities and a sea of tokens in return!`, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open WebApp",
                web_app: {
                  url: process.env.FRONT_URL + "/",
                },
              },
            ],
          ],
        },
      });

      if(msg.text.length > 6) {
          const refID = msg.text.slice(7);
          if (msg.from.id != refID) {
            await Bot.sendMessage(msg.chat.id, `You join be user's link with ID ${refID}`);
          }
       }
    }
    catch(error) {
        console.log(error);
    }
  });

  Bot.onText(/\/ref/, async (msg, match) => {
    await Bot.sendMessage(msg.chat.id, `https://t.me/ConnectQ_Bot?start=${msg.from.id}`);
  });

  Bot.on("message", async (msg) => {
    if (msg?.web_app_data?.data) {
      const queryId = msg.chat.id;
      const message = JSON.parse(msg?.web_app_data?.data);

      try {
        Bot.sendMessage(queryId, `Из фронта: ${msg?.web_app_data?.data}`);
      } catch (e) {
        console.log(e);
      }
    }
  });

  return Bot;
};

export default launchBot;
