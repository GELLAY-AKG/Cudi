module.exports.config = {
    name: "kiss11",
    version: "2.0.0",
    permission: 0,
    credits: "SK-SIDDIK-KHAN",
    description: "Generates a kiss image with tagged users",
    prefix: true,
    category: "fun",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async () => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/`;
    const path = resolve(__dirname, 'cache', 'hon.png');

    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });

    if (!existsSync(path)) await downloadFile("https://i.imgur.com/BtSlsSS.jpg", path);
};

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache");

    let hon_img = await jimp.read(__root + "/hon.png");
    let pathImg = `${__root}/hon_${one}_${two}.png`;
    let avatarOne = `${__root}/avt_${one}.png`;
    let avatarTwo = `${__root}/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=YOUR_ACCESS_TOKEN`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=YOUR_ACCESS_TOKEN`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));

    hon_img.resize(700, 440)
        .composite(circleOne.resize(200, 200), 390, 23)
        .composite(circleTwo.resize(180, 180), 140, 80);

    let raw = await hon_img.getBufferAsync("image/png");
    fs.writeFileSync(pathImg, raw);

    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}

async function circle(imagePath) {
    const jimp = require("jimp");
    let image = await jimp.read(imagePath);
    image.circle(); 
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
    const ae = ["💚 Yeuanh ❤", "💛 Yeuem 💜"];
    const hc = Math.floor(Math.random() * 101) + 101; 
    const rd = Math.floor(Math.random() * 10) + 1; 
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);

    if (!mention[0]) {
        return api.sendMessage("Please tag 1 person", threadID, messageID);
    }

    var one = senderID;
    var two = mention[0];

    await Currencies.increaseMoney(senderID, parseInt(hc * rd));

    return makeImage({ one, two }).then(path => {
        const messageBody = `${ae[Math.floor(Math.random() * ae.length)]}\nHorimism after kissing is ${hc}%\n+ ${hc * rd} $`;
        api.sendMessage({
            body: messageBody,
            attachment: fs.createReadStream(path)
        }, threadID, () => fs.unlinkSync(path), messageID);
    });
};
