const express = require('express')
const cors = require('cors')
const fs = require('fs')
const axios = require('axios')

const app = express()
const port = 3000

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


app.post('/getAudio', (req, res) => {
    console.log(req.body)
    const { audio_base64 } = req.body
    const buffer = Buffer.from(audio_base64, 'base64');
    fs.writeFileSync("audio.wav", buffer);
    axios.post('http://localhost:8011/A2F/Player/Play', {
        a2f_player: '/World/audio2face/Player'
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
