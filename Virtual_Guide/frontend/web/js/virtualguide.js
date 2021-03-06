
//#### HTML elements event listeners

if ( document.getElementById('addPointSubmitBtn') ) {
	document.getElementById('addPointSubmitBtn').addEventListener('click', function(e) {
		e.preventDefault();
		console.log("Dodawanie obrazka");
		
		var selectList = document.getElementById('addPointForm').getElementsByTagName('select');
		
		
		
		var name = document.forms['addPointForm']['name'].value;
		var addr = document.forms['addPointForm']['addr'].value;
		var descr = document.forms['addPointForm']['descr'].value;
		var lon = document.forms['addPointForm']['lon'].value;
		var lat = document.forms['addPointForm']['lat'].value;
		var zoom = document.forms['addPointForm']['zoom'].value;
		var cat = selectList[0].options[selectList[0].selectedIndex].value;
		var tag = document.forms['searchPointForm']['tag'].value;
		var country = selectList[1].options[selectList[1].selectedIndex].value;
		
		if ( name == '' || lon == '' || lat == '' || descr == '' || zoom == '' || cat == -1 || addr == '' || country == -1 ) {
			var addFormMsg = document.getElementById('addPointFormMsg');
			addFormMsg.innerHTML = "Wypełnij wszystkie pola";
			return false;
		} else {		
			var formData = new FormData();
			formData.append('_csrf', document.forms.addPointForm._csrf.value);
			formData.append("UploadForm[imageFile]", document.getElementById('addPointForm-image').files[0]);
			formData.append("name", name);
			formData.append("adress", addr);
			formData.append("descr", descr);
			formData.append("tag", tag);
			formData.append("lon", lon);
			formData.append("lat", lat);
			formData.append("zoom", zoom);
			formData.append("category", cat);
			formData.append("country", country);
			
			$.ajax({
			url: 'site/add-point',  //Server script to process data
			type: 'POST',
			
			//Ajax events
		       
			success: function(data, textStatus, jqXHR)
			{
			    if(typeof data.error === 'undefined')
			    {
				// Success so call function to process the form
				//submitForm(event, data);
							document.forms["addPointForm"].reset();
							
							var jsonObj = JSON.parse(data);
					//alert(jsonObj);
					json = [jsonObj];
					//console.log(jsonObj);
					console.log(json);
					addPointFormMsg.innerHTML = "";
					
					if (map.popups[0]) {
						map.removePopup(map.popups[0]);
					}
					addFeaturesToVector(vectorlayer, json);
			    }
			    else
			    {
				// Handle errors here
				console.log('ERRORS: ' + data.error);
			    }
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
			    // Handle errors here
			    console.log('ERRORS: ' + textStatus);
			    // STOP LOADING SPINNER
			},
			// Form data
			data: formData,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
			
		    });
		}
		return false;
	});
	
}

if ( document.getElementById('addPointResetBtn') ) {
	document.getElementById('addPointResetBtn').addEventListener('click', function(e) {
		e.preventDefault();
		document.forms['addPointForm'].reset();
		return false;
	});
}

if( document.getElementById('addPictureForm') ) {
	document.getElementById('addPictureForm').addEventListener('submit', function(e) {
		e.preventDefault();
		console.log("Dodawanie obrazka");
		
		if ( document.getElementById('file2').files[0] == undefined ) {
		    //var formData = new FormData($('form')[2]);
		    var addPictureFormMsg = document.getElementById('addPictureFormMsg');
		    addPictureFormMsg.innerHTML = "Wybierz plik."
		} else {
			var formData = new FormData();
			
			formData.append('_csrf', document.forms.addPictureForm._csrf.value);
			formData.append('id', document.querySelector('#addPictureForm > [name=id]').value);
			formData.append("UploadForm[imageFile]", document.getElementById('file2').files[0]);
			//makeRequest('POST', 'site/upload', formData, log);
			
			$.ajax({
			url: 'site/upload',  //Server script to process data
			type: 'POST',
			
			//Ajax events
		       
			success: function(data, textStatus, jqXHR)
			{
			    if(typeof data.error === 'undefined')
			    {
				// Success so call function to process the form
			       document.forms["addPictureForm"].reset();
			    }
			    else
			    {
				// Handle errors here
				console.log('ERRORS: ' + data.error);
			    }
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
			    // Handle errors here
			    console.log('ERRORS: ' + textStatus);
			    // STOP LOADING SPINNER
			},
			// Form data
			data: formData,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
			
		    });
		}	
		return false;	
	});
}

function log() {
	console.log('zaldowano obrazek');
}	
	


document.getElementById('searchSubmitBtn').addEventListener('click', function(e) {
	e.preventDefault();
	validateSearchPointForm();
});

document.getElementById('searchResetBtn').addEventListener('click', function(e) {
	e.preventDefault();
	document.forms['searchPointForm'].reset();
	return false;
});

console.log(document.getElementById('navTabs').getElementsByTagName('li')[0]);
document.getElementById('navTabs').getElementsByTagName('li')[0].addEventListener('click', function(e) {
	console.log(e);
	var hasClass =this.classList.contains('disabled');
	if (hasClass) {
		e.preventDefault();
		return false;
	}
});


