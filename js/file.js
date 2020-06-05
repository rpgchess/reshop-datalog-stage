function readFile(filename) {
    alert(filename);
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var ForReading = 1;
    var fileread = fso.OpenTextFile(filename, ForReading);
    var contents = fileread.ReadAll();
    fileread.close();
    return contents;
}

function saveFile(filename, content) {
    alert(filename + '\n' + content);
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var filesave = fso.CreateTextFile(filename, true);
    filesave.WriteLine(content);
    filesave.close();
}

function saveJSON(filename, content) {
    saveFile(filename + '.json', content);
}

function saveJSONReq(filename, content) {
    saveJSON(filename + '.req', content);
}

function saveJSONRes(filename, content) {
    saveJSON(filename + '.res', content);
}

function saveJSONBoth(filename, contentReq, contentRes) {
    saveJSONReq(filename, contentReq);
    saveJSONRes(filename, contentRes);
}