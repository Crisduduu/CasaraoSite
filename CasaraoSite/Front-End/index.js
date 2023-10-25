$("#botaoEnviarFeedback").on("click", () => {

    if(!inputsSaoValidados(event)) return;

    $('#botaoEnviarFeedback').attr("disabled", true)
    const serviceID = "service_um6w40g";
    const templateID = "template_g5lnlpo";
    const templateParams = {
        feedback: $("#inputFeedback").val(),
        nomeCompleto: $("#inputNome").val(),
        email: $("#inputEmail").val(),
        telefone: $("#inputTelefone").val()
    }

    return emailjs.send(serviceID, templateID, templateParams)
        .then((obj, params) => {
            $("#inputNome").val("");
            $("#inputEmail").val("");
            $("#inputTelefone").val("");

            $("#modalHeader").children('h5').text("Confirmação de Envio de Dados")
            $("#modalBody").children('p').text("Seus dados foram enviados com sucesso. A equipe responsável fará o contato assim que possível.")
            $("#modalFooter").children('button').removeClass("btn-danger").addClass("btn-success");
            return;
        })
        .catch((err) => {
            $("#modalHeader").children('h5').text("Erro no Envio de Dados")
            $("#modalBody").children('p').text("Houve um erro inesperado. Por favor, tente novamente mais tarde!")
            $("#modalFooter").children('button').removeClass("btn-success").addClass("btn-danger");
            return;
        })
        .finally(() => {
            $('#botaoEnviarFeedback').attr("disabled", false)
            return $("#modalFeedback").modal();

        });

});

function inputsSaoValidados(event) {
    if (!$('.needs-validation')[0].checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        $('.needs-validation').addClass('was-validated');
        return false;
    }
    $('.needs-validation').removeClass('was-validated');
    return true;
}