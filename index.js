const http = require('http')
const express = require('express')
const { Midi } = require('@tonejs/midi')
const fs = require('fs');
const app = express()
app.use(express.static('public'))

app.set('port', '3000')

const midiData = fs.readFileSync("public/D.mid")
const midi = new Midi(midiData)
const newDJ = fs.readFileSync('public/newData.json', 'utf8');
var tracks=[];
for (let i = 0; i <midi.tracks[0].notes.length ; i++) {

   
   tracks.push([midi.tracks[0].notes[i].midi,midi.tracks[0].notes[i].ticks]); 
 
   
}

let data = JSON.stringify(tracks);
// fs.writeFileSync('D.json', data);
let nDJP = JSON.parse(newDJ);
console.log(nDJP[0][1]);
var midit = new Midi()
// add a track
const track = midit.addTrack()
for (let index = 0; index < nDJP.length; index++) {
   console.log( Math.round(nDJP[index][1].value));
   track.addNote({
      midi : Math.floor(nDJP[index][0].value),
      ticks : Math.floor(nDJP[index][1].value),
      duration: 0.02})
}
 
// write the output
fs.writeFileSync("genD.mid", new Buffer.from(midit.toArray()))


const server = http.createServer(app)
server.on('listening', () => {
 console.log('Listening on port 3000')



 
})
console.log(tracks)




server.listen('3000')



