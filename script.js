$(document).ready(function() {
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

    $('#start-over').click(function() {
        $('.question').hide();
        $('#q1').show();
        $('.answer').hide();
        $(this).hide();
    });
});