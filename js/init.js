var s = document.createElement("script");
s.src = chrome.extension.getURL('js/jquery-2.1.1.min.js');
(document.head||document.documentElement).appendChild(s);
var j = document.createElement("script");
j.src = chrome.extension.getURL('js/script.js');
(document.head||document.documentElement).appendChild(j);

