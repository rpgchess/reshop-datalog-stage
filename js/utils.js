function copy(text) {
    if (!window.clipboardData)
        return false;
    window.clipboardData.setData("text", text);
}

function paste() {
    if (!window.clipboardData)
        return false;
    return window.clipboardData.getData("text");
}

function scriptVersion() {
    ver = ScriptEngine() + ' V ';
    ver += ScriptEngineMajorVersion() + '.';
    ver += ScriptEngineMinorVersion() + '.';
    ver += ScriptEngineBuildVersion();
    alert(ver);
    return ver;
}