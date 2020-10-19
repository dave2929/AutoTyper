## Introduction
AutoTyper automatcailly types text through clicking mouse buttons and pressing hotkeys. AutoTyper will help you to quickly send messages in League of Legends. Nobody can type faster than you.
With some small tweaks, AutoTyper can also be used in any application. See FAQ.

## Examples

Autotype demonstration:
![demo3](https://github.com/dave2929/AutoTyper/demo/demo3.gif)
You can also use it in games:
![demo1](https://github.com/dave2929/AutoTyper/demo/demo1.gif)
Or like this(just for fun, not recommended):
![demo2](https://github.com/dave2929/AutoTyper/demo/demo2.gif)

## Quick guide

Press **~** button to toggle the floating window.
You can change your input text on the setting window and it will automatically update on the floating window and save your changes.
You can use hotkeys **F1-F10** to type input texts.
You can drag around both the setting window and the floating window. However, their positions will reset after closing the application.

## Installation
Download package from **Releases** and install.

## Building
Quick start
```npm install```
Rebuild project
```npm run rebuild```
Run project
```npm start```

NOTE: robotjs is forked from the latest github repository. Released version on npm does not support certain features.
DO NOT USE ```npm install robotjs```
USE ```npm install octalmage/robotjs```

## FAQ
* How to change input text style?
First build the project. Change input text style under ipcMain.on("type", (event, msg) => {}).

* How to change input text speed?
Change the parameter of robot.typeStringDelayed(msg, 50000).
