<?php

    $porcentagem = $_POST["porcAderencia"];

    $xml = new DOMDocument("1.0");

    $xml_dado = $xml->createElement("DadoSalvo");
    $xml_porc = $xml->createElement("Porcentagem", $porcentagem);

    $xml_dado->appendChild($xml_porc);
    $xml->appendChild($xml_dado);

    $xml->save("../xml/dadosAderencia/aderenciaPorc.xml");

    $msg = "Salvo com Sucesso!";
    echo json_encode($msg);

?>