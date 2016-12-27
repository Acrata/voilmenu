'use strict';

/**
 * File js-enabled.js
 *
 * If Javascript is enabled, replace the <body> class "no-js".
 */
document.body.className = document.body.className.replace('no-js', 'js');
'use strict';

/**
 * File js-te
 *
 * TTE
 */
window.teMenu = {};

(function (window, $, app) {
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
			'body': $('body')
		};
	};

	app.te = function () {
		console.log("offman");
	};

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
	$(app.init);
})(window, jQuery, window.teMenu);
'use strict';

/**
 * File modal.js
 *
 * Deal with multiple modals and their media.
 */
window.wdsModal = {};

(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();

		if (app.meetsRequirements()) {
			app.bindEvents();
		}
	};

	// Cache all the things.
	app.cache = function () {
		app.$c = {
			'body': $('body')
		};
	};

	// Do we meet the requirements?
	app.meetsRequirements = function () {
		return $('.modal-trigger').length;
	};

	// Combine all events.
	app.bindEvents = function () {
		// Trigger a modal to open.
		app.$c.body.on('click touchstart', '.modal-trigger', app.openModal);

		// Trigger the close button to close the modal.
		app.$c.body.on('click touchstart', '.close', app.closeModal);

		// Allow the user to close the modal by hitting the esc key.
		app.$c.body.on('keydown', app.escKeyClose);

		// Allow the user to close the modal by clicking outside of the modal.
		app.$c.body.on('click touchstart', 'div.modal-open', app.closeModalByClick);
	};

	// Open the modal.
	app.openModal = function () {
		// Figure out which modal we're opening and store the object.
		var $modal = $($(this).data('target'));

		// Display the modal.
		$modal.addClass('modal-open');

		// Add body class.
		app.$c.body.addClass('modal-open');
	};

	// Close the modal.
	app.closeModal = function () {
		// Figure the opened modal we're closing and store the object.
		var $modal = $($('div.modal-open .close').data('target'));

		// Find the iframe in the $modal object.
		var $iframe = $modal.find('iframe');

		// Get the iframe src URL.
		var url = $iframe.attr('src');

		// Remove the source URL, then add it back, so the video can be played again later.
		$iframe.attr('src', '').attr('src', url);

		// Finally, hide the modal.
		$modal.removeClass('modal-open');

		// Remove the body class.
		app.$c.body.removeClass('modal-open');
	};

	// Close if "esc" key is pressed.
	app.escKeyClose = function (event) {
		if (27 === event.keyCode) {
			app.closeModal();
		}
	};

	// Close if the user clicks outside of the modal
	app.closeModalByClick = function (event) {
		// If the parent container is NOT the modal dialog container, close the modal
		if (!$(event.target).parents('div').hasClass('modal-dialog')) {
			app.closeModal();
		}
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.wdsModal);
'use strict';

/**
 * File search.js
 *
 * Deal with the search form.
 */
window.wdsSearch = {};

(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();

		if (app.meetsRequirements()) {
			app.bindEvents();
		}
	};

	// Cache all the things.
	app.cache = function () {
		app.$c = {
			'body': $('body')
		};
	};

	// Do we meet the requirements?
	app.meetsRequirements = function () {
		return $('.search-field').length;
	};

	// Combine all events.
	app.bindEvents = function () {
		// Remove placeholder text from search field on focus.
		app.$c.body.on('focus', '.search-field', app.removePlaceholderText);

		// Add placeholder text back to search field on blur.
		app.$c.body.on('blur', '.search-field', app.addPlaceholderText);
	};

	// Remove placeholder text from search field.
	app.removePlaceholderText = function () {
		var $search_field = $(this);

		$search_field.data('placeholder', $search_field.attr('placeholder')).attr('placeholder', '');
	};

	// Replace placeholder text from search field.
	app.addPlaceholderText = function () {
		var $search_field = $(this);

		$search_field.attr('placeholder', $search_field.data('placeholder')).data('placeholder', '');
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.wdsSearch);
'use strict';

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
		window.addEventListener('hashchange', function () {
			var id = location.hash.substring(1),
			    element;

			if (!/^[A-z0-9_-]+$/.test(id)) {
				return;
			}

			element = document.getElementById(id);

			if (element) {
				if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false);
	}
})();
'use strict';

/**
 * File window-ready.js
 *
 * Add a "ready" class to <body> when window is ready.
 */
