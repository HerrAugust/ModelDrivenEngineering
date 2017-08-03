# JointJS Example - JavaScript diagramming library
This example of JointJS shows:
	1. How to insert multiple arrows (see the ones between Page and Link)
	2. How to dynamically insert entities
	3. How to use Dagre to create autotimatically layouts for entities and links
	4. How to dynamically decide attributes for links and entities

![demo JointJS](demo.JPG)

## Trick
Unfortunately, JointJS works with SVGs and their content (the content within them in this project) is done by HTML5. I do not think that there is an easy way to access from joint.dia.Element to its HTML template. The trick is the following one:
1. Obtain its id, which is hidden in the SVG’s text in this way var id = elem.attr(‘text/text’);
2. Obtain the desired element's HTML in this way $(‘#input_’+id).val() or $(‘#textarea_’+id).val(), for example

# Thanks
It is based on opensource material:
* the official one (Joint JS tutorial) http://resources.jointjs.com/tutorial
* https://github.com/srikusri/JointJS-Example

# How to launch
Simply download the repository and launch index.html (or one the other ones) with your browser.

# Author
HerrAugust - https://github.com/HerrAugust