document.addEventListener('click', function (e) {
    
    // If the clicked element is not the menu
   // if (!$(e.target).parents(".custom-menu").length > 0) {
        console.log('mamaaaaaaaaaaaaa');
        console.log(e);
        // Hide it
      hideCustomMenu(); 
}); 

document.getElementById('custom-menu-container').addEventListener('click', function(e) {
	
	if (e.target.id === 'firstCustomMenuOption') {
		console.log('pierwsza opcja');
		document.forms["addPointForm"].reset();
		$('#navTabs a[href="#addPoint"]').tab('show');
		
	} else if (e.target.id === 'secondCustomMenuOption') {
		console.log('druga opcja');
		document.forms["addPointForm"].reset();
		$('#navTabs a[href="#addPoint"]').tab('show');
		var dataHolder = document.getElementById('secondCustomMenuOption');
		document.forms['addPointForm']['lon'].value = dataHolder.dataset.lon;
		document.forms['addPointForm']['lat'].value = dataHolder.dataset.lat;
		document.forms['addPointForm']['zoom'].value = map.getZoom();
	} else if (e.target.id === 'thirdCustomMenuOption') {
		$('#navTabs a[href="#searchPoint"]').tab('show');
	}
	
});

document.getElementsByClassName('panel-toggle-button')[0].addEventListener('click', function(e) {
	
	var target = $('.panel-visible');
	var button = $('.panel-toggle-button span');
	
	var value = (target.position().left == 0) ? -400 : 0;
	target.animate({left: value}, 400);
	
	button.hasClass('glyphicon-chevron-left') ? button.removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right') : button.removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
});

if( document.getElementById('addCommentForm') ) {
	document.getElementById('addCommentInput').addEventListener('focus', function(e) {
		e.target.placeholder = "";
		e.target.rows = "1";
		document.getElementById('addCommentSubmitBtn').style.display = 'block';
		
	});

	document.getElementById('addCommentInput').addEventListener('blur', function(e) {
		e.target.placeholder = "Dodaj komentarz";
		e.target.rows = "1";
		var nextElement = document.getElementById('addCommentSubmitBtn');
		if ( document.activeElement != nextElement ) {
			//nextElement.style.display = 'none';
		}
	});


	document.getElementById('addCommentSubmitBtn').addEventListener('click', function(e) {
		e.preventDefault();
		validateAddCommentForm(e);
	});
}

$('#navTabs a').click(function(e) {
	e.preventDefault();
	if ( $(this).parent().hasClass('disabled')) {
		return false;
	} else {
		$(this).tab('show');
		console.log($(this));
	}
});

document.getElementById('commentsMore').addEventListener('click', function(e) {
	e.preventDefault();
	generateCommList(lastRetrComm-1);
});

document.getElementById('commentsLess').addEventListener('click', function(e) {
	e.preventDefault();
	generateCommList(lastRetrComm+1);
});

document.getElementById('picsMore').addEventListener('click', function(e) {
	e.preventDefault();
	generatePicsList(lastRetrPic-1);
});

document.getElementById('picsLess').addEventListener('click', function(e) {
	e.preventDefault();
	generatePicsList(lastRetrPic+1);
});



/**
 * Class: OpenLayers.Strategy.AttributeCluster
 * Strategy for vector feature clustering based on feature attributes.
 *
 * Inherits from:
 *  - <OpenLayers.Strategy.Cluster>
 */
OpenLayers.Strategy.AttributeCluster = OpenLayers.Class(OpenLayers.Strategy.Cluster, {
    /**
     * the attribute to use for comparison
     */
    attribute: null,
    /**
     * Method: shouldCluster
     * Determine whether to include a feature in a given cluster.
     *
     * Parameters:
     * cluster - {<OpenLayers.Feature.Vector>} A cluster.
     * feature - {<OpenLayers.Feature.Vector>} A feature.
     *
     * Returns:
     * {Boolean} The feature should be included in the cluster.
     */
    shouldCluster: function (cluster, feature) {
        var cc_attrval = cluster.cluster[0].attributes[this.attribute];
        var fc_attrval = feature.attributes[this.attribute];
        var superProto = OpenLayers.Strategy.Cluster.prototype;
        return cc_attrval === fc_attrval && superProto.shouldCluster.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Strategy.AttributeCluster"
});

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
	defaultHandlerOptions: {
		'single': true,
		'double': false,
		'pixelTolerance': 0,
		'stopSingle': false,
		'stopDouble': false
	},
	handleRightClicks:true,
	initialize: function (options) {
		this.handlerOptions = OpenLayers.Util.extend(
			{}, this.defaultHandlerOptions
		);
		OpenLayers.Control.prototype.initialize.apply(
			this, arguments
		);
		this.handler = new OpenLayers.Handler.Click(
			this, {
				'click': this.trigger,
				'rightclick' : this.trigger2
				

			}, this.handlerOptions
		);
	}, 

	trigger : function (e) {
		
		if (getCordsFlag) {
		var lonlat = map.getLonLatFromPixel(e.xy).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
		var lon = document.forms['addPointForm']['lon'];
		var lat = document.forms['addPointForm']['lat'];
		var zoom = document.forms['addPointForm']['zoom'];
		// transformacja wspolrzednych
		console.log(e);
		lon.value = lonlat.lon;
		lat.value = lonlat.lat;
		zoom.value = map.getZoom();

		var control = map.getControlsBy("id", "clickControl")[0];
		// if (control.active) {
			// console.log('contolol activ');
			// control.deactivate();
		// }
		}
		vectorlayer.setVisibility(true);

		var mapDiv = document.getElementById('map');
		mapDiv.style.cursor = 'default';
	},
	
	trigger2 : function (e) {
		//e.preventDefault();
		showCustomMenu(e);
		savePointCords(e);
		console.log("trigger 2 right click");
		
	}
	

});


