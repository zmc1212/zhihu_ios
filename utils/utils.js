var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')
var follow = require('../data/data_follow.js')
function getData(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2() {
  return index.index;
}

function getNext() {
  return index_next.next;
}

function getDiscovery() {
  return discovery.discovery;
}

function discoveryNext() {
  return discovery_next.next;
}

function getfollow() {
  return follow.follow;
}


module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.getfollow = getfollow;