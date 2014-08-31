//Data Schema

var mongoose = require ('mongoose');

module.exports = mongoose.model('Userdata',{

  "_v": String,
  "_id": String,
  "appId": String,
  "userId": String,
  "entityId": String,
  "data":{
      "summary":{  //summary: video and problems 
          "star": Number,
          "badges": [String],
          "correct_count": Number,
          "correct_percent": Number
      },
        "current_activity": String,   //missing in some documents
        "is_complete" : Boolean,

          "activities":{

                  "f88d72ae-ebab-4f52-98b8-8512c7c6fa15":  {//video
                      "start_time": Date,
                      "end_time" : Date,
                       "summary":{
                          "badges" : [String]
                       },
                       "is_complete" : Boolean,
                  },
                  "8eb24161-de14-43cc-bfc1-a41040dadab2":{
                    "start_time" : Date,
                    "end_time" : Date,
                    "duration" : Date,
                    "is_complete" : Boolean,
                    "summary":{                           //summary : problems
                      "badges" : [String],
                      "correct_count" : Number,
                      "correct_percent" : Number
                    },
                    "problems": {
                        "e3e5eb58-ae83-466e-bf8d-b4790454e821":{  //problems
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        },
                        "9c5a4b70-0a56-4f50-b96c-a8dd00c28dbf":{
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        },
                        "d924f102-c067-46e6-9f10-44ee72d15981":{
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        },
                        "301a0efd-ec18-450f-bddd-b4dcda7e816c":{
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        },
                        "12efb0c1-c03c-405e-be25-224578b8054c":{
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        },
                        "866a27d1-7047-4f4a-b023-ccf6fe3f8190":{
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        },
                        "13596028-b012-43ef-a507-15e4635d6596":{
                          "is_correct": Boolean,
                          "answer" : [String],
                          "enter_time" : Date,
                          "submit_time" : Date
                        }


                    }
                  
                  }

      }
    }
}      

);
//module.exports = mongoose.model('Thread', threadSchema);