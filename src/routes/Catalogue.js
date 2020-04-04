import React, { Component } from 'react'
import Web3 from 'web3';
import '../css/Catalogue.css';
import UploadFiles from '../abis/UploadFiles.json'


class Song extends React.Component{
  constructor(props){
      super(props)
  }

  buy=()=>{
    
    window.location.href = "https://ipfs.io/ipfs/QmS91DKhCnd21M7GsxjHjj7sRZ9hYNxJsCoxv2Uxitq91X";
  }

  render(){
      return(
          <div className="listy">
             <ul>
                <li>{this.props.song.songName}</li>
                <li>{this.props.song.album}</li>
                <li>
                    <button onClick={this.buy} >Buy Song</button>
                </li>
              </ul>  
          </div>
      );   
  }
}

class Catalogue extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      songCount:null,
      ipfsHash:"",
      loading: true,
      songsList:[],
    }
  }

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.getData()
    // console.log(ipfs.swarm.peers)
  }

  //initializes instance of web3 to access our private blockchain.
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  //Load the account details and create a new block
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = 3
    const networkData1 = UploadFiles.networks[networkId]
    if(networkData1) {
      console.log("reached here")
      const uploadFiles=new web3.eth.Contract(UploadFiles.abi,networkData1.address)
      this.setState({ uploadFiles })
      // console.log(this.state.uploadFiles)
    }
  }
  
  //Adding the already existing data
  async getData(){
    const songCount=this.state.uploadFiles.methods.songCount().call()
    const value=await songCount

    for (var i = 1; i <= value; i++) {
      const song = await this.state.uploadFiles.methods.SongsList(i).call()
        this.setState({
          songsList: [...this.state.songsList, song]
          })
      // console.log(song)
    }
    console.log(this.state.songsList)
  }
  
  render() {
    return (
      <div className="App">
        <div className="headerC">
          <p>Your Account:{this.state.account}</p>
        </div>

        <div className="cata">
          {this.state.songsList.map((songI)=><Song song={songI}/>)}
        </div>  
    
      </div>
    );
  }
}



export default Catalogue