function getMonacoLang (contentType) { // eslint-disable-line no-unused-vars

    if (contentType == undefined) {
        return "plaintext";
    }

    switch (true) {
        case contentType.includes("application/json"):
            return "json";
        case contentType.includes("text/html"):
            return "html";
        case contentType.includes("text/plain"):
            return "plaintext";
        default:
            return "json";
    }
}

function humanFileSize (size) { // eslint-disable-line no-unused-vars
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
