const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors')

const app = express();
const clientURL = 'http://elastic:stimulus5affect-roof@beryl.cs.virginia.edu:9200'
const client = new Client({
    node: clientURL,
});

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Define a route for a sample Elasticsearch operation
app.get('/search', async (req, res) => {
    try {
        const { id } = req.query;
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
        res.json(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
// app.get('/search', async (req, res) => {
//     try {
//         const { id } = req.query;
//         const executedQuery = {
//             index: 'atlasv2-edr-h1-s4',
//             body: {
//                 query: {
//                     term: {
//                         "_id": id  // Use the `id` from the request query
//                     }
//                 }
//             }
//         };
//         var response = await client.search(executedQuery);
//         const data = response.body.hits.hits; // Correct path to hits
//         res.json(data); // Send data as JSON response
//     } catch (error) {
//         res.status(500).json({ error: error.toString() }); // Send error as JSON
//     }
// });


const PORT = 3000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'))