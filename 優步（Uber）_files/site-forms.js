/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for the forms
jQuery( document ).ready( function ( $ ) {
    $( function () {
        // Check if we have the contact form
        if ( $( '#site-contact-form' ).length > 0 && $( '#site-contact-form' ).children( 'form' ).length <= 0 ) {
            // Do the json request to get the news from the dynamic site
            $.ajax( {
                    type: "GET",
                    url: _dynamicSiteUrl + 'contact-us/?json=1&callback=?',
                    success: function ( responseData ) {
                                // Add to the list now
                                $( responseData.page.content ).appendTo( $( '#site-contact-form' ) );

                                // Remove the javascript href from the captcha refresh
                                $( '#site-contact-form img.captcha-reset' ).parent().attr( 'href', '#' );
                                $( '#site-contact-form img.captcha-reset' ).parent().addClass( 'captcha-reset-link' );

                                // Add the required label for the captcha field
                                $( '#site-contact-form img.captcha-reset' ).parent().parent().append( '<span class="reqTxtCaptcha">' + $( '#site-contact-form form span.reqtxt' ).html() + '</span>' );

                                // Add an event handler for the captcha reset
                                $( 'body' ).on( 'click', '#site-contact-form .captcha-reset-link', function ( crEvent ) {
                                    // Stop event propagation
                                    crEvent.stopImmediatePropagation();
                                    crEvent.stopPropagation();
                                    crEvent.preventDefault();

                                    // Get the image src and then reload it
                                    var _captachImgSrc = $( '#site-contact-form img#cf_captcha_img' ).attr( 'src' );
                                    var _newCaptchaImgSrc = _captachImgSrc + '&_tsRefersh=' + Math.round(+new Date()/1000);

                                    // Set the src now
                                    $( '#site-contact-form img#cf_captcha_img' ).attr( 'src', _newCaptchaImgSrc );
                                } );

                                // Stop the form submission
                                $( 'body' ).on( 'submit', '#site-contact-form form', function ( fsEvent ) {
                                    // Stop event propagation
                                    fsEvent.stopImmediatePropagation();
                                    fsEvent.stopPropagation();
                                    fsEvent.preventDefault();

                                    // Make a ajax jsonp submission
                                    $.ajax( {
                                            type: "POST",
                                            url: _dynamicSiteUrl + 'contact-us/?json=1&callback=?',
                                            success: function ( responseData ) {
                                                        // Remove all the data and append the new data
                                                        $( '#site-contact-form' ).empty();
                                                        $( responseData.page.content ).appendTo( $( '#site-contact-form' ) );

                                                        // Remove the javascript href from the captcha refresh
                                                        $( '#site-contact-form img.captcha-reset' ).parent().attr( 'href', '#' );
                                                        $( '#site-contact-form img.captcha-reset' ).parent().addClass( 'captcha-reset-link' );

                                                        if ( $( '#site-contact-form #usermessagea' ).hasClass( 'success' ) == true ) {
                                                            // Remove the form itself
                                                            $( '#site-contact-form form' ).remove();

                                                            // Add the message in to the empty container
                                                            if ( window.location.href.indexOf( 'zh-hk' ) != -1 ) {
                                                                // Add the string message
                                                                $( '#site-contact-form #usermessagea').html( '<span>感謝您的留言!</span>' );
                                                            } else if ( window.location.href.indexOf( 'zh-cn' ) != -1 ) {
                                                                // Add the string message
                                                                $( '#site-contact-form #usermessagea').html( '<span>感谢您的留言!</span>' );
                                                            } else {
                                                                // Add the string message
                                                                $( '#site-contact-form #usermessagea').html( '<span>Thank you for your message!</span>' );
                                                            }
                                                        }
                                                    },
                                            data: $( '#site-contact-form form' ).serialize() + '&' + $( '#site-contact-form form #sendbutton' ).attr( 'name' ) + '=' + $( '#site-contact-form form #sendbutton' ).val(),
                                            dataType: "jsonp"
                                    } );

                                    // Return false
                                    return false;
                                } );
                            },
                    dataType: "jsonp"
            } );
        }

        // Check if we have the newsletter form
        if ( $( '#site-newsletter-form' ).length > 0 && $( '#site-newsletter-form' ).children( 'form' ).length <= 0 ) {
            // Do the json request to get the news from the dynamic site
            $.ajax( {
                    type: "GET",
                    url: _dynamicSiteUrl + 'newsletter-subscription/?json=1&callback=?',
                    success: function ( responseData ) {
                                 // Add to the list now
                                $( responseData.page.content ).appendTo( $( '#site-newsletter-form' ) );

                                // Remove the javascript href from the captcha refresh
                                $( '#site-newsletter-form img.captcha-reset' ).parent().attr( 'href', '#' );
                                $( '#site-newsletter-form img.captcha-reset' ).parent().addClass( 'captcha-reset-link' );

                                // Add the required label for the captcha field
                                $( '#site-newsletter-form img.captcha-reset' ).parent().parent().append( '<span class="reqTxtCaptcha">' + $( '#site-newsletter-form form span.reqtxt' ).html() + '</span>' );

                                // Add an event handler for the captcha reset
                                $( 'body' ).on( 'click', '#site-newsletter-form .captcha-reset-link', function ( crEvent ) {
                                    // Stop event propagation
                                    crEvent.stopImmediatePropagation();
                                    crEvent.stopPropagation();
                                    crEvent.preventDefault();

                                    // Get the image src and then reload it
                                    var _captachImgSrc = $( '#site-newsletter-form img#cf_captcha_img2' ).attr( 'src' );
                                    var _newCaptchaImgSrc = _captachImgSrc + '&_tsRefersh=' + Math.round(+new Date()/1000);

                                    // Set the src now
                                    $( '#site-newsletter-form img#cf_captcha_img2' ).attr( 'src', _newCaptchaImgSrc );
                                } );

                                // Stop the form submission
                                $( 'body' ).on( 'submit', '#site-newsletter-form form', function ( fsEvent ) {
                                    // Stop event propagation
                                    fsEvent.stopImmediatePropagation();
                                    fsEvent.stopPropagation();
                                    fsEvent.preventDefault();

                                    // Make a ajax jsonp submission
                                    $.ajax( {
                                            type: "POST",
                                            url: _dynamicSiteUrl + 'newsletter-subscription/?json=1&callback=?',
                                            success: function ( responseData ) {
                                                        // Remove all the data and append the new data
                                                        $( '#site-newsletter-form' ).empty();
                                                        $( responseData.page.content ).appendTo( $( '#site-newsletter-form' ) );

                                                        // Remove the javascript href from the captcha refresh
                                                        $( '#site-newsletter-form img.captcha-reset' ).parent().attr( 'href', '#' );
                                                        $( '#site-newsletter-form img.captcha-reset' ).parent().addClass( 'captcha-reset-link' );

                                                        if ( $( '#site-newsletter-form #usermessage2a' ).hasClass( 'success' ) == true ) {
                                                            // Remove the form itself
                                                            $( '#site-newsletter-form form' ).remove();
                                                        }
                                                    },
                                            data: $( '#site-newsletter-form form' ).serialize() + '&' + $( '#site-newsletter-form form #sendbutton2' ).attr( 'name' ) + '=' + $( '#site-newsletter-form form #sendbutton2' ).val(),
                                            dataType: "jsonp"
                                    } );

                                    // Return false
                                    return false;
                                } );
                            },
                    dataType: "jsonp"
            } );
        }

        // Check if we have the registration form
        if ( $( '#registerform' ).length > 0 ) {
            // Change the name of the user_login field
            $( '#registerform' ).append( '<input type="text" name="user_name" id="user_name" style="display: none;" value="" />' );
        }
    } );
} );