window.wdsWindowReady = {};
(function (window, $, app) {
	// Constructor.
	app.init = function () {
		app.cache();
		app.bindEvents();
		app.offcanva();
	};

	// Cache document elements.
	app.cache = function () {
		app.$c = {
			'window': $(window),
			'body': $(document.body)
		};
	};

	// Combine all events.
	app.bindEvents = function () {
		app.$c.window.load(app.addBodyClass);
	};

	// Add a class to <body>.
	app.addBodyClass = function () {
		app.$c.body.addClass('ready');
	};

	app.offcanva = function () {
		console.log("off");
	};

	// Engage!
	$(app.init);
})(window, jQuery, window.wdsWindowReady);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLWVuYWJsZWQuanMiLCJqcy10ZS5qcyIsIm1vZGFsLmpzIiwic2VhcmNoLmpzIiwic2tpcC1saW5rLWZvY3VzLWZpeC5qcyIsIndpbmRvdy1yZWFkeS5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImJvZHkiLCJjbGFzc05hbWUiLCJyZXBsYWNlIiwid2luZG93IiwidGVNZW51IiwiJCIsImFwcCIsImluaXQiLCJjYWNoZSIsInRlIiwiJGMiLCJjb25zb2xlIiwibG9nIiwialF1ZXJ5Iiwid2RzTW9kYWwiLCJtZWV0c1JlcXVpcmVtZW50cyIsImJpbmRFdmVudHMiLCJsZW5ndGgiLCJvbiIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJlc2NLZXlDbG9zZSIsImNsb3NlTW9kYWxCeUNsaWNrIiwiJG1vZGFsIiwiZGF0YSIsImFkZENsYXNzIiwiJGlmcmFtZSIsImZpbmQiLCJ1cmwiLCJhdHRyIiwicmVtb3ZlQ2xhc3MiLCJldmVudCIsImtleUNvZGUiLCJ0YXJnZXQiLCJwYXJlbnRzIiwiaGFzQ2xhc3MiLCJ3ZHNTZWFyY2giLCJyZW1vdmVQbGFjZWhvbGRlclRleHQiLCJhZGRQbGFjZWhvbGRlclRleHQiLCIkc2VhcmNoX2ZpZWxkIiwiaXNXZWJraXQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJpc09wZXJhIiwiaXNJZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwibG9jYXRpb24iLCJoYXNoIiwic3Vic3RyaW5nIiwiZWxlbWVudCIsInRlc3QiLCJ0YWdOYW1lIiwidGFiSW5kZXgiLCJmb2N1cyIsIndkc1dpbmRvd1JlYWR5Iiwib2ZmY2FudmEiLCJsb2FkIiwiYWRkQm9keUNsYXNzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBQSxTQUFTQyxJQUFULENBQWNDLFNBQWQsR0FBMEJGLFNBQVNDLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkMsT0FBeEIsQ0FBaUMsT0FBakMsRUFBMEMsSUFBMUMsQ0FBMUI7OztBQ0xBOzs7OztBQUtBQyxPQUFPQyxNQUFQLEdBQWdCLEVBQWhCOztBQUVBLENBQUUsVUFBV0QsTUFBWCxFQUFtQkUsQ0FBbkIsRUFBc0JDLEdBQXRCLEVBQTRCO0FBQzdCO0FBQ0FBLEtBQUlDLElBQUosR0FBVyxZQUFZO0FBQ3RCRCxNQUFJRSxLQUFKO0FBQ01GLE1BQUlHLEVBQUo7QUFDTjtBQUNDO0FBQ0Q7QUFDQSxFQU5EOztBQVFBO0FBQ0FILEtBQUlFLEtBQUosR0FBWSxZQUFZO0FBQ3ZCRixNQUFJSSxFQUFKLEdBQVM7QUFDUixXQUFRTCxFQUFHLE1BQUg7QUFEQSxHQUFUO0FBR0EsRUFKRDs7QUFNR0MsS0FBSUcsRUFBSixHQUFTLFlBQVk7QUFDakJFLFVBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsRUFGRDs7QUFJSDtBQUNBO0FBQ0M7QUFDRDs7QUFFQTtBQUNBO0FBQ0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0Q7O0FBRUE7QUFDQTtBQUNDOztBQUVBO0FBQ0Q7O0FBRUE7QUFDQTtBQUNDOztBQUVBO0FBQ0Q7O0FBRUE7QUFDQVAsR0FBR0MsSUFBSUMsSUFBUDtBQUNBLENBbkRELEVBbURLSixNQW5ETCxFQW1EYVUsTUFuRGIsRUFtRHFCVixPQUFPQyxNQW5ENUI7OztBQ1BBOzs7OztBQUtBRCxPQUFPVyxRQUFQLEdBQWtCLEVBQWxCOztBQUVBLENBQUUsVUFBV1gsTUFBWCxFQUFtQkUsQ0FBbkIsRUFBc0JDLEdBQXRCLEVBQTRCO0FBQzdCO0FBQ0FBLEtBQUlDLElBQUosR0FBVyxZQUFZO0FBQ3RCRCxNQUFJRSxLQUFKOztBQUVBLE1BQUtGLElBQUlTLGlCQUFKLEVBQUwsRUFBK0I7QUFDOUJULE9BQUlVLFVBQUo7QUFDQTtBQUNELEVBTkQ7O0FBUUE7QUFDQVYsS0FBSUUsS0FBSixHQUFZLFlBQVk7QUFDdkJGLE1BQUlJLEVBQUosR0FBUztBQUNSLFdBQVFMLEVBQUcsTUFBSDtBQURBLEdBQVQ7QUFHQSxFQUpEOztBQU1BO0FBQ0FDLEtBQUlTLGlCQUFKLEdBQXdCLFlBQVk7QUFDbkMsU0FBT1YsRUFBRyxnQkFBSCxFQUFzQlksTUFBN0I7QUFDQSxFQUZEOztBQUlBO0FBQ0FYLEtBQUlVLFVBQUosR0FBaUIsWUFBWTtBQUM1QjtBQUNBVixNQUFJSSxFQUFKLENBQU9WLElBQVAsQ0FBWWtCLEVBQVosQ0FBZ0Isa0JBQWhCLEVBQW9DLGdCQUFwQyxFQUFzRFosSUFBSWEsU0FBMUQ7O0FBRUE7QUFDQWIsTUFBSUksRUFBSixDQUFPVixJQUFQLENBQVlrQixFQUFaLENBQWdCLGtCQUFoQixFQUFvQyxRQUFwQyxFQUE4Q1osSUFBSWMsVUFBbEQ7O0FBRUE7QUFDQWQsTUFBSUksRUFBSixDQUFPVixJQUFQLENBQVlrQixFQUFaLENBQWdCLFNBQWhCLEVBQTJCWixJQUFJZSxXQUEvQjs7QUFFQTtBQUNBZixNQUFJSSxFQUFKLENBQU9WLElBQVAsQ0FBWWtCLEVBQVosQ0FBZ0Isa0JBQWhCLEVBQW9DLGdCQUFwQyxFQUFzRFosSUFBSWdCLGlCQUExRDtBQUNBLEVBWkQ7O0FBY0E7QUFDQWhCLEtBQUlhLFNBQUosR0FBZ0IsWUFBWTtBQUMzQjtBQUNBLE1BQUlJLFNBQVNsQixFQUFHQSxFQUFHLElBQUgsRUFBVW1CLElBQVYsQ0FBZ0IsUUFBaEIsQ0FBSCxDQUFiOztBQUVBO0FBQ0FELFNBQU9FLFFBQVAsQ0FBaUIsWUFBakI7O0FBRUE7QUFDQW5CLE1BQUlJLEVBQUosQ0FBT1YsSUFBUCxDQUFZeUIsUUFBWixDQUFzQixZQUF0QjtBQUNBLEVBVEQ7O0FBV0E7QUFDQW5CLEtBQUljLFVBQUosR0FBaUIsWUFBWTtBQUM1QjtBQUNBLE1BQUlHLFNBQVNsQixFQUFHQSxFQUFHLHVCQUFILEVBQTZCbUIsSUFBN0IsQ0FBbUMsUUFBbkMsQ0FBSCxDQUFiOztBQUVBO0FBQ0EsTUFBSUUsVUFBVUgsT0FBT0ksSUFBUCxDQUFhLFFBQWIsQ0FBZDs7QUFFQTtBQUNBLE1BQUlDLE1BQU1GLFFBQVFHLElBQVIsQ0FBYyxLQUFkLENBQVY7O0FBRUE7QUFDQUgsVUFBUUcsSUFBUixDQUFjLEtBQWQsRUFBcUIsRUFBckIsRUFBMEJBLElBQTFCLENBQWdDLEtBQWhDLEVBQXVDRCxHQUF2Qzs7QUFFQTtBQUNBTCxTQUFPTyxXQUFQLENBQW9CLFlBQXBCOztBQUVBO0FBQ0F4QixNQUFJSSxFQUFKLENBQU9WLElBQVAsQ0FBWThCLFdBQVosQ0FBeUIsWUFBekI7QUFDQSxFQWxCRDs7QUFvQkE7QUFDQXhCLEtBQUllLFdBQUosR0FBa0IsVUFBV1UsS0FBWCxFQUFtQjtBQUNwQyxNQUFLLE9BQU9BLE1BQU1DLE9BQWxCLEVBQTRCO0FBQzNCMUIsT0FBSWMsVUFBSjtBQUNBO0FBQ0QsRUFKRDs7QUFNQTtBQUNBZCxLQUFJZ0IsaUJBQUosR0FBd0IsVUFBV1MsS0FBWCxFQUFtQjtBQUMxQztBQUNBLE1BQUssQ0FBQzFCLEVBQUcwQixNQUFNRSxNQUFULEVBQWtCQyxPQUFsQixDQUEyQixLQUEzQixFQUFtQ0MsUUFBbkMsQ0FBNkMsY0FBN0MsQ0FBTixFQUFzRTtBQUNyRTdCLE9BQUljLFVBQUo7QUFDQTtBQUNELEVBTEQ7O0FBT0E7QUFDQWYsR0FBR0MsSUFBSUMsSUFBUDtBQUNBLENBdkZELEVBdUZLSixNQXZGTCxFQXVGYVUsTUF2RmIsRUF1RnFCVixPQUFPVyxRQXZGNUI7OztBQ1BBOzs7OztBQUtBWCxPQUFPaUMsU0FBUCxHQUFtQixFQUFuQjs7QUFFQSxDQUFFLFVBQVdqQyxNQUFYLEVBQW1CRSxDQUFuQixFQUFzQkMsR0FBdEIsRUFBNEI7QUFDN0I7QUFDQUEsS0FBSUMsSUFBSixHQUFXLFlBQVk7QUFDdEJELE1BQUlFLEtBQUo7O0FBRUEsTUFBS0YsSUFBSVMsaUJBQUosRUFBTCxFQUErQjtBQUM5QlQsT0FBSVUsVUFBSjtBQUNBO0FBQ0QsRUFORDs7QUFRQTtBQUNBVixLQUFJRSxLQUFKLEdBQVksWUFBWTtBQUN2QkYsTUFBSUksRUFBSixHQUFTO0FBQ1IsV0FBUUwsRUFBRyxNQUFIO0FBREEsR0FBVDtBQUdBLEVBSkQ7O0FBTUE7QUFDQUMsS0FBSVMsaUJBQUosR0FBd0IsWUFBWTtBQUNuQyxTQUFPVixFQUFHLGVBQUgsRUFBcUJZLE1BQTVCO0FBQ0EsRUFGRDs7QUFJQTtBQUNBWCxLQUFJVSxVQUFKLEdBQWlCLFlBQVk7QUFDNUI7QUFDQVYsTUFBSUksRUFBSixDQUFPVixJQUFQLENBQVlrQixFQUFaLENBQWdCLE9BQWhCLEVBQXlCLGVBQXpCLEVBQTBDWixJQUFJK0IscUJBQTlDOztBQUVBO0FBQ0EvQixNQUFJSSxFQUFKLENBQU9WLElBQVAsQ0FBWWtCLEVBQVosQ0FBZ0IsTUFBaEIsRUFBd0IsZUFBeEIsRUFBeUNaLElBQUlnQyxrQkFBN0M7QUFDQSxFQU5EOztBQVFBO0FBQ0FoQyxLQUFJK0IscUJBQUosR0FBNEIsWUFBWTtBQUN2QyxNQUFJRSxnQkFBZ0JsQyxFQUFHLElBQUgsQ0FBcEI7O0FBRUFrQyxnQkFBY2YsSUFBZCxDQUFvQixhQUFwQixFQUFtQ2UsY0FBY1YsSUFBZCxDQUFvQixhQUFwQixDQUFuQyxFQUF5RUEsSUFBekUsQ0FBK0UsYUFBL0UsRUFBOEYsRUFBOUY7QUFDQSxFQUpEOztBQU1BO0FBQ0F2QixLQUFJZ0Msa0JBQUosR0FBeUIsWUFBWTtBQUNwQyxNQUFJQyxnQkFBZ0JsQyxFQUFHLElBQUgsQ0FBcEI7O0FBRUFrQyxnQkFBY1YsSUFBZCxDQUFvQixhQUFwQixFQUFtQ1UsY0FBY2YsSUFBZCxDQUFvQixhQUFwQixDQUFuQyxFQUF5RUEsSUFBekUsQ0FBK0UsYUFBL0UsRUFBOEYsRUFBOUY7QUFDQSxFQUpEOztBQU1BO0FBQ0FuQixHQUFHQyxJQUFJQyxJQUFQO0FBQ0EsQ0EvQ0QsRUErQ0tKLE1BL0NMLEVBK0NhVSxNQS9DYixFQStDcUJWLE9BQU9pQyxTQS9DNUI7OztBQ1BBOzs7Ozs7O0FBT0EsQ0FBRSxZQUFZO0FBQ2IsS0FBSUksV0FBV0MsVUFBVUMsU0FBVixDQUFvQkMsV0FBcEIsR0FBa0NDLE9BQWxDLENBQTJDLFFBQTNDLElBQXdELENBQUMsQ0FBeEU7QUFBQSxLQUNDQyxVQUFVSixVQUFVQyxTQUFWLENBQW9CQyxXQUFwQixHQUFrQ0MsT0FBbEMsQ0FBMkMsT0FBM0MsSUFBdUQsQ0FBQyxDQURuRTtBQUFBLEtBRUNFLE9BQU9MLFVBQVVDLFNBQVYsQ0FBb0JDLFdBQXBCLEdBQWtDQyxPQUFsQyxDQUEyQyxNQUEzQyxJQUFzRCxDQUFDLENBRi9EOztBQUlBLEtBQUssQ0FBRUosWUFBWUssT0FBWixJQUF1QkMsSUFBekIsS0FBbUMvQyxTQUFTZ0QsY0FBNUMsSUFBOEQ1QyxPQUFPNkMsZ0JBQTFFLEVBQTZGO0FBQzVGN0MsU0FBTzZDLGdCQUFQLENBQXlCLFlBQXpCLEVBQXVDLFlBQVk7QUFDbEQsT0FBSUMsS0FBS0MsU0FBU0MsSUFBVCxDQUFjQyxTQUFkLENBQXlCLENBQXpCLENBQVQ7QUFBQSxPQUNDQyxPQUREOztBQUdBLE9BQUssQ0FBRyxlQUFGLENBQW9CQyxJQUFwQixDQUEwQkwsRUFBMUIsQ0FBTixFQUF1QztBQUN0QztBQUNBOztBQUVESSxhQUFVdEQsU0FBU2dELGNBQVQsQ0FBeUJFLEVBQXpCLENBQVY7O0FBRUEsT0FBS0ksT0FBTCxFQUFlO0FBQ2QsUUFBSyxDQUFHLHVDQUFGLENBQTRDQyxJQUE1QyxDQUFrREQsUUFBUUUsT0FBMUQsQ0FBTixFQUE0RTtBQUMzRUYsYUFBUUcsUUFBUixHQUFtQixDQUFDLENBQXBCO0FBQ0E7O0FBRURILFlBQVFJLEtBQVI7QUFDQTtBQUNELEdBakJELEVBaUJHLEtBakJIO0FBa0JBO0FBQ0QsQ0F6QkQ7OztBQ1BBOzs7OztBQUtBdEQsT0FBT3VELGNBQVAsR0FBd0IsRUFBeEI7QUFDQSxDQUFFLFVBQVd2RCxNQUFYLEVBQW1CRSxDQUFuQixFQUFzQkMsR0FBdEIsRUFBNEI7QUFDN0I7QUFDQUEsS0FBSUMsSUFBSixHQUFXLFlBQVk7QUFDdEJELE1BQUlFLEtBQUo7QUFDQUYsTUFBSVUsVUFBSjtBQUNBVixNQUFJcUQsUUFBSjtBQUNBLEVBSkQ7O0FBTUE7QUFDQXJELEtBQUlFLEtBQUosR0FBWSxZQUFZO0FBQ3ZCRixNQUFJSSxFQUFKLEdBQVM7QUFDUixhQUFVTCxFQUFHRixNQUFILENBREY7QUFFUixXQUFRRSxFQUFHTixTQUFTQyxJQUFaO0FBRkEsR0FBVDtBQUlBLEVBTEQ7O0FBT0E7QUFDQU0sS0FBSVUsVUFBSixHQUFpQixZQUFZO0FBQzVCVixNQUFJSSxFQUFKLENBQU9QLE1BQVAsQ0FBY3lELElBQWQsQ0FBb0J0RCxJQUFJdUQsWUFBeEI7QUFDQSxFQUZEOztBQUlBO0FBQ0F2RCxLQUFJdUQsWUFBSixHQUFtQixZQUFZO0FBQzlCdkQsTUFBSUksRUFBSixDQUFPVixJQUFQLENBQVl5QixRQUFaLENBQXNCLE9BQXRCO0FBQ0EsRUFGRDs7QUFJR25CLEtBQUlxRCxRQUFKLEdBQWUsWUFBWTtBQUN4QmhELFVBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0YsRUFGRDs7QUFJSDtBQUNBUCxHQUFHQyxJQUFJQyxJQUFQO0FBQ0EsQ0FoQ0QsRUFnQ0tKLE1BaENMLEVBZ0NhVSxNQWhDYixFQWdDcUJWLE9BQU91RCxjQWhDNUIiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZSBqcy1lbmFibGVkLmpzXG4gKlxuICogSWYgSmF2YXNjcmlwdCBpcyBlbmFibGVkLCByZXBsYWNlIHRoZSA8Ym9keT4gY2xhc3MgXCJuby1qc1wiLlxuICovXG5kb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoICduby1qcycsICdqcycgKTtcbiIsIi8qKlxuICogRmlsZSBqcy10ZVxuICpcbiAqIFRURVxuICovXG53aW5kb3cudGVNZW51ID0ge307XG5cbiggZnVuY3Rpb24gKCB3aW5kb3csICQsIGFwcCApIHtcblx0Ly8gQ29uc3RydWN0b3IuXG5cdGFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5jYWNoZSgpO1xuICAgICAgICBhcHAudGUoKTtcblx0XHQvL2lmICggYXBwLm1lZXRzUmVxdWlyZW1lbnRzKCkgKSB7XG5cdFx0XHQvL2FwcC5iaW5kRXZlbnRzKCk7XG5cdFx0Ly99XG5cdH07XG5cblx0Ly8gQ2FjaGUgYWxsIHRoZSB0aGluZ3MuXG5cdGFwcC5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMgPSB7XG5cdFx0XHQnYm9keSc6ICQoICdib2R5JyApXG5cdFx0fTtcblx0fTtcblxuICAgIGFwcC50ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvZmZtYW5cIik7XG4gICAgfVxuXG5cdC8vIERvIHdlIG1lZXQgdGhlIHJlcXVpcmVtZW50cz9cblx0Ly9hcHAubWVldHNSZXF1aXJlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly9yZXR1cm4gJCggJy5zZWFyY2gtZmllbGQnICkubGVuZ3RoO1xuXHQvL307XG5cblx0Ly8gQ29tYmluZSBhbGwgZXZlbnRzLlxuXHQvL2FwcC5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIFJlbW92ZSBwbGFjZWhvbGRlciB0ZXh0IGZyb20gc2VhcmNoIGZpZWxkIG9uIGZvY3VzLlxuXHRcdC8vYXBwLiRjLmJvZHkub24oICdmb2N1cycsICcuc2VhcmNoLWZpZWxkJywgYXBwLnJlbW92ZVBsYWNlaG9sZGVyVGV4dCApO1xuXG5cdFx0Ly8gQWRkIHBsYWNlaG9sZGVyIHRleHQgYmFjayB0byBzZWFyY2ggZmllbGQgb24gYmx1ci5cblx0XHQvL2FwcC4kYy5ib2R5Lm9uKCAnYmx1cicsICcuc2VhcmNoLWZpZWxkJywgYXBwLmFkZFBsYWNlaG9sZGVyVGV4dCApO1xuXHQvL307XG5cblx0Ly8gUmVtb3ZlIHBsYWNlaG9sZGVyIHRleHQgZnJvbSBzZWFyY2ggZmllbGQuXG5cdC8vYXBwLnJlbW92ZVBsYWNlaG9sZGVyVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHQvL3ZhciAkc2VhcmNoX2ZpZWxkID0gJCggdGhpcyApO1xuXG5cdFx0Ly8kc2VhcmNoX2ZpZWxkLmRhdGEoICdwbGFjZWhvbGRlcicsICRzZWFyY2hfZmllbGQuYXR0ciggJ3BsYWNlaG9sZGVyJyApICkuYXR0ciggJ3BsYWNlaG9sZGVyJywgJycgKTtcblx0Ly99O1xuXG5cdC8vIFJlcGxhY2UgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZC5cblx0Ly9hcHAuYWRkUGxhY2Vob2xkZXJUZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vdmFyICRzZWFyY2hfZmllbGQgPSAkKCB0aGlzICk7XG5cblx0XHQvLyRzZWFyY2hfZmllbGQuYXR0ciggJ3BsYWNlaG9sZGVyJywgJHNlYXJjaF9maWVsZC5kYXRhKCAncGxhY2Vob2xkZXInICkgKS5kYXRhKCAncGxhY2Vob2xkZXInLCAnJyApO1xuXHQvL307XG5cblx0Ly8gRW5nYWdlIVxuXHQkKCBhcHAuaW5pdCApO1xufSApKCB3aW5kb3csIGpRdWVyeSwgd2luZG93LnRlTWVudSApO1xuIiwiLyoqXG4gKiBGaWxlIG1vZGFsLmpzXG4gKlxuICogRGVhbCB3aXRoIG11bHRpcGxlIG1vZGFscyBhbmQgdGhlaXIgbWVkaWEuXG4gKi9cbndpbmRvdy53ZHNNb2RhbCA9IHt9O1xuXG4oIGZ1bmN0aW9uICggd2luZG93LCAkLCBhcHAgKSB7XG5cdC8vIENvbnN0cnVjdG9yLlxuXHRhcHAuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuY2FjaGUoKTtcblxuXHRcdGlmICggYXBwLm1lZXRzUmVxdWlyZW1lbnRzKCkgKSB7XG5cdFx0XHRhcHAuYmluZEV2ZW50cygpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBDYWNoZSBhbGwgdGhlIHRoaW5ncy5cblx0YXBwLmNhY2hlID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC4kYyA9IHtcblx0XHRcdCdib2R5JzogJCggJ2JvZHknIClcblx0XHR9O1xuXHR9O1xuXG5cdC8vIERvIHdlIG1lZXQgdGhlIHJlcXVpcmVtZW50cz9cblx0YXBwLm1lZXRzUmVxdWlyZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAkKCAnLm1vZGFsLXRyaWdnZXInICkubGVuZ3RoO1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgYWxsIGV2ZW50cy5cblx0YXBwLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gVHJpZ2dlciBhIG1vZGFsIHRvIG9wZW4uXG5cdFx0YXBwLiRjLmJvZHkub24oICdjbGljayB0b3VjaHN0YXJ0JywgJy5tb2RhbC10cmlnZ2VyJywgYXBwLm9wZW5Nb2RhbCApO1xuXG5cdFx0Ly8gVHJpZ2dlciB0aGUgY2xvc2UgYnV0dG9uIHRvIGNsb3NlIHRoZSBtb2RhbC5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmNsb3NlJywgYXBwLmNsb3NlTW9kYWwgKTtcblxuXHRcdC8vIEFsbG93IHRoZSB1c2VyIHRvIGNsb3NlIHRoZSBtb2RhbCBieSBoaXR0aW5nIHRoZSBlc2Mga2V5LlxuXHRcdGFwcC4kYy5ib2R5Lm9uKCAna2V5ZG93bicsIGFwcC5lc2NLZXlDbG9zZSApO1xuXG5cdFx0Ly8gQWxsb3cgdGhlIHVzZXIgdG8gY2xvc2UgdGhlIG1vZGFsIGJ5IGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIG1vZGFsLlxuXHRcdGFwcC4kYy5ib2R5Lm9uKCAnY2xpY2sgdG91Y2hzdGFydCcsICdkaXYubW9kYWwtb3BlbicsIGFwcC5jbG9zZU1vZGFsQnlDbGljayApO1xuXHR9O1xuXG5cdC8vIE9wZW4gdGhlIG1vZGFsLlxuXHRhcHAub3Blbk1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIEZpZ3VyZSBvdXQgd2hpY2ggbW9kYWwgd2UncmUgb3BlbmluZyBhbmQgc3RvcmUgdGhlIG9iamVjdC5cblx0XHR2YXIgJG1vZGFsID0gJCggJCggdGhpcyApLmRhdGEoICd0YXJnZXQnICkgKTtcblxuXHRcdC8vIERpc3BsYXkgdGhlIG1vZGFsLlxuXHRcdCRtb2RhbC5hZGRDbGFzcyggJ21vZGFsLW9wZW4nICk7XG5cblx0XHQvLyBBZGQgYm9keSBjbGFzcy5cblx0XHRhcHAuJGMuYm9keS5hZGRDbGFzcyggJ21vZGFsLW9wZW4nICk7XG5cdH07XG5cblx0Ly8gQ2xvc2UgdGhlIG1vZGFsLlxuXHRhcHAuY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBGaWd1cmUgdGhlIG9wZW5lZCBtb2RhbCB3ZSdyZSBjbG9zaW5nIGFuZCBzdG9yZSB0aGUgb2JqZWN0LlxuXHRcdHZhciAkbW9kYWwgPSAkKCAkKCAnZGl2Lm1vZGFsLW9wZW4gLmNsb3NlJyApLmRhdGEoICd0YXJnZXQnICkgKTtcblxuXHRcdC8vIEZpbmQgdGhlIGlmcmFtZSBpbiB0aGUgJG1vZGFsIG9iamVjdC5cblx0XHR2YXIgJGlmcmFtZSA9ICRtb2RhbC5maW5kKCAnaWZyYW1lJyApO1xuXG5cdFx0Ly8gR2V0IHRoZSBpZnJhbWUgc3JjIFVSTC5cblx0XHR2YXIgdXJsID0gJGlmcmFtZS5hdHRyKCAnc3JjJyApO1xuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBzb3VyY2UgVVJMLCB0aGVuIGFkZCBpdCBiYWNrLCBzbyB0aGUgdmlkZW8gY2FuIGJlIHBsYXllZCBhZ2FpbiBsYXRlci5cblx0XHQkaWZyYW1lLmF0dHIoICdzcmMnLCAnJyApLmF0dHIoICdzcmMnLCB1cmwgKTtcblxuXHRcdC8vIEZpbmFsbHksIGhpZGUgdGhlIG1vZGFsLlxuXHRcdCRtb2RhbC5yZW1vdmVDbGFzcyggJ21vZGFsLW9wZW4nICk7XG5cblx0XHQvLyBSZW1vdmUgdGhlIGJvZHkgY2xhc3MuXG5cdFx0YXBwLiRjLmJvZHkucmVtb3ZlQ2xhc3MoICdtb2RhbC1vcGVuJyApO1xuXHR9O1xuXG5cdC8vIENsb3NlIGlmIFwiZXNjXCIga2V5IGlzIHByZXNzZWQuXG5cdGFwcC5lc2NLZXlDbG9zZSA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0aWYgKCAyNyA9PT0gZXZlbnQua2V5Q29kZSApIHtcblx0XHRcdGFwcC5jbG9zZU1vZGFsKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIENsb3NlIGlmIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBtb2RhbFxuXHRhcHAuY2xvc2VNb2RhbEJ5Q2xpY2sgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdC8vIElmIHRoZSBwYXJlbnQgY29udGFpbmVyIGlzIE5PVCB0aGUgbW9kYWwgZGlhbG9nIGNvbnRhaW5lciwgY2xvc2UgdGhlIG1vZGFsXG5cdFx0aWYgKCAhJCggZXZlbnQudGFyZ2V0ICkucGFyZW50cyggJ2RpdicgKS5oYXNDbGFzcyggJ21vZGFsLWRpYWxvZycgKSApIHtcblx0XHRcdGFwcC5jbG9zZU1vZGFsKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEVuZ2FnZSFcblx0JCggYXBwLmluaXQgKTtcbn0gKSggd2luZG93LCBqUXVlcnksIHdpbmRvdy53ZHNNb2RhbCApO1xuIiwiLyoqXG4gKiBGaWxlIHNlYXJjaC5qc1xuICpcbiAqIERlYWwgd2l0aCB0aGUgc2VhcmNoIGZvcm0uXG4gKi9cbndpbmRvdy53ZHNTZWFyY2ggPSB7fTtcblxuKCBmdW5jdGlvbiAoIHdpbmRvdywgJCwgYXBwICkge1xuXHQvLyBDb25zdHJ1Y3Rvci5cblx0YXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLmNhY2hlKCk7XG5cblx0XHRpZiAoIGFwcC5tZWV0c1JlcXVpcmVtZW50cygpICkge1xuXHRcdFx0YXBwLmJpbmRFdmVudHMoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ2FjaGUgYWxsIHRoZSB0aGluZ3MuXG5cdGFwcC5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMgPSB7XG5cdFx0XHQnYm9keSc6ICQoICdib2R5JyApXG5cdFx0fTtcblx0fTtcblxuXHQvLyBEbyB3ZSBtZWV0IHRoZSByZXF1aXJlbWVudHM/XG5cdGFwcC5tZWV0c1JlcXVpcmVtZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gJCggJy5zZWFyY2gtZmllbGQnICkubGVuZ3RoO1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgYWxsIGV2ZW50cy5cblx0YXBwLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gUmVtb3ZlIHBsYWNlaG9sZGVyIHRleHQgZnJvbSBzZWFyY2ggZmllbGQgb24gZm9jdXMuXG5cdFx0YXBwLiRjLmJvZHkub24oICdmb2N1cycsICcuc2VhcmNoLWZpZWxkJywgYXBwLnJlbW92ZVBsYWNlaG9sZGVyVGV4dCApO1xuXG5cdFx0Ly8gQWRkIHBsYWNlaG9sZGVyIHRleHQgYmFjayB0byBzZWFyY2ggZmllbGQgb24gYmx1ci5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2JsdXInLCAnLnNlYXJjaC1maWVsZCcsIGFwcC5hZGRQbGFjZWhvbGRlclRleHQgKTtcblx0fTtcblxuXHQvLyBSZW1vdmUgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZC5cblx0YXBwLnJlbW92ZVBsYWNlaG9sZGVyVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgJHNlYXJjaF9maWVsZCA9ICQoIHRoaXMgKTtcblxuXHRcdCRzZWFyY2hfZmllbGQuZGF0YSggJ3BsYWNlaG9sZGVyJywgJHNlYXJjaF9maWVsZC5hdHRyKCAncGxhY2Vob2xkZXInICkgKS5hdHRyKCAncGxhY2Vob2xkZXInLCAnJyApO1xuXHR9O1xuXG5cdC8vIFJlcGxhY2UgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZC5cblx0YXBwLmFkZFBsYWNlaG9sZGVyVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgJHNlYXJjaF9maWVsZCA9ICQoIHRoaXMgKTtcblxuXHRcdCRzZWFyY2hfZmllbGQuYXR0ciggJ3BsYWNlaG9sZGVyJywgJHNlYXJjaF9maWVsZC5kYXRhKCAncGxhY2Vob2xkZXInICkgKS5kYXRhKCAncGxhY2Vob2xkZXInLCAnJyApO1xuXHR9O1xuXG5cdC8vIEVuZ2FnZSFcblx0JCggYXBwLmluaXQgKTtcbn0gKSggd2luZG93LCBqUXVlcnksIHdpbmRvdy53ZHNTZWFyY2ggKTtcbiIsIi8qKlxuICogRmlsZSBza2lwLWxpbmstZm9jdXMtZml4LmpzLlxuICpcbiAqIEhlbHBzIHdpdGggYWNjZXNzaWJpbGl0eSBmb3Iga2V5Ym9hcmQgb25seSB1c2Vycy5cbiAqXG4gKiBMZWFybiBtb3JlOiBodHRwczovL2dpdC5pby92V2RyMlxuICovXG4oIGZ1bmN0aW9uICgpIHtcblx0dmFyIGlzV2Via2l0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoICd3ZWJraXQnICkgPiAtMSxcblx0XHRpc09wZXJhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoICdvcGVyYScgKSA+IC0xLFxuXHRcdGlzSWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggJ21zaWUnICkgPiAtMTtcblxuXHRpZiAoICggaXNXZWJraXQgfHwgaXNPcGVyYSB8fCBpc0llICkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGlkID0gbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoIDEgKSxcblx0XHRcdFx0ZWxlbWVudDtcblxuXHRcdFx0aWYgKCAhKCAvXltBLXowLTlfLV0rJC8gKS50ZXN0KCBpZCApICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblxuXHRcdFx0aWYgKCBlbGVtZW50ICkge1xuXHRcdFx0XHRpZiAoICEoIC9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaSApLnRlc3QoIGVsZW1lbnQudGFnTmFtZSApICkge1xuXHRcdFx0XHRcdGVsZW1lbnQudGFiSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSApO1xuXHR9XG59ICkoKTtcbiIsIi8qKlxuICogRmlsZSB3aW5kb3ctcmVhZHkuanNcbiAqXG4gKiBBZGQgYSBcInJlYWR5XCIgY2xhc3MgdG8gPGJvZHk+IHdoZW4gd2luZG93IGlzIHJlYWR5LlxuICovXG53aW5kb3cud2RzV2luZG93UmVhZHkgPSB7fTtcbiggZnVuY3Rpb24gKCB3aW5kb3csICQsIGFwcCApIHtcblx0Ly8gQ29uc3RydWN0b3IuXG5cdGFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5jYWNoZSgpO1xuXHRcdGFwcC5iaW5kRXZlbnRzKCk7XG5cdFx0YXBwLm9mZmNhbnZhKCk7XG5cdH07XG5cblx0Ly8gQ2FjaGUgZG9jdW1lbnQgZWxlbWVudHMuXG5cdGFwcC5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMgPSB7XG5cdFx0XHQnd2luZG93JzogJCggd2luZG93ICksXG5cdFx0XHQnYm9keSc6ICQoIGRvY3VtZW50LmJvZHkgKVxuXHRcdH07XG5cdH07XG5cblx0Ly8gQ29tYmluZSBhbGwgZXZlbnRzLlxuXHRhcHAuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMud2luZG93LmxvYWQoIGFwcC5hZGRCb2R5Q2xhc3MgKTtcblx0fTtcblxuXHQvLyBBZGQgYSBjbGFzcyB0byA8Ym9keT4uXG5cdGFwcC5hZGRCb2R5Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLiRjLmJvZHkuYWRkQ2xhc3MoICdyZWFkeScgKTtcblx0fTtcblxuICAgIGFwcC5vZmZjYW52YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICBjb25zb2xlLmxvZyhcIm9mZlwiKTtcbiAgICB9O1xuXG5cdC8vIEVuZ2FnZSFcblx0JCggYXBwLmluaXQgKTtcbn0gKSggd2luZG93LCBqUXVlcnksIHdpbmRvdy53ZHNXaW5kb3dSZWFkeSApO1xuIl19
