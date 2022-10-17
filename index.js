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

var midit = new Midi()

const track = midit.addTrack()
for (let index = 0; index < data.length; index++) {


   track.addNote({
      name : data[index][Math.round(Math.random(0,data[0].length))].label,
      ticks : Math.floor(Math.random(0,3)+(index*4)/4)*128,
      duration: .09})

      
}


fs.writeFileSync(Date.now()+"_midiml5_.mid", new Buffer.from(midit.toArray()))

});

const newDJ = fs.readFileSync('public/newData.json', 'utf8');



const server = http.createServer(app)
server.on('listening', () => {
 console.log('Listening on port 3000')

 
})




server.listen('3000')