// global variables
var map, vectorlayer, features, stylemap, select;

var infoBoxId = "";
var infoBoxStatus = 0;
var lastRetrComm = 0;
var lastRetrPic = 0;
var activePointId = "-1"
var json = [];
var activePointCommArr = [];
var activePointPicsArr = [];
var getCordsFlag = false;



makeRequest('GET','site/points', '', alertContents);






// wrap the instanciation code in an anonymous function that gets executed
// immeadeately
function main (){

    // The function that gets called on feature selection: shows information 
    // about the feature/cluser in a div on the page 
    var showInformation = function(evt){
        var feature = evt.feature;
			console.log(evt);
        var info = 'Last hovered feature:<br>';
        if (feature.cluster) {
            info += '&nbsp;&nbsp;Cluster of ' + feature.attributes.count + ' features:';
            var clazzes = {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
							'5': 0
            };
            for (var i = 0; i < feature.attributes.count; i++) {
                var feat = feature.cluster[i];
                clazzes[feat.attributes.clazz]++;
            }
            for (var j=1; j<=4; j++) {
                var plural_s = (clazzes[j] !== 1) ? 's' : '';
                info += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&bull;&nbsp;clazz ' + j + ': ' + clazzes[j] + ' feature' + plural_s;
            }
        } else {
            info += '&nbsp;&nbsp;Single feature of clazz = ' + feature.attributes.clazz;
        }
        document.getElementById('info').innerHTML = info;
    };
	
	var logInformation = function(evt){
        var feature = evt.feature;
        
        
        console.log();
    };
	
	
	
    // The function that gets called on feature selection. Shows information 
    // about the number of "points" on the map.
    var updateGeneralInformation = function() {
        var info = 'Currently ' + vectorlayer.features.length + ' points are shown on the map.';
        document.getElementById('generalinfo').innerHTML = info;
    };
    
    // instanciate the map
    map = new OpenLayers.Map('map', {
    		eventListeners : {
    			featureover : function (e) {
    				e.feature.renderIntent = "select";
    				e.feature.layer.drawFeature(e.feature);
    				console.log("Map says: Pointer entered " + e.feature.id + " on " + e.feature.layer.name);
    				console.log(e.feature);
    			},
    			featureout : function (e) {
    				e.feature.renderIntent = "default";
    				e.feature.layer.drawFeature(e.feature);
    				console.log("Map says: Pointer left " + e.feature.id + " on " + e.feature.layer.name);
    			},
    			featureclick : function (e) {
    				console.log("Map says: " + e.feature.id + " clicked on " + e.feature.layer.name);
				console.log("Poprawne wykrycie kliknięcia w punkt");
					//controlFeatureClick(e);
				loadPointInfo(e);
    				//var feature = e.feature;
					//popup('popUpDiv');
    				
    			}
		}
		//,restrictedExtent: new OpenLayers.Bounds(-180, -90, 180, 90)
	});
    
    // background WMS
	
	map.div.addEventListener('contextmenu', function noContextMenu(e) {
		e.preventDefault();
		//console.log(map);
		//var lonlat = (map.getLonLatFromPixel(e.xy)).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
           /*   if (OpenLayers.Event.isRightClick(e)){
                console.log("Right button click"); // Add the right click menu here
			//savePointCords(e);
			//var lonlat = (map.getLonLatFromPixel(e.xy)).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
			showCustomMenu(e); */
    
    // In the right position (the mouse)
          
      // }
	 });       
    
   
	 map.events.register('mousedown', map, function(e) {
	    console.log('mousedown');
	    if (checkCustomMenuVisibility() === true) {
		    console.log(e);
		    hideCustomMenu();
	    }
	    return true;
	},true);
    
    // context to style the vectorlayer
    var context = {
        getColor: function(feature){
            var color = '#aaaaaa';
					if (feature.attributes.clazz && feature.attributes.clazz === 4) {
						color = '#ee0000';
					}
					else if (feature.cluster) {
						var onlyFour = true;

						for (var i = 0; i < feature.cluster.length; i++) {
							if (onlyFour && feature.cluster[i].attributes.clazz !== 4) {
								onlyFour = false;
							}
						}
						if (onlyFour === true) {
							color = '#ee0000';
						}
						
						var onlyOne = true;
						for (var i = 0; i < feature.cluster.length; i++) {
							if (onlyOne && feature.cluster[i].attributes.clazz !== 1) {
								onlyOne = false;
							}
						}
						if (onlyOne === true) {
							color = '#00bb00';
						}
						
						var onlyTwo = true;
						for (var i = 0; i < feature.cluster.length; i++) {
							if (onlyTwo && feature.cluster[i].attributes.clazz !== 2) {
								onlyTwo = false;
							}
						}
						if (onlyTwo === true) {
							color = '#0000ff';
						}
						
						var onlyThree = true;
						for (var i = 0; i < feature.cluster.length; i++) {
							if (onlyThree && feature.cluster[i].attributes.clazz !== 3) {
								onlyThree = false;
							}
						}
						if (onlyThree === true) {
							color = '#ee00dd';
						}
						
						var onlyFive = true;
						for (var i = 0; i < feature.cluster.length; i++) {
							if (onlyFive && feature.cluster[i].attributes.clazz !== 3) {
								onlyFive = false;
							}
						}
						if (onlyFive === true) {
							color = '#ee00dd';
						}
					}
            return color;
        },
			radius: function(feature) {
					var pix = 10;
					if(feature.attributes.count > 1 ) {
						pix = Math.min(feature.attributes.count, 7) + 11;
					}
					return pix;
				},
			strokeWidth: function(feature) {
					var pix = 10;
					if(feature.attributes.count > 1) {
						pix = (Math.min(feature.attributes.count, 7) + 11) * 1.2;
					}
					return pix;
				},
			count: function(feature) {
				if (feature.attributes.count === 1) {
					return '';
					//return feature.cluster[0].attributes.label;
				} else {
					return feature.attributes.count;
				}
			},
			fontSize: function(feature) {
				if (feature.attributes.count === 1) {
					return "12px";
				} else {
					return "16px";
				}
			},
				labelOutlineWidth: function(feature) {
				if (feature.attributes.count === 1) {
					return "0px";
				} else {
					return "3px";
				}
			}
			
    };
    
    // style the vectorlayer
    stylemap = new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            pointRadius: "${radius}",
					label: "${count}",
            fillColor: "${getColor}",
            fillOpacity: 0.8,
					fontColor: "#ffffff",
           fontOpacity: 0.8,
            fontSize: "${fontSize}",
            strokeColor: "${getColor}",
            strokeWidth: 5,
            strokeOpacity: 0.5,
            graphicZIndex: 1,
					labelOutlineColor: "#000000",
           labelOutlineWidth: "${labelOutlineWidth}"
        }, {
            context: context
        }),
        'select' : new OpenLayers.Style({
            pointRadius: 18,
            fillColor: "#FF530D",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWidth: 5,
            strokeOpacity: 0.3,
            graphicZIndex: 2
        })
    });
    
    // the vectorlayer
    vectorlayer = new OpenLayers.Layer.Vector('Punkty', {styleMap: stylemap, strategies: [new OpenLayers.Strategy.Cluster({distance: 30})]});
    
    // the select control
   /* select = new OpenLayers.Control.SelectFeature(
        vectorlayer, {hover: true}
    );*/
	
	
	
	var fpControl = new OpenLayers.Control.FeaturePopups({
    // External div for list popups
    popupOptions: {
        list: {
            // Uses an existing div having an id 'divList'
            popupClass: 'divList'
        },
        single: null // Show a list instead of single popup if the list
                     //     has only an item.
    },
    boxSelectionOptions: {},
    layers: [
        [
        // Uses: Templates for hover & select and safe selection
        vectorlayer, {templates: {
            // hover: single & list
            //hover: '${count}',
            //hoverList: '<b>${count}</b><br>${html}',
            //hoverItem: '${.name}<br>',
            // select: single & list
            single: '<div><h2>${.title}</h2>${.description}</div>',
            item: '<li><a href="#" ${showPopup()}>${.title}</a></li>'
        }}]
    ]
});



	
   // map.addControl(select);
	
   // select.activate();
    vectorlayer.events.on({"featureselected": showInformation,
						"loadend": function (evt) {
						    var deeds_extent = vectorlayer.getDataExtent();
						    console.log("deeds_ext");
						    //map.zoomToExtent(deeds_extent);
						}
	});
    
		//map.addControl(fpControl);
    
    map.addLayer(vectorlayer);
	
	// ######### podklady mapowe
	map.addLayer(new OpenLayers.Layer.OSM("Mapnik"));
	 map.addLayer(new OpenLayers.Layer.OSM("MapQuest Open",                                                   
                                           ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                                            "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                                            "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png",
                                            "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> and contributors, under an <a href='http://www.openstreetmap.org/copyright' title='ODbL'>open license</a>. Tiles Courtesy of <a href='http://www.mapquest.com/'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>" }));
       
                                            
                                            
       map.addLayer(new OpenLayers.Layer.OSM("Humanitarian Style",                                                   
                                           ["http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png",
                                            "http://b.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png",
                                            "http://c.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> and contributors, under an <a href='http://www.openstreetmap.org/copyright' title='ODbL'>open license</a>. Humanitarian style by <a href='http://hot.openstreetmap.org'>H.O.T.</a>",
                                            "tileOptions": { "crossOriginKeyword": null }}));
       
       
       map.addLayer(new OpenLayers.Layer.OSM("Stamen watercolour",                                                   
                                           ["http://tile.stamen.com/watercolor/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> and contributors, under an <a href='http://www.openstreetmap.org/copyright' title='ODbL'>open license</a>. Watercolour style by <a href='http://stamen.com'>Stamen Design</a>",
                                            "tileOptions": { "crossOriginKeyword": null }}));
      
       map.addLayer(new OpenLayers.Layer.OSM("Stamen toner",                                                   
                                           ["http://tile.stamen.com/toner/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> and contributors, under an <a href='http://www.openstreetmap.org/copyright' title='ODbL'>open license</a>. Toner style by <a href='http://stamen.com'>Stamen Design</a>",
                                            "tileOptions": { "crossOriginKeyword": null }}));
                                            
                                            
       map.addLayer(new OpenLayers.Layer.OSM("CartoDB positron",                                                   
                                           ["http://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
                                            "http://b.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
                                            "http://c.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
                                            "http://d.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>" }));
       map.addLayer(new OpenLayers.Layer.OSM("CartoDB dark matter",                                                   
                                           ["http://a.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png",
                                            "http://b.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png",
                                            "http://c.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png",
                                            "http://d.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>" }));
       map.addLayer(new OpenLayers.Layer.OSM("CartoDB positron (no labels)",                                                   
                                           ["http://a.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png",
                                            "http://b.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png",
                                            "http://c.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png",
                                            "http://d.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>" }));

       map.addLayer(new OpenLayers.Layer.OSM("CartoDB dark matter (no labels)",
                                           ["http://a.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}.png",
                                            "http://b.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}.png",
                                            "http://c.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}.png",
                                            "http://d.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>" }));

       map.addLayer(new OpenLayers.Layer.OSM("Wikimedia",
                                           ["https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> and contributors, under an <a href='http://www.openstreetmap.org/copyright' title='ODbL'>open license</a>. <a href='https://www.mediawiki.org/wiki/Maps'>Wikimedia's new style (beta)</a>",
                                            "tileOptions": { "crossOriginKeyword": null }}));
        //######### koniec map
    
    map.zoomToMaxExtent();
	
	//var click = new OpenLayers.Control.Click();
	//map.addControl(click);
	
