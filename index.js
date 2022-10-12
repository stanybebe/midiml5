const http = require('http')
const express = require('express')
const { Midi } = require('@tonejs/midi')
const fs = require('fs');
const app = express()
app.use(express.static('public'))

app.set('port', '3000')
app.use(express.json({ limit: "1mb" }));

app.post("/api", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const data = request.body;
  response.json({
    status: "success",
    data: data
  });

 
// console.log(nDJP[0][1]);
var midit = new Midi()
// add a track
const track = midit.addTrack()
for (let index = 0; index < data.length; index++) {
 

   track.addNote({
      midi : Math.floor(data[index][0].value),
      ticks : Math.floor(data[index][1].value+(index*2)/4)*128,
      duration: .09})

      
}
 
// write the output
fs.writeFileSync("midiml5_2.mid", new Buffer.from(midit.toArray()))
});


// const midiData = fs.readFileSync("public/D.mid")
// const midi = new Midi(midiData)
const newDJ = fs.readFileSync('public/newData.json', 'utf8');
// var tracks=[];
// for (let i = 0; i <midi.tracks[0].notes.length ; i++) {

   
//    tracks.push([midi.tracks[0].notes[i].midi,midi.tracks[0].notes[i].ticks]); 
 
   
// }

// let data = JSON.stringify(tracks);
// fs.writeFileSync('D.json', data);
function toFindDuplicates(arry) {
  const uniqueElements = new Set(arry);
  const filteredElements = arry.filter(item => {
      if (uniqueElements.has(item)) {
          uniqueElements.delete(item);
      } else {
          return item;
      }
  });

  return [...new Set(uniqueElements)]
}


const server = http.createServer(app)
server.on('listening', () => {
 console.log('Listening on port 3000')



 
})
// console.log(tracks)




server.listen('3000')



