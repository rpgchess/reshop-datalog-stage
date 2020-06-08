var file = {
    enum: {
        //IO Mode
        ForReading: 1,
        ForWriting: 2,
        ForAppending: 8,
        //Format
        TristateUseDefault: -2,
        TristateTrue: -1,
        TristateFalse: 0
    },
    fs: {},
    create: function() {
        this.fs = new ActiveXObject("Scripting.FileSystemObject");
    },
    read: function(filename) {
        //alert(filename); //return false;
        var file = this.fs.OpenTextFile(filename, this.enum.ForReading);
        var contents = file.ReadAll();
        file.close();
        return contents;
    },
    save: function(filename, content) {
        //alert(filename + '\n\n' + content); //return false;
        var file = this.fs.CreateTextFile(filename, true);
        file.WriteLine(content);
        file.close();
    },
    saveExt: function(filename, ext, content) {
        this.save(filename + ext, content);
    },
    saveJSON: function(filename, content) {
        this.saveExt(filename, '.json', content);
    }
}

file.create();
/*
Scripting.Dictionary
Scripting.FileSystemObject = {
    Drivers: [],
    Folders: [],
    Files: [],
    BuildPath(),
    CopyFile(filename: string, path: string, ???: booleano),
    CopyFolder(),
    CreateFolder(),
    CreateTextFile(filename: string, overwrite: boolean),
    DeleteFile(filename: string, ???: booleano),
    DeleteFolder(),
    DriveExists(),
    Drives(),
    FileExists(),
    FolderExists(),
    GetAbsolutePathName(),
    GetBaseName(),
    GetDrive(driver: string): Drive,
    GetDriveName(),
    GetExtensionName(),
    GetFile(filename: string): File,
    GetFileName(),
    GetFolder(search: string): Folder,
    GetParentFolderName(),
    GetSpecialFolder(),
    GetTempName(),
    MoveFile(),
    MoveFolder(),
    OpenTextFile(filename: string, iomode: number, create: boolean, format: number)
}
Folder = {
    Files: [],
}
TextStream = {
    ReadAll(),
    Write(content: string),
    WriteLine(content: string),
    Close()
}
File = {
    Name,
    Size,
    DateCreated,
    DateLastAccessed,
    DateLastModified,
    ShortName
}
Drive = {
    IsReady(),
    DriveLetter,
    VolumeName,
    TotalSize,
    FreeSpace,
    SerialNumber,
    DriveType
}
*/