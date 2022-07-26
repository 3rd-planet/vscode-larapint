const {
    checkBinaryExist,
    infoMessage,
    projectDirectory,
    currentEditor,
    copyPintJson,
    installPint,
    runCommand
} = require("./methods")
const { PINT_BINARY } = require("./constants")

/**
 * Format the current file with Laravel Pint.
 * @param {boolean} [showNotification=true] - whether or not to show a notification when formatting.
 * @returns None
 */
exports.formatCurrentFile = async (showNotification = true) => {
    if (!checkBinaryExist()) {
        return installPint()
    }

    await runCommand(
        PINT_BINARY + " " + currentEditor(),
        projectDirectory(),
        "Formatting your current file with Laravel Pint.",
        showNotification
    )
}

/**
 * Runs the Laravel Pint command to format the project.
 * @returns None
 */
exports.formatProject = async () => {
    if (!checkBinaryExist()) {
        return installPint()
    }

    await runCommand(PINT_BINARY, projectDirectory(), "Formatting your project with Laravel Pint.")
}

/**
 * Copies the pint.json file to the root of your project.
 * @returns None
 */
exports.copyPintJsonToRoot = async () => {
    if (!checkBinaryExist()) {
        return installPint()
    }

    copyPintJson()
    return infoMessage("pint.json copied to your project.")
}
