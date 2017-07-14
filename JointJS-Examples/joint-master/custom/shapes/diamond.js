/**
 * Created by agost on 14/07/2017.
 */
//Diamond shape
joint.shapes.html.diamond = {};
joint.shapes.html.diamond.Diamond = joint.shapes.html.rectangle.Rectangle.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        size: { width: 100, height: 100 },
        attrs: {
            rect: { transform: 'rotate(45)' }
        }
    }, joint.shapes.basic.Rect.prototype.defaults)
});