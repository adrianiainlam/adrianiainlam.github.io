/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for footer comments
jQuery( document ).ready( function ( $ ) {
    // Check if we are on footer and add the comments/topics
    if ( $( '#footer-dynamic-comments' ).length > 0 && $( '#footer-dynamic-comments' ).children( 'ul' ).length <= 0 ) {
        // Do the json request to get the events from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=3&post_type=topic&order=DESC&order_by=date&callback=?',
       			success: function ( responseData ) {
       			            // Set up the items
       			            var _itemsArray = [];

       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                                   // Check if we have a valid forum_name and forum_link
                                   if ( typeof itemObject.forum_name != 'undefined' && typeof itemObject.forum_link != 'undefined' ) {
                                       // Set up the extra string
                                       var _extraString = ' posted in <a class="twitter-link" href="' + itemObject.forum_link + '">' + itemObject.forum_name + '</a>';
                                   } else {
                                       // Set it to empty string
                                       var _extraString = '';
                                   }

                                    _itemsArray.push( '<li class="twitter-item"><a class="twitter-link topicLink" href="' + itemObject.url + '">'
                                                        + itemObject.title + '</a>' + _extraString + '</li>' );
       			            } );

       			            // Add to the list now
       			            $( '<ul/>', {
       			                'class': "twitter topicComment",
       			                html: _itemsArray.join( '' )
       			            } ).appendTo( $( '#footer-dynamic-comments' ).removeClass( 'loadingW' ) );
       			        },
       			dataType: "jsonp"
       	} );
    }
} );