/**
 * File js-te
 *
 * TTE
 */
window.teMenu = {};

( function ( window, $, app ) {
	// Constructor.
	app.init = function () {
		app.cache();
        app.te();
		//if ( app.meetsRequirements() ) {
			//app.bindEvents();
		//}
	};

	// Cache all the things.
	app.cache = function () {
		app.$c = {
			'body': $( 'body' )
		};
	};

    app.te = function () {
        console.log("offman");
$( "#trigger button" ).click(function() {
  $(".wrapper-vv").toggleClass("is-open");
});
    }

	// Do we meet the requirements?
	//app.meetsRequirements = function () {
		//return $( '.search-field' ).length;
	//};

	// Combine all events.
	//app.bindEvents = function () {
		// Remove placeholder text from search field on focus.
		//app.$c.body.on( 'focus', '.search-field', app.removePlaceholderText );

		// Add placeholder text back to search field on blur.
		//app.$c.body.on( 'blur', '.search-field', app.addPlaceholderText );
	//};

	// Remove placeholder text from search field.
	//app.removePlaceholderText = function () {
		//var $search_field = $( this );

		//$search_field.data( 'placeholder', $search_field.attr( 'placeholder' ) ).attr( 'placeholder', '' );
	//};

	// Replace placeholder text from search field.
	//app.addPlaceholderText = function () {
		//var $search_field = $( this );

		//$search_field.attr( 'placeholder', $search_field.data( 'placeholder' ) ).data( 'placeholder', '' );
	//};

	// Engage!
	$( app.init );
} )( window, jQuery, window.teMenu );
