// import { Client } from './node_modules/@elastic/elasticsearch';
import { Client } from '@elastic/elasticsearch';
const clientURL = 'http://elastic:stimulus5affect-roof@beryl.cs.virginia.edu:9200'
const client = new Client({
    node: clientURL,
});

function helloWorld() {
    console.log("Hello, world!");
    return "HELLLLOOOO"
}


async function search_query(vertexValue = ["cMLR0ooBBBvBsP_nxiN-"], vertexKey = ['_id'], vertexLabel = "None") {
    // var vertexValue =  "XcLR0ooBBBvBsP_nxiN9"//$('#search_field').val(); //Vertex Value given only support ids
    //let vertexKey = $('#search_value').val(); //Vertex Key
    //let vertexLabel = $('#label_field').val(); //Vertex Label Filter
    const filters = vertexKey.map((value, index) => {
        return {
            match: {
                [value]: vertexValue[index]
            }
        };
    });

    console.log(filters)

    const executedQuery = {
        index: 'atlasv2-edr-h1-s4',
        body: {
            query: {
                bool: {
                    must: filters
                }
            }
        }
    };
    var response = await client.search(executedQuery);
    const data = response.hits.hits;
    return data
    //data_manipulation2(data);
}


// Define your Elasticsearch query

var graphioRemake = (function () {
    async function search_query(vertexValue = ["cMLR0ooBBBvBsP_nxiN-"], vertexKey = ['_id'], vertexLabel = "None") {
        // var vertexValue =  "XcLR0ooBBBvBsP_nxiN9"//$('#search_field').val(); //Vertex Value given only support ids
        //let vertexKey = $('#search_value').val(); //Vertex Key
        //let vertexLabel = $('#label_field').val(); //Vertex Label Filter
        const filters = vertexKey.map((value, index) => {
            return {
                match: {
                    [value]: vertexValue[index]
                }
            };
        });

        console.log(filters)
            
        const executedQuery = {
            index: 'atlasv2-edr-h1-s4',
            body: {
                query: {
                    bool: {
                        must: filters
                    }
                }
            }
        };

        var response = await client.search(executedQuery);
        const data = response.hits.hits;
        return data
    }

    return {
        search_query: search_query
    }
})();

var graphioRemakeInstance = graphioRemake; 
const result = await graphioRemakeInstance.search_query(["XcLR0ooBBBvBsP_nxiN9"], ['_id'], 'None');
console.log(result)

// graphioRemakeInstance.search_query(["atlasv2-edr-h1-s4", "cMLR0ooBBBvBsP_nxiN-", "7DMF69PK-05e6ded8-000003d8-00000000-1d89bcfe3ac77ff"], ["_index", "_id", "parent_guid"]).then(result => {
//     console.log(result); // Handle the resolved value here
// }).catch(error => {
//     console.error(error); // Handle any errors
// });