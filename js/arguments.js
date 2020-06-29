var args = {
    enum: {
        QTDE: 0,
        DATE: 1,
        HOUR_START: 2,
        HOUR_END: 3,
        NSU: 4,
        USER: 5,
        URL: 6,
        TENANT: 7
    },
    hta: [],
    begin: 0,
    appFilepath: '',
    flags: [
        {enable: false, value: '' },
        {enable: false, value: '' },
        {enable: false, value: '' },
        {enable: false, value: '' },
        {enable: false, value: '' },
        {enable: false, value: '' },
        {enable: false, value: '' },
        {enable: false, value: '' }
    ],
    init: function() {
        this.appFilepath = this.hta[0];
    },
    countFlags: function() { 
        return this.flags.filter(function(flag){ return flag.enable; }).length;
    },
    getArgument: function(name) {

    },
    setArgument: function(name, value) {

    },
    screen: function() {
        document.body.innerText = '\t\tParâmetros:\n\n' +
        '\t\t\t\t-q ou -qtd [qtde]\n\t\t\t\t\t\t\t\tUltimos registros\n\n' +
        '\t\t\t\t-n ou -nsu [nsu]\n\t\t\t\t\t\t\t\tNúmero da Transação\n\n' +
        '\t\t\t\t-u ou -user [user]\n\t\t\t\t\t\t\t\tEmail do usuário\n\n' +
        '\t\t\t\t-uu ou -user-url [user] [url]\n\t\t\t\t\t\t\t\tEmail do usuário e API Endpoint\n\n' +
        '\t\t\t\t-qu ou -qtd-user [qtd] [user]\n\t\t\t\t\t\t\t\tEmail do usuário por quantidade\n\n' +
        '\t\t\t\t-quu ou -qtd-user-url [qtd] [user] [url]\n\t\t\t\t\t\t\t\tEmail do usuário e API Endpoint por quantidade \n\n' +
        '\t\t\t\t-t ou -tenant [tenant]\n\t\t\t\t\t\t\t\tIdentificação da Loja\n\n' +
        '\t\t\t\t-qt ou -qtd-tenant [qtde] [tenant]\n\t\t\t\t\t\t\t\tIdentificação da Loja por quantidade\n\n' +
        '\t\t\t\t-url [url]\n\t\t\t\t\t\t\t\tAPI Endpoint\n\n' +
        '\t\t\t\t-qtd-url [qtde] [url]\n\t\t\t\t\t\t\t\tAPI Endpoint por quantidade\n\n' +
        '\t\t\t\t-tu ou -tenant-url [tenant] [url]\n\t\t\t\t\t\t\t\tIdentificação da Loja e API Endpoint\n\n' +
        '\t\t\t\t-qtu ou -qtd-tenant-url [qtde] [tenant] [url]\n\t\t\t\t\t\t\t\tIdentificação da Loja e API Endpoint por quantidade';
        app.resize(520, 930);
    }
}