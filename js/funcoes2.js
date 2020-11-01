$(new Document).ready(function(){

    listarDadosXML();
    listarPorcentagem();

    $("#salvar").click(function(){
        salvarXML();
        porcentagemAderencia();
        setTimeout(function() {
            location.reload(true);
        }, 350);
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
            url: "../php/criaArquivoBit.php",
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
                console.log("Não chegou");
            }
        });

    }   
}

function listarDadosXML(){

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/listarXMLBit.php",
        success : function(dadosXML){

            for(var i = 0; i < $(".linha_tabela").length; i++){
                $("#naoConf" + i ).val(dadosXML[i].naoConform);
                $("#actCor" + i).val(dadosXML[i].acaoCorretiva);
                $("#prazo" + i).val(dadosXML[i].prazo);
                $("#entrega" + i).val(dadosXML[i].entrega);
                $("#check" + i).val(dadosXML[i].check);
            }

        }
    });
}

function porcentagemAderencia(){

    var total = $(".linha_tabela").length;
    var qtd_nao = 0;

    for(var i = 0; i < $(".linha_tabela").length; i++){
        
        var check_tratado = $("#check" + i).val().toLowerCase().replace(/[áàâã]/,'a');

        if(check_tratado == "nao se aplica" || check_tratado == "nao aplica" || check_tratado == ""){
            total -= 1;
        }
        else if(check_tratado == "nao"){
            qtd_nao += 1;
        }

    }

    if(total <= 0){
        var porcentagem_final = " ";
    }
    else{
        var porcentagem_individual = 100 / total;
        var porcentagem_nao = qtd_nao * porcentagem_individual;
        var porcentagem_aderencia = 100 - porcentagem_nao;
        var porcentagem_final = parseInt(porcentagem_aderencia);
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/salvarPorcentagemBit.php",
        data: {
            porcAderencia: porcentagem_final
        },
        success : function(){
            console.log("Enviou");
        },
        error : function(){
            console.log("Não enviou");
        }
    });

}

function listarPorcentagem(){

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/listarPorcentagemBit.php",
        success : function(info){
            console.log(info)

            $("#porcentagemAd").text(info[0].porcentagem + "%");

            if(info[0].porcentagem == 100 || info[0].porcentagem >= 90 ){
                console.log(info[0].porcentagem);
                $("#tabAder").addClass("tabela_verde");
            }
            else if(info[0].porcentagem == 89 || info[0].porcentagem >= 65 ){
                $("#tabAder").addClass("tabela_amarelo");
            }
            else if(info[0].porcentagem <= 64 || info[0].porcentagem <= 0){
                $("#tabAder").addClass("tabela_vermelho");
            }
            else{
                $("#tabAder").addClass("tabela_cinza");
            }

        },
        error : function(){
            console.log("Erro na listagem");
        }
    });

}
