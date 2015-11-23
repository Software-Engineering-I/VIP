var express = require('express');
var router = express.Router();

router.post('*',function(req,res){
	console.log('review backend');
});

module.exports = router;
