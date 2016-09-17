var Theme = require("../..");


var SomeThemePrototype;


function SomeTheme() {
    Theme.call(this);
}
Theme.extend(SomeTheme, "SomeTheme");
SomeThemePrototype = SomeTheme.prototype;

SomeThemePrototype.getSpacing = function() {
    var spacing = {};

    spacing.desktopSize = 4;

    return spacing;
};

SomeThemePrototype.getPalette = function() {
    var palette = {};

    palette.color0 = "#ff0000";
    palette.color1 = "#00ff00";

    return palette;
};

SomeThemePrototype.getStyles = function(palette, spacing) {
    var style = {};

    style.button = {
        minWidth: (spacing.desktopSize * 16) + "px",
        height: (spacing.desktopSize * 8) + "px"
    };

    return style;
};


console.log(new SomeTheme());
