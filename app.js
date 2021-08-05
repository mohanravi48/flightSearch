const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const fs = require('fs');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;


let fData = require("./flightData.json");
let fDetails = require("./flightDetails.json");

const save = () => {
    fs.writeFile(
      "./flightData.json",
      JSON.stringify(fData, null, 2),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };


app.get('/api/flight', (req, res) => {
    const flightData = fData;
    res.status(200).json(flightData)
});


    app.post('/api/getFlightsByLcoation',(req,res)=>{
        console.log(req.query.Source)
        var searchedFlight=[]
        fDetails.forEach(element => {
            if(element.Source==req.query.Source && element.Destination==req.query.Destination){
                searchedFlight.push(element)
        }
    })
    res.status(200).json(searchedFlight)
    });


    app.get('/api/search/:id', (req, res) => {

        const findState = fData.find((state) => state.id === req.params.id);
         res.status(200).json(findState);

        });


    app.post('/api/add', (req, res) => {
        fData.push(req.body);
        save();
            res.json({
              status: "success",
              stateInfo: req.body,
            });
          });
    
                  
app.listen(port, () => {
console.log('server is running on port'+port);
});