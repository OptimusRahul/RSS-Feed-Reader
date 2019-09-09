const feedModel = require('../models/feeds');

pushFeeds = function(req,res){
    feedModel.initServer(function(req,res){

    });
    res.json('Fetching Feeds From RSS Providers');
}

viewFeeds = function(req,res){
    feedModel.viewFeedsDB(function(arr){
        res.json(arr);
    });
}

module.exports = {
    pushFeeds,
    viewFeeds,
};