/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Do the home events immediately and not wait for page load
// Check if we are on home page and add the events
if ( jQuery( '#home-dynamic-events' ).length > 0 && jQuery( '#home-dynamic-events' ).children( 'ul' ).length <= 0 ) {
    // Do the json request to get the events from the dynamic site
    jQuery.ajax( {
        type: "GET",
        url: _dynamicSiteUrl + 'api/get_recent_posts/?count=1000000&post_type=espresso_event&meta_key=event_start_date&order=ASC&order_by=meta_value&callback=?',
        success: function ( responseData ) {
            // Set up the items
            var _itemsArray = [];

            // Loop through the data we got and set up the items to display
            jQuery.each( responseData.posts, function ( itemIndex, itemObject ) {
                // We want only 2, so break after itemIndex goes above 1
                if ( itemIndex <= 1 ) {
                    // Check if there is a thumbnail
                    if ( typeof itemObject.thumbnail != 'undefined' ) {
                        _itemsArray.push( '<li class="innerWrapper"><img src="'
                            + itemObject.thumbnail.replace( '150x150', '60x44' )
                            + '" alt="' + itemObject.title + '" /><a href="' + itemObject.url + '">'
                            + itemObject.title + '<span class="date">'
                            + itemObject.date + '&nbsp;<em>' + itemObject.region
                            + '</em></span></a></li>' );
                    } else {
                        _itemsArray.push( '<li class="innerWrapper"><a href="' + itemObject.url + '">'
                            + itemObject.title + '<span class="date">'
                            + itemObject.date + '&nbsp;<em>' + itemObject.region
                            + '</em></span></a></li>' );
                    }
                } else {
                    // Get out of this now
                    return false;
                }
            } );

            // Add to the list now
            jQuery( '<ul/>', {
                'class': "newsList innerWrapper homeNews",
                html: _itemsArray.join( '' )
            } ).appendTo( jQuery( '#home-dynamic-events' ).removeClass( 'loadingW' ) );
        },
        dataType: "jsonp"
    } );
}

