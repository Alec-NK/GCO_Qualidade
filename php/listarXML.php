<?php

    $caminho = "../xml/linhas/";
    $diretorio = dir($caminho);
    $position = 0;

    while($arquivo = $diretorio->read()){

        if($arquivo != "." && $arquivo != ".."){
            
            $xml_string = file_get_contents("../xml/linhas/".$arquivo);
            $xml_object = simplexml_load_string($xml_string);

            $dados[$position] ["naoConform"] = trim($xml_object->NaoConformidade);
            $dados[$position] ["acaoCorretiva"] = trim($xml_object->AcaoCorretiva);
            $dados[$position] ["prazo"] = trim($xml_object->Prazo);
            $dados[$position] ["entrega"] = trim($xml_object->Entrega);
            $dados[$position] ["check"] = trim($xml_object->Check);

            $position++;
        }
    }

    $diretorio->close();
    echo json_encode($dados);

?>