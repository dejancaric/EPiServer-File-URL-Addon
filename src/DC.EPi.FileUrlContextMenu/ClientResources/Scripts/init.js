define([
        "dojo",
        "epi/dependency",
        "epi-cms/plugin-area/assets-pane",
        "dc-fileurlcontextmenu/ShowFileUrlCommand"
    ],
    function (
        dojo,
        dependency,
        assetsPanePluginArea,
        ShowFileUrlCommand
    ) {
        return dojo.declare([], {
            initialize: function () {
                assetsPanePluginArea.add(ShowFileUrlCommand);
            }
        });
    });