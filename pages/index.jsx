import Head from "next/head";
import {
  Container,
  Row,
  Card,
  Button,
  Alert,
  Col,
  Image,
} from "react-bootstrap";
import React, { useState } from "react";
import { ChainId, useEthers } from "@usedapp/core";
import { Claim } from "../lib/Claim";
import { ToastContainer } from "react-toastify";
import Logo from "../assets/images/logo.png";
import { Catoshi_Mainnet, Catoshi_Testnet } from "../shared/config";

export default function Home() {
  const [show, setShow] = useState(false);
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();

  if (
    !show &&
    account &&
    chainId !== Catoshi_Mainnet.chainID &&
    chainId !== Catoshi_Testnet.chainID
  ) {
    setShow(true);
  } else if (
    (show &&
      (chainId === Catoshi_Mainnet.chainID ||
        chainId === Catoshi_Testnet.chainID)) ||
    (show && !account)
  ) {
    setShow(false);
  }

  return (
    <Container className="md-container">
      <Head>
        <title>Catoshi Claimer</title>
      </Head>
      <Container style={{ paddingTop: "10px" }}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {show ? (
          <Alert variant="danger">
            <Alert.Heading>Unsupported Network</Alert.Heading>
            <p>
              Please connect to {Catoshi_Mainnet.name} or {Catoshi_Testnet.name}
              .
            </p>
          </Alert>
        ) : null}
        <Row>
          <Col>
            <h1 className="text-light">Token Claimer</h1>
          </Col>
          <Col md={3} xs={6}>
            <Image src={Logo} fluid />
          </Col>
        </Row>
        <Row>
          <Col>
            {account ? (
              <Button
                style={{
                  background: "rgb(255,166,76,1)",
                  color: "black",
                  border: "none",
                  fontSize: "18px",
                }}
                onClick={() => deactivate()}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                style={{
                  background: "rgb(255,166,76,1)",
                  color: "black",
                  border: "none",
                  fontSize: "18px",
                }}
                onClick={() => activateBrowserWallet()}
              >
                Connect
              </Button>
            )}
          </Col>
        </Row>
        <Container style={{ paddingTop: "60px" }}>
          <Row className="justify-content-md-between">
            <Card className="lg-card">
              <Card.Body>
                <Card.Title>Claim your POOL tokens</Card.Title>
                <Card.Text>Connect and claim</Card.Text>
                {account ? (
                  <Claim />
                ) : (
                  <Button
                    style={{
                      background: "rgb(255,166,76,1)",
                      color: "black",
                      border: "none",
                      fontSize: "18px",
                    }}
                    block
                    onClick={() => activateBrowserWallet()}
                  >
                    Connect
                  </Button>
                )}
              </Card.Body>
              <Card.Footer>
                Or claim on etherscan:{" "}
                <a
                  href="https://github.com/McOso/merkle-distributor#how-to-claim---mainnet"
                  target="_blank"
                  style={{ color: "rgb(255,166,76,1)" }}
                >
                  How to claim on etherscan
                </a>
              </Card.Footer>
            </Card>
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer"></footer>
    </Container>
  );
}
