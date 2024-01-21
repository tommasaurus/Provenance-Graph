export function search(id) {
    fetch(`http://localhost:3000/search?id=${encodeURIComponent(id)}`).
    then(response => response.json()).
    then(data => {
        if (data) {
            console.log(data[0]["_source"]);
            console.log(data[0]["_source"]["parent_guid"]);
            return data[0];  
        } else {
            console.log('No data found');
            return null;
        }
    }).
    catch(error => console.error('Error:', error));
}

export function searchByPID(pid) {
    fetch(`http://localhost:3000/searchbypid?id=${encodeURIComponent(pid)}`).
    then(response => response.json()).
    then(data => {
        if (data) {
            
            console.log(data);            
            return data[0];  
        } else {
            console.log('No data found');
            return null; 
        }
    }).
    catch(error => console.error('Error:', error));
}

export function searchParent(guid) {
    fetch(`http://localhost:3000/searchparent?id=${encodeURIComponent(guid)}`).
    then(response => response.json()).
    then(data => {
        if (data) {
            
            console.log(data);            
            return data[0];  
        } else {
            console.log('No data found');
            return null; 
        }
    }).
    catch(error => console.error('Error:', error));
}

export function searchParentByPID(pid) {
    fetch(`http://localhost:3000/searchparentbypid?id=${encodeURIComponent(pid)}`).
    then(response => response.json()).
    then(data => {
        if (data) {
            
            console.log(data);            
            return data[0];  
        } else {
            console.log('No data found');
            return null; 
        }
    }).
    catch(error => console.error('Error:', error));
}

export function helloWorld() {
    console.log("Hello, world!");
    return "HELLLLOOOO"
}

