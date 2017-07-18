 // Initialize Firebase

var time = moment().format("hh:mm");

$(document).ready(function(){
  setInterval(time, 60000);
  $("#time").html(time);
});

var config = {
  apiKey: "AIzaSyBtiD9HpF_0RFQ0URjiOzAzCGnqLiD1FHU",
  authDomain: "scheduler-33fd9.firebaseapp.com",
  databaseURL: "https://scheduler-33fd9.firebaseio.com",
  projectId: "scheduler-33fd9",
  storageBucket: "scheduler-33fd9.appspot.com",
  messagingSenderId: "20870811331"
};

firebase.initializeApp(config);

var database = firebase.database()

var trainName, destination, frequency, firstTrainTime, nextArrival, minutesAway;


  $("#submit").on("click", function(event) {

    event.preventDefault();

    trainName = $("#trainName").val();
    destination = $("#destination").val();
    firstTrainTime = $("#firstTrainTime").val();
    frequency = $("#frequency").val();

    database.ref("newTrain").push({
      name: trainName,
      destination: destination,
      time: firstTrainTime,
      frequency: frequency
    });
  });


  database.ref("newTrain").on("child_added", function(childSnapshot) {

    trainName = childSnapshot.val().name
    destination = childSnapshot.val().destination
    firstTrainTime = moment(childSnapshot.val().time, "hh:mm").subtract(1,"years")
    frequency = childSnapshot.val().frequency

    var trainTimeDif = moment().diff(moment(firstTrainTime), "minutes");
    var remainder = trainTimeDif % frequency;
    var minutesTillTrain = frequency - remainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes")

    console.log(minutesTillTrain)
    console.log(nextTrain)


    var $row = $("<tr>")
    var $trainName = $("<td>").text(trainName)
    var $destination = $("<td>").text(destination)
    var $nextTrainTime = $("<td>").text(nextTrain)
    var $frequency = $("<td>").text(frequency)
    var $minutesTillTrain = $("<td>").text(minutesTillTrain)

    var $totalUpdate = $row.append($trainName, $destination, $frequency, $nextTrainTime, $minutesTillTrain);


    $("#table").append($totalUpdate)


  });
  

