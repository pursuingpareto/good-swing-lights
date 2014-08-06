good-swing-lights
=================

## Instructions
 1. Clone the repo
 2. Open index.html
 3. Make new patterns (instructions below)

## How Lighting Works
In order to make cool patterns, I've abstracted out the idea of individual LEDs. When programming a new pattern, you should specify

## File System Information
Each file is either *structure*, *simulation*, or *swappable*.

Structure files serve some essential purpose and shouldn't need to change much (though there's almost definitely opportunity to improve them).

Simulation files won't be used in the actual swing installation. They simply help in the HTML demos of lighting patterns.

Swappable files are components that can be plugged in. For example, we might want to swap in a different lighting scheme.

The file system looks like this:

 - **lighting_models** contains different 'models' for lighting the swing set. For example, we may want one model based on drops moving around the light strips and another based on standing waves on the beams. Each model should live in its own directory and **MUST** contain a file called "lightingEngine.js" which has a method called updateLightingModel
   - **model_name**
   	- *lightingModel.js*: Somehow specifies what the

##