map.addControls([new OpenLayers.Control.LayerSwitcher(),
		new OpenLayers.Control.ScaleLine(),
		new OpenLayers.Control.Permalink('permalink'),
		new OpenLayers.Control.MousePosition(),
		new OpenLayers.Control.Click({id : 'clickControl'})]
);
    map.getControlsBy("id", "clickControl")[0].activate();
   //addFeaturesToVector(vectorlayer, json);
    updateGeneralInformation();

    // the behaviour and methods for clustering strategies
    var changeStrategy = function() {
        var strategies = new OpenLayers.Strategy.Cluster({
        		distance : 30
        	});
	
        // this is the checkbox
        
        // remove layer and control
			
        map.removeLayer(vectorlayer);
        map.removeControl(select);
        // rebuild layer
        vectorlayer = new OpenLayers.Layer.Vector('Vectorlayer', {styleMap: stylemap, strategies: strategies, renderers: ['Canvas']});
        map.addLayer( vectorlayer );
        vectorlayer.addFeatures(features);
		
		
				map.events.register("zoomend", map, function () {
					var zoom = map.getZoom();/*
					for (var i = 0; i < vectorlayer.features.length; i++) {
						for (var j = 0; j < vectorlayer.features[i].cluster.length; j++) {
						//console.log(vectorlayer.features.length);
						//console.log(vectorlayer.features[i].cluster.length);
							if (zoom < 12 && vectorlayer.features[i].cluster[j].attributes.clazz == 4)
								vectorlayer.features[i].style = {
									display : 'hidden'
								}
							}
					}*/
					
					vectorlayer.redraw();
					console.log("Zoom mapy: " + zoom);

				});
				
				
				//appendList(json);
        // rebuild select control
		/*
        select = new OpenLayers.Control.SelectFeature(
            vectorlayer, {hover: true}
        );
        map.addControl(select);

        select.activate();
        vectorlayer.events.on({"featureselected": showInformation});
        // update meta information
        updateGeneralInformation();
		*/
				
    };
    // bind the behviour to the radios
    var inputs = document.getElementsByTagName('input');
    for( var cnt = 0; cnt < inputs.length; cnt++) {
      var input = inputs[cnt];
      if (input.name === 'strategy') {
         input.onclick = changeStrategy;
      }
    }
};
(main());



