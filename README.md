# jQuery custom-scrollbar plugin

[jQuery custom-scrollbar plugin](https://github.com/gajus/custom-scrollbar/) is a jQuery plugin that gives a custom look to the native browser scrollbar.

## Usage

This plugin utilises styling trickery to hide the original scrollbar. Therefore, you need a content wrapping element (`.wrapper`) with a fixed height and `overflow-y: scroll`, and the inner content wrapping element (note, that it is selected using `sl.wrapper.find('>').eq(0)`) that is used by the plugin to calculate the original content height.

The scrollbar element (`.scrollbar`) with the custom handle (`.handle`) is self explanatory. Nevertheless, note that `.scrollbar` and `.handle` should have `position: relative` and `position: absolute` respectively. `.scrollbar` does not need to be the same height as the `.wrapper`.

Optionally, you need a wrapping element (`.custom-scrollbar`) with `overflow: hidden` to handle the floating elements inside. However, the latter can be achieved in many ways and it is not mandatory. If you don't like the naming convention, the first `ayCustomScrollbar` parameter allows to change the selectors (`{wrapper: $('.wrapper'), scrollbar: $('.scrollbar'), handle: $('.handle')}`).

To fully understand the implementation, take a look at the [demonstration](https://dev.anuary.com/680a3c94-9651-550f-abca-e853613eb9ce/).

## License & Notes

The BSD License - Copyright (c) 2012 Gajus Kuizinas.