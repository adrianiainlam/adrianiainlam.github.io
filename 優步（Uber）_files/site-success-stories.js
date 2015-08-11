/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Do the header success stories immediately and do not wait for the page load
if ( jQuery( '#header-success-stories' ).length > 0 && jQuery( '#header-success-stories' ).children().length <= 0 ) {
    // Get the parts of the dynamic url
    var _dynamicSiteUrlParts = _dynamicSiteUrl.split( '/' );

    // Setup the url to just the english dynamic site
    var _newDynamicSiteUrl = _dynamicSiteUrlParts[0] + '/' + _dynamicSiteUrlParts[2] + '/' + _dynamicSiteUrlParts[3] + '/';
    //alert(_dynamicSiteUrl + 'header-success-stories-widget/?json=1');
    // Do the json request to get the events from the dynamic site
    jQuery.ajax( {
        type: "GET",
        url: /*_newDynamicSiteUrl*/_dynamicSiteUrl + 'header-success-stories-widget/?json=1&callback=?',
        success: function ( responseData ) {
            jQuery( '#header-success-stories' ).replaceWith( responseData.page.content );
        },
        dataType: "jsonp"
    } );
}

// Add the handler for intercepting the search success stories form
jQuery( document ).ready( function ( $ ) {
    // Add event handler for the submit event
    /*$( '#ss-search-form' ).submit( function ( ev ) {
        // Stop the form submission
        ev.stopImmediatePropagation();
        ev.stopPropagation();

        // Setup the base URL for the search
        var _searchResultsUrl = $( '#ss-search-form' ).attr( 'action' );

        // Check if we have either region or sector selected
        if ( $( '#ss-sector' ).val().length > 1 || $( '#ss-region' ).val().length > 1 ) {
            // Check if we have a valid sector now
            if ( $( '#ss-sector' ).val().length > 1 ) {
                // Add the sector to the search results url
                _searchResultsUrl = _searchResultsUrl + '/business-sector/' + $( '#ss-sector' ).val();
            }

            // Check if we have a valid region now
            if ( $( '#ss-region' ).val().length > 1 ) {
                // Add the sector to the search results url
                _searchResultsUrl = _searchResultsUrl + '/region/' + $( '#ss-region' ).val();
            }
        }

        // Add the .html extension to the url now
        _searchResultsUrl = _searchResultsUrl + '.html';

        // Set the action url now
        $( '#ss-search-form' ).attr( 'action', _searchResultsUrl );

        // Submit the form now
        return true;
    } );*/

    // Check if we have any success stories to be handled in the header
    /*if ( $( '.logoArea .innerWrapper .success' ).length > 0 && $( '.logoArea .innerWrapper .success' ).length <= 2 ) {
        // We have just two, show both of them no need for randomization
        $( '.logoArea .innerWrapper .success' ).show();
    } else if ( $( '.logoArea .innerWrapper .success' ).length > 0 && $( '.logoArea .innerWrapper .success' ).length > 2 ) {
        // Create the array of indexes we could use
        var _indexesArray = new Array();

        // Set the length
        var _totalCount = $( '.logoArea .innerWrapper .success' ).length;

        // Loop through and add the indexes we could choose from
        for ( var i=0; i < _totalCount; i++ ) {
            // Add to the array
            _indexesArray[i] = i + 1;
        }

        // Now get a random value from the array
        var _randomIndexOne = _indexesArray[Math.floor( Math.random() * _indexesArray.length )];

        // Create the array of indexes we could use
        var _indexesArray = new Array();

        // Loop through and add the indexes we could choose from
        for ( var i=0; i < _totalCount; i++ ) {
            // Make sure we don't have the same index value in the array again
            if ( ( i + 1 ) != _randomIndexOne ) {
                // Add to the array
                _indexesArray[i] = i + 1;
            }
        }

        // Now get a random value from the array
        var _randomIndexTwo = _indexesArray[Math.ceil( Math.random() * _indexesArray.length )];

        // Loop through and check until we have a valid second element
        while ( $( '.logoArea .innerWrapper .success.story' + _randomIndexTwo + '').length !== 1 ) {
            // Regenerate another index
            var _randomIndexTwo = _indexesArray[Math.ceil( Math.random() * _indexesArray.length )];
        }

        // Now display the stories
        // Check if we the first one has story2 as the class in which case remove it
        if ( $( '.logoArea .innerWrapper .success.story' + _randomIndexOne + '').hasClass( 'story2' ) == true ) {
            // Remove the class now
            $( '.logoArea .innerWrapper .success.story' + _randomIndexOne + '').removeClass( 'story2' ).attr( 'class', 'success story1' ).show();
        } else {
            // Nothing to remove just add the new classes
            $( '.logoArea .innerWrapper .success.story' + _randomIndexOne + '' ).attr( 'class', 'success story1' ).show();
        }

        // Check if we the first one has story2 as the class in which case remove it
        if ( $( '.logoArea .innerWrapper .success.story' + _randomIndexTwo + '').hasClass( 'story1' ) == true ) {
            // Remove the class now
            $( '.logoArea .innerWrapper .success.story' + _randomIndexTwo + '').removeClass( 'story1' ).attr( 'class', 'success story2' ).show();
        } else {
            // Nothing to remove just add the new classes
            $( '.logoArea .innerWrapper .success.story' + _randomIndexTwo + '' ).attr( 'class', 'success story2' ).show();
        }

        //$( '.logoArea .innerWrapper .success.story' + _randomIndexOne + '' ).attr( 'class', 'success story1' ).show();
        //$( '.logoArea .innerWrapper .success.story' + _randomIndexTwo + '' ).attr( 'class', 'success story2' ).show();
    }

    // Check if we have any success stories to be handled in the featured area
    if ( $( '#ss-featured-holder .successFeature' ).length > 0 && $( '#ss-featured-holder .successFeature' ).length <= 1 ) {
        // We have just two, show both of them no need for randomization
        $( '#ss-featured-holder #ss-featured-0' ).show();
    } else if ( $( '#ss-featured-holder .successFeature' ).length > 0 && $( '#ss-featured-holder .successFeature' ).length > 1 ) {
        // Create the array of indexes we could use
        var _indexesArray = new Array();

        // Set the length
        var _totalCount = $( '#ss-featured-holder .successFeature' ).length;

        // Loop through and add the indexes we could choose from
        for ( var i=0; i < _totalCount; i++ ) {
            // Add to the array
            _indexesArray[i] = i;
        }

        // Now get a random value from the array
        var _randomIndexOne = _indexesArray[Math.floor( Math.random() * _indexesArray.length )];

        // Now display the story
        $( '#ss-featured-holder #ss-featured-' + _randomIndexOne + '' ).show();
    }

    // Check if we have any success stories to be handled in the featured area
    if ( $( '.featured.ss-mg-container' ).length > 0 && $( '.featured.ss-mg-container' ).length <= 1 ) {
        // We have just two, show both of them no need for randomization
        $( '.ss-mg-container.ss-featured-0' ).show();
    } else if ( $( '.featured.ss-mg-container' ).length > 0 && $( '.featured.ss-mg-container' ).length > 1 ) {
        // Create the array of indexes we could use
        var _indexesArray = new Array();

        // Set the length
        var _totalCount = $( '.featured.ss-mg-container' ).length;

        // Loop through and add the indexes we could choose from
        for ( var i=0; i < _totalCount; i++ ) {
            // Add to the array
            _indexesArray[i] = i;
        }

        // Now get a random value from the array
        var _randomIndexOne = _indexesArray[Math.floor( Math.random() * _indexesArray.length )];

        // Now display the story
        $( '.ss-mg-container.ss-featured-' + ( _randomIndexOne ) + '' ).show();
    }*/

    // Check if we have the superheader latest success stories
    if ( $( '#superheader-dynamic-success-stories-latest' ).length > 0 && $( '#superheader-dynamic-success-stories-latest' ).children().length <= 0 ) {
        // Get the parts of the dynamic url
        var _dynamicSiteUrlParts = _dynamicSiteUrl.split( '/' );

        // Setup the url to just the english dynamic site
        var _newDynamicSiteUrl = _dynamicSiteUrlParts[0] + '/' + _dynamicSiteUrlParts[1] + '/' + _dynamicSiteUrlParts[2] + '/';

        // Do the json request to get the events from the dynamic site
        $.ajax( {
            type: "GET",
            url: /*_newDynamicSiteUrl*/_dynamicSiteUrl + 'latest-success-stories-widget/?json=1&callback=?',
            success: function ( responseData ) {
                $( '#superheader-dynamic-success-stories-latest').replaceWith( responseData.page.content );
            },
            dataType: "jsonp"
        } );
    }

    // Check if we have the superheader featured success stories
    if ( $( '#superheader-dynamic-success-stories-featured' ).length > 0 && $( '#superheader-dynamic-success-stories-featured' ).children().length <= 0 ) {
        // Get the parts of the dynamic url
        var _dynamicSiteUrlParts = _dynamicSiteUrl.split( '/' );

        // Setup the url to just the english dynamic site
        var _newDynamicSiteUrl = _dynamicSiteUrlParts[0] + '/' + _dynamicSiteUrlParts[1] + '/' + _dynamicSiteUrlParts[2] + '/';

        // Do the json request to get the events from the dynamic site
        $.ajax( {
            type: "GET",
            url: /*_newDynamicSiteUrl*/_dynamicSiteUrl + 'featured-success-stories-widget/?json=1&callback=?',
            success: function ( responseData ) {
                $( '#superheader-dynamic-success-stories-featured' ).replaceWith( responseData.page.content );
            },
            dataType: "jsonp"
        } );
    }

    // Check if we have the superheader featured success stories
    if ( $( '#related-success-stories' ).length > 0 && $( '#related-success-stories' ).children().length <= 0 ) {
        // Get the parts of the dynamic url
        var _dynamicSiteUrlParts = _dynamicSiteUrl.split( '/' );

        // Setup the url to just the english dynamic site
        var _newDynamicSiteUrl = _dynamicSiteUrlParts[0] + '/' + _dynamicSiteUrlParts[1] + '/' + _dynamicSiteUrlParts[2] + '/';

        // Safety net for taxonomies not defined
        // Regions
        if ( typeof window._regionTaxonomies == "undefined" ) {
            var _regionTaxonomies = '';
        }

        // Sectors
        if ( typeof window._sectorTaxonomies == "undefined" ) {
            var _sectorTaxonomies = '';
        }

        // Do the json request to get the events from the dynamic site
        $.ajax( {
            type: "GET",
            url: /*_newDynamicSiteUrl*/_dynamicSiteUrl + 'related-success-stories-widget/?json=1&regions=' + window._regionTaxonomies + '&sectors=' + window._sectorTaxonomies + '&callback=?',
            success: function ( responseData ) {
                $( '#related-success-stories' ).replaceWith( responseData.page.content );
            },
            dataType: "jsonp"
        } );
    }
} );