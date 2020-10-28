$(new Document).ready(function(){
    $("#salvar").click(function(){
        salvarXML();
    });
});

function salvarXML(){

    for(var i = 0; i < $(".linha_tabela").length; i++){
        var naoConf = $("#naoConf" + i ).val();
        var acaoCor = $("#actCor" + i).val();
        var prazo = $("#prazo" + i).val();
        var entrega = $("#entrega" + i).val();
        var check = $("#check" + i).val();

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "../php/criaArquivo.php",
            data: {
                naoConf : naoConf,
                acaoCor : acaoCor,
                prazo : prazo,
                entrega : entrega,
                check : check,
                count : i
            },
            success : function(){
                console.log("Funcionou");
            },
            error : function(){
                console.log("Não funfo");
            }
        });

    }   
}