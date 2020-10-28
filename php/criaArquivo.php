<?php

    $naoConf = $_POST["naoConf"];
    $acaoCor = $_POST["acaoCor"];
    $prazo = $_POST["prazo"];
    $entrega = $_POST["entrega"];
    $check = $_POST["check"];
    $count = $_POST["count"];
    
    $xml = new DOMDocument("1.0");

    $xml_dadosTabela = $xml->createElement("DadosTabela");

    $xml_naoConformidade = $xml->createElement("NaoConformidade", $naoConf);
    $xml_acaoCorretiva = $xml->createElement("AcaoCorretiva", $acaoCor);
    $xml_prazo= $xml->createElement("Prazo", $prazo);
    $xml_entrega = $xml->createElement("Entrega", $entrega);
    $xml_check = $xml->createElement("Check", $check);

    $xml_dadosTabela->appendChild($xml_naoConformidade);
    $xml_dadosTabela->appendChild($xml_acaoCorretiva);
    $xml_dadosTabela->appendChild($xml_prazo);
    $xml_dadosTabela->appendChild($xml_entrega);
    $xml_dadosTabela->appendChild($xml_check);

    $xml->appendChild($xml_dadosTabela);

    $xml->save("'./xml/dadosLinha" + $count + ".xml'");

    $msg = "Deu certo!";
    echo json_encode($msg);

?>