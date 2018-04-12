pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Voting {
    // TODO : getVoteCandidateList
    struct human{
        bytes32 name; 
        uint8 count;
    }

    mapping (bytes32 => human) public votesReceived;
    
    bytes32[] public candidateList;

    function getVoteCandidateList(uint8 roomNumber) view public returns (human){
        
    }

  // This function returns the total votes a candidate has received so far
    function totalVotesFor(bytes32 votenumber, bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate].name;
    }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote

  //TODO : Edit argc
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}