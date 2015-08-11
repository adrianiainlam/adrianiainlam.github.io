/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for the mega dropdown close buttons
jQuery( document ).ready( function ( $ ) {
    // Handle click event on the drop down close button
    $( ".mega .inner .close" ).click( function ( ev ) {
        // Stop event propagation
        ev.stopPropagation();

        // Append the extra bit to the url of the a tag
        $( ev.target ).parent().parent().hide();
    } );

    // Handle hover and focus events on the drop down

    $( "li.topL" ).mouseenter( function ( ev ) {
        // Check if we have the a or the li as the target
        if ( $( ev.target ).hasClass( 'topL' ) ) {
            // Append the extra bit to the url of the a tag
            $( ev.target ).children( 'div.mega' ).removeAttr( 'style' );
        } else if ( $( ev.target ).hasClass( 'npLink' ) ) {
            // Append the extra bit to the url of the a tag
            $( ev.target ).parent().children( 'div.mega' ).removeAttr( 'style' );
        }
    } );
	
	$( "li.topL" ).focusin( function () {
		$(this).children( 'div.mega' ).removeAttr( 'style' );
		$(this).children( 'div.mega' ).css('display','block');
	} );

	$( "li.topL" ).focusout( function () {
		$(this).children( 'div.mega' ).css( 'left', '-3000px');
	} );
	
	// Add in the footer links modification here
    $( ".extnLinks li a" ).attr( 'target', '_blank' );
} );