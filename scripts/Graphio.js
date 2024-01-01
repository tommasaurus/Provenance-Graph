// const { Client } = require('@elastic/elasticsearch');
// import { Client } from '@elastic/elasticsearch';
// const clientURL = 'http://elastic:stimulus5affect-roof@beryl.cs.virginia.edu:9200'
// const client = new Client({
//     node: clientURL,
// });
export function search(id) {
    fetch(`http://localhost:3000/search?id=${encodeURIComponent(id)}`).then(response => response.json()).then(data => console.log(data)).catch(error => console.error('Error:', error));
    // fetch(`http://localhost:3000/search?id=${encodeURIComponent(id)}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         const resultsContainer = document.getElementById('searchResults');
    //         //resultsContainer.innerHTML = ''; // Clear previous results

    //         data.forEach(doc => {
    //             // Assuming you want to display some content from '_source'
    //             const content = doc._source.yourFieldName; // Replace 'yourFieldName' with the actual field name you want to display
    //             const div = document.createElement('div');
    //             div.textContent = `ID: ${doc._id}, Content: ${content}`;
    //             //resultsContainer.appendChild(div);
    //         });
    //     })
    //     .catch(error => console.error('Error:', error));
    }


async function search_query(vertexValue = ["cMLR0ooBBBvBsP_nxiN-"], vertexKey = ['_id'], vertexLabel = "None") {
    // const filters = vertexKey.map((value, index) => {
    //     return {
    //         match: {
    //             [value]: vertexValue[index]
    //         }
    //     };
    // });

    // console.log(filters)

    const executedQuery = {
        index: 'atlasv2-edr-h1-s4',
        body: {
            query: {
                match: {
                    _id: 'XcLR0ooBBBvBsP_nxiN9'
                }
            }
        }
    };
    var response = await client.search(executedQuery);
    const data = response.hits.hits;
    return data
}

export function hello2() {
    console.log("Hello, world!");
    return "HELLLLOOOO"
}

export function helloWorld() {
    console.log("Hello, world!");
    return "HELLLLOOOO"
}

// const result = await search_query(["XcLR0ooBBBvBsP_nxiN9"], ['_id'], 'None');
// console.log(result);
