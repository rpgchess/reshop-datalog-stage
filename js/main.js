var app = {
    mapUrlView = ['http://', 'https://', 'unicostage.azurewebsites.net', 'reshop-stage.linx.com.br', 'localhost:52401'],
    mapUrlFile = ['/api/', 'api/', 'fidelidade/', 'ecommerce/', 'statistics/', 'posdata/', 'setup/', 'account/',
                  'salesmanapp/', 'OracleCloudCommerce/', 'LinxCommerce/web-api/v1/Sales/Delivery/FreightQuote/API.svc/web/Get/',
                  'occ-order-shipping/', 'ccstorex/custom/v1/public/api-hml/occ-store-delivery/store/'],
    rows: [],
    cols: {
        DATE: 0,
        NSU: 1,
        URL: 2,
        REQUEST: 3,
        RESPONSE: 4,
        TENANT: 5,
        USER: 6,
        GUID: 7,
        TERMINAL: 8
    },
    table: $('#datatable').DataTable({
        //destroy: true,
        retrieve: true,
        autoWidth: false,
        columnDefs: [
            { width: "140px", targets: [0] },
            //{ className: "dt-head-center", targets: [ 0 ] },
            //{ className: "dt-body-center", targets: [ 1, 2, 3 ] },
            { className: "dt-center", targets: [1, 3, 4, 5, 6 , 7] }
        ],
        lengthChange: false,
        paging: true,
        ordering: false,
        info: false,
        searching: false
    }),
    width: null,
    height: null,
    init: function() {
        args.hta = reshop.commandLine.split(' ');
        if (!isExist(args.hta[2]) && !isExist(args.hta[3])) {
            args.screen();
            return false;
        }

        this.resize(null, 637);
        setFilename('LinxPOS');
        setFilepath(system.env.userProfile + '\\Desktop\\');
        setEditor(system.env.winDir + '\\notepad.exe');
        this.refresh();
    },
    refresh: function() {
        db_stagelog.openConnection();
    
        switch (args.hta[2]) {
            case '-qtd': db_stagelog.selectRecents(args.hta[3]); break;
            case '-q': db_stagelog.selectRecents(args.hta[3]); break;
            case '-nsu': db_stagelog.selectNsu(args.hta[3]); break;
            case '-n': db_stagelog.selectNsu(args.hta[3]); break;
            case '-user': db_stagelog.selectUser(args.hta[3]); break;
            case '-u': db_stagelog.selectUser(args.hta[3]); break;
            case '-user-url': db_stagelog.selectUserUrl(args.hta[3], args.hta[4]); break;
            case '-uu': db_stagelog.selectUserUrl(args.hta[3], args.hta[4]); break;
            case '-qtd-user': db_stagelog.selectTopUser(args.hta[3], args.hta[4]); break;
            case '-qu': db_stagelog.selectTopUser(args.hta[3], args.hta[4]); break;
            case '-qtd-user-url': db_stagelog.selectTopUserUrl(args.hta[3], args.hta[4], args.hta[5]); break;
            case '-quu': db_stagelog.selectTopUserUrl(args.hta[3], args.hta[4], args.hta[5]); break;
            case '-tenant': db_stagelog.selectTenant(args.hta[3]); break;
            case '-t': db_stagelog.selectTenant(args.hta[3]); break;
            case '-qtd-tenant': db_stagelog.selectTopTenant(args.hta[3], args.hta[4]); break;
            case '-qt': db_stagelog.selectTopTenant(args.hta[3], args.hta[4]); break;
            case '-url': db_stagelog.selectUrl(args.hta[3]); break;
            case '-qtd-url': db_stagelog.selectTopUrl(args.hta[3], args.hta[4]); break;
            case '-tenant-url': db_stagelog.selectTenantUrl(args.hta[3], args.hta[4]); break;
            case '-tu': db_stagelog.selectTenantUrl(args.hta[3], args.hta[4]); break;
            case '-qtd-tenant-url': db_stagelog.selectTopTenantUrl(args.hta[3], args.hta[4], args.hta[5]); break;
            case '-qtu': db_stagelog.selectTopTenantUrl(args.hta[3], args.hta[4], args.hta[5]); break;
        }
    
        this.reset();
    
        db_stagelog.record.MoveFirst();
    
        while (!db_stagelog.record.EOF) {
            this.rows.push([
                String(db_stagelog.record('Datetime').value),
                String(db_stagelog.record('TransactionNumber').value),
                String(db_stagelog.record('Url').value),
                String(db_stagelog.record('RequestContent').value),
                String(db_stagelog.record('ResponseContent').value),
                String(db_stagelog.record('TenantId').value),
                String(db_stagelog.record('UserId').value),
                String(db_stagelog.record('ClientId').value),
                String(db_stagelog.record('TerminalCode').value)
            ]);
    
            db_stagelog.record.MoveNext();
        }
    
        db_stagelog.closeConnection();
        var that = this;
        this.rows.forEach(function (row, index, rows) {
            that.rows[index][that.cols.DATE] = removeStringsType('date', row[that.cols.DATE]);
            that.rows[index][that.cols.URL] = removeStringsType('url', row[that.cols.URL]);
            //that.rows[index][that.cols.USER] = removeStringsType('user', row[that.cols.USER]);
    
            btnGroupStart = '<div class=\'btn-group btn-group-xs\' role=\'group\' >';
            btnCopy = makeButton('copy', 'primary', 'copyType(' + index + ', \'both\');');
            btnCopyReq = makeButton('copy', 'primary', 'copyType(' + index + ', \'req\');');
            btnCopyRes = makeButton('copy', 'primary', 'copyType(' + index + ', \'res\');');
            btnSave = makeButton('both', 'success', 'makeStringAndSaveJSON(' + index + ', \'both\');');
            btnSaveReq = makeButton('save', 'success', 'makeStringAndSaveJSON(' + index + ', \'req\');');
            btnSaveRes = makeButton('save', 'success', 'makeStringAndSaveJSON(' + index + ', \'res\');');
            btnSaveAll = makeButton('save', 'success', '');
            btnNote = makeButton('note', 'warning', 'openType(' + index + ', \'both\');');
            btnNoteReq = makeButton('note', 'warning', 'openType(' + index + ', \'req\');');
            btnNoteRes = makeButton('note', 'warning', 'openType(' + index + ', \'res\');');
            btnClient =  makeButton('copy', 'primary', 'copyType(' + index + ', \'guid\');', row[that.cols.GUID], 'top');
            btnGroupEnd = '</div>';

            that.table.row.add([
                (isExist(that.rows[index][that.cols.DATE]))? that.rows[index][that.cols.DATE] : '',
                (isExist(that.rows[index][that.cols.NSU]))? that.rows[index][that.cols.NSU] : '',
                (isExist(that.rows[index][that.cols.URL]))? that.rows[index][that.cols.URL] : '',
                (isExist(that.rows[index][that.cols.REQUEST]) && 
                 isExist(that.rows[index][that.cols.RESPONSE]))? btnGroupStart + btnCopyReq + btnSaveReq + btnNoteReq + btnCopy + btnSave + btnNote + btnCopyRes + btnSaveRes + btnNoteRes + btnGroupEnd : '',
                (isExist(that.rows[index][that.cols.TENANT]))? that.rows[index][that.cols.TENANT] : '',
                (isExist(that.rows[index][that.cols.USER]))? '<p data-toggle="tooltip" data-placement="top" title="' + removeStringsType('user-domain', row[that.cols.USER]) + '">' + removeStringsType('user', row[that.cols.USER]) + '</p>' : '',
                (isExist(that.rows[index][that.cols.GUID]))? btnGroupStart + btnClient + btnGroupEnd : '',
                (isExist(that.rows[index][that.cols.TERMINAL]))? that.rows[index][that.cols.TERMINAL] : ''
            ]).draw(false);
        });
        this.hint();
    },
    hint: function() {
        $('[data-toggle="tooltip"]').tooltip();
    },
    notify: function(type, title, text, delay, position) {
        alertify.defaults.transition = "slide";
        sTemp = (title)? title + ':\n' : '';
        sTemp += text;
        delay = (delay)? delay : 5;
        position = (position)? position : 'bottom-left';
        alertify.set('notifier','delay', delay);
        alertify.set('notifier','position', position);
        switch(type){
            //case 'custom': alertify.notify(sTemp, 'custom'); break;
            case 'success': alertify.success(sTemp); break;
            case 'warning': alertify.warning(sTemp); break;
            case 'error': alertify.error(sTemp); break;
            default: alertify.message(sTemp);
        }
    },
    resize: function(width, height) {
        var width = isExist(width)? width : screen.availWidth - (screen.availWidth * 0.1),
            height = isExist(height)? height : screen.availHeight - (screen.availHeight * 0.2),
            left = (screen.availWidth - width) / 2,
            top = (screen.availHeight - height) / 2;
    
        window.resizeTo(width, height);
        window.moveTo(left, top);
    },
    reset: function() {
        this.rows = [];
        this.table.clear().draw();
    }
}

