/**
 * Created by agost on 14/07/2017.
 */

//Circle shape
joint.shapes.html.circle = {};
joint.shapes.html.circle.Circle = joint.shapes.html.ellipse.Ellipse.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        size: { width: 100, height: 100 },
        attrs: {
            rect: { rx: 50, ry: 50 }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});