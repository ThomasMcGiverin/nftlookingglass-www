import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button, Container, Nav, Navbar, Row} from "react-bootstrap";
import {walletLink, ethereum, web3} from "./Components/WalletLink";
import {useState} from "react";
import WalletConnect from "walletconnect";
import {INFURA} from "./infura";

function App() {
    const [address, setAddress] = useState("")
    const [isConnected, setConnected] = useState(false)

    const infuraid = INFURA

    const connectCB = () => {
        ethereum.send('eth_requestAccounts').then((accounts) => {
            console.log(`User's address is ${accounts[0]}`)

            // Optionally, have the default account set for web3.js
            web3.eth.defaultAccount = accounts[0]
            setAddress(accounts[0])
            setConnected(true)
        }).catch(error => console.log("User failed to authorize WalletLink."))
    }

    const disconnectCB = () => {
        walletLink.disconnect()
    }

    const connectWC = async () => {
        const wc = new WalletConnect();

        const connector = await wc.connect();

        const web3Provider = await wc.getWeb3Provider({
            infuraId: infuraid,
        });

        //const channelProvider = await wc.getChannelProvider();

        //const threeIdProvider = await wc.getThreeIdProvider();

        setAddress(connector.accounts[0])
        setConnected(true)
    }

  return (
      <>
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand href="#home">NFTLookingGlass</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

         <Container>
             {isConnected && address ? (
                 <>
                     <Button variant="success" disabled>Wallet Connected</Button>
                 </>
             ) : (
                 <>
                     <Button variant="primary" onClick={connectCB} style={{margin: "5px"}}>Connect via WalletLink</Button>
                     <Button variant="primary" onClick={connectWC}>Connect via WalletConnect</Button>
                 </>
             )}
             <p>Address: {address || "unknown"}</p>


             <Row>




             </Row>
         </Container>
      </>
  );
}

export default App;
