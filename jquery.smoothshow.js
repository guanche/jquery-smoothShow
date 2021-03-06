/**
 * smoothShow Plugin v0.1.0
 *
 * Author: Renzo Sartorius
 * Created: March 04, 2015
 * URL: https://github.com/guanche/jquery-smoothShow
 */


;(function ($) {
    $.fn.smoothShow = function(options) {
        
        var defaults = { duration : 0.3, returnPromise : true },
            settings = $.extend({}, defaults, options),
            index = 1, self = this, dfd = null,
                        

        jqThis = this.each(function() {

            var wrapperId = 'elWrapper_'+uniqueId(),
                $el = $(this),
                wrapperEl = '<div id="'+wrapperId+'" data-type="smoothShowWrapper" style="transition:max-height '+
                            settings.duration+'s;max-height:0px;"></div>';

            if ($el.css('display') === 'block' ||
                $el.parent().data('type') === 'smoothHideWrapper' ||
                $el.parent().data('type') === 'smoothShowWrapper') {
                if(settings.returnPromise) {
                    dfd = $.Deferred();
                    dfd.resolve();
                }
                
                return;
            }
                
            var height = $el.wrap(wrapperEl)
                            .css({
                                transition: 'all '+settings.duration+'s',
                                transform : 'translateY(-10px)',
                                visibility : 'hidden',
                                display : 'block',
                                opacity: 0
                            })
                            .outerHeight();

            if(settings.returnPromise && index === self.length) dfd = $.Deferred();

            $('#'+wrapperId).css('maxHeight', height+'px');

            $el.css({
                transform : 'translateY(0)',
                opacity: '1',
                visibility: ''
            });

            setTimeout(function() {
                $el.unwrap().css({transition : '', opacity : '', transform : ''});
                if(settings.returnPromise && index === self.length) {
                    dfd.resolve();
                }
            }, settings.duration * 1000);

            if (index !== self.length) index++;

        });
        
        if(settings.returnPromise) return dfd.promise();
        
        return jqThis;
    };



    $.fn.smoothHide = function(options) {
        
        var defaults = { duration : 0.3, returnPromise : true },
            settings = $.extend({}, defaults, options),
            index = 1, self = this, dfd = null;


        jqThis = this.each(function() {
                var wrapperId = 'elWrapper_'+uniqueId(), $el = $(this),
                    wrapperEl = '<div id="'+wrapperId+'" data-type="smoothHideWrapper" style="transition:max-height '+
                                settings.duration+'s;max-height:'+$el.outerHeight()+'px;"></div>';

            if ($el.css('display') === 'none' ||
                $el.parent().data('type') === 'smoothHideWrapper' ||
                $el.parent().data('type') === 'smoothShowWrapper') {
                if(settings.returnPromise) {
                    dfd = $.Deferred();
                    dfd.resolve();
                }
                
                return;
            }

            $el.wrap(wrapperEl).css({
                transition: 'all '+settings.duration+'s',
                transform : 'translateY(0px)',
                opacity: 1
            });

            if(settings.returnPromise && index === self.length) dfd = $.Deferred();

            // Set timeout 0 hack.. don't know why, but 
            // wont work otherwise
            setTimeout(function() {
                $('#'+wrapperId).css('maxHeight', '0px');

                $el.css({
                    transform : 'translateY(-10px)',
                    opacity: 0
                });
            }, 0);

            setTimeout(function() {
                $el.unwrap().css({transition : '', opacity : '', transform : '', display : 'none'});
                if(settings.returnPromise && index === self.length) {
                    dfd.resolve();
                }
            }, settings.duration * 1000);

            if (index !== self.length) index++;

        });

        if(settings.returnPromise) return dfd.promise();
        
        return jqThis;

    };


    $.fn.smoothToggle = function(options) {
        
        var defaults = { duration : 0.3, returnPromise : true },
            settings = $.extend({}, defaults, options),
            response, toggleDfd,


        jqThis = this.each(function() {
            var $el = $(this);

            response = ($el.css('display') === 'block') ? $el.smoothHide(settings) :
                                                          $el.smoothShow(settings);
        });

        if(settings.returnPromise) {
            toggleDfd = $.Deferred();
            response.done(function() { toggleDfd.resolve(); });
            return toggleDfd.promise();
        } else {
            return jqThis;
        }

    };

    function uniqueId() { return Math.round(new Date().getTime() + (Math.random() * 100)); }
    
}(jQuery));
