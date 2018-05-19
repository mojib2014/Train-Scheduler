
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCanQu8IEhSwcYISuO06IW0SmkHggW-UuY",
    authDomain: "train-schedule-b6aef.firebaseapp.com",
    databaseURL: "https://train-schedule-b6aef.firebaseio.com",
    projectId: "train-schedule-b6aef",
    storageBucket: "",
    messagingSenderId: "1024119340045"
};
  firebase.initializeApp(config);

  var database = firebase.database();
 
// Asumptions.
var tFrequency = 3;

// Time is 3:30 AM.
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// Current Time.
var currentTime = moment();
// console.log("Current Time: " + moment(currentTime).format("hh:mm"));

// Differrence between the times.
var differrenceTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log(differrenceTime);

// Time apart(Remainder).
var timeRemainder = differrenceTime % tFrequency;
// console.log(timeRemainder);

// Minutes until train.
var tMinutesTillTrain = tFrequency - timeRemainder;
// console.log(tMinutesTillTrain);

// Next Train.
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log(moment(nextTrain).format("hh:mm"));
// End of time Frequency.

// Button for adding train info.
$("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    // Grabbing user input.
    var trainName = $("#trainNameInput").val().trim();
    var lineName = $("#lineInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTime = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
   
    
      // Creates local "temporary" object for holding user's data.
    var newTrain = {
          trainNameInput: trainName,
          lineNameInput: lineName,
          destinationInput: destination,
          trainTimeInput: trainTime,
          frequencyInput: frequency
    }
    //   console.log(newTrain)

        // Uploads user input data to the database
        database.ref().push(newTrain);


        alert("train successefully added");

        // Clears all of the text-boxes
        $("#trainNameInput").val("");
        $("#lineInput").val("");
        $("#destinationInput").val("");
        $("#trainTimeInput").val("");
        $("#frequencyInput").val("");

        



});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry.

database.ref().on("child_added", function(childSnapshot, prevChildKey){
    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainNameInput;
    var lineName = childSnapshot.val().lineNameInput;
    var destination = childSnapshot.val().destinationInput;
    var trainTime = childSnapshot.val().trainTimeInput;
    var frequency = childSnapshot.val().frequencyInput;

    // Adding each train's data into the table.
    var tableRow = $("<tr>");
    tableRow.append("<td>" + trainName + "</td>");
    tableRow.append("<td>" + lineName + "</td>");
    tableRow.append("<td>" + destination + "</td>");
    tableRow.append("<td>" + trainTime + "</td>");
    tableRow.append("<td>" + frequency + "</td>");
    $("#trainTable > tbody").append(tableRow);

});

// animation circle
anime.timeline({loop: true})
  .add({
    targets: '.ml8 .circle-white',
    scale: [0, 3],
    opacity: [1, 0],
    easing: "easeInOutExpo",
    rotateZ: 360,
    duration: 1100
  }).add({
    targets: '.ml8 .circle-container',
    scale: [0, 1],
    duration: 1100,
    easing: "easeInOutExpo",
    offset: '-=1000'
  }).add({
    targets: '.ml8 .circle-dark',
    scale: [0, 1],
    duration: 1100,
    easing: "easeOutExpo",
    offset: '-=600'
  }).add({
    targets: '.ml8 .letters-left',
    scale: [0, 1],
    duration: 1200,
    offset: '-=550'
  }).add({
    targets: '.ml8 .bang',
    scale: [0, 1],
    rotateZ: [45, 15],
    duration: 1200,
    offset: '-=1000'
  }).add({
    targets: '.ml8',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1400
  });

anime({
  targets: '.ml8 .circle-dark-dashed',
  rotateZ: 360,
  duration: 8000,
  easing: "linear",
  loop: true
});
//end animation circle

  
  anime.timeline({loop: true})
    .add({
      targets: '.ml1 .letter',
      scale: [0.3,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 600,
      delay: function(el, i) {
        return 70 * (i+1)
      }
    }).add({
      targets: '.ml1 .line',
      scaleX: [0,1],
      opacity: [0.5,1],
      easing: "easeOutExpo",
      duration: 700,
      offset: '-=875',
      delay: function(el, i, l) {
        return 80 * (l - i);
      }
    }).add({
      targets: '.ml1',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
//end line effect





