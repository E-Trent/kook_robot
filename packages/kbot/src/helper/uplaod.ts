import { KBotify } from "kbotify";

export const getImage = (url: string) =>
  fetch(url)
    .then((res) => res.arrayBuffer())
    .catch(() => null);

export const uploadImage = async (
  bot: KBotify,
  url: string,
  fileName: string
) => {
  const image = await getImage(url);
  if (image !== null) {
    return bot.API.asset
      .create(Buffer.from(image), {
        filename: `${fileName}.png`,
        contentType: "image/png",
      })
      .then((res) => res.url);
  }
  return "";
};
