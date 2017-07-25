//graph.toJSON() e graph.importJSON()!! TODO

/**
 * Created by agost on 19/07/2017.
 */
// Memo: Aside bar is composed by either arrows and boxes

// BEGIN Code to manage the addition of arrows.
// Some code related to this is also in the beginning of "Aside: add new shape (box, link)" (see below)
var aside_arrow_clicked = null; // new link's typology (e.g., association, EReference, etc)
var aside_source = null; // new link's source

// paper.on('cell:pointerclick', aside_linkCreation);
function aside_linkCreation(cellView, evt, x, y) {
    if(aside_arrow_clicked == null || cellView.$box.children()[0].innerHTML == "&lt;&lt;EEnum&gt;&gt;")
        return;

    if(aside_source == null) {
        aside_source = cellView.$box.children()[1].value;
        //cellView.unhighlight();
        cellView.highlight();
    }
    else {
        var childElementLabel = cellView.$box.children()[1].value;

        var attr = null;
        switch(aside_arrow_clicked) {
            case 'ESuperType':
                attr = { '.marker-target': { fill: 'white', d: EXTEND } };
                break;
            case 'Aggregation': // Page is a set of contents
                attr = { '.marker-source': { fill: 'white', d: SETOF } };
                break;
            case 'EReference': // Link relates to Page (Link points to Page)
                attr = { '.marker-target': { d: DIRECTED_ARROW }};
                break;
            case 'Association':
                break;
        }

        //And then create the appropriate link
        var link =  new joint.dia.Link({
            source: { id: aside_source },
            target: { id: childElementLabel },
            attrs: attr,
            // You can choose the one that you want from http://resources.jointjs.com/demos/routing
            router: { name: 'orthogonal' },
            connector: { name: 'normal' },
            smooth: true
        });
        graph.addCell(link);

        aside_arrow_clicked = null;
        aside_source = null;
        $('.figure-container').each(function(e) {
            $(this).removeClass('figure-container-clicked');
        });
        _.each(graph.getElements(), function(element) {
            console.log("here")
            console.log(element)
            element.$el.unhighlight()
        });
    }
};

function aside_cellMouseOver(cellView, evt) {
    if(aside_arrow_clicked != null && cellView.model.isElement()) {
        cellView.highlight();
    }
}
function aside_cellMouseOut(cellView, evt) {
    if(cellView.model.isElement() && cellView.$box.children()[1].value != aside_source) {
        cellView.unhighlight();
    }
}
// END Code to manage the addition of arrows



// Aside: add new shape (box, link)
$('.figure-container').click(function(e) {
    var figcap = $(this).first().find('figcaption').text();
    var newelem = null;
    var alreadySelected = null;
    $('.figure-container').each(function(e) {
        if($(this).hasClass('figure-container-clicked')) {
            alreadySelected = $(this).first().find('figcaption').text();
            $(this).removeClass('figure-container-clicked');
        }
    });
    if(alreadySelected == figcap) {// If the user clicks on an arrow already selected, just unselect it
        aside_arrow_clicked = null;
        aside_source = null;
        return;
    }
    if(figcap == 'Association' || figcap == 'EReference' || figcap == 'Aggregation' || figcap == 'ESuperType') {
        $(this).toggleClass('figure-container-clicked');
        aside_arrow_clicked = figcap;
    }
    else { //Rectangles clicked
        // The user does not want to create a link, thus:
        aside_arrow_clicked = null;
        aside_source = null;


        // Create a new object and position it on a standard position
        switch(figcap) {
            case 'EPackage':
                newelem = new joint.shapes.html.roundedrectangle.RoundedRectangle({
                    id: 'newelem_'+textareaid,
                    attrs: { rect: { fill: '#FAB2E5', stroke: '#000', 'stroke-width': 0.5 } }
                });
                newelem.attr('text/ref-y','0.2');
                break;
            case 'Entity':
                newelem = new joint.shapes.html.roundedrectangle.RoundedRectangle({
                    id: 'newelem_'+textareaid,
                    attrs: { rect: { fill: '#fff', stroke: '#000', 'stroke-width': 0.5 } }
                });
                newelem.attr('text/ref-y','0.2');
                break;
            case 'EDataType':
                newelem = new joint.shapes.html.roundedrectangle.RoundedRectangle({
                    id: 'newelem_'+textareaid,
                    attrs: { rect: { fill: '#fff', stroke: '#000', 'stroke-width': 0.5 } }
                });
                newelem.attr('text/ref-y','0.2');
                break;
            case 'EEnum':
                newelem = new joint.shapes.html.roundedrectangle.RoundedRectangle({
                    id: 'newelem_'+textareaid,
                    attrs: { rect: { fill: '#fff', stroke: '#000', 'stroke-width': 0.5 } }
                });
                newelem.attr('text/ref-y','0.2');
                break;
            case 'Circle':
                newelem = new joint.shapes.html.circle.Circle();
                break;
            case 'Ellipse':
                newelem = new joint.shapes.html.ellipse.Ellipse();
                break;
            case 'Rectangle':
                newelem = new joint.shapes.html.rectangle.Rectangle();
                break;
            /*case 'Diamond':
             newelem = new joint.shapes.html.diamond.Diamond();
             break;*/
        }
        if(newelem != null)
            graph.addCell(newelem);
        // if I have just added an eenum, I must edit its label. This must be done after graph.addCell(newelem); because the div is only inserted after it
        switch(figcap) {
            case 'EEnum':
                $('#input_'+(textareaid-1)).parent().children().first().text("<<Enumeration>>");
                break;
            case 'EDataType':
                $('#input_'+(textareaid-1)).parent().children().first().text("<<Data Type>>");
                $('#input_'+(textareaid-1)).parent().children('textarea').hide();
                break;
            case 'EPackage':
                $('#input_'+(textareaid-1)).parent().children().first().text("<<Package>>");
                $('#input_'+(textareaid-1)).parent().children('textarea').hide();
                break;
        }
    }
});