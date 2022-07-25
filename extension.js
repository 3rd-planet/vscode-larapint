const vscode = require("vscode")
const { formatCurrentFile, formatProject, copyPintJsonToRoot } = require("./utils/commands")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand("laravel-pint-vscode.format", async () => {
            await formatProject()
        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand("laravel-pint-vscode.format-file", async () => {
            await formatCurrentFile()
        })
    )

    context.subscriptions.push(
        vscode.commands.registerCommand("laravel-pint-vscode.publish-config", async () => {
            copyPintJsonToRoot()
        })
    )

    context.subscriptions.push(
        vscode.workspace.onWillSaveTextDocument(async (event) => {
            if (event.document.fileName.endsWith(".php")) {
                let allConfig = JSON.parse(JSON.stringify(await vscode.workspace.getConfiguration()))
                try {
                    if (allConfig.editor.laravel.pint.enabled) {
                        await formatCurrentFile(false)
                    }
                } catch (e) {
                    // console.log(e)
                }
            }
        })
    )
}

// this method is called when your extension is deactivated
function deactivate() {
    //
}

module.exports = {
    activate,
    deactivate
}
