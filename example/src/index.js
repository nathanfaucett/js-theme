var Theme = require("../..");


var MaterialUIThemePrototype;


function MaterialUITheme() {
    Theme.call(this);
}
Theme.extend(MaterialUITheme, "MaterialUITheme");
MaterialUIThemePrototype = MaterialUITheme.prototype;

MaterialUIThemePrototype.getSpacing = function() {
    var spacing = {};

    spacing.desktopSize = 4;

    return spacing;
};

MaterialUIThemePrototype.getPalette = function() {
    var palette = {};

    palette.color0 = "#ff0000";
    palette.color1 = "#00ff00";

    return palette;
};

MaterialUIThemePrototype.getStyles = function(palette, spacing) {
    var style = {};

    style.button = {
        minWidth: (spacing.desktopSize * 16) + "px",
        height: (spacing.desktopSize * 8) + "px"
    };

    return style;
};


console.log(new MaterialUITheme());
