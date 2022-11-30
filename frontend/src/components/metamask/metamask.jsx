import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Logout from '../../assets/logout.png';
import { useCookies } from 'react-cookie';
// import MetaM from '../../assets/MetaMask_Fox.svg'

import './metamask.scss';

const Metamask = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [cookies, setCookie, removeCookie] = useCookies(['ethereum']);
	
	if (window.ethereum){
		window.ethereum.on("accountsChanged", () => connectWalletHandler());
	}
	
	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('Wallet Connected');
			window.ethereum.request({ method: 'eth_requestAccounts' })
			.then(result => {
				// console.log(result)
				accountChangedHandler(result[0]);
				setCookie('ethereum', window.ethereum.isMetaMask , { path: '/' })
				
					getAccountBalance(result[0]);
					setIsConnected(true);
					setUserBalance("Loading...");
				})
				.catch(error => {
					setErrorMessage(error.message);

				});

		} else {
			alert("install metamask extension!!");
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
	
	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
			.then(balance => {
				setUserBalance(ethers.utils.formatEther(balance));
			})
			.catch(error => {
				setErrorMessage(error.message);
			});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}
	const onDisconnect = () => {
		setIsConnected(false);
		removeCookie('ethereum');
	}

	useEffect( () =>{
		if(cookies.ethereum === 'true'){
			connectWalletHandler();
		}
	}, [])
	return (
		<div>
			{!isConnected && (
				<button className='MuiButton-root btn btn-outline small'>

					<span className='MuiButton-label'>
						<h5 className='MuiTypography-h5'>
						
							<p className='MuiTypography-body1' onClick={connectWalletHandler}> Connect Wallet
							
							</p>
							
						</h5>
					</span>
				</button>
			)}
			{isConnected && (
				// <div className={`dropdown ${hideButton == "" ? "d-none" : ""}`} style={{ padding: '0 10px' }}>
				<div className="dropdown" style={{padding:'0 10px'}}>
					<button className="MuiButton-root" >Wallet Connected</button>
					<div className="dropdown-content">
						<a href="#">Profile</a>
						<a href="#" >Address:{defaultAccount.slice(0,7)}...{defaultAccount.slice(36,39)}</a>
						<a href="#">Balance:{userBalance}</a><br/>
						<a href="#" onClick={onDisconnect}><img src={Logout} alt="" />Disconnect</a>

					</div>
				</div>
			)}

		</div>
	)
}


export default Metamask;
// import { useWeb3React } from "@web3-react/core"
// import { useEffect } from "react"
// import { injected } from "../components/wallet/connectors"

// export default function Home() {
//   const { active, account, library, connector, activate, deactivate } = useWeb3React()

//   async function connect() {
//     try {
//       await activate(injected)
//       localStorage.setItem('isWalletConnected', true)
//     } catch (ex) {
//       console.log(ex)
//     }
//   }

//   async function disconnect() {
//     try {
//       deactivate()
//       localStorage.setItem('isWalletConnected', false)
//     } catch (ex) {
//       console.log(ex)
//     }
//   }

//   useEffect(() => {
//     const connectWalletOnPageLoad = async () => {
//       if (localStorage?.getItem('isWalletConnected') === 'true') {
//         try {
//           await activate(injected)
//           localStorage.setItem('isWalletConnected', true)
//         } catch (ex) {
//           console.log(ex)
//         }
//       }
//     }
//     connectWalletOnPageLoad()
//   }, [])

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
//       {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
//       <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
//     </div>
//   )
// }