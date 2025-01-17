import TelegramBot from "node-telegram-bot-api";
import { UserService } from "../core/services/user.service";
import { HydratedDocument } from "mongoose";
import { IUser, UserRole } from "../core/models/user.model";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) throw new Error("BOT_TOKEN is undefined");

export const bot = new TelegramBot(BOT_TOKEN);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const msgText = msg.text;

  if (!msgText) return;

  if (msgText.startsWith("/start")) {
    await UserService.authUser({
      tgId: chatId.toString(),
    } as HydratedDocument<IUser>);

    await bot.sendMessage(
      chatId,
      `
🦉 Welcome to Owl Post!
Tap "Open" below to start managing your temporary emails. 💌
    `,
    );
  } else if (msgText == "/sendall") {
    await bot.sendMessage(
      chatId,
      `
Type "/sendall -m <your message>"
Flags: 
  * m - message;
  * p - photo (optional).
Example: "/sendall -p <url> -m <your message>"
    `,
    );
  } else if (msgText.startsWith("/sendall")) {
    const existUser = await UserService.getUser(chatId.toString());
    if (!existUser) {
      await bot.sendMessage(chatId, "User not found");
      return;
    }

    if (existUser.role != UserRole.ADMIN) {
      await bot.sendMessage(chatId, "Access denied");
      return;
    }

    const isPhoto = msgText.includes("-p");
    const photoUrl = msgText.split(" ")[2];

    const [_, message] = msgText.split("-m ");

    const users = await UserService.getAllUsers();

    for (const user of users) {
      try {
        if (isPhoto) {
          await bot.sendPhoto(parseInt(user.tgId), photoUrl, {
            parse_mode: "Markdown",
            caption: message,
          });
          return;
        }
        await bot.sendMessage(parseInt(user.tgId), message, {
          parse_mode: "Markdown",
        });
      } catch (err) {
        console.error(err);
      }
    }

    await bot.sendMessage(chatId, "Sending completed");
  }
});
