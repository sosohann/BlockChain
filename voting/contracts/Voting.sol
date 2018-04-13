pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Voting {
    // TODO : getVoteCandidateList
    struct Poll {
        bool exists;
        bytes32 pName;
        bytes32[] public candidateList;

        // inefficient
        bytes32[] public cNameList;
        mapping(bytes32 => Human) public humans;
    }

    struct Human {
        bytes32 cName;
        uint8 count;
    }   

    mapping( uint8 => poll ) public polls;
    bytes32[] public temp;
    mapping( bytes32 => Human ) public humans;

    function createPoll( uint8 _roomNumber, bytes32 _pName ) public {
        polls[_roomNumber] = Poll( true, _pName, , , );
    }

    function insertCandidate( uint8 _roomNumber, bytes32 _candidate, bytes32 _cName ) public {
        uint leng = polls[_roomNumber].candidateList.length;

        // method 1
        require( !polls[_roomNumber].exists );
        
        polls[_roomNumber].candidateList[leng] = _candidate;
        polls[_roomNumber].cNameList[leng] = _cName;
        polls[_roomNumber].human[_candidate] = Human ( _cName, 0 )
    }

    function getVoteCandidateList(uint8 _roomNumber) view public returns ( bytes32[] ) {
        bytes32[] memory c = polls[_roomNumber].cNameList;
        return ( c );
    }

    function removeCandidate( uint8 _roomNumber, bytes32 _candidate ) public {
        // method 2
        require( validCandidate( _roomNumber, _candidate ) );
        delete humans[_roomNumber][_candidate];
    }

    // This function returns the total votes a candidate has received so far
    function totalVotesFor( uint8 _roomNumber, bytes32 _candidate ) view public returns ( uint8 ) {
        // method 2
        require( validCandidate( _roomNumber, _candidate ) );
        return humans[_roomNumber][_candidate].count;
    }

    // This function increments the vote count for the specified candidate. This
    // is equivalent to casting a vote

    //TODO : Edit argc
    function voteForCandidate( uint8 _roomNumber, bytes32 _candidate ) public {
        // method 2
        require(validCandidate( _roomNumber, _candidate ) ) ;
        humans[_roomNumber][_candidate].count += 1;
    }

    function validCandidate( uint8 _roomNumber, bytes32 _candidate ) view public returns ( bool ) {
        uint leng = polls[_roomNumber].candidateList.length;
        for( uint i = 0; i < leng; i++ ) {
            if ( candidateList[i] == _candidate ) {
                return true;
            }
        }
        return false;
    }


}