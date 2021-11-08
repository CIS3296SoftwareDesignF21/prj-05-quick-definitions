function getSelectedText() {
    var selectedText = '';
    if (window.getSelection) {
        selectedText = window.getSelection();
    } else if (document.getSelection) {
        selectedText = document.getSelection();
    } else if (document.selection) {
        selectedText =
            document.selection.createRange().text;
    } else return;
    document.testform.selectedtext.value = selectedText;
}