function removeStringsType(type, text) {
    var sTemp = '';
    switch (type) {
        case 'url': sTemp = removeStrings(text, app.mapUrlView); break;
        case 'url-file': sTemp =  removeStrings(text, app.mapUrlFile).split('?')[0]; break;
        case 'date': sTemp = text.split(' UTC')[0]; break;
        case 'user': sTemp = text.split('@')[0]; break;
        case 'user-domain': sTemp = text.split('@')[1]; break;
    }
    return sTemp;
}

function makeStringReqResArray(index) {
    return '[' + app.rows[index][app.cols.REQUEST] + ', ' + app.rows[index][app.cols.RESPONSE] + ']';
}

function concatFilepathString(index, filepath, filename, url) {
    return filepath + index + '-' + filename + '-' + url;
}

function makeStringAndSaveJSON(index, requestType) {
    bTemp = false;
    sFilename = concatFilepathString(index + 1, getFilepath(), getFilename(), removeStringsType('url-file', app.rows[index][app.cols.URL]));
    switch (requestType) {
        case 'req': file.saveJSON(sFilename + '.req', app.rows[index][app.cols.REQUEST]); bTemp = true; break;
        case 'res': file.saveJSON(sFilename + '.res', app.rows[index][app.cols.RESPONSE]); bTemp = true; break;
        case 'both':
            file.saveJSON(sFilename + '.req', app.rows[index][app.cols.REQUEST]);
            file.saveJSON(sFilename + '.res', app.rows[index][app.cols.RESPONSE]);
            bTemp = true;
    }
    if (bTemp)
        app.notify('success', 'File Save', sFilename);
    else
        app.notify('error', 'File Not Save', sFilename);
}

