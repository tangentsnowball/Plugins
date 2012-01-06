================
THUMBNAIL PLUGIN
================

Jquery plugin to handle thumbnail navigation and image swapping. Includes optional zoom option for main image and optional image captions. Options are detailed in the included example page.

Compatible with Firefox, Safari, Chrome, and IE6+.

Markup should look like this:

    <div class="thumbnailwrapper">
        <a class="imagemain" href="images/product1_large.jpg">
            <img src="images/product1.jpg" alt="Image caption"/>
        </a>
        <div class="imagethumbs">
            <ul>
                <li><a href="images/product1_large.jpg" rel="images/product1_medium.jpg"><img src="images/product1_thumb.gif" alt="Image caption"/></a></li>
                <li><a href="images/product2_large.jpg" rel="images/product2_medium.jpg"><img src="images/product2_thumb.gif" alt="Image caption"/></a></li>
            </ul>
        </div>
    </div>


LATEST CHANGES
==============
6/1/12
------
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
* the first thumbnail should be the current main image
* thumbnails are beneath the main image (css highlight on clicked thumb is an arrow, pointing up)
* vertically aligns and centres the new main image in the div, as well as the thumbnails. CSS MUST contain height and width for main image wrapper (.imagemain)
