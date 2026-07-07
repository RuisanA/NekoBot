const http = require("http");
const {
  Client,
  Intents,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Permissions,
} = require("discord.js");
const moment = require("moment");
const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const path = require("path");
const cron = require("node-cron");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const client = new Client({
  partials: ["CHANNEL", 'REACTION', 'USER'],
  intents: new Intents(32767),
});
const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal,
} = require("discord-modals");
const discordModals = require("discord-modals");
discordModals(client);
const newbutton = (buttondata) => {
  return {
    components: buttondata.map((data) => {
      return {
        custom_id: data.id,
        label: data.label,
        style: data.style || 1,
        url: data.url,
        emoji: data.emoji,
        disabled: data.disabled,
        type: 2,
      };
    }),
    type: 1,
  };
};
process.env.TZ = "Asia/Tokyo";
("use strict");
let guildId;

http
  .createServer(function (request, response) {
    try {
      response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      response.end(
        `ログイン`
      );
    } catch (e) {
      console.log(e);
    }
  })
  .listen(3000);

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error("tokenが設定されていません！");
  process.exit(0);
}

client.on("ready", (client) => {
  console.log(`ログイン: ${client.user.tag}`);
  client.user.setActivity({
    type: "PLAYING",
    name: `Neko.Bot`,
  });
  client.guilds.cache.size;
  client.user.setStatus("online");
});

