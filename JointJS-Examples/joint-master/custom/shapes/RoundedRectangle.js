/**
 * Created by agost on 14/07/2017.
 */

// This is the shape for boxes:
// Create a custom element. See http://resources.jointjs.com/tutorial/html-elements
joint.shapes.html = {};
joint.shapes.html.roundedrectangle = {};
joint.shapes.html.roundedrectangle.RoundedRectangle = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        size: { width: 130, height: 100 },
        attrs: {
            rect: { rx: 5, ry: 5, stroke: '#000', 'fill-opacity': 1 }, text: { 'fill-opacity': 0.0 }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});
// Create a custom view for that element that displays an HTML div above it.
joint.shapes.html.ElementView = joint.dia.ElementView.extend({
    template: [
        '<div class="html-element">',
            '<label></label>',
            '<input type="text" value="" placeholder="Entity name"/>',
            '<div class="move"></div>',
            '<div class="delete">x</div>',
            '<br/>',
            '<hr/>',
            '<textarea rows="1" name="attributes" value="" placeholder="no attributes and functions"></textarea>',
        '</div>'
    ].join(''),

    initialize: function() {
        var model = null;
        _.bindAll(this, 'updateBox');
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.$box = $(_.template(this.template)());

        // Prevent paper from handling pointerdown.
        this.$box.find('input, textarea').on('mousedown click', function(evt) {
            evt.stopPropagation();
        });

        this.model.attr('text/text', textareaid.toString())

        // Set ID to textarea and input so that programmers can work with them
        if(eenums[this.model.get('id')] != undefined) {
            var txtarea = this.$box.find('textarea').attr('id', "txtarea_" + textareaid);
            var eliterals = eenums[this.model.get('id')].join();
            txtarea.val(eliterals);
            var input = this.$box.find('input').attr('id', "input_" + textareaid);
            input.val(this.model.get('id'));
            this.$box.find('input').parent().children().first().text("<<EEnum>>");
        }
        else {
            var txtarea = this.$box.find('textarea').attr('id', "txtarea_" + textareaid);
            txtarea.val(getAttrs_Functs(entities[textareaid]));
            var input = this.$box.find('input').attr('id', "input_" + textareaid);
            input.val(entities[textareaid]);
        }
        textareaid++;

        // On click, show resize button on the bottom-right corner of the clicked box
        paper.on('cell:pointerclick', function(cellView, evt, x, y) {
            evt.preventDefault();
            $('.move').each(function(index) {
                $(this).css('visibility', 'hidden');
            });
            cellView.$box.find('.move').css('visibility', 'visible');
            $('.delete').each(function(index) {
                $(this).css('visibility', 'hidden');
            });
            cellView.$box.find('.delete').css('visibility', 'visible');
        });

        // Handling "x" click
        this.$box.find('.delete').on('mousedown', _.bind(function(evt) {
            if(confirm('Delete '+this.$box.find('input').val() + '?')) {
                this.removeBox(evt);
            }
        }, this));

        // BEGIN Handling dragging for box resizing
        this.$box.find('.move').on('mousedown', _.bind(function(evt) {
            //get this element's rect
            var bbox = this.model.getBBox();
            startWidth = bbox.width;
            startHeight = bbox.height;
            startX = bbox.x + parseFloat($('#paper').css('margin-left'),10) + startWidth;
            startY = bbox.y + parseFloat($('#paper').css('margin-top'),10) + startHeight;
            document.documentElement.addEventListener('mousemove', doDrag, false);
            document.documentElement.addEventListener('mouseup', stopDrag, false);

            model = this.model;
        }, this));

        function doDrag(e) {
            var newwidth =  startWidth + e.clientX - startX;
            var newheight = startHeight + e.clientY - startY;
            /*console.log('sw '+startWidth)
             console.log('x: '+e.clientX)
             console.log('startx: ' +startX)
             console.log('newwidth: ' +newwidth)*/
            model.resize(newwidth, newheight);
        }

        function stopDrag(e) {
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);
        }
        // END Handling dragging for box resizing

        // Update the box position whenever the underlying model changes.
        this.model.on('change', this.updateBox, this);
        // Remove the box when the model gets removed from the graph.
        this.model.on('remove', this.removeBox, this);

        this.updateBox();
    },
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.paper.$el.prepend(this.$box);
        this.updateBox();
        return this;
    },
    updateBox: function() {
        // Set the position and dimension of the box so that it covers the JointJS element.
        var bbox = this.model.getBBox();
        // Example of updating the HTML with a data stored in the cell model.
        //this.$box.find('label').text(this.model.get('label'));
        //this.$box.find('span').text(this.model.get('select'));
        this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
        });
    },
    removeBox: function(evt) {
        graph.removeLinks(this.model);

        this.$box.remove();
        this.remove();
    }
});