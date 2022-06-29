// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const div = document.getElementById("missionTarget");
   div.innerHTML = `\
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
                `;

}

function validateInput(testInput) {
    if (testInput === ""){
        return "Empty";
    } else if (isNaN(testInput) === true){
        return "Not a Number";
    } else if (testInput === Number){
        return "Is a Number";
    }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    if (validateInput(pilot) === "" || validateInput(copilot) === "" || validateInput(fuelLevel) === "" || validateInput === ""){
        alert("All fields are required");
        event.preventDefault();
    } else if (validateInput(pilot) === "Is a Number"){
        alert("Please input a valid pilot name.");
    } else if (validateInput(copilot) === "Is a Number"){
        alert("Please input a valid copilot name.");
    } else if (validateInput(fuelLevel) === "Not a Number"){
        alert("Fuel level must be numeric");
    } else if (validateInput(cargoMass) === "Not a Number"){
        alert("Cargomass must be numeric");
    } else {
        list.style.visibility = "visible";

        document.getElementByID("pilotStatus").innerText = `Pilot ${pilot} is ready for launch!`;
        document.getElementByID("copilotStatus").innerText = `Co-pilot ${copilot} is ready for launch!`;

        if (fuelLevel < 10000 && cargoMass <= 10000){
            fuelStatus.innerText = "Not enough fuel for launch!";
            cargoStatus.innerText = "Cargo mass is ok for launch!";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        }
        
        if (fuelLevel < 10000 && cargoMass > 10000){
            fuelStatus.innerText = "Not enough fuel for launch!";
            cargoStatus.innerText = "Cargo mass too heavy for launch";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        }

        if (fuelLevel >= 10000 && cargoMass <= 10000){
            fuelStatus.innerText = "Fuel level high enough for launch";
            cargoStatus.innerText = "Cargo mass is ok for launch!";
            launchStatus.innerText = "Shuttle Is Ready For Launch";
            launchStatus.style.color = "green";
        }

        if (fuelLevel >= 10000 && cargoMass > 10000){
            fuelStatus.innerText = "Fuel level is good for launch";
            cargoStatus.innerText = "Cargo mass too heavy for launch";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        console.log("response");
        console.log(response);
        return response.json();

    });

    return planetsReturned;
}

function pickPlanet(planets) {
    //console.log(planets);
    let randomInt = Math.floor(Math.random() * planets.length);
    return planets[randomInt];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
