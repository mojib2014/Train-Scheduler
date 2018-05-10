
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
    // console.log("train Name" +trainName)
    // console.log("line name: " + lineName);
    // console.log("destination: " +destination);
    // console.log("train time: " +trainTime);
    // console.log("frequency: " +frequency);
    
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

        // console logs user input.
        // console.log(trainName.trainName);
        // console.log(lineName.line);
        // console.log(destination.destination);
        // console.log(trainTime.trainTime);
        // console.log(frequency.frequency);

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

    // $("#trainTable > tbody").append("<td>" + trainName + "</td>");
    // $("#trainTable > tbody").append("<td>" + lineName + "</td>");
    // $("#trainTable > tbody").append("<td>" + destination + "</td>");
    // $("#trainTable > tbody").append("<td>" + trainTime + "</td>");
    // $("#trainTable > tbody").append("<td>" + frequency + "</td>");



});

// database.ref().on('value', function(snap){
//     console.log(snap.val())
// })



