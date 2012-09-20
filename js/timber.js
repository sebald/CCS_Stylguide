!function($){

    "use strict"; // jshint ;_;

    var Timber = function (element, options) {
        this.$tree = $(element)
        this.$nodes = this.$tree.find('.timber-node')
        this.$leafs = this.$tree.find('.timber-leaf')
        this.options = $.extend({}, $.fn.timber.defaults, options)
        this.init()
        this.listen()
    }

    Timber.prototype = {

        constructor: Timber

        , init: function () {
            var $icon, that = this

            // find all '.timber-node + ul' and hide
            this.$nodes.next('ul').hide()
            // add folder icons
            this.$nodes.each(function () {
                $icon = $(that.options.icon).addClass(that.options.closed)
                $(this).prepend($icon)
            })
            // add document icons
            this.$leafs.each(function () {
                $icon = $(that.options.icon).addClass(that.options.file)
                $(this).prepend($icon)
            })
        }

        , open: function (node) {
            var $node = $(node)
            $node.addClass('open')
            $node.find('i').attr('class', this.options.open)
            $node.next('ul').show(this.options.speed)
        }

        , close: function (node) {
            var $node = $(node)
            $node.removeClass('open')
            $node.find('i').attr('class', this.options.closed)
            $node.next('ul').hide(this.options.speed)
        }

        , mouseenter : function (e) {
            var $target = $(e.target)
            if ($target.is('.timber-node')) $target.addClass('guide')
            $($target).parentsUntil('.timber', 'ul').prev('.timber-node').addClass('guide')
        }

        , mouseleave : function (e) {
            var $target = $(e.target)
            if ($target.is('.timber-node')) $target.removeClass('guide')
            $($target).parentsUntil('.timber', 'ul').prev('.timber-node').removeClass('guide')

        }

        , click: function (e) {
            e.stopPropagation()
            e.preventDefault()

            if( $(e.currentTarget).hasClass('open') ) {
                this.close(e.currentTarget)
            } else {
                this.open(e.currentTarget)
            }
        }

        , listen: function () {
            this.$nodes
                .on('click', $.proxy(this.click, this))
                .on('mouseenter', $.proxy(this.mouseenter, this))
                .on('mouseleave', $.proxy(this.mouseleave, this))
            this.$leafs
                .on('mouseenter', $.proxy(this.mouseenter, this))
                .on('mouseleave', $.proxy(this.mouseleave, this))
        }

    }

    /* TIMBER PLUGIN DEFINITION
    * =========================== */

    $.fn.timber = function(option) {
        return this.each(function () {
            var $this = $(this)
              , data = $this.data('timber')
              , options = typeof option == 'object' && option
            if (!data) $this.data('timber', (data = new Timber(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.timber.defaults = {
        icon: '<i></i>'
    ,   open: 'icon-folder-open'
    ,   closed: 'icon-folder-close'
    ,   file: 'icon-file'
    ,   speed: 200
    }

    $.fn.timber.Constructor = Timber

    /* TIMBER API
    * =========================== */

    $(window).on('load', function () {
        $('.timber').each(function () {
            var $this = $(this)
              , data  = $this.data()

            $this.timber(data)
        })
    })

}(window.jQuery);
