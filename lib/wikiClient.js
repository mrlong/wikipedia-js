var superAgent      = require("superagent"),
    wikiParser      = require("./parser/wikiParser"),
    wikiConstants   = require("./constants/wikiConstants");

function searchArticle(queryAndOptions, callback) {
    var query = queryAndOptions.query;
    if (!query) {
        return callback(new Error("No search query was provided"));
    }

    var format        = queryAndOptions.format || "json";
    var summaryOnly     = queryAndOptions.summaryOnly;
    var queryParams     = {action: "query", format: format, prop: "revisions",
                           rvprop: "content", titles: query, redirects: 1}; // uselang:'zh-cn'
    
    if (queryAndOptions.format === "html") {
        queryParams.format = "json";
    }
    else if(queryAndOptions.format === "txt"){
      queryParams.format = "json";  
    }

    if(summaryOnly){
        queryParams.rvsection = 0;
    }
    
    //console.log(wikiConstants.WIKIPEDIA_EN_API_URL);
    superAgent.get(wikiConstants.WIKIPEDIA_EN_API_URL)
        .query(queryParams)
        .timeout(1000)  //龙仕云  www.mrlong.cn
        .set("User-Agent", "Node.js wikipedia-js client (kenshiro@kenshiro.me)")
        .set("accept-language","zh-CN,zh;q=0.8")
        .end(function (err,res) {
            if (!err) {
                if (format === "html") {
                    var jsonData = JSON.parse(res.text);
                    wikiParser.parse(jsonData, format, callback);                   
                //////add by 龙仕云 
                } else if (format === 'txt'){
                  var jsonData = JSON.parse(res.text);
                  wikiParser.parse(jsonData, format, callback);
                ///end  
                }else if (format in {yaml: 1, php: 1, txt: 1, dbg: 1, dump: 1}) {
                    // it does not work yet!
                } else {
                    return callback(null, res.text);
                }
            } else {
                process.nextTick(function () {
                    return callback(new Error("Unexpected HTTP status received [status=" + ''/*res.status*/ + "]"));
                });
            }
        });
}

module.exports.searchArticle = searchArticle;

///////////////////////////////////////////////////龙仕云  2015-04-13 /////////////////
//用于搜索内容
function searchTxt(queryAndOptions, callback) {
    var query = queryAndOptions.query;
    var srprop = queryAndOptions.srprop;
  
    if (!query) {
        return callback(new Error("No search query was provided"));
    }

    var format        = queryAndOptions.format || "xml";
    var summaryOnly     = queryAndOptions.summaryOnly;

    var queryParams     = {action: "query", format: format, list: "search",
                           srwhat: "text", srsearch: query}; 
    

    //增另这个参数，就没有祥细的说明 srprop:""
    if(srprop!=null){
      queryParams.srprop = "";     
    };
  
    if (queryAndOptions.format === "html") {
        queryParams.format = "json";
    };
    

    if(summaryOnly){
        queryParams.rvsection = 0;
    }

    superAgent.get(wikiConstants.WIKIPEDIA_EN_API_URL)
        .query(queryParams)
        .timeout(1000)  //龙仕云  www.mrlong.cn
        .set("User-Agent", "Node.js wikipedia-js client (kenshiro@kenshiro.me)")
        .set("accept-language","zh-CN,zh;q=0.8")
        .end(function (err,res) {
            if (!err) {
              return callback(null, res.text);                
            } else {
                process.nextTick(function () {
                    return callback(new Error("Unexpected HTTP status received [status=" + ''/*res.status*/ + "]"));
                });
            }
        });
};

module.exports.searchTxt = searchTxt;

