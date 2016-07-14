var extend = require("@nathanfaucett/extend"),
    inherits = require("@nathanfaucett/inherits");


var ThemePrototype;


module.exports = Theme;


function Theme() {
    this.fontFamily = "Arial, Helvetica, sans-serif";
    this.spacing = this.getSpacing();
    this.palette = this.getPalette();
    this.styles = this.getStyles(this.palette, this.spacing);
}
ThemePrototype = Theme.prototype;

Theme.extend = function extend(child, displayName) {
    inherits(child, this);
    child.prototype.displayName = displayName || "Theme";
    child.extend = extend;
    return child;
};

ThemePrototype.displayName = "Theme";

ThemePrototype.setSpacing = function(newSpacing) {
    extend(this.spacing, newSpacing);
    extend(this.styles, this.getStyles(this.palette, this.spacing));
    return this;
};

ThemePrototype.getSpacing = function() {
    return {};
};

ThemePrototype.setPalette = function(newPalette) {
    extend(this.palette, newPalette);
    extend(this.styles, this.getStyles(this.palette, this.spacing));
    return this;
};

ThemePrototype.getPalette = function() {
    return {};
};

ThemePrototype.setStyle = function(styles) {
    extend(this.styles, styles);
    return this;
};

ThemePrototype.getStyles = function( /* palette, spacing */ ) {
    return {};
};
