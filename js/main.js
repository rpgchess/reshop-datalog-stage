var app = {
    
}

var sReq = [], sRes = [], args = [];
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

function makeStringAndSaveJSON(index, url, request) {
    sFilename = concatFilepathString(index + 1, getFilepath(), getFilename(), removeStringsUrlToFilename(url));
    switch (request) {
        case 'req': file.saveJSON(sFilename + '.req', sReq[index]); break;
        case 'res': file.saveJSON(sFilename + '.res', sRes[index]); break;
        case 'both':
            file.saveJSON(sFilename + '.req', sReq[index]);
            file.saveJSON(sFilename + '.res', sRes[index]);
            break;
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

    var index = 0;
    sReq = [];
    sRes = [];
    table.clear().draw();
    while (!db_stagelog.record.eof) {//DateTime, TransactionNumber, Url, RequestContent, ResponseContent, TenantId, UserId, ClientId, TerminalCode
        sDate = String(db_stagelog.record('Datetime').value).split(' UTC')[0];
        sNsu = String(db_stagelog.record('TransactionNumber').value);
        sUrl = removeStringsUrlToScreen(String(db_stagelog.record('Url').value));
        sReq.push(db_stagelog.record('RequestContent').value);
        sRes.push(db_stagelog.record('ResponseContent').value);
        sReqRes = '"[" + sReq[' + index + '] + ", " + sRes[' + index + '] + "]"';
        sTenant = String(db_stagelog.record('TenantId').value);
        sClient = String(db_stagelog.record('ClientId').value);
        sUser = String(db_stagelog.record('UserId').value);
        sTerminal = String(db_stagelog.record('TerminalCode').value);
        btnCopy = (isExist(sReq) && isExist(sRes))? '<button class=\'btn btn-primary\' onClick=\'copy(' + sReqRes + ');\'>both</button>' : '';
        btnCopyReq = (isExist(sReq))? '<button class=\'btn btn-primary\' onClick=\'copy(sReq[' + index + ']);\'>copy</button>' : '';
        btnCopyRes = (isExist(sRes))? '<button class=\'btn btn-primary\' onClick=\'copy(sRes[' + index + ']);\'>copy</button>' : '';
        btnSave = (isExist(sReq) && isExist(sRes))? '<button class=\'btn btn-success\' onClick=\'makeStringAndSaveJSON(' + index + ', "' + sUrl + '", "both");\'>both</button>' : '';
        btnSaveReq = (isExist(sReq))? '<button class=\'btn btn-success\' onClick=\'makeStringAndSaveJSON(' + index + ', "' + sUrl + '", "req");\'>save</button>' : '';
        btnSaveRes = (isExist(sRes))? '<button class=\'btn btn-success\' onClick=\'makeStringAndSaveJSON(' + index + ', "' + sUrl + '", "res");\'>save</button>' : '';
        btnSaveAll = '<button class=\'btn btn-success\' onClick=\'\'>save all</button>';
        btnClient = (isExist(sClient))? '<button class=\'btn btn-primary\' onClick=\'copy("' + sClient + '");\'>copy</button>' : '';
        btnGroupStart = '<div class=\'btn-group btn-group-xs\' role=\'group\' >';
        btnGroupEnd = '</div>';
        index++;
        table.row.add([
            (sDate != undefined)? sDate : '',
            (sNsu != undefined)? sNsu : '',
            (sUrl != undefined)? sUrl : '',
            btnGroupStart + btnCopyReq + btnSaveReq + btnCopy + btnSave + btnCopyRes + btnSaveRes + btnGroupEnd,
            (sTenant != undefined)? sTenant : '',
            (sUser != undefined)? sUser : '',
            btnGroupStart + btnClient + btnGroupEnd,
            (sTerminal != undefined)? sTerminal : ''
        ]).draw(false);

        db_stagelog.record.MoveNext();
    }

    db_stagelog.closeConnection();
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