const express = require('express');
const router = express.Router();

const urlcontroller = require('../controllers/urlcontroller');
const feedcontroller = require('../controllers/feedcontroller');

router.get('/rssurls', urlcontroller.viewLinks);
router.get('/rssidurls', urlcontroller.viewIdLinks);
router.post('/verinsurls', urlcontroller.verifyLinks);
router.post('/delurl',urlcontroller.deleteLinks);

router.get('/rssfeeds', feedcontroller.pushFeeds);
router.get('/viewfeeds', feedcontroller.viewFeeds);

module.exports = router;
