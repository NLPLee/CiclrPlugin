let http;

let fetchAPI = function() {
    let data;
}

fetchAPI.prototype.fetchFromNative = function() {
    let queue = [];
    queue.push(cmd);
    var data = JSON.stringify(queue);
    queue.length = 0; 
    return data;
}
var hone = new fetchAPI()

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function url(callback) {
    http = new XMLHttpRequest();
    http.open('HEAD', '/!hone_exec?' + (+new Date()), true);
    http.setRequestHeader('vc', /.*\((\d*)\)/.exec(navigator.userAgent)[1]);
    http.setRequestHeader('rc', uuid());
    http.setRequestHeader('ct', "hone");
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            
        }
    };
    http.send(null);
}

function execute(name, method, params, succscee) {
    let sParam = JSON.stringify(params)
    cmd = [uuid(), name, method, 'N', sParam];
    console.log("cmd : " + cmd)
    if( /Android/i.test(navigator.userAgent)) {
        window.prompt("hone://" + "hone.channel" + '/', JSON.stringify(cmd));
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        url(true)
    } else {}
    
    
}

let Plugin = {
    get (key, defaultValue) { execute("sharedpreference", "get", [key, defaultValue]) },
    fetchFromNative() {}
}

export default Plugin