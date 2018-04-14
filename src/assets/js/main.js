 "use strict";
 $.noConflict();
 var $ = jQuery;

 $(document).ready(function($) {

 /**
    animation Js
  -----------------------------------------------------------------------
    animate sections

 **/

 new WOW().init();

 var offset = 300,
     offset_opacity = 1200,
     scroll_top_duration = 700,
     $back_to_top = $('.back-to-top');

 $(window).scroll(function() {
     ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
     if ($(this).scrollTop() > offset_opacity) {
         $back_to_top.addClass('cd-fade-out');
     }

     // On scroll header reduce js  
     var scroll = $(window).scrollTop();
     if (scroll >= 100) {
         $("#header").addClass("fixed");
     } else {
         $("#header").removeClass("fixed");
     }
 });



$('input[type="range"]').change(function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #ff6369), '
                + 'color-stop(' + val + ', #C5C5C5)'
                + ')'
                );
});





/**
  *  Active Menu Js
  *  -----------------------------------------------------------------------
  *  For Navbar Section adding active to selected menu
  */
 $('.navbar-nav li a').on("click", function(e) {
     $('.navbar-nav li').removeClass('active');
     var $parent = $(this).parent();
     if (!$parent.hasClass('active')) {
         $parent.addClass('active');
     }
 });

 /**
  *  Navbar Close Icon
  *  -----------------------------------------------------------------------
  *  For Navbar Section Close Icon
  */
 $(".navbar-toggle").on("click", function() {
     $(this).toggleClass("active");
     $("#header").toggleClass("headClr");
     $("body").toggleClass("popup-open");
 });

 $('.main-menu ul li a').click(function() {
     $("body").removeClass("popup-open");
     $(".navbar-collapse").removeClass('in');
 });

 /**
  *  Navbar Responsive Js
  *  -----------------------------------------------------------------------
  *  For Navbar Section Responsive Js
  */
 function resMenu() {
     if ($(window).width() < 1023) {
         $('.main-menu ul li a').on("click", function() {
             $(".navbar-collapse").removeClass("in");
             $(".navbar-toggle").addClass("collapsed").removeClass("active");
             $("#header").removeClass("headClr");
         });
     }
 }
 resMenu();

 // jQuery("#signUpModal").click(function() {
 //     jQuery('#signInModal').modal('toggle');
 //     jQuery("#signInModal .modal-header .close").click();
 // });

 // jQuery("#signInModal").click(function() {
 //     jQuery('#signUpModal').modal('toggle');
 //     jQuery("#signUpModal .modal-header .close").click();
 // });

});

jQuery('#sign_creator').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots:true                
      },
      600: {
        items: 3,
        nav: false,               
        dots:true
      },
      1000: {
        items: 3,
        nav: false,
        loop: false,
        margin: 15,
        dots:true                
      }
    }
  })