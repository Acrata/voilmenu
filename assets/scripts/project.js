'use strict';

/**
 * File js-enabled.js
 *
 * If Javascript is enabled, replace the <body> class "no-js".
 */
window.onload = function () {
  document.body.className = document.body.className.replace('no-js', 'js');
};
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
		$("#trigger button").click(function () {
			$(".wrapper-vv").toggleClass("is-open");
		});
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

	// Engage!
	$(app.init);
})(window, jQuery, window.wdsWindowReady);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzLWVuYWJsZWQuanMiLCJqcy10ZS5qcyIsIm1vZGFsLmpzIiwic2VhcmNoLmpzIiwic2tpcC1saW5rLWZvY3VzLWZpeC5qcyIsIndpbmRvdy1yZWFkeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJvbmxvYWQiLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc05hbWUiLCJyZXBsYWNlIiwidGVNZW51IiwiJCIsImFwcCIsImluaXQiLCJjYWNoZSIsInRlIiwiJGMiLCJjb25zb2xlIiwibG9nIiwiY2xpY2siLCJ0b2dnbGVDbGFzcyIsImpRdWVyeSIsIndkc01vZGFsIiwibWVldHNSZXF1aXJlbWVudHMiLCJiaW5kRXZlbnRzIiwibGVuZ3RoIiwib24iLCJvcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwiZXNjS2V5Q2xvc2UiLCJjbG9zZU1vZGFsQnlDbGljayIsIiRtb2RhbCIsImRhdGEiLCJhZGRDbGFzcyIsIiRpZnJhbWUiLCJmaW5kIiwidXJsIiwiYXR0ciIsInJlbW92ZUNsYXNzIiwiZXZlbnQiLCJrZXlDb2RlIiwidGFyZ2V0IiwicGFyZW50cyIsImhhc0NsYXNzIiwid2RzU2VhcmNoIiwicmVtb3ZlUGxhY2Vob2xkZXJUZXh0IiwiYWRkUGxhY2Vob2xkZXJUZXh0IiwiJHNlYXJjaF9maWVsZCIsImlzV2Via2l0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiaXNPcGVyYSIsImlzSWUiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpZCIsImxvY2F0aW9uIiwiaGFzaCIsInN1YnN0cmluZyIsImVsZW1lbnQiLCJ0ZXN0IiwidGFnTmFtZSIsInRhYkluZGV4IiwiZm9jdXMiLCJ3ZHNXaW5kb3dSZWFkeSIsImxvYWQiLCJhZGRCb2R5Q2xhc3MiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0FBS0FBLE9BQU9DLE1BQVAsR0FBZ0IsWUFBVztBQUMzQkMsV0FBU0MsSUFBVCxDQUFjQyxTQUFkLEdB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O0FBQ0FBLEtBQUlDLElBQUosR0FBVyxZQUFZO0FBQ3RCRCxNQUFJRSxLQUFKO0FBQ0FGLE1BQUlZLFVBQUo7QUFDQSxFQUhEOztBQUtBO0FBQ0FaLEtBQUlFLEtBQUosR0FBWSxZQUFZO0FBQ3ZCRixNQUFJSSxFQUFKLEdBQVM7QUFDUixhQUFVTCxFQUFHUCxNQUFILENBREY7QUFFUixXQUFRTyxFQUFHTCxTQUFTQyxJQUFaO0FBRkEsR0FBVDtBQUlBLEVBTEQ7O0FBT0E7QUFDQUssS0FBSVksVUFBSixHQUFpQixZQUFZO0FBQzVCWixNQUFJSSxFQUFKLENBQU9aLE1BQVAsQ0FBYytELElBQWQsQ0FBb0J2RCxJQUFJd0QsWUFBeEI7QUFDQSxFQUZEOztBQUlBO0FBQ0F4RCxLQUFJd0QsWUFBSixHQUFtQixZQUFZO0FBQzlCeEQsTUFBSUksRUFBSixDQUFPVCxJQUFQLENBQVkwQixRQUFaLENBQXNCLE9BQXRCO0FBQ0EsRUFGRDs7QUFLQTtBQUNBdEIsR0FBR0MsSUFBSUMsSUFBUDtBQUNBLENBNUJELEVBNEJLVCxNQTVCTCxFQTRCYWlCLE1BNUJiLEVBNEJxQmpCLE9BQU84RCxjQTVCNUIiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZSBqcy1lbmFibGVkLmpzXG4gKlxuICogSWYgSmF2YXNjcmlwdCBpcyBlbmFibGVkLCByZXBsYWNlIHRoZSA8Ym9keT4gY2xhc3MgXCJuby1qc1wiLlxuICovXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5kb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoICduby1qcycsICdqcycgKTtcbn1cbiIsIi8qKlxuICogRmlsZSBqcy10ZVxuICpcbiAqIFRURVxuICovXG53aW5kb3cudGVNZW51ID0ge307XG5cbiggZnVuY3Rpb24gKCB3aW5kb3csICQsIGFwcCApIHtcblx0Ly8gQ29uc3RydWN0b3IuXG5cdGFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5jYWNoZSgpO1xuICAgICAgICBhcHAudGUoKTtcblx0XHQvL2lmICggYXBwLm1lZXRzUmVxdWlyZW1lbnRzKCkgKSB7XG5cdFx0XHQvL2FwcC5iaW5kRXZlbnRzKCk7XG5cdFx0Ly99XG5cdH07XG5cblx0Ly8gQ2FjaGUgYWxsIHRoZSB0aGluZ3MuXG5cdGFwcC5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMgPSB7XG5cdFx0XHQnYm9keSc6ICQoICdib2R5JyApXG5cdFx0fTtcblx0fTtcblxuICAgIGFwcC50ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvZmZtYW5cIik7XG4kKCBcIiN0cmlnZ2VyIGJ1dHRvblwiICkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIud3JhcHBlci12dlwiKS50b2dnbGVDbGFzcyhcImlzLW9wZW5cIik7XG59KTtcbiAgICB9XG5cblx0Ly8gRG8gd2UgbWVldCB0aGUgcmVxdWlyZW1lbnRzP1xuXHQvL2FwcC5tZWV0c1JlcXVpcmVtZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHQvL3JldHVybiAkKCAnLnNlYXJjaC1maWVsZCcgKS5sZW5ndGg7XG5cdC8vfTtcblxuXHQvLyBDb21iaW5lIGFsbCBldmVudHMuXG5cdC8vYXBwLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gUmVtb3ZlIHBsYWNlaG9sZGVyIHRleHQgZnJvbSBzZWFyY2ggZmllbGQgb24gZm9jdXMuXG5cdFx0Ly9hcHAuJGMuYm9keS5vbiggJ2ZvY3VzJywgJy5zZWFyY2gtZmllbGQnLCBhcHAucmVtb3ZlUGxhY2Vob2xkZXJUZXh0ICk7XG5cblx0XHQvLyBBZGQgcGxhY2Vob2xkZXIgdGV4dCBiYWNrIHRvIHNlYXJjaCBmaWVsZCBvbiBibHVyLlxuXHRcdC8vYXBwLiRjLmJvZHkub24oICdibHVyJywgJy5zZWFyY2gtZmllbGQnLCBhcHAuYWRkUGxhY2Vob2xkZXJUZXh0ICk7XG5cdC8vfTtcblxuXHQvLyBSZW1vdmUgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZC5cblx0Ly9hcHAucmVtb3ZlUGxhY2Vob2xkZXJUZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vdmFyICRzZWFyY2hfZmllbGQgPSAkKCB0aGlzICk7XG5cblx0XHQvLyRzZWFyY2hfZmllbGQuZGF0YSggJ3BsYWNlaG9sZGVyJywgJHNlYXJjaF9maWVsZC5hdHRyKCAncGxhY2Vob2xkZXInICkgKS5hdHRyKCAncGxhY2Vob2xkZXInLCAnJyApO1xuXHQvL307XG5cblx0Ly8gUmVwbGFjZSBwbGFjZWhvbGRlciB0ZXh0IGZyb20gc2VhcmNoIGZpZWxkLlxuXHQvL2FwcC5hZGRQbGFjZWhvbGRlclRleHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly92YXIgJHNlYXJjaF9maWVsZCA9ICQoIHRoaXMgKTtcblxuXHRcdC8vJHNlYXJjaF9maWVsZC5hdHRyKCAncGxhY2Vob2xkZXInLCAkc2VhcmNoX2ZpZWxkLmRhdGEoICdwbGFjZWhvbGRlcicgKSApLmRhdGEoICdwbGFjZWhvbGRlcicsICcnICk7XG5cdC8vfTtcblxuXHQvLyBFbmdhZ2UhXG5cdCQoIGFwcC5pbml0ICk7XG59ICkoIHdpbmRvdywgalF1ZXJ5LCB3aW5kb3cudGVNZW51ICk7XG4iLCIvKipcbiAqIEZpbGUgbW9kYWwuanNcbiAqXG4gKiBEZWFsIHdpdGggbXVsdGlwbGUgbW9kYWxzIGFuZCB0aGVpciBtZWRpYS5cbiAqL1xud2luZG93Lndkc01vZGFsID0ge307XG5cbiggZnVuY3Rpb24gKCB3aW5kb3csICQsIGFwcCApIHtcblx0Ly8gQ29uc3RydWN0b3IuXG5cdGFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC5jYWNoZSgpO1xuXG5cdFx0aWYgKCBhcHAubWVldHNSZXF1aXJlbWVudHMoKSApIHtcblx0XHRcdGFwcC5iaW5kRXZlbnRzKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIENhY2hlIGFsbCB0aGUgdGhpbmdzLlxuXHRhcHAuY2FjaGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLiRjID0ge1xuXHRcdFx0J2JvZHknOiAkKCAnYm9keScgKVxuXHRcdH07XG5cdH07XG5cblx0Ly8gRG8gd2UgbWVldCB0aGUgcmVxdWlyZW1lbnRzP1xuXHRhcHAubWVldHNSZXF1aXJlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICQoICcubW9kYWwtdHJpZ2dlcicgKS5sZW5ndGg7XG5cdH07XG5cblx0Ly8gQ29tYmluZSBhbGwgZXZlbnRzLlxuXHRhcHAuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBUcmlnZ2VyIGEgbW9kYWwgdG8gb3Blbi5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLm1vZGFsLXRyaWdnZXInLCBhcHAub3Blbk1vZGFsICk7XG5cblx0XHQvLyBUcmlnZ2VyIHRoZSBjbG9zZSBidXR0b24gdG8gY2xvc2UgdGhlIG1vZGFsLlxuXHRcdGFwcC4kYy5ib2R5Lm9uKCAnY2xpY2sgdG91Y2hzdGFydCcsICcuY2xvc2UnLCBhcHAuY2xvc2VNb2RhbCApO1xuXG5cdFx0Ly8gQWxsb3cgdGhlIHVzZXIgdG8gY2xvc2UgdGhlIG1vZGFsIGJ5IGhpdHRpbmcgdGhlIGVzYyBrZXkuXG5cdFx0YXBwLiRjLmJvZHkub24oICdrZXlkb3duJywgYXBwLmVzY0tleUNsb3NlICk7XG5cblx0XHQvLyBBbGxvdyB0aGUgdXNlciB0byBjbG9zZSB0aGUgbW9kYWwgYnkgY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgbW9kYWwuXG5cdFx0YXBwLiRjLmJvZHkub24oICdjbGljayB0b3VjaHN0YXJ0JywgJ2Rpdi5tb2RhbC1vcGVuJywgYXBwLmNsb3NlTW9kYWxCeUNsaWNrICk7XG5cdH07XG5cblx0Ly8gT3BlbiB0aGUgbW9kYWwuXG5cdGFwcC5vcGVuTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gRmlndXJlIG91dCB3aGljaCBtb2RhbCB3ZSdyZSBvcGVuaW5nIGFuZCBzdG9yZSB0aGUgb2JqZWN0LlxuXHRcdHZhciAkbW9kYWwgPSAkKCAkKCB0aGlzICkuZGF0YSggJ3RhcmdldCcgKSApO1xuXG5cdFx0Ly8gRGlzcGxheSB0aGUgbW9kYWwuXG5cdFx0JG1vZGFsLmFkZENsYXNzKCAnbW9kYWwtb3BlbicgKTtcblxuXHRcdC8vIEFkZCBib2R5IGNsYXNzLlxuXHRcdGFwcC4kYy5ib2R5LmFkZENsYXNzKCAnbW9kYWwtb3BlbicgKTtcblx0fTtcblxuXHQvLyBDbG9zZSB0aGUgbW9kYWwuXG5cdGFwcC5jbG9zZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIEZpZ3VyZSB0aGUgb3BlbmVkIG1vZGFsIHdlJ3JlIGNsb3NpbmcgYW5kIHN0b3JlIHRoZSBvYmplY3QuXG5cdFx0dmFyICRtb2RhbCA9ICQoICQoICdkaXYubW9kYWwtb3BlbiAuY2xvc2UnICkuZGF0YSggJ3RhcmdldCcgKSApO1xuXG5cdFx0Ly8gRmluZCB0aGUgaWZyYW1lIGluIHRoZSAkbW9kYWwgb2JqZWN0LlxuXHRcdHZhciAkaWZyYW1lID0gJG1vZGFsLmZpbmQoICdpZnJhbWUnICk7XG5cblx0XHQvLyBHZXQgdGhlIGlmcmFtZSBzcmMgVVJMLlxuXHRcdHZhciB1cmwgPSAkaWZyYW1lLmF0dHIoICdzcmMnICk7XG5cblx0XHQvLyBSZW1vdmUgdGhlIHNvdXJjZSBVUkwsIHRoZW4gYWRkIGl0IGJhY2ssIHNvIHRoZSB2aWRlbyBjYW4gYmUgcGxheWVkIGFnYWluIGxhdGVyLlxuXHRcdCRpZnJhbWUuYXR0ciggJ3NyYycsICcnICkuYXR0ciggJ3NyYycsIHVybCApO1xuXG5cdFx0Ly8gRmluYWxseSwgaGlkZSB0aGUgbW9kYWwuXG5cdFx0JG1vZGFsLnJlbW92ZUNsYXNzKCAnbW9kYWwtb3BlbicgKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgYm9keSBjbGFzcy5cblx0XHRhcHAuJGMuYm9keS5yZW1vdmVDbGFzcyggJ21vZGFsLW9wZW4nICk7XG5cdH07XG5cblx0Ly8gQ2xvc2UgaWYgXCJlc2NcIiBrZXkgaXMgcHJlc3NlZC5cblx0YXBwLmVzY0tleUNsb3NlID0gZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRpZiAoIDI3ID09PSBldmVudC5rZXlDb2RlICkge1xuXHRcdFx0YXBwLmNsb3NlTW9kYWwoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ2xvc2UgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIG1vZGFsXG5cdGFwcC5jbG9zZU1vZGFsQnlDbGljayA9IGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0Ly8gSWYgdGhlIHBhcmVudCBjb250YWluZXIgaXMgTk9UIHRoZSBtb2RhbCBkaWFsb2cgY29udGFpbmVyLCBjbG9zZSB0aGUgbW9kYWxcblx0XHRpZiAoICEkKCBldmVudC50YXJnZXQgKS5wYXJlbnRzKCAnZGl2JyApLmhhc0NsYXNzKCAnbW9kYWwtZGlhbG9nJyApICkge1xuXHRcdFx0YXBwLmNsb3NlTW9kYWwoKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gRW5nYWdlIVxuXHQkKCBhcHAuaW5pdCApO1xufSApKCB3aW5kb3csIGpRdWVyeSwgd2luZG93Lndkc01vZGFsICk7XG4iLCIvKipcbiAqIEZpbGUgc2VhcmNoLmpzXG4gKlxuICogRGVhbCB3aXRoIHRoZSBzZWFyY2ggZm9ybS5cbiAqL1xud2luZG93Lndkc1NlYXJjaCA9IHt9O1xuXG4oIGZ1bmN0aW9uICggd2luZG93LCAkLCBhcHAgKSB7XG5cdC8vIENvbnN0cnVjdG9yLlxuXHRhcHAuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuY2FjaGUoKTtcblxuXHRcdGlmICggYXBwLm1lZXRzUmVxdWlyZW1lbnRzKCkgKSB7XG5cdFx0XHRhcHAuYmluZEV2ZW50cygpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBDYWNoZSBhbGwgdGhlIHRoaW5ncy5cblx0YXBwLmNhY2hlID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC4kYyA9IHtcblx0XHRcdCdib2R5JzogJCggJ2JvZHknIClcblx0XHR9O1xuXHR9O1xuXG5cdC8vIERvIHdlIG1lZXQgdGhlIHJlcXVpcmVtZW50cz9cblx0YXBwLm1lZXRzUmVxdWlyZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAkKCAnLnNlYXJjaC1maWVsZCcgKS5sZW5ndGg7XG5cdH07XG5cblx0Ly8gQ29tYmluZSBhbGwgZXZlbnRzLlxuXHRhcHAuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBSZW1vdmUgcGxhY2Vob2xkZXIgdGV4dCBmcm9tIHNlYXJjaCBmaWVsZCBvbiBmb2N1cy5cblx0XHRhcHAuJGMuYm9keS5vbiggJ2ZvY3VzJywgJy5zZWFyY2gtZmllbGQnLCBhcHAucmVtb3ZlUGxhY2Vob2xkZXJUZXh0ICk7XG5cblx0XHQvLyBBZGQgcGxhY2Vob2xkZXIgdGV4dCBiYWNrIHRvIHNlYXJjaCBmaWVsZCBvbiBibHVyLlxuXHRcdGFwcC4kYy5ib2R5Lm9uKCAnYmx1cicsICcuc2VhcmNoLWZpZWxkJywgYXBwLmFkZFBsYWNlaG9sZGVyVGV4dCApO1xuXHR9O1xuXG5cdC8vIFJlbW92ZSBwbGFjZWhvbGRlciB0ZXh0IGZyb20gc2VhcmNoIGZpZWxkLlxuXHRhcHAucmVtb3ZlUGxhY2Vob2xkZXJUZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciAkc2VhcmNoX2ZpZWxkID0gJCggdGhpcyApO1xuXG5cdFx0JHNlYXJjaF9maWVsZC5kYXRhKCAncGxhY2Vob2xkZXInLCAkc2VhcmNoX2ZpZWxkLmF0dHIoICdwbGFjZWhvbGRlcicgKSApLmF0dHIoICdwbGFjZWhvbGRlcicsICcnICk7XG5cdH07XG5cblx0Ly8gUmVwbGFjZSBwbGFjZWhvbGRlciB0ZXh0IGZyb20gc2VhcmNoIGZpZWxkLlxuXHRhcHAuYWRkUGxhY2Vob2xkZXJUZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciAkc2VhcmNoX2ZpZWxkID0gJCggdGhpcyApO1xuXG5cdFx0JHNlYXJjaF9maWVsZC5hdHRyKCAncGxhY2Vob2xkZXInLCAkc2VhcmNoX2ZpZWxkLmRhdGEoICdwbGFjZWhvbGRlcicgKSApLmRhdGEoICdwbGFjZWhvbGRlcicsICcnICk7XG5cdH07XG5cblx0Ly8gRW5nYWdlIVxuXHQkKCBhcHAuaW5pdCApO1xufSApKCB3aW5kb3csIGpRdWVyeSwgd2luZG93Lndkc1NlYXJjaCApO1xuIiwiLyoqXG4gKiBGaWxlIHNraXAtbGluay1mb2N1cy1maXguanMuXG4gKlxuICogSGVscHMgd2l0aCBhY2Nlc3NpYmlsaXR5IGZvciBrZXlib2FyZCBvbmx5IHVzZXJzLlxuICpcbiAqIExlYXJuIG1vcmU6IGh0dHBzOi8vZ2l0LmlvL3ZXZHIyXG4gKi9cbiggZnVuY3Rpb24gKCkge1xuXHR2YXIgaXNXZWJraXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggJ3dlYmtpdCcgKSA+IC0xLFxuXHRcdGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggJ29wZXJhJyApID4gLTEsXG5cdFx0aXNJZSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCAnbXNpZScgKSA+IC0xO1xuXG5cdGlmICggKCBpc1dlYmtpdCB8fCBpc09wZXJhIHx8IGlzSWUgKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaWQgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZyggMSApLFxuXHRcdFx0XHRlbGVtZW50O1xuXG5cdFx0XHRpZiAoICEoIC9eW0EtejAtOV8tXSskLyApLnRlc3QoIGlkICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRpZiAoIGVsZW1lbnQgKSB7XG5cdFx0XHRcdGlmICggISggL14oPzphfHNlbGVjdHxpbnB1dHxidXR0b258dGV4dGFyZWEpJC9pICkudGVzdCggZWxlbWVudC50YWdOYW1lICkgKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC50YWJJbmRleCA9IC0xO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudC5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlICk7XG5cdH1cbn0gKSgpO1xuIiwiLyoqXG4gKiBGaWxlIHdpbmRvdy1yZWFkeS5qc1xuICpcbiAqIEFkZCBhIFwicmVhZHlcIiBjbGFzcyB0byA8Ym9keT4gd2hlbiB3aW5kb3cgaXMgcmVhZHkuXG4gKi9cbndpbmRvdy53ZHNXaW5kb3dSZWFkeSA9IHt9O1xuKCBmdW5jdGlvbiAoIHdpbmRvdywgJCwgYXBwICkge1xuXHQvLyBDb25zdHJ1Y3Rvci5cblx0YXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YXBwLmNhY2hlKCk7XG5cdFx0YXBwLmJpbmRFdmVudHMoKTtcblx0fTtcblxuXHQvLyBDYWNoZSBkb2N1bWVudCBlbGVtZW50cy5cblx0YXBwLmNhY2hlID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC4kYyA9IHtcblx0XHRcdCd3aW5kb3cnOiAkKCB3aW5kb3cgKSxcblx0XHRcdCdib2R5JzogJCggZG9jdW1lbnQuYm9keSApXG5cdFx0fTtcblx0fTtcblxuXHQvLyBDb21iaW5lIGFsbCBldmVudHMuXG5cdGFwcC5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdGFwcC4kYy53aW5kb3cubG9hZCggYXBwLmFkZEJvZHlDbGFzcyApO1xuXHR9O1xuXG5cdC8vIEFkZCBhIGNsYXNzIHRvIDxib2R5Pi5cblx0YXBwLmFkZEJvZHlDbGFzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRhcHAuJGMuYm9keS5hZGRDbGFzcyggJ3JlYWR5JyApO1xuXHR9O1xuXG5cblx0Ly8gRW5nYWdlIVxuXHQkKCBhcHAuaW5pdCApO1xufSApKCB3aW5kb3csIGpRdWVyeSwgd2luZG93Lndkc1dpbmRvd1JlYWR5ICk7XG4iXX0=
