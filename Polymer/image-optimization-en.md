# Image optimization and static analysis

## Optimizing images

We show some good practices to optimize visual resources.

1. Remove all unnecessary images.
2. Do not use images, not always are the best solution. Some elements can be surrigate for an image like:

    * CCS3 effects whenever possible.
    * Uses web fonts instead of images.

    Thats two options are also resolution independent, clearly visible in any resolution, included with zoom. In the case of web fonts we will also have the possibility to select and search as text. Improving usability.

3. Use vector graphics (SVG) when possible. They have lower weight, are scalable and resolution independent.
It will also be necessary to optimize vector images. Vector image editors often include many unnecessary metadata and comments for image rendering. Tools like *svgo* allow us to eliminate such extra load.
SVG is an XML-based format and we can use GZIP compression to reduce the size of the transfer. In that case, we must have configured our web server properly.

4. Use different image sizes depending on the device (Tailored image sizes). A mobile device maximun resolution does not justify serving images at high resolutions. Make sure they are the right size, it does not make sense to send an image that is then scaled to a smaller size.

5. Optimizes binary images.

    * Choose the appropriate format:


    | Format | Transparency | Animation | Browser
    | --- | --- | --- | ---
    | GIF | Yes | Yes | All
    | PNG | Yes | No | All
    | JPEG | No | No | All
    | JPEG XR | Yes | Yes | IE
    | WebP | Yes | Yes | Chrome, Opera, Android


    * Use Image Progressive Rendering. This will allow the image to be displayed even when it is not completely downloaded. This is a must do from any image editor.
        
        1. Create the JPG as progressive.
        2. Create PNG as interlaced.

    * Simple decision tree for format:

        ![alt text](./resources/format-tree.png "Graphic format decision tree")
    
        1. In the case of lost quality compression formats such JPG, it will be necessary to specify a compression rate. In this case there is no "good" value, it will depend on the image and the permissible degradation.
        2. In the case of PNG format we can limit the size of the color palette and generate much smaller files when this is possible.

6. If many images must be downloaded or are very heavy, we can display a solid block with the size occupied by the image and the majority solid color background. This is the strategy used by google in your image finder.

    ![alt text](./resources/google-search.jpg "Google example")

### Automation for image optimization on Angular 2:

For webpack we can use *image-webpack-loader* (https://github.com/tcoopman/image-webpack-loader) o *imagemin-webpack-pluginº* (https://github.com/Klathmon/imagemin-webpack-plugin). Both optimize PNG, JPEG, GIF and SVG files.

## Static Analysis

It allows us to review our code to find potential execution errors. Suppress the lack of a compiler. We have several options, not only for JavaScript, we can also do CSS linting. Apart from the possible errors, we can configure coding rules. In addition, we can configure integration tools to avoid deployments and commits of things that do not pass the specified rules.

### Automation for Static Analysis on Angular 2

Angular 2 has the particularity of disregarding JavaScript in the development in favor of TypeScript and Dart.

#### TSLint

It is a linting tool specialized in TypeScript.

In order to use it we have to install with npm:

> npm install tslint typescript -g

The rules are configured using a configuration file *tslint.json*. This file can be generated automatically by the command line:

> tslint -i

We can integrate with the most important task automation tools, editors and IDEs. (https://palantir.github.io/tslint/usage/third-party-tools/)

##### Pros:

* Customize existing rules; Activate, deactivate, create our own rules.
* Integration with automation tools and editors and IDEs.
* It is possible to disable the rules from the code by adding comments.

##### Cons

* Requires a minimum of configuration.
* On machines with few resources can be somewhat slow.