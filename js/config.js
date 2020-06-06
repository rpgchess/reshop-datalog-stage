var config = {
    obj: {
        app: {
            title: '',
            path: ''
        },
        env: {
            appData: '',
            userName: '',
            userProfile: '',
            winDir: ''
        },
        reshop: {
            user: '',
            password: ''
        },
        paths: [],
    },
    initEnviroment: function() {
        this.obj.env.appData = getEnviroment('%APPDATA%');
        this.obj.env.userProfile = getEnviroment('%USERPROFILE%');
        this.obj.env.winDir = getEnviroment('%WINDIR%');
    },
    initReshop: function() {
        arrTemp = this.obj.env.userProfile.split('\\');
        this.obj.reshop.user = arrTemp[arrTemp.length - 1];
    },
    init: function() {
        this.initEnviroment();
        this.initReshop();
    },
    readConfig: function() {

    },
    saveConfig: function() {

    }
}