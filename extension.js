var ncp = require('copy-paste');
var vscode = require('vscode');

function activate(context) {
    const disposable = vscode.commands.registerCommand(
        'extension.jbatesonscript.copyPythonImport',
        function() {
            var editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            const selectedText = editor.document.getText(editor.selection);
            const fileName = vscode.workspace.asRelativePath(
                editor.document.fileName
            );
            const dottedPath = fileName.replace('.py', '').replace(/\//gi, '.');

            ncp.copy(`from ${dottedPath} import ${selectedText}`);
        }
    );

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
