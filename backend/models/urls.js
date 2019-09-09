//---------------Importing required library for the class---------
const getUrls = require('get-urls');
const utils = require('../utils/utilities');
const pool = require('../config/dbconfig');

//-------Function to fetch only links from the database-------
getOnlyLinkDB = function(cb){
    var arr = new Array();
    pool.query('SELECT links FROM rssinfo.url',function(err,result) {
        if(err){
            console.log(err);
        }
        result.rows.forEach(element => {
            var obj = JSON.stringify(JSON.parse(JSON.stringify(element)).links);
            arr.push(obj);
        })
        cb(arr);
    })
}

//-------Function to fetch id and links from the database-------
getIdLinkDB = function(cb) {
    var arr = new Array();
    pool.query('SELECT "Id", links FROM rssinfo.url',function(err,result) {
        if(err){
            console.log(err);
        }
        result.rows.forEach(element => {
            var obj = JSON.parse(JSON.stringify(element));
            arr.push(obj);
        })
        cb(arr);
    })
}


//------Function to check duplicate data into the database-------------
verifyDuplicateLinkDB = function(url,cb){
    var flag;
    var dup = "Link Already Present!";
    var urlarr = getOnlyLinkDB(function(arr){
        url = JSON.stringify(url);
        for(var i = 0; i < arr.length; i++){
            if(arr[i] === url){
                this.flag = true;
                cb(dup);
                break;
            }
            else{
                this.flag=false;
            }
        }
        if(this.flag == false){
            pushLinkDB(url,function(str){
                cb(str)
            });
        }
        else if(this.flag == true){
            cb("Link Already Present");
        }
    })
}

//------Function to insert data into the database-------------
pushLinkDB = function(url,cb){
    urlset = getUrls(url);
    let arr = Array.from(urlset);
    var validurl;
    var rssprovider;
    if(arr.length !== 0) {
        validurl = utils.returnValidUrl(arr[0]);
        if(validurl === true) {
            var check = utils.returnValidRssProvider(arr[0],function(val){
                rssprovider = val;
                if(rssprovider === true){
                    pool.query("INSERT INTO rssinfo.url(links) VALUES('"+arr[0]+"')",function(err,result){
                        if(err){
                            cb(err);
                        }
                        else if(result.rowCount === 1){
                            cb("Inserted!");
                        }
                        else if(result.rowCount === 0){
                            cb("Not Inserted!");
                        }
                    })
                }
                else if(rssprovider === false){
                    cb("Not an Rss Provider!");
                }
            })
        }
    }
    else {
        cb("Urls Only Accepted!");
    }
}

//------Function to delete data into the database-------------
deleteLinkDB = function(id,cb){
    pool.query('DELETE FROM rssinfo.url WHERE "Id" ='+id, function(err,result){
        if(err) {
            cb(err)
        }
        else if(result.rowCount === 0){
            cb("Row Not Found");
        }
        else{
            cb("Deleted");
        }
    });
}

module.exports = {
    getIdLinkDB,
    getOnlyLinkDB,
    verifyDuplicateLinkDB,
    pushLinkDB,
    deleteLinkDB
};
