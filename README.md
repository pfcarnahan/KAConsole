# KAConsole
Code for an interactive code console on KA.

## Basics
KAConsole is a console inspired by those such as the google developer tools, and others.

It is useful for on-the-fly code execution and viewing in the Khan Academy HTML Enviroment, and I tried to make it easy to add and use.

## What is it for?
KAConsole can be used for debugging, testing, and more. You can execute code at any time, without having to restart the program, or add complex timings or add keypress event listeners, which is clunky and complex.

## How can I import it?
Simply add this code to the `<head>` of your HTML program to import it.

```
<script src="https://cdn.jsdelivr.net/gh/pfcarnahan/KAConsole/KAConsole.js"></script>
```

***NOTE: Does not work in PJS or Python.***

## Documentation
### <a name="contents">Table of contents</a>
* [Basic Setup](#setup)
* [Use](#use)
* [Resizing](#resize)
* [Resetting](#reset)
* [Advanced Setup](#advanced)

#### <a name="setup">[Basic Setup](#contents)</a>
The most basic way to setup the KAConsole is to call `KAConsole.default()`. This will make the console use it's default settings, and you can begin to use it as soon as you want. If you do this, you will be able to show and hide it with the backtick key: `` ` ``.

#### <a name="use">[Use](#contents)</a>
To use it in it's most basic form, you can type code into the prompt and then press `ENTER` to call it. 

You can use the `UP ARROW` and `DOWN ARROW` to scroll through your past commands.

Past command output can be seen in the window above the prompt, and you can scroll through it to see older outputs.

You can also log things to the KAConsole with `KAConsole.log(MESSAGE)`, `KAConsole.warn(MESSAGE)`, and `KAConsole.error(MESSAGE)`, which mimics the normal use of `console`.

##### Commands
* `KAConsole.VERSION()`:  
	Returns the version of KAConsole that you are using.
	
* `KAConsole.AUTHOR()`:  
	Prints the name of the author of KAConsole.
	  
* `KAConsole.resize(newHeight)`:
	Resizes the console to `newHeight`. `newHeight` must be in pixels.  
	
* `KAConsole.log(msg)`:  
	Prints `msg` to KAConsole.
	
* `KAConsole.warn(msg)`:  
	Prints `msg` to KAConsole with ***warn*** level.
	
* `KAConsole.error(msg)`:  
	Prints `msg` to KAConsole with ***error*** level.
	
* `KAConsole.executePrompt()`:  
	Executes the current prompt.
	
* `KAConsole.create()`:  
	Creates the instance of KAConsole, allowing you to use it in the program.  
	***KAConsole WILL NOT WORK IF YOU DO NOT RUN THIS!***
	
* `KAConsole.hide()`:  
	Hides KAConsole. KAConsole can be shown with `KAConsole.show()`.
	
* `KAConsole.show()`:  
	Shows KAConsole. KAConsole can be hidden with `KAConsole.hide()`.
	
* `KAConsole.resetLog()`:  
	Resets the previous command log of KAConsole.
	
* `KAConsole.resetOutput()`:  
	Resets the previous output log of KAConsole.
	
* `KAConsole.reset()`:  
	Resets both the log (as in `KAConsole.resetLog()`), and the output (as in `KAConsole.resetOutput()`).
	
* `KAConsole.bindShowHide(keyCode)`:  
	Binds the showing/hiding of KAConsole to the specified `keyCode`. `keyCode` should be the number value of a key.
	
* `KAConsole.bindDefault()`:  
	Binds the showing/hiding of KAConsole to the default key, backtick `` ` ``.

* `KAConsole.default()`:  
	Both creates KAConsole, and binds the showing/hiding to backtick `` ` ``.

##### Useful accessors
* `KAConsole.tHeight`:  
	The height of the console in pixels.

* `KAConsole.hidden`:  
	Variable telling whether or not KAConsole is currently hidden.
	
#### <a name="resize">[Resizing](#contents)</a>
To resize KAConsole, simply call `KAConsole.resize(newHeight)`. This will resize KAConsole so that it's total height is the `newHeight`.

*You can call this in the main HTML, or in KAConsole.*

#### <a name="advanced">[Advanced Setup](#contents)</a>
Whatever you want to do with KAConsole, you have to run `KAConsole.create()` first. I'd recommend doing this in the top of a `<script>` tag, but you can do it however you'd like.

The `KAConsole.hide()` and `KAConsole.show()` functions hide and show KAConsole. When KAConsole is hidden, it cannot be seen or interacted with. You can use `KAConsole.hide()` right after you create KAConsole to start it hidden.

The `KAConsole.bindShowHide(keyCode)` function can automatically bind the showing and the hiding of KAConsole to the key with the specified `keyCode`. Alternatively, `KAConsole.bindDefault()` will bind it to the default backtick `` ` ``.

#### <a name="reset">[Resetting](#contents)</a>
If you'd like to reset what is shown in KAConsole, you can just call one of three functions. The first, `KAConsole.resetLog()`, resets the log of previous commands that you have entered into KAConsole. The second, `KAConsole.resetOutput()`, resets the output window of KAConsole. And the third, `KAConsole.reset()`, is an alias for both of the first two at the same time.