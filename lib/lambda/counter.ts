const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export const handler = async (event: any = {}): Promise<any> => {

    var paramsGet = {
        TableName: TABLE_NAME,
        Key: {
            [PRIMARY_KEY]: "counter"
        }
    };

    var counter = await db.get(paramsGet).promise();

    try {
        console.log(counter["Item"].data);
        counter = parseInt(counter["Item"].data) + 1;
    }
    catch (dbError) {

        var initialParams = {
            TableName: TABLE_NAME,
            Item: {
                [PRIMARY_KEY]: "counter",
                "data": {
                    N: "1",
                }
            }
        };
        await db.put(initialParams).promise();
        counter = 1;
    }

    var params = {
        TableName: TABLE_NAME,
        Item: {
            [PRIMARY_KEY]: "counter",
            "data": counter
        }
    };
    console.log("Adding a new item...");

    try {
        await db.put(params).promise();
        return { "statusCode": 200, "headers": { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, "body": counter }
    }
    catch (dbError) {
        return { statusCode: 500, body: dbError };
    }
};