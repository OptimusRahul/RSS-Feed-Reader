const url = require('url');
const feed = require('feed-read');
const date = require('date-and-time');
const validator = require('validator');

function returnValidRssProvider(data, cb){
    feed(data,function(err,articles){
        if(err){
            cb(false);
        }
        else{
            if(articles.length !== 0){
                cb(true);
            }
        }
    })
}

returnValidUrl = function(data) {
    return validator.isURL(data);
}

returnCurrentDate = function() {
    var currentDate = new Date(Date.now());
    return currentDate;
}

returnBackDate = function() {
    var backDate = returnCurrentDate;
    backDate.setDate((backDate.getDate())-7);
    return backDate;
}

formatDate = function(customDate) {
    return date.format(customDate,"DD-MM-YYYY");
}

formatTime = function(customDate) {
    return date.format(customDate,"HH:mm:ss");
}

RSS_FeedProvider = function(x) {
    var str = url.parse(x).hostname;
    str = str.replace(".com","");
    if(str.slice(-1)!='.'){
        str+='.';
    }
    var firstindexlink = str.indexOf('.');
    var lastindexlink = str.indexOf('.',str.indexOf('.')+1);
    str = str.substring(firstindexlink+1,lastindexlink);
    return str.toUpperCase();
}

RSS_FeedCategory = function(x) {
    var path = url.parse(x).pathname;
    var lastindexpath = path.lastIndexOf('/');
    var lastcharpath = path.length;
    path = path.substring(lastindexpath+1,lastcharpath);
    return path.toUpperCase();
}

module.exports = {
    returnCurrentDate,
    returnBackDate,
    formatDate,
    formatTime,
    RSS_FeedCategory,
    RSS_FeedProvider,
    returnValidUrl,
    returnValidRssProvider
}