import { rx } from 'rxjs';
let http
let result = {}
let queue = []

let fetchAPI = () => {}

fetchAPI.prototype.fetchFromNative = () => {
    var data = JSON.stringify(queue)
    console.log("data : "+ data)
    queue.length = 0
    return data 
}

let hone =  {
    channel:new fetchAPI()
}
window["hone"] = hone

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function url(cmd, callback) {
    queue.push(cmd);
    http = new XMLHttpRequest();
    http.open('HEAD', '/!hone_exec?' + (+new Date()), true);
    http.setRequestHeader('vc', /.*\((\d*)\)/.exec(navigator.userAgent)[1]);
    http.setRequestHeader('rc', uuid());
    http.setRequestHeader('ct', "hone.channel");
    http.onreadystatechange = function() {
    hone.fetchFromNative()
        if (this.readyState == this.DONE) {
            
        }
    };
    http.send();
}

fetchAPI.prototype.callFromNative = function(resultCode, callbackId, resultData, keepAlive) {
    console.log(`callFromNative${keepAlive}`)
    console.log(callbackId)

    console.log(result)
    result[callbackId] = decodeURIComponent(resultData);
}

function execute(name, method, params, currentId) {
    let sParam = JSON.stringify(params)
    
    let cmd = [currentId, name, method, 'N', sParam];
    result[currentId] = null
    console.log("cmd : " + cmd)
    if( /Android/i.test(navigator.userAgent)) {
        window.prompt("hone://" + "hone.channel" + '/', JSON.stringify(cmd));
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        url(JSON.stringify(cmd), true)
    } else {}
}
var myVar;
let Plugin = {
    get (key, defaultValue, callback) {     
        let currentId = uuid()
        execute("sharedpreference", "get", [key, defaultValue], currentId)
        let loop = setInterval(function() {
            if(result != null) {
                callback(result[currentId])
                delete result[currentId];
                clearInterval(loop)
            }
        }, 0)
    },
    set (key, defaultValue, callback) {
        let currentId = uuid()
        execute("sharedpreference", "set", [key, defaultValue], currentId)
        let loop = setInterval(function() {
            if(result != null) {
                callback(result[currentId])
                delete result[currentId];
                clearInterval(loop)
            }
        }, 0)
    }
}



export default Plugin