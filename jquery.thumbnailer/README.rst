================
THUMBNAIL PLUGIN
================

Jquery plugin to handle thumbnail navigation and image swapping. Includes optional zoom option for main image and optional image captions, plus automatic image and thumbnail central positioning.

Compatible with Firefox, Safari, Chrome, and IE6+.

See included example for markup.

OPTIONS
=======
Options are::

    OPTION          VALUES          DEFAULT     DESC
    zoom            0 (off) 1 (on)  on          enables the zoom when mouse hover on main image
    zoomPos         inside          outside     if specified, positions the zoom within i.e. on top of the image that is zoomed
    captions        0 (off) 1 (on)  off         enables captions on main image
    captionShow     0 (off) 1 (on)  off         when on, ensures image caption is shown even if zoomPos is set to inside
    scrollThumbs    any number      1           number of thumbs to scroll when left/right buttons clicked
    zoomIndicator   0 (off) 1 (on)  1           shows an icon on the zoomable image to indicate zoom is possible
    zoomLocation    left            right       Positions the zoom either side of the image being zoomed
    thumbMinWidth   number          40          Minimum space (width) that thumbnails should occupy. Will be larger if thumbnails are larger.
    thumbMinHeight  number          40          Minimum space (height) that thumbnails should occupy.


LATEST CHANGES
==============
6/11/12
-------
* Fixed bug with thumbnail sizes where if thumbnails were too narrow their size collapsed
* Added thumbMinWidth and thumbMinHeight options

18/7/12
-------
* Added zoomLocation option
* Fixed bug with zoomindicator getting stuck after frantic mouseon/mouseoff
* Fixed bug with zoomlens being wrong size after switching thumbnails and trying to zoom before main image fully loaded
* Fixed bug where if no thumbnails, zoomer did not work (d'oh)

23/3/12
-------
* fix for zoomlens not positioning correctly on first mouseover

13/3/12
-------
* fix for bug with block width/image width
* added optional zoom indicator icon
* fixed bug to prevent hover until image ready
* moved width setting of wrapper from plugin to stylesheet

6/1/12
------
* added option for positioning zoom over top of image
* added option to always show caption if zoom set to inside
* changed size of zoom popup to match image container, not image - zoom lens adjusted accordingly
* set min width on thumbnails to allow for people using very narrow thumbs

4/1/12
------
* made zoom optional
* all graphic effects now done with css
* arrow on active thumbnail now centered regardless of max thumbnail width
* added option for number of thumbnails to scroll at a time
* added optional captions
* made multiple instances possible

19/12/11
--------
* introducing zoom feature

1/12/11
-------
* correcting 'back' action on chrome


WORKINGS OF THE PLUGIN
======================
* if there is space for all the thumbnails anyway, it doesn't create the left/right navigation controls
* vertically and horizontally centres main image and all thumbnails
* handles varying thumbnail sizes, although they should be all relatively similar sizes for sanity's sake, as it doesn't resize them
* larger image path for zoom is extracted from containing href, see below


ASSUMPTIONS MADE BY THE PLUGIN
==============================
* the first thumbnail should be the current main image
* the three image sizes (full, medium and thumbnail) should all be based off the same initial image, just reduced in size
* thumbnails are beneath the main image (css highlight on clicked thumb is an arrow, pointing up)
* vertically aligns and centres the new main image in the div, as well as the thumbnails. CSS MUST contain height and width for main image wrapper (.imagemain)
