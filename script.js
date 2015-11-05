/**
 * Created by Andrew.Brown on 11/3/2015.
 */


//key for openweathermap.org registered to brownand@onid.oregonstate.edu
var apiKey = '376ece3c0a3dc92f03f17c3dce06c08e';

/*add listeners for the buttons*/
document.addEventListener('DOMContentLoaded', bindButtons);
document.addEventListener('DOMContentLoaded', bindNameButton);

/*
function that binds the zipSubmit button to send the entered zipcode to openweathermap.org
parameters: no parameters for the bindButtons, but the anonymous high order function within it receives the button click even
returns: nothing
 */
function bindButtons(){
    //set up anonymous function for when button is clicked
    document.getElementById('zipSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var payload = {zip:null};
        //set payload equal to the field containing zip code
        payload.zip = document.getElementById('zipCode').value;
        //concatenate the string to include zip code, open the url
        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.zip + ',us, &appid=' + apiKey, true);
        //req.setRequestHeader('Content-Type', 'application/json');

        //asynchronous function, will return error message if no response in timeframe
        req.addEventListener('load', function(){
            if (req.status >=200 && req.status < 400){
                //convert responseText to JSON
                var results = JSON.parse(req.responseText);
                //console.log(results);

                var kelvin = results.main.temp;
                var fahrenheit = (kelvin *9/5) - 459.67;

                //set respective fields to show the response values
                document.getElementById('desc').textContent = results.weather[0].description;
                document.getElementById('city').textContent = results.name;
                document.getElementById('temp').textContent = fahrenheit.toFixed(2);
                console.log(req.statusText);

            } else {
                console.log("Error in network Request: " + req.statusText);

            }
        });
        req.send(null);
        event.preventDefault();

    })
}//end of bindButtons


/*
 function that binds the nameSubmit button to send the entered zipcode to openweathermap.org
 parameters: no parameters for the outer function, but the anonymous high order function within it receives the button click even
 returns: nothing
 */
function bindNameButton(){

    document.getElementById('nameSubmit').addEventListener('click', function(event){
        var postReq = new XMLHttpRequest();
        var payload = JSON.stringify({
            firstName: document.getElementById('fName').value,
            lastName: document.getElementById('lName').value
        });

        //open httbin url
        postReq.open('POST', 'http://httpbin.org/post', false);
        //set request header to JSON
        postReq.setRequestHeader('Content-Type', 'application/json');
        //send our data
        postReq.send(payload);
        //log status and results
        console.log(postReq.statusText);
        console.log(postReq.responseText);

        //convert responseText to JSON and set the values to show up in their respective fields
        var results = JSON.parse(postReq.responseText);
        document.getElementById('echofName').textContent = results.json.firstName;
        document.getElementById('echolName').textContent = results.json.lastName;

        event.preventDefault();
    })


}

