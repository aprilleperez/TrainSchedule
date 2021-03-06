// GAME CAN BE FOUND AT: https://aprilleperez.github.io/bootstrap-portfolio/portfolio.html

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBdAgXvwciXeroxQh6D7pXi93F3tuHlenE",
    authDomain: "trainscheduler-c06ad.firebaseapp.com",
    databaseURL: "https://trainscheduler-c06ad.firebaseio.com",
    projectId: "trainscheduler-c06ad",
    storageBucket: "trainscheduler-c06ad.appspot.com",
    messagingSenderId: "4670420488"
};
firebase.initializeApp(config);

var database = firebase.database(); // store database in easy to ref var


// Function for on submit button click
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input from each form input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data from value inputs
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads train object data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    event.preventDefault();
});


// Function to create Firebase event adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) { // when firebase updates at that moment

    // Store everything at that moment into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var tFrequency = trainFrequency;

    // Converts time from unix time back to wall clock (military) time
    var firstTimeConverted = moment(trainTime, "X");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minutes Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;

    // Calculate the next train time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});








// DEBUGS
    // // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.time);
    // console.log(newTrain.frequency);

    // alert("Train successfully added");

    //  // Train Info
    //  console.log(trainName);
    //  console.log(trainDestination);
    //  console.log(trainTime);
    //  console.log(trainFrequency);

    // console.log(childSnapshot.val());
    
    // console.log(firstTimeConverted);
    // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    // console.log(tRemainder);
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // console.log("ARRIVAL TIME: " + nextTrain);