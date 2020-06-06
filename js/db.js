var db = {
    driver: "",
    server:{
        host: "",
        port: 0
    },
    database: "",
    user: "",
    password: "",
    connection: null,
    record: null,
    fields: [],
    getConnectionString: function () {
        return "driver=" + this.driver + 
               ";server=" + this.server.host + "," + this.server.port + 
               ";database=" + this.database + 
               ";uid=" + this.user + 
               ";password=" + this.password;
    },
    openConnection: function() {
        this.connection = new ActiveXObject("ADODB.Connection");
        this.connection.Open(this.getConnectionString());
    },
    closeConnection: function() {
        if (!this.record)
            this.record.close;
        if (!this.connection)
            this.connection.close;
    },
    query: function(query) {
        this.record = new ActiveXObject("ADODB.Recordset");
        this.record.Open(query, this.connection);
        return query;
    },
    select: function(qtde, fields, table, conditions, orderBy) {
        var sQuery = "SELECT"
            sQuery += (isExist(qtde))? " TOP " + qtde : "";
            sQuery += " " + fields;
            sQuery += " FROM " + table + "(NOLOCK)";
            sQuery += (isExist(conditions))? " WHERE "+ conditions : "";
            sQuery += (isExist(orderBy))? " ORDER BY "+ orderBy + ' DESC': "";

        this.query(sQuery);
        this.record.MoveFirst();
        return sQuery;
    }
}
/*
ADODB.Connection
ADODB.Recordset = {
    Fields = [],
    Properties = [],
    Parameters = [],
    Errors = []
}
ADODB.Stream
*CursorTypeEnum Constants*
-1      adOpenUnspecified
0       adOpenForwardOnly
1       adOpenKeyset
2       adOpenDynamic
3       adOpenStatic

*LockTypeEnum Constants*
-1      adLockUnspecified
1       adLockReadOnly
2       adLockPessimistic
3       adLockOptimistic
4       adLockBatchOptimistic
*/