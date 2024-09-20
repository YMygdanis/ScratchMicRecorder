# Mic Recorder Extension for Scratch

**Mic Recorder** is a Scratch extension that allows you to record audio from your microphone directly within Scratch projects. It provides blocks for recording, playing, stopping sounds, adjusting playback volume, and managing recordings.

*(Optional: Add a logo image for visual appeal.)*

## Features

-   **Open and Close Microphone**: Control access to your microphone within Scratch.
-   **Record Sound**: Record audio with a specified name and duration.
-   **Play Sound**: Play recorded sounds by name.
-   **Stop Sound**: Stop the currently playing sound.
-   **Set Volume**: Adjust playback volume as a percentage (0% to 100%).
-   **Check Microphone Status**: Determine if the microphone is currently open.
-   **Manage Recordings**: Retrieve a list of all recording names.

## Usage

### Loading the Extension

Once loaded, the extension blocks will appear under the **"More Blocks"** category in ScratchX.

### Blocks Overview

Here are the blocks provided by the Mic Recorder extension:

#### 1\. Open Microphone

-   **Block**: `open microphone`
-   **Description**: Opens the microphone and requests permission from the user.

#### 2\. Close Microphone

-   **Block**: `close microphone`
-   **Description**: Closes the microphone and releases resources.

#### 3\. Is Microphone Open?

-   **Block**: `is microphone open?`
-   **Description**: Returns `true` if the microphone is open, otherwise `false`.

#### 4\. Record Sound Named \[Name\] for \[Duration\] Seconds

-   **Block**: `record sound named [name] for [duration] seconds`
-   **Description**: Records audio from the microphone for the specified duration and saves it with the given name.

#### 5\. Play Sound Named \[Name\]

-   **Block**: `play sound named [name]`
-   **Description**: Plays the recorded sound with the specified name.

#### 6\. Stop Sound

-   **Block**: `stop sound`
-   **Description**: Stops the currently playing sound immediately.

#### 7\. Set Volume to \[Percent\] %

-   **Block**: `set volume to [percent] %`
-   **Description**: Sets the playback volume as a percentage (0% to 100%).

#### 8\. Recording Names

-   **Block**: `recording names`
-   **Description**: Reporter block that returns a list of all recording names.

### Example Projects

#### Example 1: Basic Recording and Playback

scratch

Copy code

`when green flag clicked     open microphone     wait until <(is microphone open?) = [true]>     record sound named [greeting] for [3] seconds     say [Recording complete!] for (2) seconds     close microphone  when space key pressed     play sound named [greeting] `

#### Example 2: Adjusting Volume and Playing a Sound

scratch

Copy code

`when this sprite clicked     
ask [Enter volume (0-100)%:] and wait     
set volume to (answer) %     
play sound named [greeting] `

#### Example 3: Stopping Sound Playback

scratch

Copy code

`when sprite clicked     
play sound named [greeting]     
wait (1) seconds     stop sound `

#### Example 4: Displaying Available Recordings

scratch

Copy code

`when this sprite clicked     
set [recordings v] to (recording names)     
say (join [Recordings: ] (join (recordings) [, ])) for (3) seconds `

## Compatibility

-   **Browsers**: Works best with modern browsers like **Google Chrome** and **Mozilla Firefox**.
-   **HTTPS Requirement**: The extension must be loaded over HTTPS to access the microphone.
-   **Scratch Version**: Compatible with ScratchX for experimental extensions.

## Troubleshooting

-   **Microphone Permission**: Ensure you grant microphone access when prompted by the browser.
-   **Extension Not Loading**: Verify the URL is correct and the file is hosted over HTTPS.
-   **Sound Not Playing**: Check that the recording exists and the volume is set above 0%.
-   **No Recordings Listed**: Make sure you've recorded sounds before attempting to retrieve the list.

##   

* Disclaimer: This extension is experimental and not affiliated with or endorsed by the official Scratch team. *
