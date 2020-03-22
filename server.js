// export the packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//instanciate the app
const app = express();

//middleware
//Here we are configuring express to use bodyParser and cors.
app.use(bodyParser.urlencoded( {
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

//get the static website
app.use(express.static("assests"));



//port variable
const port = 3000;

//listen port
app.listen(port, _=> {
  console.log("I am listening on port: ", port)
})
//projectEndPoint
let projectData = {}
//recieve data to client and send back response
app.post("/postData", (req, res) => {
  console.log(req.body);
  projectData.temp = req.body.temperature,
  projectData.date = req.body.date,
  projectData.feeling= req.body.feeling;
  res.send({
    msg: "Hi, I recieve your message"
  })
})

//send data to client
app.get("/getData", (req, res)=> {
  res.send(projectData)
})