// Add the js handlers for the events page
jQuery( document ).ready( function ( $ ) {
    // Set up the event tabs
    $( function () {
        // Set the tabs for different types of events
        $( "#events-tabs" ).tabs( {
            select: function ( tEvent, tUi ) {
                // Check if we are on a page based on the url
                if ( window.location.href.indexOf( 'page' ) != -1 ) {
                    // Stop the event from happening since we want to load the page now
                    tEvent.stopImmediatePropagation();
                    tEvent.stopPropagation();
                    tEvent.preventDefault();

                    // Create the url parts
                    var _urlParts = window.location.href.split( '/' );
                    var _removeTrailingSlash = _urlParts.pop();

                    // Remove the bits we don't want
                    var _pageNumber = _urlParts.pop();
                    var _pageIdentifier = _urlParts.pop();

                    // Create the new URL
                    var _newUrl = _urlParts.join( '/' );

                    // Add the tab identifier to the URL now
                    _newUrl = _newUrl + '/' + tUi.tab.hash;

                    // Send the user to the url
                    window.location.href = _newUrl;
                }
            }
        } );
    } );

    // Set up the event detail tabs
    $( function () {
        // Set the tabs for different event details
        $( "#event-detail-tabs" ).tabs();
    } );

    // Set up the event handler for event photos thumbnail
    $( 'ul.eventGallery li a' ).click( function ( eptcEvent ) {
        // Stop the event
        eptcEvent.stopImmediatePropagation();
        eptcEvent.stopPropagation();
        eptcEvent.preventDefault();

        // Check if the event target is set as the link or the image
        if ( eptcEvent.target.tagName.toUpperCase() == 'A' ) {
            // Set the new image url
            var _newImageId = $( eptcEvent.target ).children( 'img' )[0].attr( 'id' );
        } else if ( eptcEvent.target.tagName.toUpperCase() == 'IMG' ) {
            // Set the new image url
            var _newImageId = $( eptcEvent.target ).attr( 'id' );
        }

        // Now set the src for the full image
        $( '.eventGalleryImg img.full-image' ).hide();
        $( '.eventGalleryImg h2.full-image-title' ).hide();
        $( '.eventGalleryImg p.full-image-caption' ).hide();
        $( '#full-' + _newImageId ).show();
        $( '#title-' + _newImageId ).show();
        $( '#caption-' + _newImageId ).show();
    } );

    // Check if we are on footer and add the events
    if ( $( '#footer-dynamic-events' ).length > 0 && $( '#footer-dynamic-events' ).children( 'ul' ).length <= 0 ) {
		// Get the parts of the dynamic url
		var _dynamicSiteUrlParts = _dynamicSiteUrl.split( '/' );
		// Set default to English site events
		var _newDynamicSiteUrl = _dynamicSiteUrlParts[0] + '/' + _dynamicSiteUrlParts[1] + '/' + _dynamicSiteUrlParts[2] + '/';
		
		// If Chinese Sites, list Chinese sites events.  Otherwise list English events
		var _langIncl = ["zh-cn","zh-hk"]
		if ( _langIncl.indexOf(_dynamicSiteUrlParts[3]) >= 0 ) {
			_newDynamicSiteUrl = _dynamicSiteUrl;
		}
		//alert(_newDynamicSiteUrl+", " +_dynamicSiteUrl);
		
		// Do the json request to get the events from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _newDynamicSiteUrl + 'api/get_recent_posts/?count=1000000&post_type=espresso_event&meta_key=event_start_date&order=ASC&order_by=meta_value&callback=?',
       			success: function ( responseData ) {
       			            // Set up the items
       			            var _itemsArray = [];

       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                                   // Make sure we want only 2
                                   if ( itemIndex <= 1 ) {
                                        _itemsArray.push( '<li class="innerWrapper"><a href="' + itemObject.url + '">'
                                                            + itemObject.title + '<span class="date">'
                                                            + itemObject.date + '&nbsp;<em>' + itemObject.region
                                                            + '</em></span></a></li>' );
                                   } else {
                                       // Get out of this now
                                       return false;
                                   }
       			            } );

       			            // Add to the list now
       			            $( '<ul/>', {
       			                'class': "newsList innerWrapper",
       			                html: _itemsArray.join( '' )
       			            } ).appendTo( $( '#footer-dynamic-events' ).removeClass( 'loadingW' ) );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we have the superheader events
    if ( $( '#superheader-dynamic-events' ).length > 0 && $( '#superheader-dynamic-events' ).children( 'ul' ).length <= 0 ) {
        // Do the json request to get the events from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=10000000&post_type=espresso_event&meta_key=event_start_date&order=ASC&order_by=meta_value&callback=?',
       			success: function ( responseData ) {
       			            // Set up the items
       			            var _itemsArray = [];

       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                                   // We just want 3 items
                                   if ( itemIndex <= 2 ) {
                                       // Check if there is a thumbnail
                                       if ( typeof itemObject.thumbnail != 'undefined' ) {
                                           _itemsArray.push( '<li class="innerWrapper"><img src="'
                                                                     + itemObject.thumbnail.replace( '150x150', '60x44' )
                                                                     + '" alt="' + itemObject.title + '" /><a href="' + itemObject.url + '">'
                                                                        + itemObject.title + '<span class="date">'
                                                                        + itemObject.date + '&nbsp;<em>' + itemObject.region
                                                                     + '</em></span></a></li>' );
                                       } else {
                                           _itemsArray.push( '<li class="innerWrapper"><a href="' + itemObject.url + '">'
                                                                        + itemObject.title + '<span class="date">'
                                                                        + itemObject.date + '&nbsp;<em>' + itemObject.region
                                                                     + '</em></span></a></li>' );
                                       }
                                   } else {
                                       // Get out of this now
                                       return false;
                                   }
       			            } );

       			            // Add to the list now
       			            $( '<ul/>', {
       			                'class': "newsList innerWrapper",
       			                html: _itemsArray.join( '' )
       			            } ).appendTo( $( '#superheader-dynamic-events' ) );
       			        },
       			dataType: "jsonp"
       	} );
    }
} );