$(document).ready(function() {
    var selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        updateAmenitiesList();
    });

    $('#button').click(function() {
        updatePlaces();
    });

    function updateAmenitiesList() {
        var amenitiesList = Object.values(selectedAmenities).join(', ');
        $('div.Amenities h4').text('Amenities: ' + amenitiesList);
    }

    function checkApiStatus() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.status === 'OK') {
                    $('#api_status').addClass('available');
                } else {
                    $('#api_status').removeClass('available');
                }
            },
            error: function() {
                $('#api_status').removeClass('available');
            }
        });
    }

    function updatePlaces() {
        // Make a POST request to retrieve places data
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({}),
            dataType: 'json',
            success: function(data) {
                // Clear existing articles
                $('section.places').empty();

                // Loop through the result and create article tags for each place
                data.forEach(function(place) {
                    var article = '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                        '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                        '</div>' +
                        '<div class="description">' + place.description + '</div>' +
                        '</article>';

                    $('section.places').append(article);
                });
            },
            error: function() {
                console.log('Error fetching places data.');
            }
        });
    }
});