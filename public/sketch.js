

let model;
var inputs = [];
var counter = 0;
let newData = [];
var data = [];
var isOn;
var count=0;
var measure =[];
let measureContents=[];
var on = false;
var selectedDiv=[];
var mapRange = function(from, to, s) {
    return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
  };

  var tempo = document.getElementById('tempo');
  var checkbox = document.getElementById('play');
  var mapRange = function(s, from, to) {
      return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
    };
  // checkbox.addEventListener('change',async function() {
  //   if (this.checked) {
  //         await Tone.start()
  //         isOn = true;
  //         console.log('audio is ready')
  //   } else {
  //     Tone.stop;
  //   }
  // });
  const refreshRate = 1000 / 64;
  var index=0;
   document.getElementById('play').checked = false;
   document.querySelector('play')?.addEventListener('checked', async () => {
    await Tone.start()
    console.log('audio is ready')
  })
  var notes =['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4', 'A#4', "B4","rest"];  
  var noteNum = [60,61,62,63,64,65,66,67,68,69,70,71];
  var notesToPlay = [];

  const reverb = new Tone.Reverb({
    "wet": .5,
    "decay": 2.5,
    "preDelay": 0.01
  }).toDestination();

const filterLead = new Tone.Filter(2000, "lowpass").connect(reverb);


const synth = new Tone.Synth({
  "oscillator": {
   "type": "sawtooth"
}
}).connect(filterLead);
synth.volume.value =-5;

var selected = document.getElementById('div'+index);

function printBtn() {

   
  for (var i = 0; i < 32; i++) {
      let div = document.createElement("div")
      div.setAttribute("style", "display: block;width:300px;");
      div.setAttribute("id","div"+i);
      document.body.appendChild(div);
      measure.push(i*4);

      for (var j = 0; j < 12; j++) {
     var btn = document.createElement("input");
     btn.setAttribute("type", "radio");
     btn.setAttribute("name", "group"+i);
     btn.setAttribute("class", "btn");
     btn.setAttribute("id","btn"+j);
     btn.setAttribute("value",notes[j]);
     div.appendChild(btn);
    
      }
    
  }


}

function updateSeq(){
   
  var selected = document.getElementById('div'+index);
  
  selected.style.backgroundColor = "red";
  selected.style.backgroundColor = "white";

for (let i = 0; i < selected.children.length; i++) {
  
  if(selected.children[i].checked){
  notesToPlay.unshift(selected.children[i].value);
  // console.log(notesToPlay);
  }
 
}

}
var play = document.querySelector('input[id="play"]');
play.addEventListener('change', () => {
    if(play.checked) {
      isOn = true;
    } else {
      isOn = false;
    }
  });

    setInterval(() => {  
  
    
    count++;
    // console.log(count);
    if(count > document.getElementById('tempo').value){
    count = 0;
    if(isOn===true){  
    Tone.start();
    updateSeq();

    index++;
    var prevIndex = index -1;
    
    if(notesToPlay.length === 1){
       
        synth.triggerAttackRelease(notesToPlay[0],'64n');
    }   



    if(index>=32){
      index = 0;
  }
  if(index != prevIndex){
    
      notesToPlay.length = 0;

      var selected = document.getElementById('div'+index);
      selected.style.backgroundColor = "red";
    }


  }}}
  ,refreshRate);


  function makeFile(){
    isOn = false;
  
    
    var time = 0;
    for (let i = 0; i < 32; i++) {
      selectedDiv.push(document.getElementById('div'+i));
  for (let j = 0; j < 12; j++) {
  if(selectedDiv[i].children[j].checked===true){  
  data.push([noteNum[j],measure[i]]);
  
  }

  }
   
  }

  console.log(data);

  }
function setup() {
  // createCanvas(400, 400);
  noCanvas();

  let options = {

    // task: 'classification',
    debug: 'true'
  };

  model = ml5.neuralNetwork(options);

}




function whileTraining(epoch, loss) {
  console.log(epoch);
}




function finishedTraining(err) {
    console.log("finishedTraining");
  
  for(let i =0;i<data.length;i++){


      model.predict([floor(random(60, 71)), floor(random(0, 32))], (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        
        newData.push(results);


     
   
      });
      
    }
    var ndJSON = JSON.stringify(newData);
    console.log(newData)

    fetch("/api", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    }

function clear(){
  newData = [];
}
function trainDataButton(){
  makeFile();  

console.log(data);
for(let times = 0; times < 100; times++){
 for (let item = 0; item < data.length; item++) {

  model.data.addData(
    {
      input0: data[item][0],
      input1: data[item][1],
    },
    {
      output0: data[item][0],
      output1: data[item][1],
    });

 }
}
 

  model.normalizeData();
  console.log(model.data)


const trainingOptions = {

  epochs: 100,
  debug: true,
  task: 'regression',
  layers: [
    {
      type: 'dense',
      activation: 'relu'
    }
  ]
 
}


  model.train(trainingOptions, finishedTraining);

 
 

}