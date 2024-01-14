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
});
