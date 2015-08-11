/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Make the entire faq content list an accordion
jQuery( document ).ready( function ( $ ) {
    $( function () {
        $( ".faqArea dl" ).accordion( { collapsible: true, header: 'dt', autoHeight: false, active: false } );
    } );
} );