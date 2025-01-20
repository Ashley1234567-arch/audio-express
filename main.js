const express = require('express')
const cors = require('cors')
const fs = require('fs')
const axios = require('axios')

const app = express()
const port = 3000

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


app.post('/getAudio', async (req, res) => {
    console.log(req.body)
    const { audio_base64 } = req.body
    const buffer = Buffer.from(audio_base64, 'base64');
    fs.writeFileSync("audio.wav", buffer);
    await axios.post('http://127.0.0.1:8011/A2F/Player/SetTrack', {
        a2f_player: '/World/audio2face/Player',
        file_name: 'C:/Users/Administrator/Downloads/audio-express-main/audio.wav',
        time_range: [0, -1]
    })
    const audioToFaceCall = axios.post('http://127.0.0.1:8011/A2F/Player/Play', {
        a2f_player: '/World/audio2face/Player'
    });
    const unrealCall = axios.put('http://127.0.0.1:30010/remote/preset/Hope_response/function/Hope_response')
    await Promise.all([audioToFaceCall, unrealCall])
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
