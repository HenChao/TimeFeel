# TimeFeel
Fitbit app to tell time non-visually

# Overview
This app will vibrate according to the local time on the watch. Useful if you need to determine the time without activating the display (at the movies, while in the middle of a conversation, etc).

# Getting Started
Sign up for a developer account on [FitBit](https://dev.fitbit.com/) (it's free). Create a new project, and import the files from the repo into FitBit Studio.

# Detailed Usage
Sideload the app onto your smartwatch and launch it. Click on the top-right icon (or the top right button on the watch) to start the vibration. The watch will vibrate the hour first, then the tens digit of the minute, and finally the singles digit of the minute. A short delay will separate each set of vibrations.

Vibrations are broken up into double and short pulses. Double pulses represents 5 units, and short pulses represents 1 unit. For example, to represent the number 8, the app will perform one double pulse, then three single pulses.

A long pulse will be used to represent 0. This is only used when representing the tens or single digit of the minute (Thus can be used to distinguish between :10 and :01 values).

## Example Times to Pulses
Pulses are divided into **hours** - *minutes tens digit* - _**minutes single digit**_.

Time | Hours | Minutes tens digit | Minutes single digit
-----|-------|--------------------|---------------------
8:32 | **Double * Single * Single * Single** | *Single * Single * Single* | _**Single * Single**_
11:06 | **Double * Double * Single** | *Long* | _**Double * Single**_
1:50 | **Single** | *Double* | _**Long**_

# Developer Info
As this is a hobby project, testing has not been extensively performed for all usecases or any edge conditions. Code also has not been optimized for performance or memory. Possible future improvements would be to allow users to set timing between each set of pulses.

# Additional Information
Credits to the FitBit SDK for interfacing with watch functionalities.

Copyright and License - MIT License

How to contribute - Feel free to fork or submit a pull request. However, I will most likely not be actively developing the application any further. This was a hobby project to practice working with the FitBit SDK.

References - [FitBit SDK Reference](https://dev.fitbit.com/build/reference/)
