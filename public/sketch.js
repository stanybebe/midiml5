

let model;
var inputs = [];
var counter = 0;
let newData = [];
var mapRange = function(from, to, s) {
    return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
  };
function setup() {
  createCanvas(400, 400);

  let options = {

    task: 'regression',
    debug: 'true'
  };

  model = ml5.neuralNetwork(options);
//   var data = loadJSON('/test.json')

  console.log(data[12][1])
 for (let item = 0; item < data.length; item++) {

      model.data.addData(
      {
        input0: data[item][0],
        input1: data[item][1],
      },
      {
        output0: data[item][0],
        output1: data[item][1]
      });
    // model.addData([data[item][0]],[data[item][1]]);
};
  
  model.normalizeData();



const trainingOptions = {
  epochs: 64,
  batchSize: 12

}
model.train(trainingOptions, finishedTraining);


  background(255);
}

function modelLoaded() {
  console.log('model loaded');
  dataLoaded();
}

function dataLoaded() {
  console.log(model.data);
//   let data = model.data.data.raw;
  

//   model.normalizeData();
  let options = {
    epochs: 200
  }
  model.train(options, whileTraining, finishedTraining);
  
 
}



function whileTraining(epoch, loss) {
  console.log(epoch);
}

// function finishedTraining() {
//   console.log('finished training.');
//   for (let index = 0; index < 36; index++) {
//     inputs.push([random(0, 1),random(0, 1)]);
      
//   }
//   console.log(inputs);
// gotResults();
// }



function finishedTraining() {
    console.log('finished training.');
   
    if (counter <35) {
    var m = mapRange([0,35],[0,1200],counter)
      model.predict([floor(random(0, 127)),m], (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        
        
        newData.push(results);
       
       
        ;
        counter += 1;
        finishedTraining();
      });
    }
    var ndJSON = JSON.stringify(newData);
    console.log(ndJSON)
  }

var data=[
    [ 63, 0 ],    [ 68, 192 ],
     [ 70, 288 ],  [ 73, 288 ],
     [ 71, 384 ],  [ 75, 576 ],
     [ 76, 672 ],  [ 75, 768 ],
     [ 78, 768 ],  [ 76, 912 ],
     [ 75, 960 ],  [ 76, 1008 ],
     [ 80, 1056 ], [ 83, 1152 ],
     [ 78, 1248 ], [ 80, 1344 ],
     [ 83, 1392 ], [ 87, 1392 ],
     [ 68, 0 ],    [ 80, 144 ],  [ 78, 192 ],
     [ 75, 240 ],  [ 75, 384 ],  [ 78, 408 ],
     [ 75, 432 ],  [ 73, 456 ],  [ 70, 480 ],
     [ 73, 504 ],  [ 70, 528 ],  [ 68, 552 ],
     [ 63, 576 ],  [ 67, 576 ],  [ 63, 648 ],
     [ 68, 648 ],  [ 70, 720 ],  [ 71, 744 ],
     [ 70, 768 ],  [ 75, 792 ],  [ 71, 816 ],
     [ 70, 840 ],  [ 68, 864 ],  [ 75, 936 ],
     [ 75, 984 ],  [ 75, 1008 ], [ 75, 1056 ],
     [ 80, 1104 ], [ 82, 1152 ], [ 85, 1176 ],
     [ 82, 1200 ], [ 80, 1224 ], [ 80, 1272 ],
     [ 82, 1296 ], [ 87, 1320 ], [ 82, 1344 ],
     [ 80, 1368 ], [ 90, 1392 ], [ 88, 1416 ],
     [ 90, 1440 ], [ 88, 1464 ], [ 87, 1488 ],
     [ 82, 0 ],    [ 78, 48 ],   [ 75, 96 ],
     [ 73, 144 ],  [ 72, 192 ],  [ 75, 240 ],
     [ 82, 288 ],  [ 85, 288 ],  [ 78, 384 ],
     [ 82, 384 ],  [ 75, 432 ],  [ 70, 480 ],
     [ 72, 528 ],  [ 75, 576 ],  [ 66, 624 ],
     [ 66, 768 ],  [ 68, 864 ],  [ 73, 864 ],
     [ 78, 864 ],  [ 68, 960 ],  [ 73, 960 ],
     [ 78, 960 ],  [ 68, 1008 ], [ 73, 1008 ],
     [ 78, 1008 ], [ 80, 1200 ], [ 82, 1248 ],
     [ 85, 1296 ], [ 82, 1344 ], [ 80, 1392 ],
     [ 78, 1440 ], [ 75, 1488 ],
     [ 80, 0 ],    [ 82, 48 ],   [ 83, 96 ],
     [ 82, 144 ],  [ 78, 192 ],  [ 75, 288 ],
     [ 82, 336 ],  [ 87, 528 ],  [ 82, 576 ],
     [ 81, 624 ],  [ 82, 672 ],  [ 83, 816 ],
     [ 82, 840 ],  [ 80, 864 ],  [ 78, 888 ],
     [ 77, 912 ],  [ 78, 936 ],  [ 80, 960 ],
     [ 82, 984 ],  [ 81, 1008 ], [ 82, 1032 ],
     [ 78, 1056 ], [ 77, 1080 ], [ 75, 1104 ],
     [ 82, 1248 ], [ 87, 1272 ]];
