var mongoose = require('mongoose');
var express = require("express");
mongoose.connect('mongodb://localhost/sunshine');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var DataSchema = require('./schema.js');
var userdata = DataSchema.model("Userdata");

DataProvider = function(){};
DataProvider.prototype.userdata = userdata;
var problemNum = 7;
var problemName = [ "e3e5eb58-ae83-466e-bf8d-b4790454e821",
					"9c5a4b70-0a56-4f50-b96c-a8dd00c28dbf",
					"d924f102-c067-46e6-9f10-44ee72d15981",
					"301a0efd-ec18-450f-bddd-b4dcda7e816c",
					"12efb0c1-c03c-405e-be25-224578b8054c",
					"866a27d1-7047-4f4a-b023-ccf6fe3f8190",
					"13596028-b012-43ef-a507-15e4635d6596"];

//compute interval between two time value
function interval(start_time, end_time){
  var s = new Date(start_time);
  var e = new Date(end_time);
  var i = e.getTime() - s.getTime();
  var seconds = i/(1000.0);
  var num = new Number(seconds);
  var m = num.toPrecision(2);
  return m;
}

DataProvider.prototype.AllData = function(callback){
	this.userdata.find(function(err, docs){
		if (err) callback(err);

		var data = new Object();
		var len = docs.length;

		var studentOverview =[];
		var studentProblem = [];
		var problemData = [];
		var problemData2 = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
		var problemAccuracy = [];
		var focusTime = [];
		var averageFocusTime = [0,0,0,0,0,0,0,0];

		var corrects = [0,0,0,0,0,0,0];
		var incorrects = [0,0,0,0,0,0,0];
		var missing = [0,0,0,0,0,0,0];
		var recordNum = [0,0,0,0,0,0,0,0];

		for(var i = 0; i < len ; i++){
			studentOverview[i] = [docs[i].userId, docs[i].data.summary.correct_count, docs[i].data.summary.star ,(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].duration/3600).toFixed(2)]; 
			
			studentProblem[i] = [];
			

		  		for (var j = 0 ; j < problemNum; j++){
					switch(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].is_correct){
						    	case undefined:
						    			studentProblem[i][j] = -1;
						    			problemData2[j][2]+=1;
						    			problemData[j] = {"correct": corrects[j],"incorrect": incorrects[j],"missing":missing[j]+=1};
						    		    break;
						        case true:
						       			studentProblem[i][j] = 1;
						       			problemData2[j][0]+=1;
						       			problemData[j] = {"correct": corrects[j]+=1,"incorrect": incorrects[j],"missing":missing[j]};
						        	    break;
					            case false:
					            		studentProblem[i][j] = 0;
					            		problemData2[j][1]+=1;
					            		problemData[j] = {"correct": corrects[j],"incorrect": incorrects[j]+=1,"missing":missing[j]};
					            		break;
					}
		  		}


				var videoTime = interval(docs[i].data.activities["f88d72ae-ebab-4f52-98b8-8512c7c6fa15"].start_time,docs[i].data.activities["f88d72ae-ebab-4f52-98b8-8512c7c6fa15"].end_time);
		   		var time = [0,0,0,0,0,0,0];

			    for(var j = 0; j < problemNum; j++){
			    	time[j] = interval(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].enter_time,docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].submit_time);
			    }

			    focusTime[i] = [videoTime,time[0],time[1],time[2],time[3],time[4],time[5],time[6]];	

		}

		for ( var i = 0; i< problemNum; i++){
			problemAccuracy[i] = (100* problemData[i].correct / (problemData[i].correct + problemData[i].incorrect)).toFixed(2);
		}


	    for (var i = 0; i < focusTime.length; i++) {
	   		for (var j = 0 ; j < problemNum+1; j++){
		        if (!isNaN(focusTime[i][j])){
			        recordNum[j]+=1;
			        averageFocusTime[j] = parseFloat(averageFocusTime[j])+parseFloat(focusTime[i][j]);
		        }   
            }	   	
        }

		for ( var k = 0; k< problemNum+1; k++){
		    averageFocusTime[k] = (parseFloat(averageFocusTime[k]) / recordNum[k] ).toFixed(2) ;
		}

		console.log(averageFocusTime);
		var averageStudentHours = 0 ;
		for (var i = 0 ; i < averageFocusTime.length ; i++){
			averageStudentHours += parseFloat(averageFocusTime[i]);
		}

		console.log(averageStudentHours);

		data.studentOverview = studentOverview;
		data.studentProblem = studentProblem;
		data.problemData = problemData2;
		data.problemAccuracy = problemAccuracy;
		data.focusTime = focusTime;
		data.averageFocusTime = averageFocusTime;

		data.studentNum = len;
		data.problemNum = problemNum;
		data.averageStudentHours = (averageStudentHours/3600).toFixed(2);
		data.totalStudentHours = (averageStudentHours * len/3600).toFixed(2);



		callback(null,data);
	})
}




