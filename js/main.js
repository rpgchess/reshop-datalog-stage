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
                                  '\t\t\t\t-qtd [qtde]\n\t\t\t\t\t\t\t\tUltimos registros\n\n' +
                                  '\t\t\t\t-nsu [nsu]\n\t\t\t\t\t\t\t\tNúmero da Transação\n\n' +
                                  '\t\t\t\t-tenant [tenant]\n\t\t\t\t\t\t\t\tIdentificação da Loja\n\n' +
                                  '\t\t\t\t-qtd-tenant [qtde] [tenant]\n\t\t\t\t\t\t\t\tIdentificação da Loja por quantidade\n\n' +
                                  '\t\t\t\t-url [url]\n\t\t\t\t\t\t\t\tAPI Endpoint\n\n' +
                                  '\t\t\t\t-qtd-url [qtde] [url]\n\t\t\t\t\t\t\t\tAPI Endpoint por quantidade\n\n' +
                                  '\t\t\t\t-tenant-url [tenant] [url]\n\t\t\t\t\t\t\t\tIdentificação da Loja e API Endpoint\n\n' +
                                  '\t\t\t\t-qtd-tenant-url [qtde] [tenant] [url]\n\t\t\t\t\t\t\t\tIdentificação da Loja e API Endpoint por quantidade';
        appResize(420, 500);
        return false;
    }

    appResize();
    var filename = document.getElementById('filename');
    filename.value = 'C:/Temp/';

    db_stagelog.openConnection();

    switch (args[2]) {
        case '-qtd': db_stagelog.selectRecents(args[3]); break;
        case '-nsu': db_stagelog.selectNsu(args[3]); break;
        case '-tenant': db_stagelog.selectTenant(args[3]); break;
        case '-qtd-tenant': db_stagelog.selectTopTenant(args[3], args[4]); break;
        case '-url': db_stagelog.selectUrl(args[3]); break;
        case '-qtd-url': db_stagelog.selectTopUrl(args[3], args[4]); break;
        case '-tenant-url': db_stagelog.selectTenantUrl(args[3], args[4]); break;
        case '-qtd-tenant-url': db_stagelog.selectTopTenantUrl(args[3], args[4], args[5]); break;
    }

    var index = 0;
    while (!db_stagelog.record.eof) {//DateTime, TransactionNumber, Url, RequestContent, ResponseContent, TenantId, UserId, ClientId, TerminalCode
        index++;
        sNsu = db_stagelog.record('TransactionNumber');
        sUrl = String(db_stagelog.record('Url')).replace('http://', '').replace('https://', '').replace('unicostage.azurewebsites.net', '');
        sReq = JSON.stringify(db_stagelog.record('RequestContent').value);
        sRes = JSON.stringify(db_stagelog.record('ResponseContent').value);
        sClient = db_stagelog.record('ClientId');
        sFilename = filename.value +  index + ' ' + sUrl.replace('/api/', '').replace('fidelidade/', '').replace('ecommerce/', '').replace('statistics/', '');
        //alert(sNsu + '\n' + sReq + '\n' + sRes + '\n' + sClient);
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
            String(db_stagelog.record('Datetime')).split(' UTC')[0],
            '',//(sNsu != undefined)? sNsu : '',
            sUrl,
            (sReq != undefined)? '<a class=\'label label-primary\' href=\'javascript:copy(' + sReq + ');\' target=\'_self\'>Copiar</a><a class=\'label label-default\' href=\'#\' target=\'_self\'>Salvar</a>' : '',
            (sRes != undefined)? '<a class=\'label label-primary\' href=\'javascript:copy(' + sRes + ');\' target=\'_self\'>Copiar</a><a class=\'label label-default\' href=\'#\' target=\'_self\'>Salvar</a>' : '',
            String(db_stagelog.record('TenantId')),
            String(db_stagelog.record('UserId')),
            (sClient != '')? '<a class=\'label label-primary\' href=\'javascript:copy("' + sClient + '");\' target=\'_self\'>Copiar</a>' : '',
            String(db_stagelog.record('TerminalCode'))
        ]).draw(false);

        db_stagelog.record.MoveNext();
    }

    db_stagelog.closeConnection();
});