client.once("ready", async () => {
  try {
    await client.application.commands.create({
      name: "embed",
      description: "埋め込み生成",
      options: [
        {
          type: "STRING",
          name: "title",
          description: "タイトル",
        },
        {
          type: "STRING",
          name: "title_url",
          description: "タイトル(URL)",
        },
        {
          type: "STRING",
          name: "description",
          description: "デスクリプション",
        },
        {
          type: "STRING",
          name: "author_name",
          description: "アーサー",
        },
        {
          type: "STRING",
          name: "author_name_url",
          description: "アーサー(URL)",
        },
        {
          type: "ATTACHMENT",
          name: "author_icon",
          description: "アーサー(icon)",
        },
        {
          type: "STRING",
          name: "footer_text",
          description: "フーター",
        },
        {
          type: "ATTACHMENT",
          name: "footer_icon",
          description: "フーター(icon)",
        },
        {
          type: "STRING",
          name: "color",
          description: "色",
        },
        {
          type: "ATTACHMENT",
          name: "image",
          description: "画像",
        },
        {
          type: "ATTACHMENT",
          name: "thumbnail",
          description: "サムネイル",
        },
        {
          type: "BOOLEAN",
          name: "timestamp",
          description: "タイムスタンプ",
        },
        {
          type: "STRING",
          name: "field_title_1",
          description: "フィールドタイトル(1)",
        },
        {
          type: "STRING",
          name: "field_value_1",
          description: "フィールドバリュー(1)",
        },
        {
          type: "BOOLEAN",
          name: "field_inline_1",
          description: "フィールドインライン(1)",
        },
        {
          type: "STRING",
          name: "field_title_2",
          description: "フィールドタイトル(2)",
        },
        {
          type: "STRING",
          name: "field_value_2",
          description: "フィールドバリュー(2)",
        },
        {
          type: "BOOLEAN",
          name: "field_inline_2",
          description: "フィールドインライン(2)",
        },
        {
          type: "STRING",
          name: "field_title_3",
          description: "フィールドタイトル(3)",
        },
        {
          type: "STRING",
          name: "field_value_3",
          description: "フィールドバリュー(3)",
        },
        {
          type: "BOOLEAN",
          name: "field_inline_3",
          description: "フィールドインライン(3)",
        },
        {
          type: "STRING",
          name: "field_title_4",
          description: "フィールドタイトル(4)",
        },
        {
          type: "STRING",
          name: "field_value_4",
          description: "フィールドバリュー(4)",
        },
        {
          type: "BOOLEAN",
          name: "field_inline_4",
          description: "フィールドインライン(4)",
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "embed") {
      if (!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({
          content: "サーバー管理者しか使えません",
          ephemeral: true,
        });
      const embed = new MessageEmbed();
      const title = interaction.options.getString("title");
      const title_url = interaction.options.getString("title_url");
      const description = interaction.options.getString("description");
      const author_name = interaction.options.getString("author_name");
      const author_name_url = interaction.options.getString("author_name_url");
      const author_icon = interaction.options.getAttachment("author_icon");
      const footer_text = interaction.options.getString("footer_text");
      const footer_icon = interaction.options.getAttachment("footer_icon");
      const image = interaction.options.getAttachment("image");
      const thumbnail = interaction.options.getAttachment("thumbnail");
      const timestamp = interaction.options.getBoolean("timestamp");
      const color = interaction.options.getString("color") || "#0015ff";
      const field_title_1 = interaction.options.getString("field_title_1");
      const field_value_1 = interaction.options.getString("field_value_1");
      const field_inline_1 = interaction.options.getBoolean("field_inline_1");
      const field_title_2 = interaction.options.getString("field_title_2");
      const field_value_2 = interaction.options.getString("field_value_2");
      const field_inline_2 = interaction.options.getBoolean("field_inline_2");
      const field_title_3 = interaction.options.getString("field_title_3");
      const field_value_3 = interaction.options.getString("field_value_3");
      const field_inline_3 = interaction.options.getBoolean("field_inline_3");
      const field_title_4 = interaction.options.getString("field_title_4");
      const field_value_4 = interaction.options.getString("field_value_4");
      const field_inline_4 = interaction.options.getBoolean("field_inline_4");

      if (title) {
        embed.setTitle(title);
      }
      if (title_url) {
        embed.setURL(title_url);
      }
      if (description) {
        embed.setDescription(description);
      }
      if (author_name) {
        embed.setAuthor(
          author_name,
          author_icon ? author_icon.url : null,
          author_name_url
        );
      }
      if (footer_text) {
        embed.setFooter(footer_text, footer_icon ? footer_icon.url : null);
      }
      if (image) {
        embed.setImage(image.url);
      }
      if (thumbnail) {
        embed.setThumbnail(thumbnail.url);
      }
      if (timestamp) {
        embed.setTimestamp();
      }
      if (color) {
        try {
          embed.setColor(color.toUpperCase());
        } catch (err) {
          return interaction.reply({
            content:
              "無効な色の値が指定されました。有効な色の値を指定してください。",
            ephemeral: true,
          });
        }
      }
      if (field_title_1 && field_value_1) {
        embed.addField(field_title_1, field_value_1, field_inline_1);
      }
      if (field_title_2 && field_value_2) {
        embed.addField(field_title_2, field_value_2, field_inline_2);
      }
      if (field_title_3 && field_value_3) {
        embed.addField(field_title_3, field_value_3, field_inline_3);
      }
      if (field_title_4 && field_value_4) {
        embed.addField(field_title_4, field_value_4, field_inline_4);
      }

      try {
        await interaction.channel.send({ embeds: [embed] });
      } catch (err) {
        const errorEmbed = new MessageEmbed()
          .setTitle(`Error[ ${err.toString()} ]`)
          .setDescription(
            `G:${interaction.guild.name}/${interaction.guild.id}\n` +
              `C:${interaction.channel.name}/${interaction.channel.id}/<#${interaction.channel.id}>\n` +
              `U:${interaction.user.username}/${interaction.user.id}/<@${interaction.user.id}>\n` +
              "```js\n" +
              err.stack +
              "```"
          )
          .setColor("#0015ff");
        await interaction.reply({
          content: "エラーが発生しました\n管理者に問い合わせてください",
          embeds: [errorEmbed],
          ephemeral: true,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

client.once("ready", async () => {
  try {
    await client.application.commands.create({
      name: "addemoji",
      description: "絵文字追加パネルを設置",
    });
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'addemoji') {
    if (!interaction.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
      return interaction.reply({ content: '権限がありません。', ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setTitle('絵文字コピーパネル')
      .setDescription('追加したい**カスタム絵文字**を、このメッセージにリアクションしてください。')
      .setColor('#0015ff')
      .setFooter({ text: '標準の絵文字は追加できません' });

    // パネル自体を送信
    await interaction.channel.send({ embeds: [embed] });
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  if (reaction.partial) await reaction.fetch();
  const message = reaction.message;
  if (message.embeds.length === 0 || message.embeds[0].title !== '絵文字コピーパネル') return;

  const emoji = reaction.emoji;
  if (!emoji.id) return;

  try {
    const extension = emoji.animated ? 'gif' : 'png';
    const url = `https://cdn.discordapp.com/emojis/${emoji.id}.${extension}`;

    // 絵文字作成
    const created = await message.guild.emojis.create(url, emoji.name);
    
    // 【重要】リアクションに対して ephemeral 応答はできないため、
    // チャンネルに投稿してすぐ消すか、DMを送る形になります。
    const successMsg = await message.channel.send({
        content: `✅ 追加ユーザー: ${user} \`:${created.name}:\` を追加しました`
    });
    
    // 3秒で削除（これで実質的にログには残りません）
    setTimeout(() => successMsg.delete().catch(() => {}), 3000);
    await reaction.users.remove(user.id).catch(() => {});
    
  } catch (error) {
    console.error(error);
    const failMsg = await message.channel.send(`エラー`);
    setTimeout(() => failMsg.delete().catch(() => {}), 3000);
  }
});

process.on('uncaughtException', (error) => {
    console.error('未処理の例外:', error);
    fs.appendFileSync('error.log', `未処理の例外: ${error.stack}\n`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未処理の拒否:', reason);
    fs.appendFileSync('error.log', `未処理の拒否: ${reason}\n`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
