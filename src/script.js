/**
 * This is a result of a little study about canvas & physics.
 *
 * @param  {Object} $      jQuery object
 * @param  {Object} window The window object
 */
(function ($, window) {

    'use strict';

    /**
     * Default values.
     * This values could be mixin with other values.
     *
     * @type {Object}
     */
    var defaults = {
        speed: {min: 5, max: 30},
        elasticity: 0.5,
        angle: {min: 180, max: 360},
        friction: 0.008,
        gravity: 0.5,
        radius: 30,
        projectilColor: '#068A87',
        fps: 60
    };

    /**
     * The canvas element.
     *
     * @type {DOMElement}
     */
    var stage = document.getElementById('stage');

    /**
     * Gets a drawing context on the canvas.
     * @type {Object}
     */
    var context = stage.getContext('2d');


    /**
     * Projectil constructor.
     *
     * @constructor
     *
     * @param {Number} x         The x position.
     * @param {Number} y         The y position.
     * @param {Object} [options] The options object.
     */
    function Projectil(x, y, options) {

        // mixin the default values with the options
        $.extend(defaults, options);

        /**
         * Random angle between the 3rd & 4th quadrant(default)
         * @type {Number}
         */
        var angle = Math.random() * (defaults.angle.max - defaults.angle.min) + defaults.angle.min;

        /**
         * Random speed
         * @type {Number}
         */
        var speed = Math.random() * (defaults.speed.max - defaults.speed.min) + defaults.speed.min;

        /**
         * The length of a corresponding arc.
         * @type {Number}
         */
        var radians = angle * (Math.PI / 180);

        /**
         * The x position.
         * @type {Number}
         */
        this.x = x;

        /**
         * The y position.
         * @type {Number}
         */
        this.y = y;

        /**
         * The number of pixels to move our object in x axis.
         * @type {Number}
         */
        this.vx = Math.cos(radians) * speed;

        /**
         * The number of pixels to move our object in y axis.
         * @type {Number}
         */
        this.vy = Math.sin(radians) * speed;

        // Update the position.
        setInterval(this.move.bind(this), (1000 / defaults.fps));
    }

    /**
     * Projectil prototype object.
     *
     * @type {Object}
     */
    Projectil.prototype = {

        /**
         * Draw the projectil.
         *
         * @memberOf Projectil
         * @public
         *
         * @return {[type]} [description]
         */
        draw: function () {

            if (stage.getContext) {
                context = stage.getContext('2d');
                context.beginPath();
                context.arc(this.x, this.y, defaults.radius, 0, Math.PI * 2, false);
                context.fillStyle = defaults.projectilColor;
                context.fill();
                context.closePath();
            }
        },

        /**
         * Clear the stage.
         *
         * @memberOf Projectil
         * @public
         */
        clear: function () {
            context.clearRect(0, 0, stage.width, stage.height);
        },

        /**
         * Move the projectil.
         * The flow is clear the stage, to the math and then draw the projectil.
         *
         * @memberOf Projectil
         * @public
         */
        move: function () {

            this.clear();

            this.vx = this.vx - (this.vx * defaults.friction);
            this.vy += defaults.gravity;

            // condition for the bottom wall
            if ((this.y + defaults.radius) > stage.height) {
                this.y = stage.height - defaults.radius;
                this.vy = -(this.vy) * defaults.elasticity;
            }

            // the condition for the right wall
            if ((this.x + defaults.radius) >= stage.width) {
                this.x = stage.width - defaults.radius;
                this.vx *= -1;
            }

            // the condition for the left wall
            if ((this.x + defaults.radius) < 0) {
                this.vx *= -1;
            }

            this.y += this.vy;
            this.x += this.vx;

            this.draw();
        }
    };

    /**
     * Sets the stage properties and events.
     *
     * @private
     */
    function intitializeStage() {

        // set the canvas dimensions
        context.canvas.height = window.innerHeight;
        context.canvas.width = window.innerWidth;

        // click event handler that create a new projectil
        $(window).one('click', function (event) {
            this.projectil = new Projectil(event.clientX, event.clientY);
        });

        // update the projectil if the stage changes the size
        $(window).on('resize', function () {

            context.canvas.height = window.innerHeight;
            context.canvas.width = window.innerWidth;

            if (this.projectil) {
                this.projectil.move();
            }
        });
    }

    /**
     * Initialize.
     *
     * @private
     */
    function intialize() {
        intitializeStage();
    }

    intialize();
}(jQuery, window));