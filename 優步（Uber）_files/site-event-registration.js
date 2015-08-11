/**
 *  Invest Hong Kong Theme Custom Javascript
 *
 *  @package        investhk
 *  @subpackage     assets
 *
 *  @author         Start JG
 *  @copyright      Copyright 2011 - 2012 Start JG & Invest Hong Kong
 */

// Add the handler for intercepting form submission for event registration
jQuery( document ).ready( function ( $ ) {
    // Check if we have registration form
    if ( $( '#registration_form').length > 0 ) {
        // Modify the registration form submission url to point to the proper registration form
        var _formUrl = $( '#registration_form').attr( 'action' );

        // Split the action
        var _actionParts = _formUrl.split( '=' );

        // Set the new form url
        var _newFormUrl = _actionParts[0] + '=' + window._rgpId;

        // Set the new url
        $( '#registration_form').attr( 'action', _newFormUrl );
    }

    // Check if we have registration form
    if ( $( '#event #form1').length > 0 ) {
        // Modify the registration form submission url to point to the proper registration form
        var _formUrl = $( '#event #form1').attr( 'action' );

        // Split the action
        var _actionParts = _formUrl.split( '=' );

        // Set the new form url
        var _newFormUrl = _actionParts[0] + '=' + window._rgpId;

        // Set the new url
        $( '#event #form1').attr( 'action', _newFormUrl );
    }

    // Add the new validate call again
    $( '#registration_form' ).on( 'submit', function () {
        // Set all sections to hidden and remove the selected class
        $( 'div.event_questions' ).hide();
        $( 'div.event_questions' ).removeClass( 'eform-section-selected' );

        // Show the first error section
        //$( 'label.error' ).first().parents( 'div.event_questions' ).show().addClass( 'eform-section-selected' );
        $( 'div.event_questions' ).first().show().addClass( 'eform-section-selected' );

        // Check the one which is shown and update the stage indicator
        $( '.event_questions' ).each( function ( eqIndex, eqElement ) {
            // If not the first one, hide it
            if ( $( eqElement ).hasClass( 'eform-section-selected' ) == true ) {
                // Get the classes for the selected section
                var _sectionClasses = $( eqElement ).attr( 'class' );

                // Split the classes by space
                var _classesArray = _sectionClasses.split( ' ' );
                var _classesLength = _classesArray.length;

                // Loop through all the classes
                for ( var ci=0; ci<_classesLength; ci++ ) {
                    // Check if we have a match for a class we are looking for
                    var _foundClass = _classesArray[ci].match( /eform\-section\-\d+/i );

                    // Make sure it is the class we want
                    if ( _foundClass != null ) {
                        // Split the class in to bits
                        var _classParts = _classesArray[ci].split( '-' );

                        // Get the last bit
                        var _sectionIndex = _classParts[_classParts.length-1];

                        // Set all the stages to non-selected
                        $( 'ol.regStage li' ).removeClass( 'selected' );

                        // Give the new stage the selected class
                        $( 'ol.regStage li#stage' + ( parseInt( _sectionIndex ) + 1 ) ).addClass( 'selected' );
                    }
                }

                // Hide all the buttons
                $( '.event_form_submit #eform-previous-button' ).hide();
                $( '.event_form_submit #eform-next-button' ).hide();
                $( '.event_form_submit input' ).hide();

                // Check if we need a previous button
                if ( $( eqElement ).prev().hasClass( 'event_questions' ) == true ) {
                    // Show the previous button
                    $( '.event_form_submit #eform-previous-button' ).show();
                }

                // Check if we need a next button
                if ( $( eqElement ).next().hasClass( 'event_questions' ) == true ) {
                    // Show the next button
                    $( '.event_form_submit #eform-next-button' ).show();
                }

                // Check if we need a submit button
                if ( $( eqElement ).next().hasClass( 'event_questions' ) != true ) {
                    // Show the next button
                    $( '.event_form_submit input' ).show();
                }
            }
        } );
    } );

    // Add the event prices container initially and only display if we want later
    $( '.event_prices' ).hide();

    // Hide all the stages except the first one
    $( '.event_questions' ).each( function ( eqIndex, eqElement ) {
        // Add the class to it for us to keep track of user interaction
        $( eqElement ).addClass( 'eform-section-' + eqIndex );

        // If not the first one, hide it
        if ( eqIndex > 0 ) {
            // Hide the element
            $( eqElement ).hide();
        } else {
            // Add the selected section class
            $( eqElement ).addClass( 'eform-section-selected' );
        }
    } );

    // Check if we have more than one question section
    if ( $( '.event_questions' ).length > 1 ) {
        // Add the extra buttons we want and hide the form submit input
        $( '.event_form_submit input' ).hide();

        // Hide the captcha stuff if we are on any of the stages other than the last
        $( '#recaptcha_widget_div' ).hide();
        $( '#recaptcha_widget_div').prev().hide();

        // Add extra buttons now
        $( '.event_form_submit' ).append( '<a href="#" id="eform-previous-button" class="signUpBtn">Previous</a>' );
        $( '.event_form_submit' ).append( '<a href="#" id="eform-next-button" class="signUpBtn">Next</a>' );

        // No previous button if first section
        if ( $( '.eform-section-0' ).is( ':visible' ) == true ) {
            // Hide the previous button
            $( '.event_form_submit #eform-previous-button' ).hide();
        }

        // Get the last section index
        var _lastSectionIndex = $( '.event_questions' ).length - 1;

        // No previous button if first section
        if ( $( '.eform-section-' + _lastSectionIndex ).is( ':visible' ) == true ) {
            // Hide the next button
            $( '.event_form_submit #eform-next-button' ).hide();

            // Show the submit button
            $( '.event_form_submit input' ).show();

            // Show the recaptcha stuff if we are on the last section
            $( '#recaptcha_widget_div' ).show();
            $( '#recaptcha_widget_div').prev().show();
        }

        // Add the event handler for the next button
        $( '#event' ).on( 'click', '.event_form_submit #eform-next-button', function ( nextEvent ) {
            // Stop event propagation
            nextEvent.stopImmediatePropagation();
            nextEvent.stopPropagation();
            nextEvent.preventDefault();

            // Hide all the stages except the first one
            $( '.event_questions' ).each( function ( eqIndex, eqElement ) {
                // If not the first one, hide it
                if ( $( eqElement ).hasClass( 'eform-section-selected' ) == true ) {
                    // Check if the next element is also a section
                    if ( $( eqElement ).next().hasClass( 'event_questions' ) == true ) {
                        // Hide the current section
                        $( eqElement ).removeClass( 'eform-section-selected' );
                        $( eqElement ).hide();

                        // Display that section now
                        $( eqElement ).next().addClass( 'eform-section-selected' );
                        $( eqElement ).next().show();

                        // Get the classes for the selected section
                        var _sectionClasses = $( eqElement ).next().attr( 'class' );

                        // Split the classes by space
                        var _classesArray = _sectionClasses.split( ' ' );
                        var _classesLength = _classesArray.length;

                        // Loop through all the classes
                        for ( var ci=0; ci<_classesLength; ci++ ) {
                            // Check if we have a match for a class we are looking for
                            var _foundClass = _classesArray[ci].match( /eform\-section\-\d+/i );

                            // Make sure it is the class we want
                            if ( _foundClass != null ) {
                                // Split the class in to bits
                                var _classParts = _classesArray[ci].split( '-' );

                                // Get the last bit
                                var _sectionIndex = _classParts[_classParts.length-1];

                                // Set all the stages to non-selected
                                $( 'ol.regStage li' ).removeClass( 'selected' );

                                // Give the new stage the selected class
                                $( 'ol.regStage li#stage' + ( parseInt( _sectionIndex ) + 1 ) ).addClass( 'selected' );
                            }
                        }

                        // Check if the first section is hidden in which case we want a previous button
                        if ( $( eqElement ).next().prev().hasClass( 'event_questions' ) == true ) {
                            // Show the previous button
                            $( '.event_form_submit #eform-previous-button' ).show();
                        }

                        // Check if we are going to the last section in which case no next button
                        if ( $( eqElement ).next().next().hasClass( 'event_questions' ) != true ) {
                            // Hide the next button
                            $( '.event_form_submit #eform-next-button' ).hide();

                            // Show the submit button as well now
                            $( '.event_form_submit input' ).show();

                            // Show the recaptcha stuff if we are on the last section
                            $( '#recaptcha_widget_div' ).show();
                            $( '#recaptcha_widget_div').prev().show();
                        }
                    } else {
                        // Show the previous button
                        $( '.event_form_submit #eform-previous-button' ).show();

                        // Hide the next button completely now
                        $( '.event_form_submit #eform-next-button' ).hide();

                        // Show the submit button as well now
                        $( '.event_form_submit input' ).show();

                        // Show the recaptcha stuff if we are on the last section
                        $( '#recaptcha_widget_div' ).show();
                        $( '#recaptcha_widget_div').prev().show();
                    }

                    // Get out
                    return false;
                }
            } );
        } );

        // Add the event handler for the previous button
        $( '#event' ).on( 'click', '.event_form_submit #eform-previous-button', function ( previousEvent ) {
            // Stop event propagation
            previousEvent.stopImmediatePropagation();
            previousEvent.stopPropagation();
            previousEvent.preventDefault();

            // Hide all the stages except the first one
            $( '.event_questions' ).each( function ( eqIndex, eqElement ) {
                // If not the first one, hide it
                if ( $( eqElement ).hasClass( 'eform-section-selected' ) == true ) {
                    // Check if the previous element is also a section
                    if ( $( eqElement ).prev().hasClass( 'event_questions' ) == true ) {
                        // Hide the current section
                        $( eqElement ).removeClass( 'eform-section-selected' );
                        $( eqElement ).hide();

                        // Display that section now
                        $( eqElement ).prev().addClass( 'eform-section-selected' );
                        $( eqElement ).prev().show();

                        // Get the classes for the selected section
                        var _sectionClasses = $( eqElement ).prev().attr( 'class' );

                        // Split the classes by space
                        var _classesArray = _sectionClasses.split( ' ' );
                        var _classesLength = _classesArray.length;

                        // Loop through all the classes
                        for ( var ci=0; ci<_classesLength; ci++ ) {
                            // Check if we have a match for a class we are looking for
                            var _foundClass = _classesArray[ci].match( /eform\-section\-\d+/i );

                            // Make sure it is the class we want
                            if ( _foundClass != null ) {
                                // Split the class in to bits
                                var _classParts = _classesArray[ci].split( '-' );

                                // Get the last bit
                                var _sectionIndex = _classParts[_classParts.length-1];

                                // Set all the stages to non-selected
                                $( 'ol.regStage li' ).removeClass( 'selected' );

                                // Give the new stage the selected class
                                $( 'ol.regStage li#stage' + ( parseInt( _sectionIndex ) + 1 ) ).addClass( 'selected' );
                            }
                        }

                        // Show next button if there is another section after the previous
                        if ( $( eqElement ).prev().next().hasClass( 'event_questions' ) == true ) {
                            // Show the next button
                            $( '.event_form_submit #eform-next-button' ).show();

                            // Hide the submit button
                            $( '.event_form_submit input' ).hide();

                            // Hide the recaptcha stuff since we are not on the last section
                            $( '#recaptcha_widget_div' ).hide();
                            $( '#recaptcha_widget_div').prev().hide();
                        }

                        // Hide previous button if there is no section previous - 1 to this element
                        if ( $( eqElement ).prev().prev().hasClass( 'event_questions' ) != true ) {
                            // Hide the previous button
                            $( '.event_form_submit #eform-previous-button' ).hide();
                        }
                    } else {
                        // Hide the previous button
                        $( '.event_form_submit #eform-previous-button' ).hide();

                        // Show the next button completely now
                        $( '.event_form_submit #eform-next-button' ).show();

                        // Hide the submit button as well now
                        $( '.event_form_submit input' ).hide();

                        // Hide the recaptcha stuff since we are not on the last section
                        $( '#recaptcha_widget_div' ).hide();
                        $( '#recaptcha_widget_div').prev().hide();
                    }

                    // Get out
                    return false;
                }
            } );
        } );
    }

    // Remove pricing stuff from confirmation page
    $( '#event_espresso_attendee_verify tr' ).first().next().hide();
    $( '#event_espresso_attendee_verify tr' ).last().hide();

    // Handle the registration confirmation page stuff
    $( '.espresso_confirm_registration' ).hide();

    // Show just the last one
    $( '.espresso_confirm_registration' ).last().show();

    // Update the button text - Update Record
    if ( $( '.espresso_confirm_registration input.btn_event_form_submit' ).first().attr( 'value' ) == "Update Record" ) {
        // Update it to just update
        $( '.espresso_confirm_registration input.btn_event_form_submit' ).first().attr( 'value', "Update" );
    }

    // Update the button text - Confirm Registration
    if ( $( '.espresso_confirm_registration input.btn_event_form_submit' ).last().attr( 'value' ) == "Confirm Registration" ) {
        // Update it to just update
        $( '.espresso_confirm_registration input.btn_event_form_submit' ).last().attr( 'value', "Confirm" );
    }

    // Hide the header and event information on the edit personal information page
    $( '.event-display-boxes h3.section-heading' ).first().hide();
    $( '.event-display-boxes h3.section-heading' ).first().next().hide();
} );