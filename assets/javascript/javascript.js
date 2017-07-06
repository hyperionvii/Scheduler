 // Initialize Firebase
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
  

    var $row = $("<tr>")
    var $trainName = $("<td>").text(childSnapshot.val().name)
    var $destination = $("<td>").text(childSnapshot.val().destination)
    var $firstTrainTime = $("<td>").text(childSnapshot.val().time)
    var $frequency = $("<td>").text(childSnapshot.val().frequency)

    var $totalUpdate = $row.append($trainName, $destination, $firstTrainTime, $frequency);


    $("#table").append($totalUpdate)


    function nextTrainTime() {
       // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    }


  });


