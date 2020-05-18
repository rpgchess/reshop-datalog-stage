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
    select: function(fields, table, conditions, orderBy) {
        var sQuey = "SELECT " + fields;
            sQuey += " FROM " + table + "(NOLOCK)";
            sQuey += (conditions != undefined)? " WHERE "+ conditions : "";
            sQuey += (!orderBy != undefined)? " ORDER BY "+ orderBy + ' DESC': "";

        this.query(sQuey);
        this.record.MoveFirst();
        return sQuey;
    }
}