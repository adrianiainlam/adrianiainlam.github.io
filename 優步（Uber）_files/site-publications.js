/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for the publications page
jQuery( document ).ready( function ( $ ) {
    $( function () {
        // Set the tabs for different types of publications
        $( "#publications-tabs" ).tabs();

        // Setup the accordion for the sector leaflet publications
        $( "dl#publications-sectors-leaflets" ).accordion( { collapsible: true, header: 'dt', autoHeight: false, active: false } );
    } );
} );