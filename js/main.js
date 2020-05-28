var sReq = [], sRes = [];

function appResize(width, height) {
    var width = (width == undefined)? screen.availWidth - (screen.availWidth * 0.1) : width,
        height = (height == undefined)? screen.availHeight - (screen.availHeight * 0.2) : height,
        left = (screen.availWidth - width) / 2,
        top = (screen.availHeight - height) / 2;

    window.resizeTo(width, height);
    window.moveTo(left, top);
}

$(document).ready(function () {
    var args = app.commandLine.split(' ');
    if (args[2] == undefined || args[3] == undefined) {
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
        return false;
    }

    appResize();
    var filename = document.getElementById('filename');
    filename.value = 'C:/Temp/';

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
    while (!db_stagelog.record.eof) {//DateTime, TransactionNumber, Url, RequestContent, ResponseContent, TenantId, UserId, ClientId, TerminalCode
        index++;
        sDate = String(db_stagelog.record('Datetime').value).split(' UTC')[0];
        sNsu = String(db_stagelog.record('TransactionNumber').value);
        sUrl = String(db_stagelog.record('Url').value).replace('http://', '').replace('https://', '').replace('unicostage.azurewebsites.net', '').replace('reshop-stage.linx.com.br', '').replace('localhost:52401', '');
        sReq.push(db_stagelog.record('RequestContent').value);
        sRes.push(db_stagelog.record('ResponseContent').value);
        sReqRes = '"[" + sReq[' + index + '] + ", " + sRes[' + index + '] + "]"';
        sTenant = String(db_stagelog.record('TenantId').value);
        sClient = String(db_stagelog.record('ClientId').value);
        sUser = String(db_stagelog.record('UserId').value);
        sTerminal = String(db_stagelog.record('TerminalCode').value);
        sFilename = filename.value +  index + ' ' + sNsu + ' ' + sUrl.replace('/api/', '').replace('fidelidade/', '').replace('ecommerce/', '').replace('statistics/', '');
        btnCopy = (sReq != undefined && sRes != undefined)? '<button class=\'btn btn-primary\' onClick=\'copy(' + sReqRes + ');\'>both</button>' : '';
        btnCopyReq = (sReq != undefined)? '<button class=\'btn btn-primary\' onClick=\'copy(sReq[' + index + ']);\'>copy</button>' : '';
        btnCopyRes = (sRes != undefined)? '<button class=\'btn btn-primary\' onClick=\'copy(sRes[' + index + ']);\'>copy</button>' : '';
        btnSave = (sReq != undefined && sRes != undefined)? '<button class=\'btn btn-success\' onClick=\'saveJSONBoth("' + sFilename + '", sReq[' + index + '], sRes[' + index + ']);\'>both</button>' : '';
        btnSaveReq = (sReq != undefined)? '<button class=\'btn btn-success\' onClick=\'saveJSONReq("' + sFilename + '", sReq[' + index + ']);\'>save</button>' : '';
        btnSaveRes = (sRes != undefined)? '<button class=\'btn btn-success\' onClick=\'saveJSONRes("' + sFilename + '", sRes[' + index + ']);\'>save</button>' : '';
        btnSaveAll = '<button class=\'btn btn-success\' onClick=\'\'>save all</button>';
        btnClient = (sClient != '')? '<button class=\'btn btn-primary\' onClick=\'copy("' + sClient + '");\'>copy</button>' : '';
        btnGroupStart = '<div class=\'btn-group btn-group-xs\' role=\'group\' >';
        btnGroupEnd = '</div>';
        $('#datatable').DataTable({
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
        }).row.add([
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
});