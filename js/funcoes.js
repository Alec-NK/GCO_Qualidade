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
            url: "./php/criaArquivo.php",
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
        url: "./php/listarXML.php",
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
    var qtd_sim = 0;

    for(var i = 0; i < $(".linha_tabela").length; i++){
        
        var check_tratado = $("#check" + i).val().toLowerCase().replace(/[áàâã]/,'a');

        if(check_tratado == "nao se aplica" || check_tratado == "nao aplica"){
            total -= 1;
        }
        else if(check_tratado == "sim"){
            qtd_sim += 1;
        }

    }

    if(total <= 0){
        var porcentagem_final = " ";
    }
    else{
        var porcentagem_individual = 100 / total;
        var porcentagem_sim = qtd_sim * porcentagem_individual;
        var porcentagem_aderencia = 100 - porcentagem_sim;
        var porcentagem_final = parseInt(porcentagem_aderencia);
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "./php/salvarPorcentagem.php",
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
        url: "./php/listarPorcentagem.php",
        success : function(info){
            console.log(info)

            $("#porcentagemAd").text(info[0].porcentagem + "%");
        },
        error : function(){
            console.log("Erro na listagem");
        }
    });

}
