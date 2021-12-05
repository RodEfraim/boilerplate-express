/**
 * NOTE: To display, run the following commands on the terminal.
 * npm install
 * npm start
 * 
 * Go to your browser and write "localhost:3000"
 * 
 * To see 
 * 
 * To kill the npm start process run the following command: 
 * killall -9 node
 * or
 * kill -9 <PROCESS ID / PID>
 * 
 * To see which process is running run the following:
 * lsof -i :<PORT NUMBER>
 * 
 */

require('dotenv').config()


var express = require('express');
var bodyParser = require('body-parser');


var app = express();
console.log("Hello World");

var absolutePath = __dirname + "/views/index.html";
var absolutePathAsset = __dirname + "/public";


/**
 * Let’s serve our first string! In Express, routes takes the following
 * structure: app.METHOD(PATH, HANDLER). METHOD is an http method in
 * lowercase. PATH is a relative path on the server (it can be a
 * string, or even a regular expression). HANDLER is a function that
 * Express calls when the route is matched. Handlers take the form
 * function(req, res) {...}, where req is the request object, and res
 * is the response object. 
 */
/*app.get("/", function(req, res) {
    res.send("Hello Express");
});*/


/**
 * You can respond to requests with a file using the res.sendFile(path) method. You can
 * put it inside the app.get('/', ...) route handler. Behind the scenes, this method will
 * set the appropriate headers to instruct your browser on how to handle the file you
 * want to send, according to its type. Then it will read and send the file. This method
 * needs an absolute file path. We recommend you to use the Node global variable __dirname
 * to calculate the path. Send the /views/index.html file as a response to GET requests to
 * the / path. If you view your live app, you should see a big HTML heading (and a form that
 *  we will use later…), with no style applied
 */
app.get("/", function(req, res) {
    res.sendFile(absolutePath);
});

/**
 * In Express, you can put in place this functionality using the middleware
 * express.static(path), where the path parameter is the absolute path of the folder
 * containing the assets.
 */
app.use("/public", express.static(absolutePathAsset));



/**
 * Let's create a simple API by creating a route that responds with JSON at the path /json.
 * You can do it as usual, with the app.get() method. Inside the route handler, use the method
 * res.json(), passing in an object as an argument. This method closes the request-response loop,
 * returning the data. Behind the scenes, it converts a valid JavaScript object into a string,
 * then sets the appropriate headers to tell your browser that you are serving JSON, and sends
 * the data back. A valid object has the usual structure {key: data}. data can be a number, a string,
 * a nested object or an array. data can also be a variable or the result of a function call, in which
 * case it will be evaluated before being converted into a string. 
 * 
 * Serve the object {"message": "Hello json"} as a response, in JSON format, to GET requests to
 * the /json route.
 */
/*app.get("/json", function(req, res){
    res.json({"message": "Hello json"})
});*/



/**
 * Create a .env file in the root of your project directory, and store the variable
 * MESSAGE_STYLE=uppercase in it.
 * 
 * Then, in the /json GET route handler you created in the last challenge, transform the response
 * object's message to uppercase if process.env.MESSAGE_STYLE equals uppercase. The response object
 * should either be {"message": "Hello json"} or {"message": "HELLO JSON"}, depending on the
 * MESSAGE_STYLE value.
 * 
 * Note: If you are using Replit, you cannot create a .env file. Instead, use the built-in SECRETS
 * tab to add the variable.
 * 
 * If you are working locally, you will need the dotenv package. It loads environment variables from
 * your .env file into process.env. Install it with npm install dotenv. Then, at the top of your myApp.js
 * file, import and load the variables with require('dotenv').config()
 */
/*app.get("/json", function(req, res){
    if(process.env.MESSAGE_STYLE == "uppercase"){
      res.json({"message": "HELLO JSON"})
    }
    else{
      res.json({"message": "Hello json"})
    }
});*/



// TODO: For some reason, an error displays on the terminal when writing to the front end.
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// The middleware does not react to the app.get("/json") request from prev exercise.

