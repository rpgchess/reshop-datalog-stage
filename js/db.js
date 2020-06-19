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
ADODB.Command = {
    //Properties
    ActiveConnection: ADODB.Connection,
    CommandText: string,
    CommandTimeout: number,
    CommandType: number,
    Name: string,
    Prepared: boolean,
    State: number, //Enum
    //Methods
    Cancel: function(),
    Execute: function(): ADODB.Recordset,
    CreateParameter: function("CustId", adChar,adParamInput, 5, "ALFKI"): Parameter, //ADODB.Parameter
    //Collections
    Parameters: {
        Count: number,
        Item: function(Index): [ADODB.Parameter]
    },
    Properties: {
        Count: number,
        Item: function(Index): [ADODB.Property]
    }
}
ADODB.Connection = {
    //Properties
    Attributes: number,
    CommandTimeout: number, //Default: 30
    ConnectionTimeout: number, //Default: 15
    CursorLocation: number, //CursorLocationEnum
    DefaultDatabase: string,
    ConnectionString: string, //Provedor[MSDASQL]|NomeArquivo|ProvedorRemoto|ServidorRemoto|URL
    IsolationLevel: number, //IsolationLevelEnum:
    Mode: number, //ConnectModeEnum
    Provedor: string, 
    State: number, //ObjectStateEnum
    Version: string,
    //Methods
    BeginTrans: function(): number,
    Cancel: function(),
    Close: function(),
    CommitTrans: function(),
    Execute: function(CommandText: string, *RecordsAffected: number, *Options: number), //Options: [adCmdUnspecified = -1, adCmdText = 1, adCmdTable = 2, adCmdStoredProc = 4, adCmdUnknown = 8, adCmdFile = 256, adCmdTableDirect = 512] and [adAsyncExecute = 0x10, adAsyncFetch = 0x20, adAsyncFetchNonBlocking = 0x40, adExecuteNoRecords = 0x80, adExecuteStream = 0x400, adExecuteRecord = , adOptionUnspecified = -1]
    Open: function(*ConnectionString: string, *UserID: string, *Password: string, *Options: number), //Options: [adAsyncConnect = 16, adConnectUnspecified = -1]
    OpenSchema: function(QueryType, *Criteria, *SchemaID): Recordset //QueryType & Criteria: [adSchemaAsserts = 0 = Retorna as asserções definidas no catálogo que pertencem a um determinado usuário., adSchemaCatalogs = 1, adSchemaCharacterSets = 2, adSchemaCheckConstraints = 5, adSchemaCollations = 3, adSchemaColumnPrivileges = 13, adSchemaColumns = 4, adSchemaColumnsDomainUsage = 11, adSchemaConstraintColumnUsage = 6, adSchemaConstraintTableUsage = 7, adSchemaCubes = 32, adSchemaDBInfoKeywords = 30, adSchemaDBInfoLiterals = 31, adSchemaDimensions = 33, adSchemaForeignKeys = 27, adSchemaHierarchies = 34, adSchemaIndexes = 12, adSchemaKeyColumnUsage = 8, adSchemaLevels = 35, adSchemaMeasures = 36, adSchemaMembers = 38, adSchemaPrimaryKeys = 28, adSchemaProcedureColumns = 29, adSchemaProcedureParameters = 26, adSchemaProcedures = 16, adSchemaProperties = 37, adSchemaProviderSpecific = -1, adSchemaProviderTypes = 22, adSchemaReferentialConstraints = 9, adSchemaSchemata = 17, adSchemaSQLLanguages = 18, adSchemaStatistics = 19, adSchemaTableConstraints = 10, adSchemaTablePrivileges = 14, adSchemaTables = 20, adSchemaTranslations = 21, adSchemaTrustees = 39, adSchemaUsagePrivileges = 15, adSchemaViewColumnUsage = 24, adSchemaViews = 23, adSchemaViewTableUsage = 25]
    RollbackTrans: function(),
    //Collections
    Properties: {
        Count: number,
        Item: function(Index): [ADODB.Property],
        Refresh: function()
    },
    Erros: {
        Count: number,
        Item: function(Index): [ADODB.Error],
        Clear: function(),
        Refresh: function()
    }
    //Events
    //BeginTransComplete
    //CommitTransComplete
    //ConnectComplete
    //Disconnect
    //ExecuteComplete
    //InfoMessage
    //RollbackTransComplete
    //WillConnect
    //WillExecute
}
ADODB.Error = {
    Description: string,
    HelpContext: string,
    HelpFile: string,
    NativeError: number,
    Number: number, //Unique number identifier
    Source: string,
    SQLState: string, //5 chars error code
}
ADODB.Field = {
    //Properties
    ActualSize: ,
    Attributes: ,
    DefinedSize: ,
    Name: ,
    NumericScale: ,
    OriginalValue: ,
    Precision: ,
    Status: ,
    Type: ,
    UnderlyingValue: ;
    Value: ,
    //Methods
    AppendChunk: function(),
    GetChunk: function(),
    //Collections
    Properties: {
        Count: number,
        Item: function(Index): [ADODB.Property]
    }
}
ADODB.Parameter = {
    //Properties
    Attributes
    Direction
    Name
    NumericScale
    Precision
    Size
    Type
    Value
    //Methods
    AppendChunk: function(),
    Delete: function()
}
ADODB.Property = {
    //Properties
    Attributes
    Name: string,
    Type:
    Value:
}
ADODB.Record = {
    //Properties
    ActiveConnection
    Mode
    ParentURL
    RecordType
    Source
    State
    //Methods
    Cancel: function(),
    Close: function(),
    CopyRecord: function(),
    DeleteRecord: function(),
    GetChildren: function(),
    MoveRecord: function(),
    Open: function(),
}
ADODB.Recordset = {
    //Properties
    AbsolutePage
    AbsolutePosition
    ActiveCommand
    ActiveConnection
    BOF
    Bookmark
    CacheSize
    CursorLocation
    CursorType
    DataMember
    DataSource
    EditMode
    EOF
    Filter
    Index
    LockType
    MarshalOptions
    MaxRecords
    PageCount
    PageSize
    RecordCount
    Sort
    Source
    State: number, //Enum
    Status
    StayInSync
    //Methods
    AddNew: function()
    Cancel: function()
    CancelBatch: function()
    CancelUpdate: function()
    Clone: function()
    Close: function()
    CompareBookmarks: function()
    Delete: function()
    Find: function()
    GetRows: function()
    GetString: function(format,rows,coldel,rowdel,nullexp)
    Move: function()
    MoveFirst: function()
    MoveLast: function()
    MoveNext: function()
    MovePrevious: function()
    NextRecordset: function()
    Open: function(CommandText, ConnectionString, [adOpenStatic | adOpenKeyset], [adLockReadOnly | adLockOptimistic], [adCmdText | adCmdTable])
    Requery: function()
    Resync: function()
    Save: function()
    Seek: function()
    Supports: function()
    Update: function()
    UpdateBatch: function()
    Fields = {
        Count: number,
        Item: function(Index): [ADODB.Field]
    },
    Properties = {
        Count: number,
        Item: function(Index): [ADODB.Property]
    }
    //Events
    //EndOfRecordset
    //FetchComplete
    //FetchProgress
    //FieldChangeComplete
    //MoveComplete
    //RecordChangeComplete
    //RecordsetChangeComplete
    //WillChangeField
    //WillChangeRecord
    //WillChangeRecordset
    //WillMove
}
ADODB.Stream = {
    //Properties
    CharSet
    EOS
    LineSeparator
    Mode
    Position
    Size
    State
    Type
    //Methods
    Cancel: function(),
    Close: function(),
    CopyTo: function(),
    Flush: function(),
    LoadFromFile: function(),
    Open: function(),
    Read: function(),
    ReadText: function(),
    SaveToFile: function(),
    SetEOS: function(),
    SkipLine: function(),
    Write: function(),
    WriteText: function()
}

ADOX.Catalog = {
    ActiveConnection: Connection, //ADODB.Connection
    Tables(table: string): Table, //ADOX.Table
}
ADOX.Column = {
    Name: string,
    Type: number, //[adVarChar = ???]
    DefinedSize: number,
    Attributes: number, //[adColNullable]
}
ADOX.Table = {
    Columns: {
        Append(columnName: string, attributes: number, size: number), //attributes = [adWChar]
        Delete(columnName: string),
    }
}
*/