//get the infomation about student name, correct_count, star, total time
DataProvider.prototype.studentOverview = function(callback){
	this.userdata.find(function(err,docs){
		if(err) callback(err);
		var len = docs.length;
		var studentOverview = [];
		for(var i = 0; i < len ; i++){
			studentOverview[i] = [docs[i].userId, docs[i].data.summary.correct_count, docs[i].data.summary.star ,(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].duration/3600).toFixed(2)]; 
		}
		callback(null, studentOverview);
	})
}


DataProvider.prototype.studentProblem = function(callback){
	this.userdata.find(function(err,docs){
		if(err) callback(err);
		var len = docs.length;
		var studentProblem = [];
		for (var i = 0; i < len; i++) {
			studentProblem[i] = [];
		  		for (var j = 0 ; j < problemNum; j++){
					switch(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].is_correct){
						    	case undefined:
						    			studentProblem[i][j] = -1;
						    		    break;
						        case true:
						       			studentProblem[i][j] = 1;
						        	    break;
					            case false:
					            		studentProblem[i][j] = 0;
					            		break;
					}
		  		}
	    }	
	    callback(null,studentProblem) ;
	})
}



DataProvider.prototype.problemData = function(callback){
	this.userdata.find(function(err,docs){
		if(err) callback(err);
		var len = docs.length;
		var problemData = [];
		var corrects = [0,0,0,0,0,0,0];
		var incorrects = [0,0,0,0,0,0,0];
		var missing = [0,0,0,0,0,0,0];

		for (var i = 0; i < len; i++) {
		  		for (var j = 0 ; j < problemNum; j++){
					switch(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].is_correct){
						    	case undefined:
						    		    problemData[j] = {"correct": corrects[j],"incorrect": incorrects[j],"missing":missing[j]+=1};
						    		    break;
						        case true:
						        	    problemData[j] = {"correct": corrects[j]+=1,"incorrect": incorrects[j],"missing":missing[j]};
						        	    break;
					            case false:
					            		problemData[j] = {"correct": corrects[j],"incorrect": incorrects[j]+=1,"missing":missing[j]};
					            		break;
					}
		  		}
	    }	 
	    callback(null,problemData);
	})
}


DataProvider.prototype.problemAccuracy = function(callback){
	var problemAccuracy = [];

	this.problemData(function(err,problemData){
		if(err) callback(err);	
	    for ( var i = 0; i< problemNum; i++){
			    problemAccuracy[i] = problemData[i].correct / (problemData[i].correct + problemData[i].incorrect ) ;
			    problemAccuracy[i] = problemAccuracy[i].toFixed(4)*100;
		}

   		 callback(null,problemAccuracy);
	})
}

DataProvider.prototype.focusTime = function(callback){
	this.userdata.find(function(err, docs){
		if (err) callback(err);
		var len = docs.length;
		var studentFocusTime =[];
		for (var i = 0; i < len; i++) {

			var videoTime = interval(docs[i].data.activities["f88d72ae-ebab-4f52-98b8-8512c7c6fa15"].start_time,docs[i].data.activities["f88d72ae-ebab-4f52-98b8-8512c7c6fa15"].end_time);
		    var time = [0,0,0,0,0,0,0];

		    for(var j = 0; j < problemNum; j++){
		    	time[j] = interval(docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].enter_time,docs[i].data.activities["8eb24161-de14-43cc-bfc1-a41040dadab2"].problems[problemName[j]].submit_time);
		    };

		    studentFocusTime[i] = [videoTime,time[0],time[1],time[2],time[3],time[4],time[5],time[6]];	      	
		}
	    callback(null, studentFocusTime);
	})
}


DataProvider.prototype.averageFocusTime = function(callback){
	var recordNum = [0,0,0,0,0,0,0,0];
	var averageFocusTime = [0,0,0,0,0,0,0,0];

	this.focusTime(function(err,focusTime){
		if(err) callback(err);
		for (var i = 0; i < focusTime.length; i++) {
		    for (var j = 0 ; j < problemNum+1; j++){
		       if (!isNaN(focusTime[i][j])){
			        recordNum[j]+=1;
			        averageFocusTime[j] = parseFloat(averageFocusTime[j])+parseFloat(focusTime[i][j]);
		        }   
		    }	   	
		}

		for ( var k = 0; k< problemNum+1; k++){
		    	averageFocusTime[k] = (parseFloat(averageFocusTime[k]) / recordNum[k] ).toFixed(2)  ;
		}

	    callback(null,averageFocusTime);	
    })
}


exports.DataProvider = DataProvider;
