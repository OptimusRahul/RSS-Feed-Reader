const urlModel = require('../models/urls');

viewLinks = function(req,res){
    urlModel.getOnlyLinkDB(function(arr){
        res.json(arr);
    });
}

viewIdLinks = function(req,res){
    urlModel.getIdLinkDB(function(arr){
        res.json(arr);
    });
}

verifyLinks = function(req,res){
    data = req.body.links;
    urlModel.verifyDuplicateLinkDB(data,function(str){
        if(str === "Inserted!"){
            res.json("Inserted!");
        }
        else if(str === "Not Inserted!"){
           res.json("Not Inserted!");
        }
        else if(str === "Urls Only Accepted!"){
            res.json("Please Insert Valid Rss Link!");
        }
        else if(str === "Link Already Present!"){
            res.json("Link Already Present!");
        }
        else if(str === "Not an Rss Provider!"){
            res.json("Not an Rss Provider!");
        }
    });
}

deleteLinks = function(req, res){
    data = req.body.Id;
    urlModel.deleteLinkDB(data,function(str){
        if(str === "Deleted"){
            console.log("Deleted");
            res.json("Deleted");
        }
        else if(str === "Row Not Found"){
            res.json("Row Not Found");
        }
        else {
            console.log(str);
            res.json(str);
        }
    });
}

module.exports = {
    viewLinks,
    viewIdLinks,
    verifyLinks,
    deleteLinks
};