/// <reference types="jquery" />
// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);

let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

let voteNumber=0;
let candidateNumber=0;

window.getVoteCandidateList = function(){
  roomNumber = $("#vote_number").val();
  try{
    Voting.deployed().then(function(contractInstance){
      contractInstance.getVoteCandidateList(roomNumber,{gas:470000,from:web3.eth.accounts[0]}).then(function(list){
        $("#candidate_list").empty();
        candidateNumber = list.length;
        list.forEach(element,idx => {
          var $item = $('<tr><td id="candidate_name-"'+index+'>'+element+'</td>\
                            <td id="candidate-"'+index+'></td>\
                            <td><button onclick="voteForCandidate('+index+')">Vote</button></td>\
                          </tr>');
          $("#candidata_list").append($item);
        });
      });
    });
  }catch (err) {
    console.log(err);
  }
}

window.voteForCandidate = function(index) {
  let candidateName = $("#candidate_name-"+index).val();
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")

    Voting.deployed().then(function(contractInstance) {
      contractInstance.voteForCandidate(roomNumber,candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        for(var i=0;i<candidateNumber;i++){
          let index = i;
          let name = $("#candidate_name-"+index).val();
          contractInstance.totalVotesFor.call(name).then(function(count){
            $("#candidate-"+index).val(count);
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Voting.setProvider(web3.currentProvider);
});