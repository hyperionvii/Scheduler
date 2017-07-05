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


    database.ref("users").on("child_added", function(childSnapshot) {
  
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);

    var $row = $("<tr>")
    var $nameAdd = $("<td>").text(childSnapshot.val().name)
    var $roleAdd = $("<td>").text(childSnapshot.val().role)
    var $startDateAdd = $("<td>").text(childSnapshot.val().startDate)
    var $monthlyRateAdd = $("<td>").text(childSnapshot.val().monthlyRate)

    var $totalUpdate = $row.append($nameAdd, $roleAdd, $startDateAdd, $monthlyRateAdd);

    console.log($totalUpdate);
    console.log($("#table"))
    $("#table").append($totalUpdate)


  });


