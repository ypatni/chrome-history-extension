// document.getElementById("button1").addEventListener("click", display);

// function display() {
//   let historyArr = new Array(10);

//   chrome.history.search({ text: "", maxResults: 10 }, function (data) {
//     for (var i = 0; i < data.length; ++i) {
//       historyArr[i] = data[i].url;
//       console.log(data[i].url);
//     }
//   });
// }

$("#search").change(function () {
  $("#links").empty();
  dumpLinks($("#search").val());
});

function dumpLinks(query) {
  chrome.history.search({ text: "", maxResults: 1000 }, function (data) {
    var list = $("<div>");
    for (var i = 0; i < data.length; ++i) {
      var link = data[i].url;

      if (String(link.toLowerCase()).indexOf(query.toLowerCase()) == -1) {
        continue;
      }

      var anchorDiv = getLink(link);
      list.append(anchorDiv);
    }
    $("#links").append(list);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  dumpLinks("");
});

function getLink(link) {
  var anchorDiv = $("<div>");
  var anchor = $("<a>");
  anchor.attr("href", link);
  anchor.text(link);

  anchor.click(function () {
    chrome.tabs.create({ url: link });
  });

  anchorDiv.append(anchor);
  anchorDiv.append($("<br/>"));
  return anchorDiv;
}
