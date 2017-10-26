define([
    "dojo/_base/declare",
    "dojo/topic",
    "epi/shell/TypeDescriptorManager",
    "epi/shell/widget/dialog/Dialog",
    "epi/shell/command/_Command"
], function (
    declare,
    topic,
    TypeDescriptorManager,
    Dialog,
    _Command
) {
    return declare([_Command], {
        label: 'Show URL',
        iconClass: 'epi-iconInfo',
        canExecute: false,
        _execute: function () {
            var contentData = this._getContentData();
            if (!contentData) {
                return;
            }

            var publicUrl = contentData.publicUrl;
            var absoluteUrl = window.location.protocol + "//" + window.location.host + publicUrl;

            var dialog = new Dialog({
                title: 'File URL',
                description: absoluteUrl,
                dialogClass: 'epi-dialog-upload',
                defaultActionsVisible: false,
                closeIconVisible: false,
                destroyOnHide: true
            });

            var self = this;
            dialog.definitionConsumer.add({
                name: 'copy',
                label: 'Copy to clipboard',
                action: function () {
                    self._copyTextToClipboard(absoluteUrl);
                    dialog.hide();
                }
            });

            dialog.definitionConsumer.add({
                name: 'close',
                label: 'Close',
                action: function () {
                    dialog.hide();
                }
            });

            dialog.show();
        },
        _copyTextToClipboard: function (text) {
            var textArea = document.createElement('textarea');

            textArea.style.position = "fixed";
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = 0;
            textArea.style.height = 0;
            textArea.style.background = "transparent";

            textArea.value = text;

            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                console && console.log("Unable to run document.execCommand('copy').");
            }

            document.body.removeChild(textArea);
        },
        _getContentData: function () {
            var selectedFile = null;
            if (this.model && this.model instanceof Array && this.model.length === 1) {
                selectedFile = this.model[0];
            }

            return selectedFile;
        },
        _onModelChange: function () {
            var contentData = this._getContentData();

            var typeIdentifier = contentData && contentData.typeIdentifier;
            var isMediaData = typeIdentifier && TypeDescriptorManager.isBaseTypeIdentifier(typeIdentifier, 'episerver.core.mediadata');
            var publicUrl = contentData && contentData.publicUrl;

            var canExecute = isMediaData && publicUrl;

            this.set('canExecute', canExecute);
            this.set('isAvailable', canExecute);
        }
    });
});