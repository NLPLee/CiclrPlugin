let http
let currentId = uuid()

var fetchAPI = function() {
    var data
};

fetchAPI.prototype.fetchFromNative = function() {
    let data = JSON.stringify(queue)
    console.log("data : "+ data)
    queue.length = 0
    return data 
};

fetchAPI.prototype.callFromNative = function(resultCode, callbackId, resultData, keepAlive) {
    console.log("힝" + decodeURIComponent(resultData))
}

var hone = new fetchAPI();

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


function url(cmd, callback) {
    queue.push(cmd);
    http = new XMLHttpRequest();
    http.open('HEAD', '/!hone_exec?' + (+new Date()), true);
    http.setRequestHeader('vc', /.*\((\d*)\)/.exec(navigator.userAgent)[1]);
    http.setRequestHeader('rc', currentId);
    http.setRequestHeader('ct', "hone");
    http.onreadystatechange = function() {
    hone.fetchFromNative()
        if (this.readyState == this.DONE) {
            
        }
    };
    http.send();
}

function execute(name, method, params) {
    let sParam = JSON.stringify(params)
    let cmd = [currentId, name, method, 'N', sParam];
    console.log("cmd : " + cmd)
    if( /Android/i.test(navigator.userAgent)) {
        window.prompt("hone://" + "hone.channel" + '/', JSON.stringify(cmd));
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        url(JSON.stringify(cmd), true)
    } else {}
}

let Plugin = {
    get (key, defaultValue) { return execute("sharedpreference", "get", [key, defaultValue]) },
    fetchFromNative() {}
}

export default Plugin