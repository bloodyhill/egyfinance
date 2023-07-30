$(document).ready(function() {
    // Handle change event for dropdown menu
    $('#choice1').change(function() {
        var target = $(this).val();
        if (target) {
            $('.question').not('#' + target).hide();
            $('#' + target).fadeIn(400);
        }
    });

    // Handle click event for choice buttons
    $('.choice').click(function() {
        var target = $(this).data('target');
        var answer = $(this).data('answer');

        if (target) {
            $(this).closest('.question').hide();
            $('#' + target).show(400);
        } else if (answer) {
            $('#answer-text').text(answer);
            $(this).closest('.question').hide();
            $('.answer').show(400);
            $('#start-over').css("display", "block");
        }
    });

    // Handle click event for start-over button
    $('#start-over').click(function() {
        $('.question').hide();
        $('#q1').show();
        $('.answer').hide();
        $(this).hide();
    });
});
