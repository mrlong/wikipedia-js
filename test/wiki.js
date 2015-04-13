var wikipedia = require("../lib/wikiClient");//require("wikipedia-js");
    var query = "帝国时代";
    // if you want to retrieve a full article set summaryOnly to false.
    // Full article retrieval and parsing is still beta
    
    var options = {query: query, format: "txt", summaryOnly: true};
    wikipedia.searchArticle(options, function(err, htmlWikiText){
      if(err){
        console.log("An error occurred[query=%s, error=%s]", query, err);
        return;
      }
      else{
        if(htmlWikiText==null){
          console.log('没有找到任何内容');
        }
        else
          console.log(htmlWikiText);
      }
      
      //console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", query, htmlWikiText);

    });



    var options = {query: '虎跳', format: "json", summaryOnly: true/*,srprop:''*/};
    wikipedia.searchTxt(options, function(err, html){
      if(err){
        console.log("An error occurred[query=%s, error=%s]", query, err);
        return;
      }
      else{
        if(html==null){
          console.log('没有找到任何内容');
        }
        else
          
          //console.log(html);
          var jsonData = JSON.parse(html);
          console.log(jsonData.query.search);
      }
      
      
    });


   

