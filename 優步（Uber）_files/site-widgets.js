/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for the dynamic widgets
jQuery( document ).ready( function ( $ ) {
    // Get the parts of the dynamic url
    var _dynamicSiteUrlParts = _dynamicSiteUrl.split( '/' );

    // Setup the url to just the english dynamic site
    var _newDynamicSiteUrl = _dynamicSiteUrlParts[0] + '/' + _dynamicSiteUrlParts[1] + '/' + _dynamicSiteUrlParts[2] + '/';

    // Check if we have the footer dynamic youtube container
    if ( $( '#footer-dynamic-twitter' ).length > 0 && $( '#footer-dynamic-twitter' ).children().length <= 0 ) {
        // Do the json request to get the widget content from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _newDynamicSiteUrl + 'twitter-widget/?json=1&callback=?',
       			success: function ( responseData ) {
                            // Add the content now to the container
                            $( '#footer-dynamic-twitter' ).replaceWith( responseData.page.content );

                            // Reformat the date
                            $( '.twitter-timestamp' ).each( function ( twtIndex, twtEl ) {
                                // Get the abbr element
                                var _twtTimestamp = $( 'abbr', twtEl ).html();

                                // Split the data parts
                                var _twtParts = _twtTimestamp.split( '/' );

                                // Set the new timestamp
                                $( 'abbr', twtEl ).html( _twtParts[2] + '.' + _twtParts[1] + '.' + _twtParts[0] );
                            } );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we have the footer dynamic youtube container
    if ( $( '#footer-dynamic-flickr' ).length > 0 && $( '#footer-dynamic-flickr' ).children().length <= 0 ) {
        // Do the json request to get the widget content from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _newDynamicSiteUrl + 'flickr-widget/?json=1&callback=?',
       			success: function ( responseData ) {
                            // Set the parent so that we can use it later
                            var _parentNode = $( '#footer-dynamic-flickr' ).parent();

                            // Add the content now to the container
                            $( '#footer-dynamic-flickr' ).replaceWith( responseData.page.content );

                            // Now loop through the items and remove the ones we don't want
                            $( '.slickr-flickr-gallery', _parentNode ).find( 'li' ).each( function ( cIndex, cEl ) {
                                // If the index is greater than the cutoff index, remove
                                if ( cIndex > 3 ) {
                                    // Remove the element
                                    $( cEl ).remove();
                                }
                            } );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we have the footer dynamic youtube container
    if ( $( '#footer-dynamic-flickr-2' ).length > 0 && $( '#footer-dynamic-flickr-2' ).children().length <= 0 ) {
        // Do the json request to get the widget content from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _newDynamicSiteUrl + 'flickr-widget/?json=1&callback=?',
       			success: function ( responseData ) {
                            // Set the parent so that we can use it later
                            var _parentNode = $( '#footer-dynamic-flickr-2' ).parent();

                            // Add the content now to the container
                            $( '#footer-dynamic-flickr-2' ).replaceWith( responseData.page.content );

                            // Now loop through the items and remove the ones we don't want
                            $( '.slickr-flickr-gallery', _parentNode ).find( 'li' ).each( function ( cIndex, cEl ) {
                                // If the index is greater than the cutoff index, remove
                                if ( cIndex < 4 ) {
                                    // Remove the element
                                    $( cEl ).remove();
                                }
                            } );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we have the footer dynamic youtube container
    if ( $( '#footer-dynamic-youtube' ).length > 0 && $( '#footer-dynamic-youtube' ).children().length <= 0 ) {
        // Do the json request to get the widget content from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _newDynamicSiteUrl + 'youtube-widget/?json=1&callback=?',
       			success: function ( responseData ) {
                            // Add the content now to the container
                            $( '#footer-dynamic-youtube' ).replaceWith( responseData.page.content );
       			        },
       			dataType: "jsonp"
       	} );
    }
} );