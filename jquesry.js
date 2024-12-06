// JavaScript with jQuery CODE FOR Simplified Validation

$("#email").on("keyup", function() {
    var email = $(this).val();
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(email)) {
        $(this).removeClass("error").addClass("valid");
        $("#email-error").hide();
    } else {
        $(this).removeClass("valid").addClass("error");
        $("#email-error").show().text("Please enter a valid email address.");
    }
});


// JS code for enhanced search suggestions with jQuery

$(".search-result").each(function() {
    var content = $(this).text();
    var searchTerm = $("#search-bar").val();
    if (content.toLowerCase().includes(searchTerm.toLowerCase())) {
        $(this).html(content.replace(new RegExp(searchTerm, "gi"), "<span class='highlight'>$&</span>"));
    }
});