// universal jQ ajax request
function makeRequest(type, url, data, func, isAsync, contentType) {
	$.ajax({
		url : url,
		type : type,
		async : (isAsync) ? isAsync : true,
		data : data,
		contentType : contentType,
		success : function (responseData) {
			func(responseData);
		}
	});
}
			

function alertContents(responseText) {
	
			var jsonObj = JSON.parse(responseText);
			//alert(jsonObj);
			json = jsonObj;
			//console.log(jsonObj);
			//console.log(json);
			//main();
			addFeaturesToVector(vectorlayer, json);
		
	}


  
// dołączenie warstwy z markerami do mapy
function appendMarkersLayer(layer) {



}

// funkcja sprawdzajaca, czy wszystkie pola formularza zostaly wypelnione
function validateAddPointForm() {
	var name = document.forms['addPointForm']['name'].value;
	var addr = document.forms['addPointForm']['addr'].value;
	var descr = document.forms['addPointForm']['descr'].value;
	var lon = document.forms['addPointForm']['lon'].value;
	var lat = document.forms['addPointForm']['lat'].value;
	var zoom = document.forms['addPointForm']['zoom'].value;
	var cat = document.forms['addPointForm']['cat'].value;

	if (name === '' || lon === '' || lat === '' || descr === '' || zoom === '' || cat === '' ) {
		addFormMsg.innerHTML = "Wypełnij wszystkie pola";
		return false;
	} else {
		var data = 'lon=' + lon + '&lat=' + lat + '&name=' + name + '&addr=' + addr + '&descr=' + descr + '&zoom=' + zoom + '&cat=' + cat + '&userID=1';// + userID;
		makeRequest('POST', 'addPoint.php', data, afterAdd);
		return false;
	}
}

