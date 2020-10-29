<?php

    $caminho = "../xml/dadosAderencia";
    $diretorio = dir($caminho);
    $position = 0;

    while($arquivo = $diretorio->read()){

        if($arquivo != "." && $arquivo != ".."){

            $xml_string = file_get_contents("../xml/dadosAderencia/".$arquivo);
            $xml_object = simplexml_load_string($xml_string);
            echo $xml_object;
            $dado[$position] ["porcentagem"] = trim($xml_object->Porcentagem);

        }
    }

    $diretorio->close();
    echo json_encode($dado);

?>