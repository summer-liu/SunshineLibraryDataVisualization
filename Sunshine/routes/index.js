var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	var collection = req.collection;
	
	collection.find(function(err,docs){
		if(err) return console.err(err);
		res.render('index');
		//console.log(docs[100].userId)
	});
  //res.render('index', { title: 'Express' });
});


module.exports = router;
