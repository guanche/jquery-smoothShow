# smoothShow
An all css animated alternative for jQuery's build-in show() hide() and toggle() methods


## In brief
The performance of the build-in `$.show()`, `$.hide()` and subsequent `$.toggle()`, is not that great (See this [comment](https://twitter.com/paul_irish/status/564443848613847040) from Paul Irish on the matter). This is because it animates the width, height and opacity of the element as fast as it can, at the by you given rate. This little plugin makes use of pure **CSS only** animated properties, with all the performance gain that comes with it.

It will work in browsers that support CSS animations, `max-height` and `transform: translateY()`. So just about any out there.

It's simple, doesn't have as many options as the build-in version, but it gets the job done easy and performant.

## How to use
- Include jQuery and the plugin
- Call smoothShow / smoothHide / smoothToggle
- Use the promise return object or chain it further

```html
<script>
    // Using the done method of the promise
    $('.your-selector').smoothShow().done(function() {
        /* All done here */
    });
    
    // Setting a config
    $('#otherSelector').smoothToggle({ duration : 42 });
    
    // But 90% of the time I use it as is
    $('.close-this-stuff').smoothHide();
</script>
```

## Options
- `duration` (int) Length of the animation in seconds. Defaults to 0.3
- `returnPromise` (boolean) Wheter or not to return a jQ promise object. When false it returns itself for method chaining.  Defaults to `true`

## Feedback
Yes, please do.

## Licence

MIT
