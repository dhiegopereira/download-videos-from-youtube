const fs = require('fs');
const ytdl = require('ytdl-core');
const urls = require('./urls.json');

let info = '';
let name = '';

const init = async() => {
    for(let i = 0; i < urls.length; i++) {
        try {
            info = await ytdl.getInfo(urls[i]);
            name = info.videoDetails.title
            name = name.replaceAll(',','')
            name = name.replaceAll(' ', '_')
            name = name.replaceAll('"', '');
            name = name.replaceAll('/', '');
            name = name.replaceAll('\\', '');
            name = name.replaceAll('|', '');
            name = name.replace(/[ÀÁÂÃÄÅ]/g,"A");
            name = name.replace(/[àáâãäå]/g,"a");
            name = name.replace(/[ÈÉÊË]/g,"E");
            name = name.normalize("NFD")
            console.log(name);
            await ytdl(urls[i]).pipe(fs.createWriteStream(`./videos/${i}_${name}.mp4`));
        } catch (error) {
            continue;
        }
    }
}
init();