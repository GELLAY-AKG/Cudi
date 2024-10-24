module.exports.config = {
    name: "cur",
    version: "2.0.0",
    permssion: 0,
    credits: "Md Fahim Islam",
    description: "Image manipulation command using Canvas and Jimp",
    prefix: true,
    category: "fun",
    usages: "[tag]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": "",
        "canvas": "",
        "node-superfetch": ""
    }
};

module.exports.circle = async (image) => {
    const jimp = global.nodemodule['jimp'];
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
};

module.exports.handleEvent = async function({ api, event }) {
    try {
        const Canvas = global.nodemodule['canvas'];
        const request = global.nodemodule["node-superfetch"];
        const jimp = global.nodemodule["jimp"];
        const fs = global.nodemodule["fs-extra"];
        const path_toilet = __dirname + `/cache/damma.jpg';
        const id = Object.keys(event.mentions)[0] || event.senderID;

        const canvas = Canvas.createCanvas(500, 670);
        const ctx = canvas.getContext('2d');
        
        const background = await Canvas.loadImage('https://i.imgur.com/ES28alv.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        let avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=YOUR_ACCESS_TOKEN`);
        avatar = await this.circle(avatar.body);
        ctx.drawImage(await Canvas.loadImage(avatar), 48, 410, 111, 111);

        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(path_toilet, imageBuffer);

        api.sendMessage(
            { 
                attachment: fs.createReadStream(path_toilet, { 'highWaterMark': 128 * 1024 }), 
                body: "╭─────•◈•─────╮\n         🅂🄸🄳🄳🄸🄺🄱🄾🅃\n\nমুরগির ডিম চুরি করতে গিয়া ধরা থাইসে_ 🐸👻\n\n         𝗦𝗞.𝗦𝗜𝗗𝗗𝗜𝗞.𝗞𝗛𝗔𝗡       \n╰─────•◈•─────╯" 
            }, 
            event.threadID, 
            () => fs.unlinkSync(path_toilet), 
            event.messageID
        );
    } catch (e) {
        api.sendMessage(e.stack, event.threadID);
    }
};