function afterAdd() {
	if (httpRequest.readyState === 4) {
		if (httpRequest.status === 200) {
			//alert(httpRequest.responseText);
			var jsonObj = JSON.parse(httpRequest.responseText);
			//alert(jsonObj);
			json = [jsonObj];
			//console.log(jsonObj);
			console.log(json);
			addFormMsg.innerHTML = "";
			document.forms["addPointForm"].reset();
			if (map.popups[0]) {
				map.removePopup(map.popups[0]);
			}
			addFeaturesToVector(vectorlayer, json);
		} else {
			alert('There was a problem with the request.');
		}
	}
}

function validateSearchPointForm() {
	
	var selectList = document.getElementById('searchPointForm').getElementsByTagName('select');
	var country = selectList[0].options[selectList[0].selectedIndex].value;
	var tag = document.forms['searchPointForm']['tag'].value;
	var cat = selectList[1].options[selectList[1].selectedIndex].value;
	
	if ( country == '-1' && cat == '-1' && tag.length > 0 && tag.length < 3 ) {
		return false;
	} else if ( tag.length > 0 && tag.length < 3 ) {
		return false;
	} else {
		
		var data = 'kraj=' + country + '&kategoria=' + cat + '&slowo=' + tag;
		makeRequest('POST', 'site/points-search', data, alertContents);
	}

	/*if (comment === '') {
		addFormMsg.innerHTML = "Komentarz nie może być pusty";
		return false;
	} else {
		addFormMsg.innerHTML = "Dodawanie...";

		var data = 'lon=' + lon + '&lat=' + lat + '&name=' + name + '&addr=' + addr + '&desc=' + desc + '&zoom=' + zoom + '&cat=' + cat;
		makeRequest('POST', 'addPoint.php', data, afterAdd);
	}*/
	return false;
}

function addFeaturesToVector(layer, json) {
	layer.destroyFeatures();

	var features = [];
	var bounds = new OpenLayers.Bounds();
	// transformacja wspolrzednych
	var epsg4326 = new OpenLayers.Projection('EPSG:4326'); // Transform from WGS 1984
	var epsg900913 = new OpenLayers.Projection('EPSG:900913'); // to Spherical Mercator Projection

	// adding lots of features:
	for (var i = 0; i < json.length; i++) {
		var brand = json[i].title;
		var clazz;
		console.log(i)
		
		//var rand = Math.floor(Math.random() * (14 - 7) + 7);
		//var p = new OpenLayers.Geometry.Point(json[i].lat, json[i].lon).transform(epsg4326, epsg900913);
		var p = new OpenLayers.Geometry.Point(json[i].lon, json[i].lat).transform(epsg4326, epsg900913);
		var f = new OpenLayers.Feature.Vector(p, {
				clazz : parseInt(json[i].cat),
				zoom : parseInt(json[i].zoom),
				label : i + 1,
				address : json[i].address,
				description : json[i].descr,
				name : json[i].name,
				id : parseInt(json[i].ID),
				lon : json[i].lon,
				lat : json[i].lat,
				//forumID : json[i].forumID
			});
		bounds.extend(f.geometry.getBounds());
		features.push(f);
		console.log(f);
		console.log(layer.id);
		
	}
	//appendList(json);
	layer.addFeatures(features);

	//layer.destroyFeatures();
	console.log(bounds);
	appendMarkersLayer(layer);
	layer.refresh({
		force : true
	});
	if ( features.length == 0 )	 {
		map.zoomToMaxExtent();
	} else {
		var dr = bounds.right;
		var dl = bounds.left;
		var dt = bounds.top;
		var db = bounds.bottom;
		var dx = dr-dl;
		var dy = dt-db;
		var cx = dl + dx/2;
		var cy = db + dy/2;
		
		var lonlat = new OpenLayers.LonLat(cx,cy);
		map.zoomToExtent(bounds);
		var zoom = map.getZoom();
		map.moveTo(lonlat, zoom-1);
		map.moveByPx(-200,0);
	}
	
}

function centerView() {

	var layer = map.layers[0];
	layer.events.on({"loadend": function() {
		var dataBounds = layer.getDataExtent();
		var lonlatCenter = dataBounds.getCenterLonLat();
		var zoom = map.getZoom();
		map.moveTo(lonlatCenter, zoom-1);
	}});
	
	
}

