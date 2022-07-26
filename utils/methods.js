const vscode = require("vscode")
const { PINT_BINARY } = require("./constants")
const fs = require("fs")
const path = require("path")
const cp = require("child_process")

/**
 * Returns the path to the project directory.
 * @returns {string} The path to the project directory.
 */
exports.projectDirectory = () => {
    return vscode.workspace.workspaceFolders[0].uri.path
}

/**
 * Returns the current editor's file name.
 * @returns {string} The current editor's file name.
 */
exports.currentEditor = () => {
    return vscode.window.activeTextEditor.document.fileName
}

/**
 * Checks if the pint binary is installed on the system.
 * @returns {boolean} - true if the binary is installed, false otherwise.
 */
exports.checkBinaryExist = () => {
    return fs.existsSync(path.join(this.projectDirectory(), PINT_BINARY)) ? true : false
}

/**
 * Copies the pint.json file to the project directory.
 * @returns None
 */
exports.copyPintJson = () => {
    const pintJson = path.join(this.projectDirectory(), "pint.json")
    const pintJsonBackup = path.join(this.projectDirectory(), "pint.json.backup")
    if (fs.existsSync(pintJson)) {
        fs.renameSync(pintJson, pintJsonBackup)
    }
    fs.copyFileSync(path.join(__dirname, "pint.json"), pintJson)
}

/**
 * Installs the Laravel Pint package.
 * @returns <Promise>
 */
exports.installPint = async () => {
    return await vscode.window
        .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
        .then((answer) => {
            if (answer === "Yes") {
                this.infoMessage("Initiating installation...")
                cp.exec(
                    "composer require laravel/pint",
                    {
                        cwd: this.projectDirectory()
                    },
                    // eslint-disable-next-line no-unused-vars
                    (err, stdout, stderr) => {
                        if (err) {
                            return this.errorMessage("Something went wrong while running Laravel Pint.")
                        } else {
                            return this.infoMessage("Installation complete...")
                        }
                    }
                )
            }
        })
}

/**
 * Runs a command in the given directory.
 * @param {string} command - the command to run
 * @param {string} directory - the directory to run the command in
 * @param {string} successMessage - the message to show when the command is successful
 * @param {boolean} [showNotification=true] - whether or not to show a notification when the command is successful
 * @returns None
 */
exports.runCommand = async (command, directory, successMessage, showNotification = true) => {
    cp.exec(
        command,
        {
            cwd: directory
        },
        // eslint-disable-next-line no-unused-vars
        (err, stdout, stderr) => {
            if (err) {
                return this.errorMessage("Something went wrong while running Laravel Pint.")
            } else {
                if (showNotification) {
                    return this.infoMessage(successMessage)
                }
            }
        }
    )
}

/**
 * Displays a message to the user.
 * @param {string} message - the message to display
 * @returns None
 */
exports.infoMessage = (message) => {
    return vscode.window.showInformationMessage(message)
}

/**
 * Displays an error message to the user.
 * @param {string} message - the message to display to the user
 * @returns None
 */
exports.errorMessage = (message) => {
    return vscode.window.showErrorMessage(message)
}
