function readFile(filename) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var ForReading = 1;
    var fileread = fso.OpenTextFile(filename, ForReading);
    var contents = fileread.ReadAll();
    fileread.close();
    return contents;
}

function saveFile(filename, contents) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var filesave = fso.CreateTextFile(filename, true);
    filesave.WriteLine(contents);
    filesave.close();
}