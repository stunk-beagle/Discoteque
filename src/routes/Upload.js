import React, { Component } from 'react';
import Web3 from 'web3';
import ipfs from '../ipfs';
import '../css/Upload.css';
import UploadFiles from '../abis/UploadFiles.json'

class Upload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      songName:'',
      songCount:null,
      ipfsHash:"",
      loading: true,
      buffer:null,
      album:"",
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
      if(song.artist===this.state.account)
        this.setState({
          songsList: [...this.state.songsList, song]
        })
      // console.log(song)
    }
    console.log(this.state.songsList)
  }
  

  handleChangeSongName=(event)=>{
    this.setState({songName: event.target.value});  
  }

  handleChangeAlbum=(event)=>{
    this.setState({album: event.target.value});  
  }

  //File to be uploaded
  captureFile=(event)=>{
    console.log("capture file");
    event.preventDefault();
    const file=event.target.files[0]
    const reader= new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend=()=>{
      this.setState({buffer:Buffer(reader.result)})
      console.log('buffer',this.state.buffer)
    }
  }

  //submitting the file and getting the hash.
  onSubmit=(event)=>{
    event.preventDefault()
    ipfs.files.add(this.state.buffer,(error,result)=>{
      console.log("yolo")
      if(error){
          console.error(error)
          return
      }
      this.setState({ipfsHash:result[0].hash})
      this.state.uploadFiles.methods.set(result[0].hash,this.state.songName,this.state.album).send({
        from:this.state.account
      })
      console.log(this.state.ipfsHash)
      // this.getData()
    })
    console.log("Submitted!")
  }



  render() {
    return (
      <div className="App">
        <div className="headerC">
          <p>Your Account:{this.state.account}</p>
        </div>
        
          <h2>Upload a Song </h2>

        <form className="uploadForm" action="" onSubmit={this.onSubmit}>
          <input placeholder="Name of the song" type="text" value={this.state.songName} onChange={this.handleChangeSongName}/>
          <input placeholder="Name of the album"type="text" value={this.state.album} onChange={this.handleChangeAlbum}/>
          <input type="file" onChange={this.captureFile}/>
          <input type="submit" placeholder="Upload!"/>
        </form>

        <div>
          <div className="headerAU">
            <h2>Already Uploaded Files</h2> 
          </div>
          {this.state.songsList.map((song)=>(
            <div className="listu">
              <ul>
                <li>{song.songName}</li>
                <li>{song.album}</li>
              </ul>  
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Upload;
