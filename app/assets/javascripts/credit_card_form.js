$(document).ready(function() {
    function submitHandler(event) {
        var $form = $(event.target);
        $form.find("input[type=submit]").prop("disabled", true);

        if (Stripe) {
            Stripe.card.createToken($form, stripeResponseHandler);
        } else {
            let loadFail = "Could not load card processing ability.  Please refresh your browser and try again.";
            showError(loadFail);
        }
        return false;
    }

    function stripeResponseHandler(status, response) {
        var token, $form;
        $form = $(".cc-form");

        if (response.error) {
            let errorMessage = response.error.message;
            console.log(errorMessage);
            showError(errorMessage);
            $form.find("input[type=submit]").prop("disabled", false);
        } else {
            token = response.id;
            var hiddenField = `<input type="hidden" name="payment[token]" />`;
            $form.append(hiddenField).val(token);
            $("[data-stripe=number]").remove();
            $("[data-stripe=cvv]").remove();
            $("[data-stripe=exp-year]").remove();
            $("[data-stripe=exp-month]").remove();
            $("[data-stripe=label]").remove();
            $form.get(0).submit();
        }

        return false;
    }

    function showError(message) {
        if ($("#flash-messages").size() < 1) {
            $('div.container.main div:first').prepend("<div></div>")
        }
        let messageDiv = `
        <div class="alert alert-warning">
            <a class="close" data-dismiss="alert">x<a/>
            <div id="flash-alert">${message}</div>
        </div>`;

        $("#flash-messages").html(messageDiv);
        $(".alert").delay(5000).fadeOut(3000);

        return false;
    }

    $(".cc-form").on("submit", submitHandler);
});
