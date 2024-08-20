// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const client = new DynamoDBClient({});
// const {
//     GetItemCommand
// } = require("@aws-sdk/client-dynamodb");
// const { marshall , unmarshall} = require("@aws-sdk/util-dynamodb");

// exports.handler = async (event) => {
//     const response  = { statusCode : 200};

//     try {
//         const params = {
//             TableName : 't_discoteca_eventos',
//             Key: marshall({ discoteca_nomnre: "disco"})
//         };
//         const { Item } = await client.send(new GetItemCommand(params));
//         console.log({ Item });
//         response.body  = JSON.stringify({
//             message : "succesfully retrieved post",
//             data: (Item) ? unmarshall(Item) : {},
//             rawData: Item, 
//         });
//     } catch (e) {
//         console.error(e);
//         response.statusCode = 500;
//         response.body = JSON.stringify({
//             message: "Failed to get post",
//             errorMsg : e.message,
//             errorStack: e.stack
//         });
//     }
//     return response;
// }

// const  { DynamoDBClient , GetItemCommand } =  require("@aws-sdk/client-dynamodb");
// const client = new DynamoDBClient({
//     region: 'us-east-1'
// })


// const input = {
//     TableName: 't_discoteca_coordinadores',
//     Keys : {
//         "nombre_discoteca": {
//             "S" : "disco"
//         },
//         "dni" : {
//             "S": "73641477"
//         }
//     }
// };

// const command = new GetItemCommand(input);
// const response = await client.send(command);


// const  { DynamoDBClient , QueryCommand } =  require("@aws-sdk/client-dynamodb");
// const client = new DynamoDBClient({
//     region: 'us-east-1'
// })


// const input = {
//     TableName: 't_discoteca_eventos',
//     ExpressionAttributeValues : {
//         ":v1" : {
//             "S" : "disco"
//         }
//     },
//     KeyConditionExpression : "nombre_discoteca = :v1",
//     // ProjectionExpression : "id",
// };


// exports.handler = async (event) => {
//     let response_final  = { statusCode : 200};

//     const command = new QueryCommand(input);
//     const response = await client.send(command);
    
//     response_final.client = response;
    
//     return response_final;
// }


// const { DynamoDBClient,PutItemCommand } = require("@aws-sdk/client-dynamodb");
// const client = new DynamoDBClient({
//     region: 'us-east-1'
// })

// const input = {
//     "Item": {

//     }
// }

// const input = {
//     "Item": {
//       "AlbumTitle": {
//         "S": "Somewhat Famous"
//       },
//       "Artist": {
//         "S": "No One You Know"
//       },
//       "SongTitle": {
//         "S": "Call Me Today"
//       }
//     },
//     "ReturnConsumedCapacity": "TOTAL",
//     "TableName": "Music"
//   };
//   const command = new PutItemCommand(input);
//   const response = await client.send(command);



const  { DynamoDBClient , QueryCommand } =  require("@aws-sdk/client-dynamodb");
const { unmarshall} = require("@aws-sdk/util-dynamodb")

const client = new DynamoDBClient({
    region: 'us-east-1'
})

const input = {
    ExpressionAttributeValues: {
        ":v1":{
            "S":nombre_discoteca
        }
    },
    TableName: "t_discoteca_eventos",
    KeyConditionExpression: "nombre_discoteca = :v1", // Modify this according to your table schema
};

exports.handler = async (event) => {
    let response_final  = { statusCode : 200};

    const command = new QueryCommand(input);
    const response = await client.send(command);
    
    console.log(response);
    
    const Items = unmarshall(response.Items);
    // const selected_items = [];

    // if (Items !== null){
    //     for (let i = 0; i < Items.length ; i++){
    //         console.log(Items[i].estado.S);
    //         if (Items[i].estado.S == estado){
    //             selected_items.push(Items[i]);
    //         }
    //     }
    // }

    
    return Items;
}