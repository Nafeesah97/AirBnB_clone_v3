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
});