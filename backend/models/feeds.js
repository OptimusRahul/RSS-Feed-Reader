//------------------Required Libraries of the Class---------------
const feed = require('feed-read');
const striptags = require('striptags');
const pool = require('../config/dbconfig');
const urlModel = require('./urls');
const utils = require('../utils/utilities');

initServer = function(req,res){
    urlModel.getOnlyLinkDB(function(arr){
        fetchFeedsServer(res,arr,function(str){
            console.log(str);
        });
    });
}

setInterval(initServer, 600000);

fetchFeedsServer = function(res,arr,cb){
    for(var a = 0; a < arr.length; a++){
        arr[a] = arr[a].replace(/"/g,"");
        feed(arr[a], function(err, articles) {
            if(err) {
                console.log(err);
            }
            else{
                for (var i = 0; i < articles.length; i++) {
                    verifyDuplicateFeedsDB(res, articles[i],function(str){
                        cb(str);
                    });
                    if( i === articles.length-1 && a === arr.length-1) {
                        break;
                    }
                }
            }
        });
    }
}

verifyDuplicateFeedsDB = function(res, a,cb){
    var flag = false;
    const str = "FeedisalreadyinDb";
    var feedarr = viewFeedsDB(function(arr){
        for(var i = 0; i < arr.length; i++){
            if(JSON.stringify(arr[i].feedtitle) === JSON.stringify(a.title)){
                flag = true;
                break;
            }
        }
        if(flag == false){
            pushFeedsDB(res,a,function(str){
                cb(str)
            });
        }
        else{
            return str;
        }
    })
}

pushFeedsDB = function(res,a,cb){
    pool.query("CREATE TABLE IF NOT EXISTS rssinfo.feed(Feed_id serial, FeedTitle text, FeedContent Text unique, FeedUrls text unique, FeedProvider text, FeedCategory text, Feeddatetime text)");
    var title = a.title;
    var content = striptags(a.content);
    var link = a.link;
    var dayandtime = a.published;
    var clock = utils.formatTime(dayandtime);
    var day = utils.formatDate(dayandtime);
    var datetime = day+" "+ clock;
    var feedProvider = utils.RSS_FeedProvider(a.feed.source);
    var feedCategory = utils.RSS_FeedCategory(a.feed.source);
    pool.query("INSERT INTO rssinfo.feed (FeedTitle,FeedContent,FeedUrls,FeedProvider,FeedCategory,Feeddatetime) VALUES ($1,$2,$3,$4,$5,$6)",
                [title,content,link,feedProvider,feedCategory,datetime],function(err,res){
                    if(err) cb(err.message);
                    else cb("Inserted");
                });
}

viewFeedsDB = function(cb){
    var arr = new Array();
    pool.query('SELECT feed_id, feedtitle, feedcontent, feedurls, feedprovider, feedcategory, feeddatetime FROM rssinfo.feed ORDER BY feeddatetime DESC ;',function(err,result) {
        if(err) console.log(err);
        result.rows.forEach(element => {
            var obj = JSON.parse(JSON.stringify(element));
            arr.push(obj);
        })
        cb(arr);
    })
};

module.exports ={
    initServer,
    viewFeedsDB,
};
