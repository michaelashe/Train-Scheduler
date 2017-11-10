  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAFCRzKwxOUaobUI9M-SIh8GnzWPmZcvDo",
    authDomain: "trainschedule-4bc5d.firebaseapp.com",
    databaseURL: "https://trainschedule-4bc5d.firebaseio.com",
    projectId: "trainschedule-4bc5d",
    storageBucket: "",
    messagingSenderId: "648936243755"
    };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destInput = $("#destination-input").val().trim();
  var timeInputUnix = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
  var freqInput = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destInput,
    time: timeInputUnix,
    frequency: freqInput
  };

   // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(timeInputUnix);
  console.log(newTrain.frequency);

    // Alert
  alert("Train Schedule Added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");


  return false;

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().time;

  
  var differenceTimes = moment().diff(moment.unix(trainTime), "minutes");
  var trainRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency;
  var trainMinutes = trainFrequency - trainRemainder;

  var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A"); 
  console.log(trainMinutes);
  console.log(trainArrival);

  console.log(moment().format("hh:mm A"));
  console.log(trainArrival);
  console.log(moment().format("X"));

  // Add each train's data into the table 
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");

});