function controlFeatureClick(e) {
	console.log(e);	
}

function getCoordinates() {
	var control = map.getControlsBy("id", "clickControl")[0];
	console.log(control);
   
   getCordsFlag = true;
   
   if (!control.active) {
		console.log('contolol not activ');
		control.activate();
    }
    
	vectorlayer.setVisibility(false);
	
	var mapDiv = document.getElementById('map');
	mapDiv.style.cursor = 'crosshair';
	return false;
}
	
function loadPointInfo(e) {
	console.log("Wywołanie funkcji wczytującej dane do infoboxa");

	var data = e.feature.cluster[0].attributes;
	var dataString = 'id=' + data.id;
	document.getElementById('navTabs').getElementsByTagName('li')[0].classList.remove('disabled');
	
	var infoBoxLabel = document.getElementById('infoDescrBox').getElementsByClassName('panel-section-infobox-item-label')[0];
	var infoCords = document.getElementById('infoCords');
	var infoDescr = document.getElementById('infoDescr');
	
	infoBoxLabel.innerHTML = '<span class="glyphicon glyphicon-chevron-right"></span> ' + data.name;
	infoCords.innerHTML = data.lat.match(/^[-]?\d{1,3}\.\d{1,6}/) + ( data.lat > 0 ? ' N ' : ' S ' ) + ' ' + data.lon.match(/^[-]?\d{1,3}\.\d{1,6}/) + ( data.lon > 0 ? ' E ' : ' W ' );;
	infoDescr.innerHTML = data.description;
	
	makeRequest('POST', 'site/get-comments', dataString, afterGetComments);
	makeRequest('POST', 'site/get-pictures', dataString, afterGetPics);
	
	activePointId = data.id;
	document.getElementsByClassName('panel-content-holder')[0].scrollTop = 0;
	var hiddenInputPoint = document.querySelector('#addPictureForm > [name=id]');
	if ( hiddenInputPoint ) {
		document.querySelector('#addPictureForm > [name=id]').value = data.id;
	}
	console.log(activePointId);
	
	$('#navTabs a[href="#infoBox"]').tab('show');
	if ( document.forms["addPointForm"] ) {
		document.forms["addPointForm"].reset();
	};
	if ( document.forms["addPictureForm"] ) {
		document.forms["addPictureForm"].reset();
	};
	if ( document.forms["addCommentForm"] ) {
	document.forms["addCommentForm"].reset();
	};
}

function afterGetComments(responseText) {
	activePointCommArr = JSON.parse(responseText);
	if ( activePointCommArr.length == 0 ) {
		var parent = document.getElementById('commentsList');
		
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
		
		var commentListItem = document.createElement('li');
		commentListItem.innerHTML = "Brak komentarzy."
		parent.appendChild(commentListItem);
		
		var pagControls = document.getElementById('commPaginationContainer');
		pagControls.style.display = 'none';
		
	} else {
		generateCommList();
	}
}

function generateCommList(page) {
	
	var parent = document.getElementById('commentsList');
	var docFrag = document.createDocumentFragment();
	var pagControls = document.getElementById('commPaginationContainer');
	
	if (!page) {
		while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
		}
		var page = 1;
	} else if (page < 1) {
		var page = 1;
	}
	
	var submitBtn = document.getElementById('addCommentSubmitBtn');
	if (submitBtn) {
		submitBtn.style.display = 'none';
	}
	
	var perpage = 2;
	var commObjArr = renderPagination(page, perpage, activePointCommArr);
	if (commObjArr === false) {
		if (arguments.length === 0) {
			pagControls.style.display = 'none';
		}
		return false;
	}
	
	if (pagControls.style.display === 'none') {
		pagControls.style.display = 'block';
	}
	
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	
	var len = commObjArr.length;
	for ( var i = 0; i < len; i++ ) {
		var commentListItem = document.createElement('li');
		if (i%2) {
			commentListItem.className = 'panel-section-infobox-comments-list-item bubble bubble-right';
		} else {
			commentListItem.className = 'panel-section-infobox-comments-list-item bubble bubble-left';
		}
		docFrag.appendChild(commentListItem);
		
		var commentListItemText = document.createElement('p');
		commentListItemText.innerHTML = commObjArr[i].comment;
		commentListItem.appendChild(commentListItemText);
		
		var commentListItemAuthor =  document.createElement('span');
		commentListItemAuthor.className = 'panel-section-infobox-comments-list-item-author';
		commentListItemAuthor.innerHTML = commObjArr[i].username;
		commentListItem.appendChild(commentListItemAuthor);
		
		var commentListItemDate =  document.createElement('span');
		commentListItemDate.className = 'panel-section-infobox-comments-list-item-date text-right';
		commentListItemDate.innerHTML = commObjArr[i].date;
		commentListItem.appendChild(commentListItemDate);		
	}
	parent.appendChild(docFrag);
	lastRetrComm = page;
}

function validateAddCommentForm(e) {
	
	var comment = document.forms['addCommentForm']['comment'].value;
	console.log('validateAddCommentForm');

	if (comment === '') {
		//addFormMsg.innerHTML = "Komentarz nie może być pusty";
		
	} else {
		//addFormMsg.innerHTML = "Dodawanie...";

		var data = 'komentarz=' + comment + '&id=' + activePointId;
	makeRequest('POST', 'site/add-comment', data, afterAddComment);
	}
	
	return false;
}

