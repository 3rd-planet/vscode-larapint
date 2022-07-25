# vscode laravel pint formatter extension

vscode extension for laravel pint. For details follow the official documentation of [laravel/pint](https://github.com/laravel/pint)

Just install and get started.

**NO ADDITION CONFIGURATION REQUIRED**

## Installation

```shell
ext install msamgan.laravel-pint-vscode
```

or you can also install by searching "pint" in vscode extensions and selecting "Laravel Pint Formatter" from "Mohammed Samgan khan"

## Usage

Open command pallet by `Ctrl+Shift+P on Windows (Cmd+Shift+P on Mac OS)` and type `laravel pint` to access all the available commands.

**Format current file** option is also available in right-click menu, moreover you can also use `Ctrl+Shift+L on Windows (Cmd+Shift+L on Mac OS)` for formatting the current file.

## Commands

Below are the all available commands.

### Laravel Pint: Publish default pint.json

This will **create a default pint.json** configuration in the root of your project. Although, the formatter will work fine without it, it gives you more control over the formatting behavior.

### Laravel Pint: Format project

This will **format the entire project** with the set configurations you provided.

### Laravel Pint: Format current file

This will **format the current open file** with the set configurations you provided.

PS: A system pop up will ask you to install pint if it's not installed.

## Setting (Format on Save)

**This setting is entirely optional**

if you would like to unable format on save. Add the following line to the `settings.json`

```json
"editor.laravel.pint.enabled": true
```

This will unable pint format on save for the current file.

**Enjoy!**
