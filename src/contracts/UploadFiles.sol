pragma solidity ^0.5.0;
contract UploadFiles{
    uint public songCount = 0;
    mapping(uint => Songs) public SongsList;

    struct Songs{
        uint id;
        string hashCode;
        string songName;
        string album;
        address artist;
    }

    event SongAdded(
        uint id,
        string hashCode,
        string songName,
        string album,
        address artist
    );
    

    function set(string memory hashCode,string memory songName,string memory album) public{
        songCount++;
        SongsList[songCount] = Songs(songCount,hashCode,songName,album,msg.sender);
        emit SongAdded(songCount,hashCode,songName,album,msg.sender);

    }
}