function afterAddComment(responseText) {
	activePointCommArr.unshift(JSON.parse(responseText)[0]);
	
	var oldComment = document.forms['addCommentForm'];
	oldComment.reset();
	generateCommList();
}

function afterGetPics(responseText) {
	
	activePointPicsArr = JSON.parse(responseText);
	
	if ( activePointPicsArr.length == 0 ) {
		var parent = document.getElementById('picsList');
		
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
		
		var picsListItem = document.createElement('li');
		picsListItem.innerHTML = "Brak zdjęć."
		parent.appendChild(picsListItem);
		
		var pagControls = document.getElementById('picsPaginationContainer');
		pagControls.style.display = 'none';
	} else {
		generatePicsList();
	}
} 

function generatePicsList(page) {
	
	var parent = document.getElementById('picsList');
	var docFrag = document.createDocumentFragment();
	var pagControls = document.getElementById('picsPaginationContainer');
	
	if (!page) {
		while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
		}
		var page = 1;
	} else if (page < 1) {
		var page = 1;
	}
		
	
	var perpage = 3;
	var picsObjArr = renderPagination(page, perpage, activePointPicsArr);
	if (picsObjArr === false) {
		if (arguments.length === 0) {
			pagControls.style.display = 'none';
		}
		return false;
	}
	if (pagControls.style.display === 'none') {
		pagControls.style.display = 'block';
	}
	
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
	
	var len = picsObjArr.length;
	for ( var i = 0; i < len; i++ ){
		var picsListItem = document.createElement('li');
		picsListItem.className = 'panel-section-infobox-pictures-list-item';
		
		var link = document.createElement('a');
		link.href = 'uploads/' + picsObjArr[i].filename;
		link.title = picsObjArr[i].username + ' ' + picsObjArr[i].comment;
		link.dataset.lightbox = "set";
		
		
		var thumb = document.createElement('img');
		thumb.className = 'img-resposive img-thumbnail';
		thumb.src = 'uploads/thumbs/' + picsObjArr[i].filename;
		thumb.style.width = 100 + 'px';
		thumb.style.height = 100 + 'px';
		thumb.alt = 'Miniaturka zdjęcia';
		
		link.appendChild(thumb);
		
		picsListItem.appendChild(link);
		docFrag.appendChild(picsListItem);
	}
	parent.appendChild(docFrag);
	lastRetrPic = page;
}

function validateAddPicsForm() {
	var comment = document.forms['addCommentForm']['comment'].value;
	

	/*if (comment === '') {
		addFormMsg.innerHTML = "Komentarz nie może być pusty";
		return false;
	} else {
		addFormMsg.innerHTML = "Dodawanie...";

		var data = 'lon=' + lon + '&lat=' + lat + '&name=' + name + '&addr=' + addr + '&desc=' + desc + '&zoom=' + zoom + '&cat=' + cat;
		makeRequest('POST', 'addPoint.php', data, afterAdd);
	}*/
	var data = 'komentarz=' + comment + '&id=' + activePointId;
	makeRequest('POST', 'site/add-comment', data, afterAddComment);
	//return false;
}

function renderPagination(page, perpage, array) {
	var len = array.length;
	if ( len === 0 || page <= 0 || perpage <= 0) {
		return false;
	}

	var pagesNum = Math.ceil(len / perpage);
	var pageIndex = page-1;
	if ( page <= pagesNum ) {
		var start = pageIndex*perpage;
		var end = page*perpage < len ? page*perpage : len;
		return array.slice(start, end);
	} else {
		return false;
	}
}

function showCustomMenu(e) {
	var menu = document.getElementById('custom-menu-container');
		menu.style.display = 'block';
		menu.style.top = e.pageY + 4 + "px";
		menu.style.left= e.pageX + 4 + "px";
	
}

function hideCustomMenu(e) {
	var menu = document.getElementById('custom-menu-container');
		menu.style.display = 'none';
}

function checkCustomMenuVisibility() {
	var menu = document.getElementById('custom-menu-container');
	if (menu.style.display === 'block') {
		return true;
	} else {
		return false;
	}
}
function savePointCords(e) {
	var menuOption = document.getElementById('secondCustomMenuOption');
	if ( menuOption ) {
		var lonlat = (map.getLonLatFromPixel(e.xy)).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
		var lon = lonlat.lon;
		var lat = lonlat.lat;
		menuOption.dataset.lon = lon;
		menuOption.dataset.lat = lat;
	}
}

(function fixSearchPointForm() {
	var selectList = document.getElementById('searchPointForm').getElementsByTagName('select');
	var option1 = document.createElement('option');
	option1.value = '-1';
	option1.innerHTML = '-- opcjonalnie --';
	option1.setAttribute('selected', 'selected');
	option1.setAttribute('name', 'none');
	var option2 = option1.cloneNode(true);
	selectList[0].insertBefore(option1, selectList[0].options[0]);
	selectList[1].insertBefore(option2, selectList[1].options[0]);
})();
