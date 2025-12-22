$(document).ready(function () {

    function validateForm() {
        let valid = true;

        const nameRegex = /^[A-Za-z ]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test($("#fullname").val())) {
            $("#nameError").text("Alphabets only");
            valid = false;
        } else $("#nameError").text("");

        if ($("#address").val().trim() === "") {
            $("#addressError").text("Address required");
            valid = false;
        } else $("#addressError").text("");

        if (!mobileRegex.test($("#mobile").val())) {
            $("#mobileError").text("Enter 10-digit number");
            valid = false;
        } else $("#mobileError").text("");

        if (!emailRegex.test($("#email").val())) {
            $("#emailError").text("Invalid email");
            valid = false;
        } else $("#emailError").text("");

        if (!$("input[name='gender']:checked").val()) {
            $("#genderError").text("Select gender");
            valid = false;
        } else $("#genderError").text("");

        if ($("#dob").val() === "") {
            $("#dobError").text("Select date of birth");
            valid = false;
        } else $("#dobError").text("");

        $("#previewBtn").prop("disabled", !valid);
        return valid;
    }

    $("input, textarea").on("input change", validateForm);

    $("#previewBtn").click(function () {
        if (validateForm()) {
            $("#previewData").html(`
                <p><b>Name:</b> ${$("#fullname").val()}</p>
                <p><b>Address:</b> ${$("#address").val()}</p>
                <p><b>Mobile:</b> ${$("#mobile").val()}</p>
                <p><b>Email:</b> ${$("#email").val()}</p>
                <p><b>Gender:</b> ${$("input[name='gender']:checked").val()}</p>
                <p><b>DOB:</b> ${$("#dob").val()}</p>
            `);
            $("#previewModal").css("display", "flex");
        }
    });

    $("#closeBtn").click(function () {
        $("#previewModal").hide();
    });

    $("#submitBtn").click(function () {

        const newUser = {
            name: $("#fullname").val(),
            address: $("#address").val(),
            mobile: $("#mobile").val(),
            email: $("#email").val(),
            gender: $("input[name='gender']:checked").val(),
            dob: $("#dob").val()
        };

        // ✅ Step 1: Get existing users or empty array
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // ✅ Step 2: Push new user
        users.push(newUser);

        // ✅ Step 3: Save back to localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful!");
        location.reload();
    });

});