function makeButton(name, color, eventClick, hint, hintPosition) {
    var sHint = '';

    if (isExist(hint) && isExist(hintPosition)) {
        sHint = 'data-toggle="tooltip" data-placement="' + hintPosition + '" title="' + hint + '"';
    }

    return '<button class="btn btn-'+ color +'" onClick="'+ eventClick +'" ' + sHint + '>' + name + '</button>';
}

function copyType(index, type) {
    switch (type) {
        case 'guid': copy(app.rows[index][app.cols.GUID]); break;
        case 'req': copy(app.rows[index][app.cols.REQUEST]); break;
        case 'res': copy(app.rows[index][app.cols.RESPONSE]); break;
        case 'both': copy(makeStringReqResArray(index)); break;
    }
}

function openType(index, type) {
    sFilename = 'C:\\Temp\\ReshopStageLog';
    sFilenameExt = sFilename + '.json';
    switch (type) {
        case 'req':
            file.saveJSON(sFilename, app.rows[index][app.cols.REQUEST]);
            system.run('"' + getEditor() + '" "' + sFilenameExt + '"');
            break;
        case 'res':
            file.saveJSON(sFilename, app.rows[index][app.cols.RESPONSE]);
            system.run('"' + getEditor() + '" "' + sFilenameExt + '"');
            break;
        case 'both':
            file.saveJSON(sFilename, makeStringReqResArray(index));
            system.run('"' + getEditor() + '" "' + sFilenameExt + '"');
            break;
    }
}

function getFilepath() {
    return getElementValue('filepath');
}

function getFilename() {
    return getElementValue('filename');
}

function getEditor() {
    return getElementValue('editor');
}

function setEditor(editor) {
    setElementValue('editor', editor);
}

function setFilepath(path) {
    setElementValue('filepath', path);
}

function setFilename(name) {
    setElementValue('filename', name);
}

$(document).ready(function () {
    app.init();
    app.hint();
});