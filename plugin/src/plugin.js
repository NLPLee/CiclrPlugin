import { Observable } from 'rxjs';
let http
const currentId = uuid()
let queue = []
let a;

let fetchAPI = function() {
    
};

fetchAPI.prototype.fetchFromNative = function() {
    var data = JSON.stringify(queue)
    console.log("data : "+ data)
    queue.length = 0
    return data 
};

fetchAPI.prototype.callFromNative = function(resultCode, callbackId, resultData, keepAlive) {
    console.log("힝" + decodeURIComponent(resultData))
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
    http.setRequestHeader('rc', currentId);
    http.setRequestHeader('ct', "hone.channel");
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

fetchAPI.prototype.callFromNative = function(resultCode, callbackId, resultData, keepAlive) {
    
    a = decodeURIComponent(resultData);
    
    console.log("callFromNative" + decodeURIComponent(resultData))
}

let Plugin = {
    get (key, defaultValue, callback) {     

        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            setTimeout(() => {
              subscriber.next(4);
              subscriber.complete();
            }, 1000);
        });
        
        execute("sharedpreference", "get", [key, defaultValue]) 
        callback(a)
    }
}

export default Plugin