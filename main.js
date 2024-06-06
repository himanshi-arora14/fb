(function() {
    var myConnector = tableau.makeConnector();

    myConnector.init = function(initCallback) {
        tableau.authType = tableau.authTypeEnum.custom;
        initCallback();
    };

    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "likes",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "facebookData",
            alias: "Facebook Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var accessToken = tableau.password;

        $.getJSON('https://graph.facebook.com/v11.0/me?fields=id,name,likes&access_token=' + accessToken, function(resp) {
            var tableData = [];

            tableData.push({
                "id": resp.id,
                "name": resp.name,
                "likes": resp.likes
            });

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
