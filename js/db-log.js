var db_log = {};
var prod = true;

db_log = db_stagelog;

db_log.selectNsu = function(nsu) {
    return this.select('', 'DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'TransactionNumber = \'' + nsu + '\'', 'DateTime');
}

db_log.selectUser = function(user) {
    return this.select('', 'DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'UserId LIKE \'%' + user + '%\'', 'DateTime');
}

db_log.selectUserUrl = function(user, url) {
    return this.select('', 'DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'UserId LIKE \'%' + user + '%\' AND Url LIKE \'%' + url + '%\'', 'DateTime');
}

db_log.selectTopUser = function(qtde, user) {
    return this.select(qtde, ' DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'UserId LIKE \'%' + user + '%\'', 'DateTime');
}

db_log.selectTopUserUrl = function(qtde, user, url) {
    return this.select(qtde, ' DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'UserId LIKE \'%' + user + '%\' AND Url LIKE \'%' + url + '%\'', 'DateTime');
}

db_log.selectTenant = function(tenant) {
    return this.select('', 'DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'TenantId = \'' + tenant + '\'', 'DateTime');
}

db_log.selectRecents = function(qtde) {
    return this.select(qtde, ' DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', undefined , 'DateTime');
}

db_log.selectUrl = function(url) {
    return this.select('', 'DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'Url LIKE \'%' + url + '%\'', 'DateTime');
}

db_log.selectTopTenant = function(qtde, tenant) {
    return this.select(qtde, ' DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'TenantId = \'' + tenant + '\'', 'DateTime');
}

db_log.selectTopUrl = function(qtde, url) {
    return this.select(qtde, ' DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'Url LIKE \'%' + url + '%\'', 'DateTime');
}

db_log.selectTenantUrl = function(tenant, url) {
    return this.select('', 'DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'TenantId = \'' + tenant + '\' AND Url LIKE \'%' + url + '%\'', 'DateTime');
}

db_log.selectTopTenantUrl = function(qtde, tenant, url) {
    return this.select(qtde, ' DateTime, TransactionNumber, Url, cast(RequestContent as VARCHAR(8000)) as RequestContent, cast(ResponseContent as VARCHAR(8000)) as ResponseContent, TenantId, UserId, ClientId, TerminalCode', 'LogInfo', 'TenantId = \'' + tenant + '\' AND Url LIKE \'%' + url + '%\'', 'DateTime');
}