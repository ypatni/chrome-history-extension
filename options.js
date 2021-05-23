document.getElementById('button1').addEventListener('click', display);

function display(){
    let historyArr = new Array(10);

    chrome.history.search({text: '' , maxResults: 10}, function(data){
        for(var i = 0; i < data.length; ++i) {
            historyArr[i] = data[i].url;
            console.log(data[i].url);
        }
    });
    
    
};