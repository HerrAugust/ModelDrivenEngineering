/**
 * Created by agost on 14/07/2017.
 */
//Rectangle shape
joint.shapes.html.rectangle = {};
joint.shapes.html.rectangle.Rectangle = joint.shapes.html.roundedrectangle.RoundedRectangle.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        size: { width: 100, height: 100 },
        attrs: {
            rect: { rx: 0, ry: 0 }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});