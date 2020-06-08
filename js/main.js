var app = {
    
}

var rows = [];
var cols = {
    DATE: 0,
    NSU: 1,
    URL: 2,
    REQUEST: 3,
    RESPONSE: 4,
    TENANT: 5,
    USER: 6,
    GUID: 7,
    TERMINAL: 8
}

var args = [];
var table =  $('#datatable').DataTable({
    //destroy: true,
    retrieve: true,
    autoWidth: false,
    columnDefs: [
        { width: "140px", "targets": 0 }
    ],
    paging: false,
    ordering: false,
    info: false,
    searching: false
});

function appResize(width, height) {
    var width = (width == undefined)? screen.availWidth - (screen.availWidth * 0.1) : width,
        height = (height == undefined)? screen.availHeight - (screen.availHeight * 0.2) : height,
        left = (screen.availWidth - width) / 2,
        top = (screen.availHeight - height) / 2;

    window.resizeTo(width, height);
    window.moveTo(left, top);
}

function screenArgs() {
    document.body.innerText = '\n\t\tParâmetros:\n\n' +
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
    appResize(420, 750);
}

function removeStringsUrlToFilename(url) {
    sTemp =  removeStrings(url, ['/api/', 'fidelidade/', 'ecommerce/', 'statistics/', 'posdata/', 'setup/']);
    return sTemp.split('?')[0];
}

function removeStringsUrlToScreen(url) {
    return removeStrings(url, ['http://', 'https://', 'unicostage.azurewebsites.net', 'reshop-stage.linx.com.br', 'localhost:52401']);
}

function concatFilepathString(index, filepath, filename, url) {
    return filepath + index + '-' + filename + '-' + url;
}

function makeStringAndSaveJSON(index, requestType) {
    sFilename = concatFilepathString(index + 1, getFilepath(), getFilename(), removeStringsUrlToFilename(rows[index][cols.URL]));
    switch (requestType) {
        case 'req': file.saveJSON(sFilename + '.req', rows[index][cols.REQUEST]); break;
        case 'res': file.saveJSON(sFilename + '.res', rows[index][cols.RESPONSE]); break;
        case 'both':
            file.saveJSON(sFilename + '.req', rows[index][cols.REQUEST]);
            file.saveJSON(sFilename + '.res', rows[index][cols.RESPONSE]);
            break;
    }
}

function makeButtonHTML(name, color, eventClick) {
    return '<button class="btn btn-'+ color +'" onClick="'+ eventClick +'">' + name + '</button>';
}

function copyType(index, type) {
    switch (type) {
        case 'guid': copy(rows[index][cols.GUID]); break;
        case 'req': copy(rows[index][cols.REQUEST]); break;
        case 'res': copy(rows[index][cols.RESPONSE]); break;
        case 'both': copy('[' + rows[index][cols.REQUEST] + '], [' + rows[index][cols.RESPONSE] + ']'); break;
    }
}

