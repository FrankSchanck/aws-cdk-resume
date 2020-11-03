const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
  DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;

export const handler = async (event: any = {}): Promise<any> => {
 
    var paramsGet = {
        TableName : TABLE_NAME,
        Key: {
            [PRIMARY_KEY]: "counter"
        }
      };
      
     var counter= await db.get(paramsGet).promise();
     
    console.log(counter["Item"].data);
   counter = parseInt(counter["Item"].data)+1;

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
        //return { statusCode: 200, body: counter };
        return {"statusCode": 200, "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}, "body": counter}
    }
    catch (dbError) {
        // const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
        DYNAMODB_EXECUTION_ERROR: RESERVED_RESPONSE;
        return { statusCode: 500, body: dbError };
    }
};