/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for the sitemap generation
jQuery( document ).ready( function ( $ ) {
    // Check if we are on sitemap page and load the dynamic stuff
    if ( $( '#dynamic-sitemap-success-stories' ).length > 0 && $( '#dynamic-sitemap-success-stories' ).children( 'li' ).length <= 0 ) {
        // Do the json request to get the news from the dynamic site
        $.ajax( {
            type: "GET",
            url: _dynamicSiteUrl + 'api/get_recent_posts/?count=10000000&post_type=success-stories&callback=?',
            success: function ( responseData ) {
                // Loop through the data we got and set up the items to display
                $.each( responseData.posts, function ( itemIndex, itemObject ) {
                    // Add the item
                    $( '<li><a href="' + itemObject.url + '">' + itemObject.title + '</a></li>' ).appendTo( $( '#dynamic-sitemap-success-stories' ) );
                } );
            },
            dataType: "jsonp"
        } );
    }

    // Check if we are on sitemap page and load the dynamic stuff
    if ( $( '#dynamic-sitemap-news' ).length > 0 && $( '#dynamic-sitemap-news' ).children( 'li' ).length <= 0 ) {
        // Do the json request to get the news from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=10000000&post_type=news&callback=?',
       			success: function ( responseData ) {
       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                               // Add the item
                               $( '<li><a href="' + itemObject.url + '">' + itemObject.title + '</a></li>' ).appendTo( $( '#dynamic-sitemap-news' ) );
       			            } );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we are on sitemap page and load the dynamic stuff
    if ( $( '#dynamic-sitemap-media' ).length > 0 && $( '#dynamic-sitemap-media' ).children( 'li' ).length <= 0 ) {
        // Do the json request to get the news from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=10000000&post_type=page&order=ASC&order_by=menu_order&callback=?',
       			success: function ( responseData ) {
       			            // Set up the items
       			            var _itemsArray = [];
							var _itemsIncl = ["press-kit","media-contact"];

       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {

								// if the page is included
								if ( _itemsIncl.indexOf(itemObject.slug) >= 0 ) {
								
                                   // Setup the string to pushed
                                   var _forumString = '<li><a href="' + itemObject.url + '">' + itemObject.title + '</a>';

                                   // Check if there are any children
                                   if ( typeof itemObject.children != 'undefined' ) {
                                       // Check if we have any children
                                       if ( itemObject.children.length > 0 ) {
                                           // Add the sub list
                                           _forumString = _forumString + '<ul class="List">';

                                           $.each( itemObject.children, function ( childIndex, childObject ) {
                                               // Add the sub list item
                                               _forumString = _forumString + '<li><a href="' + childObject.url + '">' + childObject.title + '</a>';

                                               // Check if this forum has any children in it
                                               if ( typeof childObject.children != 'undefined' ) {
                                                   // Add the sub list
                                                   _forumString = _forumString + '<ul class="List">';

                                                   $.each( childObject.children, function ( topicIndex, topicObject ) {
                                                       // Add the sub list item
                                                       _forumString = _forumString + '<li><a href="' + topicObject.url + '">' + topicObject.title + '</a></li>';
                                                   } );


                                                   // Finish the sub list
                                                   _forumString = _forumString + '</ul>';
                                               }

                                               // Close the child item
                                               _forumString = _forumString + '</li>';
                                           } );


                                           // Finish the sub list
                                           _forumString = _forumString + '</ul>';
                                       }
                                   }

                                   // Close the forum string'
                                   _forumString = _forumString + '</li>';

                                   // Push to the items now
                                   _itemsArray.push( _forumString );
								}
       			            } );

       			            // Add to the list now
                            $( '#dynamic-sitemap-media' ).parent().replaceWith( _itemsArray.join( '' ) );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we are on sitemap page and load the dynamic stuff
    if ( $( '#dynamic-sitemap-events' ).length > 0 && $( '#dynamic-sitemap-events' ).children( 'li' ).length <= 0 ) {
        // Do the json request to get the news from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=10000000&post_type=espresso_event&rtype=sitemap&callback=?',
       			success: function ( responseData ) {
       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                               // Add the item
                               $( '<li><a href="' + itemObject.url + '">' + itemObject.title + '</a></li>' ).appendTo( $( '#dynamic-sitemap-events' ) );
       			            } );
       			        },
       			dataType: "jsonp"
       	} );
    }

    // Check if we are on sitemap page and load the dynamic stuff
    if ( $( '#dynamic-sitemap-forums' ).length > 0 && $( '#dynamic-sitemap-forums' ).children( 'li' ).length <= 0 ) {
        // Do the json request to get the news from the dynamic site
        $.ajax( {
       			type: "GET",
       			url: _dynamicSiteUrl + 'api/get_recent_posts/?count=10000000&post_type=forum&order=DESC&order_by=title&callback=?',
       			success: function ( responseData ) {
       			            // Set up the items
       			            var _itemsArray = [];

       			            // Loop through the data we got and set up the items to display
       			            $.each( responseData.posts, function ( itemIndex, itemObject ) {
                                   // Setup the string to pushed
                                   var _forumString = '<li><a href="' + itemObject.url + '">' + itemObject.title + '</a>';

                                   // Check if there are any children
                                   if ( typeof itemObject.children != 'undefined' ) {
                                       // Check if we have any children
                                       if ( itemObject.children.length > 0 ) {
                                           // Add the sub list
                                           _forumString = _forumString + '<ul class="List">';

                                           $.each( itemObject.children, function ( childIndex, childObject ) {
                                               // Add the sub list item
                                               _forumString = _forumString + '<li><a href="' + childObject.url + '">' + childObject.title + '</a>';

                                               // Check if this forum has any children in it
                                               if ( typeof childObject.children != 'undefined' ) {
                                                   // Add the sub list
                                                   _forumString = _forumString + '<ul class="List">';

                                                   $.each( childObject.children, function ( topicIndex, topicObject ) {
                                                       // Add the sub list item
                                                       _forumString = _forumString + '<li><a href="' + topicObject.url + '">' + topicObject.title + '</a></li>';
                                                   } );


                                                   // Finish the sub list
                                                   _forumString = _forumString + '</ul>';
                                               }

                                               // Close the child item
                                               _forumString = _forumString + '</li>';
                                           } );


                                           // Finish the sub list
                                           _forumString = _forumString + '</ul>';
                                       }
                                   }

                                   // Close the forum string'
                                   _forumString = _forumString + '</li>';

                                   // Push to the items now
                                   _itemsArray.push( _forumString );
       			            } );

       			            // Add to the list now
                            $( '#dynamic-sitemap-forums' ).replaceWith( $( '<ul/>', { 'id': "dynamic-sitemap-forums", html: _itemsArray.join( '' ) } ) );
       			        },
       			dataType: "jsonp"
       	} );
    }
} );