function searchDB() {
    db_stagelog.openConnection();

    switch (args[2]) {
        case '-qtd': db_stagelog.selectRecents(args[3]); break; case '-q': db_stagelog.selectRecents(args[3]); break;
        case '-nsu': db_stagelog.selectNsu(args[3]); break; case '-n': db_stagelog.selectNsu(args[3]); break;
        case '-user': db_stagelog.selectUser(args[3]); break; case '-u': db_stagelog.selectUser(args[3]); break;
        case '-user-url': db_stagelog.selectUserUrl(args[3], args[4]); break; case '-uu': db_stagelog.selectUserUrl(args[3], args[4]); break;
        case '-qtd-user': db_stagelog.selectTopUser(args[3], args[4]); break; case '-qu': db_stagelog.selectTopUser(args[3], args[4]); break;
        case '-qtd-user-url': db_stagelog.selectTopUserUrl(args[3], args[4], args[5]); break; case '-quu': db_stagelog.selectTopUserUrl(args[3], args[4], args[5]); break;
        case '-tenant': db_stagelog.selectTenant(args[3]); break; case '-t': db_stagelog.selectTenant(args[3]); break;
        case '-qtd-tenant': db_stagelog.selectTopTenant(args[3], args[4]); break; case '-qt': db_stagelog.selectTopTenant(args[3], args[4]); break;
        case '-url': db_stagelog.selectUrl(args[3]); break;
        case '-qtd-url': db_stagelog.selectTopUrl(args[3], args[4]); break;
        case '-tenant-url': db_stagelog.selectTenantUrl(args[3], args[4]); break; case '-tu': db_stagelog.selectTenantUrl(args[3], args[4]); break;
        case '-qtd-tenant-url': db_stagelog.selectTopTenantUrl(args[3], args[4], args[5]); break; case '-qtu': db_stagelog.selectTopTenantUrl(args[3], args[4], args[5]); break;
    }

    table.clear().draw();

    if (!db_stagelog.record.EOF) {
        rows = db_stagelog.record.GetString(2).trim().split('\r');
    }

    db_stagelog.closeConnection();

    rows.forEach(function (row, index, rows) {
        rows[index] = row.split('\t');
        rows[index][cols.URL] = removeStringsUrlToScreen(rows[index][cols.URL]);

        btnGroupStart = '<div class=\'btn-group btn-group-xs\' role=\'group\' >';
        btnCopy = makeButtonHTML('copy', 'primary', 'copyType(' + index + ', \'both\');');
        btnCopyReq = makeButtonHTML('copy', 'primary', 'copyType(' + index + ', \'req\');');
        btnCopyRes = makeButtonHTML('copy', 'primary', 'copyType(' + index + ', \'res\');');
        btnSave = makeButtonHTML('both', 'success', 'makeStringAndSaveJSON(' + index + ', \'both\');');
        btnSaveReq = makeButtonHTML('save', 'success', 'makeStringAndSaveJSON(' + index + ', \'req\');');
        btnSaveRes = makeButtonHTML('save', 'success', 'makeStringAndSaveJSON(' + index + ', \'res\');');
        btnSaveAll = makeButtonHTML('save', 'success', '');
        btnClient =  makeButtonHTML('copy', 'primary', 'copyType(' + index + ', \'guid\');');
        btnGroupEnd = '</div>';

        table.row.add([
            (isExist(rows[index][cols.DATE]))? rows[index][cols.DATE] : '',
            (isExist(rows[index][cols.NSU]))? rows[index][cols.NSU] : '',
            (isExist(rows[index][cols.URL]))? rows[index][cols.URL] : '',
            (isExist(rows[index][cols.REQUEST]) && 
             isExist(rows[index][cols.RESPONSE]))? btnGroupStart + btnCopyReq + btnSaveReq + btnCopy + btnSave + btnCopyRes + btnSaveRes + btnGroupEnd : '',
            (isExist(rows[index][cols.TENANT]))? rows[index][cols.TENANT] : '',
            (isExist(rows[index][cols.USER]))? rows[index][cols.USER] : '',
            (isExist(rows[index][cols.GUID]))? btnGroupStart + btnClient + btnGroupEnd : '',
            (isExist(rows[index][cols.TERMINAL]))? rows[index][cols.TERMINAL] : ''
        ]).draw(false);
    });
}

function getFilepath() {
    return getElementValue('filepath');
}

function getFilename() {
    return getElementValue('filename');
}

function setFilepath(path) {
    setElementValue('filepath', path);
}

function setFilename(name) {
    setElementValue('filename', name);
}

$(document).ready(function () {
    args = reshop.commandLine.split(' ');
    if (!isExist(args[2]) && !isExist(args[3])) {
        screenArgs();
        return false;
    }

    appResize();
    setFilename('LinxPOS');
    setFilepath('C:\\Users\\claudio.almeida\\Desktop\\');
    searchDB();
});