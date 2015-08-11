/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for the contact page
jQuery( document ).ready( function ( $ ) {
    $( function () {
        // Set the tabs for contact page
        $( "#contact-tabs" ).tabs();

        // Add event handler for the submit event
        $( '#ihk-network-form' ).submit( function ( ev ) {
            // Stop the submission
            ev.preventDefault();
            ev.stopPropagation();

            // Check if we have a region selected
            if ( $( '#network-region' ).val().length > 1 ) {
                // Hide all the containers first, so that the current display one gets hidden
                $( '.network-region-container' ).hide();

                // Set the chosen one to display now
                $( '#' + $( '#network-region' ).val() + '-container' ).show();
            }

            // Just return false, in case we get here
            return false;
        } );

        // Add event handler for the submit event
        $( '#network-region-filter' ).click( function ( ev ) {
            // Stop the submission
            ev.preventDefault();
            ev.stopPropagation();

            // Check if we have a region selected
            if ( $( '#network-region' ).val().length > 1 ) {
                // Hide all the containers first, so that the current display one gets hidden
                $( '.network-region-container' ).hide();

                // Set the chosen one to display now
                $( '#' + $( '#network-region' ).val() + '-container' ).show();
            }
        } );

        // Check if we have more than one network region container
        if ( $( '.network-region-container' ).length <= 1 ) {
            // Hide the select drop down completely
            $( '.regionSel' ).hide();

            // Display all the network region container
            $( '.network-region-container' ).show();
        }
    } );
} );