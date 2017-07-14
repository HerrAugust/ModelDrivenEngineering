/**
 * Created by agost on 14/07/2017.
 */

//Ellipse shape
joint.shapes.html.ellipse = {};
joint.shapes.html.ellipse.Ellipse = joint.shapes.html.rectangle.Rectangle.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        size: { width: 200, height: 100 },
        attrs: {
            rect: { rx: 50, ry: 50 }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});