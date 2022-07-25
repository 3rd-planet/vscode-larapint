const vscode = require("vscode")
const cp = require("child_process")
const {
    checkBinaryExist,
    infoMessage,
    projectDirectory,
    errorMessage,
    currentEditor,
    copyPintJson
} = require("./methods")
const { PINT_BINARY } = require("./constants")


/**
 * Format the current file with Laravel Pint.       
 * @param {boolean} [showNotification=true] - whether or not to show a notification when formatting.       
 * @returns None       
 */
exports.formatCurrentFile = async (showNotification = true) => {
    if (!checkBinaryExist()) {
        return await vscode.window
            .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
            .then((answer) => {
                infoMessage("Initiating installation...")
                if (answer === "Yes") {
                    cp.exec(
                        "composer require laravel/pint",
                        {
                            cwd: projectDirectory()
                        },
                        // eslint-disable-next-line no-unused-vars
                        (err, stdout, stderr) => {
                            if (err) {
                                return errorMessage("Something went wrong while running Laravel Pint.")
                            } else {
                                return infoMessage("Initiating complete...")
                            }
                        }
                    )
                }
            })
    }

    cp.exec(
        PINT_BINARY + " " + currentEditor(),
        {
            cwd: projectDirectory()
        },
        // eslint-disable-next-line no-unused-vars
        (err, stdout, stderr) => {
            if (err) {
                return errorMessage("Something went wrong while running Laravel Pint.")
            } else {
                if (showNotification) {
                    return infoMessage("Formatting your current file with Laravel Pint.")
                }
            }
        }
    )
}

/**
 * Runs the Laravel Pint command to format the project.
 * @returns None
 */
exports.formatProject = async () => {
    if (!checkBinaryExist()) {
        return await vscode.window
            .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
            .then((answer) => {
                infoMessage("Initiating installation...")
                if (answer === "Yes") {
                    cp.exec(
                        "composer require laravel/pint",
                        {
                            cwd: projectDirectory()
                        },
                        // eslint-disable-next-line no-unused-vars
                        (err, stdout, stderr) => {
                            if (err) {
                                return errorMessage("Something went wrong while running Laravel Pint.")
                            } else {
                                return infoMessage("Initiating complete...")
                            }
                        }
                    )
                }
            })
    }

    cp.exec(
        PINT_BINARY,
        {
            cwd: projectDirectory()
        },
        // eslint-disable-next-line no-unused-vars
        (err, stdout, stderr) => {
            if (err) {
                return errorMessage("Something went wrong while running Laravel Pint.")
            } else {
                return infoMessage("Formatting your project with Laravel Pint.")
            }
        }
    )
}

exports.copyPintJsonToRoot = async () => {
    if (!checkBinaryExist()) {
        return await vscode.window
            .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
            .then((answer) => {
                infoMessage("Initiating installation...")
                if (answer === "Yes") {
                    cp.exec(
                        "composer require laravel/pint",
                        {
                            cwd: projectDirectory()
                        },
                        // eslint-disable-next-line no-unused-vars
                        (err, stdout, stderr) => {
                            if (err) {
                                return errorMessage("Something went wrong while running Laravel Pint.")
                            } else {
                                return infoMessage("Initiating complete...")
                            }
                        }
                    )
                }
            })
    }

    copyPintJson()
    return infoMessage("pint.json copied to your project.")
}
