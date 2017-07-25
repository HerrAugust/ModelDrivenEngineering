var backup = {};


$('#a_changeUser a').on("click", function(evt) {
    $('#a_changeUser a').each(function() {
        $(this).removeClass("active")
    });
    $(this).addClass("active");

    // the backup of inputs and txtarea is only needed every time to allow you to change their content
	jQuery.each(graph.getElements(), function (label, val) {
		var id = val.attr('text/text');
		backup[id.toString()] = '';
		backup[id.toString()]['input'] = $('#input_' + id).val();
		backup[id.toString()]['textarea'] = $('#txtarea_' + id).val();
	});
    textareaid = 0;
    enum_number = 0;

    if($(this).html() !== 'User') {
        modStyle(labelDict, entityDict, linkDict, shape);
    }
    else { // "User" clicked
        modStyle(labelDict_user, entityDict_user, linkDict_user, shape_user);
    }
});

/**
 * Created by agost on 20/07/2017.
 */

$('#a_openEcore').on("click", function(evt) {
    $('#div_file').css('display', 'block');
});

function modStyle(labelDict, entityDict, linkDict, shape) {
	//Delete the graph and create a new one
	graph.clear();

	var cells = buildGraphFromAdjacencyList(adjacencyList, arrows, attributes, shape);
    graph.resetCells(cells);

    joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false });

    jQuery.each(eenums, function(label, val) {
        graph.addCell(makeEEnum(label, shape));
    });

	//Change label style
	var regex = new RegExp("input_[0-9]+");
	var inputElem = document.getElementsByTagName("input");
	for (var i = 0; i<inputElem.length; i++)
		if (regex.test(inputElem[i].id))
			for (var key in labelDict)
				inputElem[i].style[key] = labelDict[key];
	
	//Change entity style
	regex = new RegExp("v-[0-9]+");
	var rectElem = document.getElementsByTagName("rect");
	for (var i = 0; i<rectElem.length; i++)
		if (regex.test(rectElem[i].attributes.id.value))
			for (var key in entityDict)
				if(rectElem[i].attributes[key] != undefined) {
					rectElem[i].attributes[key].value = entityDict[key];
				}
				else {
					//console.log(key+rectElem[i].attributes.id.value)
				}
				
	//Change link style
	var pathElem = document.getElementsByTagName("path");
	for (var i=0; i<pathElem.length; i++)
		for (var kay in linkDict)
			pathElem[i].style[key] = linkDict[key];

	// Apply backup
	$('div.html-element input').each(function(index) {
		if(backup[index] !== undefined)
		    $(this).value = backup[index]['input'];
	});
    $('div.html-element textarea').each(function(index) {
        if(backup[index] !== undefined)
            $(this).value = backup[index]['textarea'];
    });

}