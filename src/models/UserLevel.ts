import DataTypes from "sequelize";
import { Events, Message } from "discord.js";
import client from "../handlers/clientHandler";
import databaseLevelUp from "../connections/databaseLevelUp";

const UserLevel = databaseLevelUp.define("user_level", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

async function addExperience(userId, experience) {
  const userLevel: any = await UserLevel.findByPk(userId);
  if (!userLevel) {
    await UserLevel.create({ id: userId, experience });
  } else {
    userLevel.experience += experience;
    await userLevel.save();
  }
}

let previousLevel = 0;

client.on(Events.MessageCreate, async (message: Message) => {
  const userId = message.author.id;
  addExperience(userId, 20);

  const userLevel: any = await UserLevel.findByPk(userId);

  if (userLevel) {
    let nextLevel = userLevel.level + 1;
    let requiredXP = nextLevel * 100; // Example XP formula
    if (userLevel.experience >= requiredXP) {
      userLevel.level++;
      userLevel.experience = userLevel.experience - requiredXP;
      await userLevel.save();
      if (userLevel.level > previousLevel) {
        message.reply(
          `Congratulations, you have reached level ${userLevel.level}!`
        );
        previousLevel = userLevel.level;
      }
    }
  }
});

export default UserLevel;
