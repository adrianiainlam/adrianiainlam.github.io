/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Do the home page news right away
// Check if we are on home page and add the news
if ( jQuery( '#home-dynamic-news' ).length > 0 && jQuery( '#home-dynamic-news' ).children( 'ul' ).length <= 0 ) {
    // Do the json request to get the news from the dynamic site
    jQuery.ajax( {
        type: "GET",
        url: _dynamicSiteUrl + 'api/get_recent_posts/?count=2&post_type=news&callback=?',
        success: function ( responseData ) {
            // Set up the items
            var _itemsArray = [];

            // Loop through the data we got and set up the items to display
            jQuery.each( responseData.posts, function ( itemIndex, itemObject ) {
                // Check if there is a thumbnail
                if ( typeof itemObject.thumbnail != 'undefined' ) {
                    _itemsArray.push( '<li class="innerWrapper"><img src="'
                        + itemObject.thumbnail.replace( '150x150', '60x44' )
                        + '" alt="' + itemObject.title + '" /><a href="' + itemObject.url + '">'
                        + itemObject.title + '<span class="date">'
                        + itemObject.date + '</span></a></li>' );
                } else {
                    _itemsArray.push( '<li class="innerWrapper"><a href="' + itemObject.url + '">'
                        + itemObject.title + '<span class="date">'
                        + itemObject.date + '</span></a></li>' );
                }
            } );

            // Add to the list now
            jQuery( '<ul/>', {
                'class': "newsList innerWrapper homeNews",
                html: _itemsArray.join( '' )
            } ).appendTo( jQuery( '#home-dynamic-news' ).removeClass( 'loadingW' ) );
        },
        dataType: "jsonp"
    } );
}

// Add the js handlers for the news page
jQuery( document ).ready( function ( $ ) {
    // Check if we have any news to be handled in the featured area
    if ( $( '#news-featured-holder .newsFeature' ).length > 0 && $( '#news-featured-holder .newsFeature' ).length <= 1 ) {
        // We have just one, show both of them no need for randomization
        $( '#news-featured-holder #n-featured-0' ).show();
    } else if ( $( '#news-featured-holder .newsFeature' ).length > 0 && $( '#news-featured-holder .newsFeature' ).length > 1 ) {
        // Create the array of indexes we could use
        var _indexesArray = new Array();

        // Set the length
        var _totalCount = $( '#news-featured-holder .newsFeature' ).length;

        // Loop through and add the indexes we could choose from
        for ( var i=0; i < _totalCount; i++ ) {
            // Add to the array
            _indexesArray[i] = i;
        }

        // Now get a random value from the array
        var _randomIndexOne = _indexesArray[Math.floor( Math.random() * _indexesArray.length )];

        // Now display the story
        $( '#news-featured-holder #n-featured-' + _randomIndexOne + '' ).show();
    }

    // Check if we have the superheader news section
    if ( $( '#superheader-dynamic-news' ).length > 0 && $( '#superheader-dynamic-news' ).children( 'ul' ).length <= 0 ) {
        // Do the json request to get the news from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=3&post_type=news&callback=?',
       			success: function ( responseData ) {
       			            // Set up the items
       			            var _itemsArray = [];

       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                               // Check if there is a thumbnail
                               if ( typeof itemObject.thumbnail != 'undefined' ) {
                                   _itemsArray.push( '<li class="innerWrapper"><img src="'
                                                             + itemObject.thumbnail.replace( '150x150', '60x44' )
                                                             + '" alt="' + itemObject.title + '" /><a href="' + itemObject.url + '">'
                			                                    + itemObject.title + '<span class="date">'
                			                                    + itemObject.date + '</span></a></li>' );
                               } else {
                                   _itemsArray.push( '<li class="innerWrapper"><a href="' + itemObject.url + '">'
                			                                    + itemObject.title + '<span class="date">'
                			                                    + itemObject.date + '</span></a></li>' );
                               }
       			            } );

       			            // Add to the list now
       			            $( '<ul/>', {
       			                'class': "newsList innerWrapper",
       			                html: _itemsArray.join( '' )
       			            } ).appendTo( $( '#superheader-dynamic-news' ) );
       			        },
       			dataType: "jsonp"
       	} );
    }
} );