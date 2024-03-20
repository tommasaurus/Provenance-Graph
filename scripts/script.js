const PORT = 3000; //Default port for server.js
// import { searchChildProcess } from 'Graphio.js';

document.addEventListener('DOMContentLoaded', function () {
    let index = 0
    const searchButton = document.querySelector('#searchButton');
    const textBox = document.querySelector('#inputField');
    const checkbox = document.querySelector('#reverseCheckbox')

    searchButton.addEventListener('click', function() {
        const inputValue = textBox.value;
        let data = {
            "name": "Root Process",
            "pid": "fdjdhs",
            "type": "process",
            "children": [
                {
                    "name": "Process 1",
                    "type": "process",
                    "children": [
                        {"name": "Process 2", "type": "process"},
                        {"name": "File 2", "type": "file"},
                        {"name": "Network 1", "type": "network"}
                    ]
                },
                {
                    "name": "File 1",
                    "type": "file"
                }
            ]
        };
        update(data)
        console.log("Search for:", inputValue);
    })


    let canvas = d3.select("#svgContainer").append("svg")
        .attr("width", "100%") // Use 100% width of the container
        // You might need to adjust the height calculation based on your actual control bar size
        .attr("height", "calc(100% - 40px)") // Assuming the control bar is 40px high; adjust accordingly
        .append("g")
        .attr("transform", "translate(50, 50)");

    let tree = d3.tree().size([400, 400]);
    let expanded = [];
    //require config.json
    // Define your JSON object here
    let data = {
        "name": "Root Process",
        "pid": "fdjdhs",
        "type": "process",
        "children": [
            {
                "name": "Process 1",
                "type": "process",
                "children": [
                    {"name": "Process 2", "type": "process"},
                    {"name": "File 2", "type": "file"},
                    {"name": "Network 1", "type": "network"}
                ]
            },
            {
                "name": "File 1",
                "type": "file"
            }
        ]
    };

    function update(rootData) {
        canvas.selectAll("*").remove(); // Clear the canvas for redraw

        let root = d3.hierarchy(rootData);
        tree(root);
        let nodes = root.descendants();
        let links = root.links();

        let linkFunction = d3.linkHorizontal()
            .x(function(d) { return d.y; })
            .y(function(d) { return d.x; });

        canvas.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#ADADAD")
            .attr("d", linkFunction);

        let node = canvas.selectAll(".node")
            .data(nodes)
            .enter()
            .append('g')
            .attr("class", "node")
            .attr("transform", function (d){return "translate("+ d.y + ","+ d.x +")"})
            .on("click", nodeClick);

        node.append("circle")
            .attr('r',5)
            .attr("fill", colorByType);

        node.append("text")
            .text(function(d){return d.data.name;})
            .attr("dx", -10)
            .attr("dy", 20);

        createKey();
    }

    function colorByType(d) {
        switch (d.data.type) {
            case "process": return "steelblue";
            case "network": return "green";
            case "file": return "red";
            default: return "purple";
        }
    }

    function removeChildren(d) {
        if (d.children) {
            d.children = null;
        }
        update(data);
    }

    function addChildren(d) {
        // const id = d.data.id;
        // var data = searchChildProcess(id);

        index2 = index+1
        if (!d.children) {
            d.children = [
                {name: "node" + index, type: "file"},
                {name: "node" + index2, type: "file"}
            ];
        }
        index+=2
        update(data);
    }

    function nodeClick(event, d) {
        let nodeName = d.data.name;
        let textBoxValue = textBox.value;
        let isCheckboxChecked = checkbox.checked;
        console.log(isCheckboxChecked);
        console.log(textBoxValue);
        if (expanded.includes(nodeName)) {
            removeChildren(d.data);
            expanded = expanded.filter(e => e !== nodeName); // Remove from expanded list
        } else {
            addChildren(d.data);
            expanded.push(nodeName);
        }
    }

    // Creating the key
    function createKey() {
        let keyGroup = canvas.append("g")
            .attr("transform", "translate(50, 500)"); // Adjust the position as needed
        keyGroup.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "steelblue");

        keyGroup.append("text")
            .attr("x", 30)
            .attr("y", 15)
            .text("Process");

        keyGroup.append("rect")
            .attr("x", 100)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "green");

        keyGroup.append("text")
            .attr("x", 130)
            .attr("y", 15)
            .text("Network");

        keyGroup.append("rect")
            .attr("x", 200)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "red");

        keyGroup.append("text")
            .attr("x", 230)
            .attr("y", 15)
            .text("File");
    }

    update(data); // Initial drawing of the tree
});
