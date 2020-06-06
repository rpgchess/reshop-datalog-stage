var system = {
    enum: {
        //EnviromentVariables
        ALL_USERS_PROFILE: '%ALLUSERSPROFILE%',
        APP_DATA: '%APPDATA%',
        CHASSIS: '%CHASSIS%',
        COMMON_PROGRAM_FILES: '%COMMONPROGRAMFILES%',
        COMPUTER_NAME: '%COMPUTERNAME%',
        DRIVER_DATA: '%DRIVERDATA%',
        FP_NO_HOST_CHECK: '%FP_NO_HOST_CHECK%',
        LOCAL_APP_DATA: '%LOCALAPPDATA%',
        LOGON_SERVER: '%LOGONSERVER%',
        MODEL: '%MODEL%',
        NUMBER_OF_PROCESSORS: '%NUMBER_OF_PROCESSORS%',
        OS: '%OS%',
        PATH: '%PATH%',
        PATH_EXT: '%PATHEXT%',
        PROCESSOR_ARCHITECTURE: '%PROCESSOR_ARCHITECTURE%',
        PROCESSOR_IDENTIFIER: '%PROCESSOR_IDENTIFIER%',
        PROCESSOR_LEVEL: '%PROCESSOR_LEVEL%',
        PROCESSOR_REVISION: '%PROCESSOR_REVISION%',
        PROGRAM_DATA: '%PROGRAMDATA%',
        PROGRAM_FILES: '%PROGRAMFILES%',
        PROMPT: '%PROMPT%',
        PS_MODUL_EPATH: '%PSMODULEPATH%',
        PUBLIC: '%PUBLIC%',
        SERIAL: '%SERIAL%',
        SESSION_NAME: '%SESSIONNAME%',
        SYSTEM_DRIVE: '%SYSTEMDRIVE%',
        SYSTEM_ROOT: '%SYSTEMROOT%',
        TEMP: '%TEMP%',
        TMP: '%TMP%',
        TYPE: '%TYPE%',
        COM_SPEC: '%COMSPEC%',
        HOME_DRIVE: '%HOMEDRIVE%',
        HOME_PATH: '%HOMEPATH%',
        UAT_DATA: '%UATDATA%',
        USER_DOMAIN: '%USERDOMAIN%',
        USER_NAME: '%USERNAME%',
        USER_PROFILE: '%USERPROFILE%',
        WIN_DIR: '%WINDIR%',
    },
    ws: {},
    env: {
        appData: '',
        userName: '',
        userProfile: '',
        winDir: ''
    },
    create: function() {
        this.ws = new ActiveXObject("WScript.Shell");
        arrTemp = String(this.ws.ExpandEnvironmentStrings(this.enum.APP_DATA + ',' + this.enum.USER_NAME + ',' + this.enum.USER_PROFILE + ',' + this.enum.WIN_DIR)).split(',');
        this.env.appData = arrTemp[0];
        this.env.userName = arrTemp[1];
        this.env.userProfile = arrTemp[2];
        this.env.winDir = arrTemp[3];
    },
    getEnviroment: function(variable) {
        return String(this.ws.ExpandEnvironmentStrings(variable));
    },
    showEnv: function() {
        alert(this.env.appData + '\n'
            + this.env.userName + '\n'
            + this.env.userProfile + '\n'
            + this.env.winDir
        );
    }
}

system.create();
/*
WScript.Shell = {
    enum = {
        //Run windowStyle
        HIDDEN: 0,
        NORMAL_FOCUS: 1,
        MINIMIZED_FOCUS: 2,
        MAXIMIZED_FOCUS: 3,
        NORMAL_NO_FOCUS: 4,
        MINIMIZED_NO_FOCUS: 5,
        //RegWrite type
        REG_SZ: 'REG_SZ', // default
        REG_EXPAND_SZ: 'REG_EXPAND_SZ',
        REG_DWORD: 'REG_DWORD',
        REG_BINARY: 'REG_BINARY',
        //Popup type (buttons)
        btnOk: 1,
        btnCancel: 2,
        btnAbort: 3,
        btnRetry: 4,
        btnIgnore: 5,
        btnYes: 6,
        btnNo: 7
    }
    AppActivate(),
    CreateShortcut(filename: string),
    Run(command: string, windowStyle: number, waitOnReturn: boolean),
    TileVertically(),
    RegRead(name: string): valueReg, // ShortName: HKCR | LongName: HKEY_CLASSES_ROOT | uses backslash(\)
    RegDelete(name: string), // ShortName: HKCR | LongName: HKEY_CLASSES_ROOT | uses backslash(\)
    RegWrite(name: string, value: any, type: string),
    Popup(text: string, secondsToWait: number, title: string, type: number),
    Enviroment(categoria: string)(variable: string), // ("Process")("UserProfile")
    ExpandEnvironmentStrings(stringWithEnviroment: string): string
}
Shortcut = {
    enum = {
        //Resolve flag
        Nothing: 1,
        SearchRecursive: 2,
        UpdateTarget: 4,
    }
    Hotkey: string, // "Ctrl+Alt+7"
    Arguments: string, // ""C:\Boot.ini"
    Description: string, // "Opens BOOT.INI in Notepad"
    IconLocation: string, // "C:\Windows\System32\Shell32.dll,21"
    TargetPath: string, // Getter and Setter - "C:\Windows\Notepad.exe "
    WindowStyle: number, // Getter and Setter
    WorkingDirectory: string, // Getter and Setter - "C:\"
    Save(),
    Resolve(flag: number)
}
Shell.Application = {
    CanStartStopService("ServiceName"),
    CascadeWindows(),
    EjectPC(),
    Explore(FolderPath),
    FileRun(),
    GetSystemInformation("PhysicalMemoryInstalled"),
    IsServiceRunning("ServiceName"),
    MinimizeAll(),
    NameSpace("C:\\"),
    ServiceStart("ServiceName", true),
    ServiceStop("ServiceName", true),
    SetTime(),
    ShellExecute(),
    ShutdownWindows(),
    TileHorizontally(),
    TileVertically(),
    ToggleDesktop(),
    TrayProperties(),
    UndoMinimizeAll()
}
*/