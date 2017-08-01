(function () {
  'use strict';
  var Toolbar=function(data,el){
    var defaults={
      id:null,
      siteid:null,
      replacer:null,
      path:'../',
      allfeatures:false,
      default: true,
      social: false,
      socialtools:['tweetFB','getty','youtube','upload'],
      socialtools:[{title:'tweetFB',execute:'insertTweetFB'},
        {title:'getty',execute:'insertGettyImage'},
        {title:'youtube',execute:'insertYoutubeVideo'},
        {title:'upload',execute:'insertPicture'}],
      odds: false,
      oddstools:[{title:'Insert Stream Schedule',execute:'insertbet365Matches'},
        {title:'Betradar Odds (Tennis/Soccer)',execute:'insertBetradarOdds'},
        {title:'Insert Racecard',execute:'insertHorseMatches'},
        {title:'Bet365 Betslip',execute:'insertBetslip'},
        {title:'All Bet365 Markets',execute:'insertOutrightOdds'}],
      centralized: false,
      centralizedtools:[{title:'Trading Offers',execute:'insertTradingOffer'},
        {title:'Central Tables',execute:'insertStaticTable'},
        {title:'Insert Poll',execute:'insertPoll'},
        {title:'Schema Table',execute:'insertSchema'},
        {title:'Top Firm Table',execute:'insertFreeOffers'}],
      iframe: false,
      iframetools:[{title:'LS',execute:'insertIframe'},
        {title:'HR',execute:'insertIframe'},
        {title:'NL',execute:'insertIframe'}],
      promolink:false,
      fastbet:false,
      topfeatures:[{title:'Insert Odds Box',execute:'insertHROffer'},
      {title:'Betting Offer',execute:'insertFreebet'},
      {title:'Sport Radar',execute:'insertSportradarWidget'}],
      height:'400px',
      editmode:true,
      bartools:false,
      headingDrop:[{index:2,heading:'h2'},{index:3,heading:'h3'},{index:4,heading:'h4'},{index:5,heading:'h5'}]
      allowSites:[132,133,1,140,38,40,65],
      common:['bold','subhead','linebreak','italic','underline','strikethrough','justifyleft','justifycenter','justifyright','insertorderedlist','insertCustomList','insertunorderedlist','outdent','indent','link']
    }
    this.options = this.extendDefaults(defaults, data);
    this.wrapper=el;
    var tb=this;
    tb.gettyAllow=tb.options.allowSites.indexOf(+tb.options.siteid)>-1;
    tb.tools=function(){
      this.wrapRow=function(data){
        return `<tr><td><table cellspacing="0" cellpading="0" width="100%"><tbody><tr>${data}</tr></tbody></table></td></tr>`
      }
      this.commonTools=function(){
        var str=``
        tb.options.common.forEach((btn)=>{
          if(btn==='insertCustomList'){
            str+=`<td><button type="button" onclick="addList('${tb.options.id}','${btn}')">${btn}</button></td>`;
            return
          }
          if(btn==='link'){
            str+=`<td><button type="button" onclick="cmdOpenModel('${tb.options.id}','${btn}')">${btn}</button></td>`;
            return
          }
            str+=`<td><button type="button" onclick="cmdExec('${tb.options.id}','${btn}')">${btn}</button></td>`;
        })
        return this.wrapRow(str);
      }
      this.promoRow=function(){
        var f=this;
        var str='';
        f.wrapCol=function(source){
          return `<td>${source}</td>`;
        }

        f.createPromoCol=function(title,source,width){
          var cstr="",cells=0
            cstr+=`<iframe src="${this.options.path}${source}.aspx?id=${this.options.id}" width="${width}" height="24px" frameborder="0" scrolling="no" ></iframe>`;
          return f.wrapCol(cstr)
        }
        f.createTopFeaturesCol=function(){
          var cstr="",cells=0
          tb.options.topfeatures.forEach((item)=>{
            cstr+=`<button type="button" onclick="${item.execute}('${tb.options.id}','${item.title}')">${item.title}</button>`;
            cells++
          })
          return f.wrapCol(cstr,cells)
        }
        var allfeatures=this.options.allfeatures;
        if(allfeatures && (typeof allfeatures=='string' && allfeatures=="true")){
          str+=this.createPromoCol('promolink','modelframeofferlink','394px');
          str+=this.createPromoCol('fastbet','fastbetmodellink','420px');
          str+=this.createTopFeaturesCol();
        }else{
          this.options.promolink&&(typeof this.options.promolink=='string'&&this.options.promolink=="true")&&(str+=this.createPromoCol('promolink','modelframeofferlink','394px'))
          this.options.fastbet&&(typeof this.options.fastbet=='string'&&this.options.fastbet=="true")&&(str+=this.createPromoCol('fastbet','fastbetmodellink','420px'))
        }
        return this.wrapRow(str);
      }
      this.features=function(){
        var f=this;
        var str='';
        f.wrapCol=function(title,buttons,cells){
          return `<td><table cellpadding="0" cellspacing="0"><tbody><tr><td colspan="${cells}" align="center">Insert ${title}</td></tr><tr>${buttons}</tr></tbody></table></td>`;
        }
        f.createToolsCol=function(type,title){
          var cstr="",cells=0
          tb.options[type].forEach((item)=>{
            cstr+=`<td><button type="button" onclick="${item.execute}('${tb.options.id}','${item.title}')">${item.title}</button></td>`;
            cells++
          })
          return f.wrapCol(title,cstr,cells)
        }

        var allfeatures=this.options.allfeatures;
        if(allfeatures && (typeof allfeatures=='string' && allfeatures=="true")){
          str+=this.createToolsCol('socialtools','social');
          str+=this.createToolsCol('oddstools','odds');
          str+=this.createToolsCol('centralizedtools','Social');
          str+=this.createToolsCol('iframetools','iframe');
        }else{
          this.options.social&&(typeof this.options.social=='string'&&this.options.social=="true")&&(str+=this.createToolsCol('socialtools','social'))
          this.options.odds&&(typeof this.options.social=='string'&&this.options.odds=="true")&&(str+=this.createToolsCol('oddstools','odds'))
          this.options.centralized&&(typeof this.options.centralized=='string'&&this.options.centralized=="true")&&(str+=this.createToolsCol('centralizedtools','Social'))
          this.options.iframe&&(typeof this.options.iframe=='string'&&this.options.iframe=="true")&&(str+=this.createToolsCol('iframetools','iframe'))
        }
        return this.wrapRow(str);
      }
      this.toolbarUtility=function(){
        this.quickLink=function(){
          return `<iframe src="${this.options.path}modelframelink.aspx?id=${this.options.id}" width="430px" height="33px" frameborder="0" scrolling="no" ></iframe>`
        }
        this.createHeadingDropDown=function(type,title,classname){
          var list='',count=2;
          this.options.headingDrop.forEach((item)=>{
            list+=`<li class="heading-${item.index}" onclick="setHeadings('${this.options.id}',this, ${item.heading});">Heading ${item.index}</li>`
          })
          var drop=`<div class="cbtn heading-drop">Heading<ul>${list}</ul></div>`
          return drop;
        }
      }
      this.toolbarUtilityRow(){

      }
      this.create=function(){
        var str=""
         str+=this.commonTools();
         str+=this.features()
         str+=this.promoRow()
         tb.append(str)
      }
      this.create();
    }
    tb.build=function(){
      tb.tools();
    }
    tb.init();
  }
  Toolbar.prototype={
    init:function(){
      if(this.options.id && this.options.siteid){
        this.build()
      }else{
        console.log('Content editor some required parameters are missing')
      }
    },
    extendDefaults:function(defaults, properties){
      var property;
  		for (property in properties) {
  			if (properties.hasOwnProperty(property)) {
  				defaults[property] = properties[property];
  			}
  		}
  		return defaults;
    },
    append:function(str){
      if (typeof str === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = str;
          while (tempDiv.firstChild) {
              this.wrapper.appendChild(tempDiv.firstChild);
          }
      }
    }
  }

  window.Toolbar=Toolbar;
  var editors=document.querySelectorAll('.editor');
  editors.forEach((editor)=>{
    var data=editor.dataset;
    new Toolbar(data,editor);
  })



})()
