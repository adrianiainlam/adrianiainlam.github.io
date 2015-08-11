/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the js handlers for language change links
jQuery( document ).ready( function ( $ ) {
    // Check if we are on sitemap page and load the dynamic stuff
    $( '.langOpt a, .languages a' ).click( function ( lcEvent ) {
        // Stop the event since we want to modify the url
        lcEvent.stopImmediatePropagation();
        lcEvent.stopPropagation();
        lcEvent.preventDefault();

        // Get the current url
        var _currentUrl = window.location.href;

        // Check if we are on the static or dynamic site
        if ( _currentUrl.indexOf( _staticSiteMetaUrl ) == 0 ) {
            // Replace the current url part with the selected language url
            var _newUrl = _currentUrl.replace( _staticSiteUrl, $( lcEvent.target ).attr( 'href' ) );

            // Set the content not found url
            var _contentNotFoundUrl = $( lcEvent.target ).attr( 'href' ) + 'content-not-available.html';
        } else if ( _currentUrl.indexOf( _dynamicSiteMetaUrl ) == 0 ) {
            // Replace the current url part with the selected language url
            var _newUrl = _currentUrl.replace( _dynamicSiteUrl, $( lcEvent.target ).attr( 'href' ).replace( _staticSiteMetaUrl, _dynamicSiteMetaUrl ) );

            // Set the content not found url
            var _contentNotFoundUrl = $( lcEvent.target ).attr( 'href' ).replace( _staticSiteMetaUrl, _dynamicSiteMetaUrl ) + 'content-not-available/';
        }

        // Send the user to the new URL
        //window.location.href = _newUrl;
        $( 'body' ).css( 'cursor', 'wait' );

        $.ajax( {
            type: 'get',
            url: _newUrl,
            success: function ( responseData, textStatus, XMLHttpRequest ){
                // Send the user to the new URL
                window.location.href = _newUrl;
            },
            error: function ( xhr, ajaxOptions, thrownError ){
                // Check if we got a 404
                if ( parseInt( xhr.status ) == 404 ) {
                    // Send the user to the no language content page
                    window.location.href = _contentNotFoundUrl;
                }
            }
        } );
    } );
	
	// Set the language bar be visiable when on focus

	$('.langOpt').find('a').focus(function(){
		$(this).parent().parent().parent().parent().parent('.langOpt').css('left', '860px');
		$(this).parent().parent().parent().parent().parent('.langOpt').css('overflow', 'auto');
		$(this).parent().parent().parent().parent().parent().parent('li.langChange').css('background', '#2C2D31');
		$(this).parent().parent().parent().parent().parent().parent('.langChange').css('color', '#FFFFFF');
	});
	$('.langOpt').find('a').blur(function(){
		$(this).parent().parent().parent().parent().parent('.langOpt').css('left', '-3000px');
		$(this).parent().parent().parent().parent().parent('.langOpt').css('overflow', 'hidden');
		$(this).parent().parent().parent().parent().parent().parent('li.langChange').removeAttr( 'style' );
	});

	$('li.langChange').mouseenter(function(){
		$(this).children('div.langOpt').css('left', '860px');
		$(this).children('div.langOpt').css('overflow', 'auto');
		$(this).parent().parent().parent().parent().parent().parent('li.langChange').css('background', '#2C2D31');
		$(this).parent().parent().parent().parent().parent().parent('.langChange').css('color', '#FFFFFF');
 	});	
	$('li.langChange').mouseleave(function(){
		$(this).children('div.langOpt').css('left', '-3000px');
		$(this).children('div.langOpt').css('overflow', 'hidden');
		$(this).parent().parent().parent().parent().parent().parent('li.langChange').removeAttr( 'style' );
	});
} );