/**
 * Build a simple logger. For every request, it should log to the console a string taking
 * the following format: method path - ip. An example would look like
 * this: GET /json - ::ffff:127.0.0.1. Note that there is a space between method and path
 * and that the dash separating path and ip is surrounded by a space on both sides. You can
 * get the request method (http verb), the relative route path, and the caller’s ip from the
 * request object using req.method, req.path and req.ip. Remember to call next() when you are
 * done, or your server will be stuck forever. Be sure to have the ‘Logs’ opened, and see what
 * happens when some request arrives.
 */
// + app.use: This will be meant for any HTTP method, get,put, post, etc.
// + Since no url path is provided, this will apply to every method.
app.use(function(req, res, next) {
    //console.log(req.method);
    //console.log(req.path);
    //console.log(req.ip);
    //console.log("GET /json - ::ffff:127.0.0.1");
    var string = req.method + " " + req.path + " - " + req.ip
    console.log(string);
    next();
  });


/**
 * In the route app.get('/now', ...) chain a middleware function and the final handler. In the
 * middleware function you should add the current time to the request object in the req.time key.
 * You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure
 * {time: req.time}
 */
app.get('/now',function(req, res, next) {
    req.time = new Date().toString()
    next();
    }, function(req, res){
    res.send({"time": req.time});
    }
);


/**
 * Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the
 * value of the part of the URL which matches its position. The captured values can be found in the
 * req.params object
 * 
 * route_path: '/user/:userId/book/:bookId'
 * actual_request_URL: '/user/546/book/6754'
 * req.params: {userId: '546', bookId: '6754'}
 * 
 * Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure
 * {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your
 * browser's address bar, visiting some matching routes
 */
// Param in the URL in this case will be /:word/
// Example URL to pass: http://localhost:3000/whateverword/echo
app.use("/:word/echo", function(req, res) {
    var string = req.params.word
    console.log(string);
    res.send({"echo": string});
});


/**
 * Another common way to get input from the client is by encoding the data after the route path, using a query
 * string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple
 * is separated by an ampersand (&). Express can parse the data from the query string, and populate the object
 * req.query. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different
 * format before you can send them.
 * 
 * route_path: '/library'
 * actual_request_URL: '/library?userId=546&bookId=6754'
 * req.query: {userId: '546', bookId: '6754'}
 * 
 * Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure
 * { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query
 * string e.g. ?first=firstname&last=lastname
 */
// Example URL to pass: http://localhost:3000/name?first=Rodrigo&last=Efraim
app.get("/name", function(req, res) {
    var firstn = req.query.first;
    var lastn = req.query.last;
    var string = firstn + " " + lastn;
    console.log(string);
    res.json({ "name": string});
});



/**
 * Note: In the following exercise you are going to receive data from a POST request, at the same
 * /name route path. If you want, you can use the method app.route(path).get(handler).post(handler). 
 * This syntax allows you to chain different verb handlers on the same path route. You can save a bit of 
 * typing, and have cleaner code.
 */
//TODO: Use body-parser to Parse POST Requests
/**
 * Install the body-parser module in your package.json. Then, require it at the top of the file. Store it
 * in a variable named bodyParser. The middleware to handle urlencoded data is returned by 
 * bodyParser.urlencoded({extended: false}). Pass the function returned by the previous method call to 
 * app.use(). As usual, the middleware must be mounted before all the routes that depend on it.
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Mount a POST handler at the path /name. It’s the same path as before. We have prepared a form in the html
 * frontpage. It will submit the same data of exercise 10 (Query string). If the body-parser is configured
 * correctly, you should find the parameters in the object req.body
 * 
 * route: POST '/library'
 * urlencoded_body: userId=546&bookId=6754
 * req.body: {userId: '546', bookId: '6754'}
 * 
 * Respond with the same JSON object as before: {name: 'firstname lastname'}. Test if your endpoint works
 * using the html form we provided in the app frontpage.
 */
// Input on the html front end, and click submit.
app.post("/name", function(req, res) {
    var firstn = req.body.first;
    var lastn = req.body.last;
    var string = firstn + " " + lastn;
    console.log(string);
    res.json({ "name": string});
});



 module.exports = app;
