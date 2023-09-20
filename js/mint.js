// Function to handle minting a certificate as an NFT
async function mintCertificateAsNFT() {
    // Get the certificate ID input element
    const certificateIdInput = document.getElementById('certificateId');

    // Get the value entered by the user (the certificate ID)
    const certificateId = certificateIdInput.value;

    // Check if Web3 provider (MetaMask) is available
    if (typeof ethereum === 'undefined') {
        console.error('MetaMask or similar Ethereum wallet not detected.');
        return;
    }

    // Create a Web3 instance
    const web3 = new Web3(ethereum);

    try {
        // Request account access if needed
        await ethereum.enable();

        // Your contract interaction code
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
        const contractAbi = [
            // Include your contract's ABI here
            // Example:
            {
                constant: false,
                inputs: [
                    {
                        name: 'certificateId',
                        type: 'uint256',
                    },
                ],
                name: 'mintCertificateAsNFT',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ];

        // Create a contract instance
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // Send the transaction to mint the certificate as an NFT
        const accounts = await web3.eth.getAccounts();
        await contract.methods.mintCertificateAsNFT(certificateId).send({ from: accounts[0] });

        // Display success message
        const mintingResult = document.querySelector('.minting-result .status');
        mintingResult.textContent = 'Minted as NFT';
        mintingResult.style.color = 'green';
    } catch (error) {
        // Handle errors, display an error message
        console.error('Minting failed:', error);
        const mintingResult = document.querySelector('.minting-result .status');
        mintingResult.textContent = 'Minting Failed';
        mintingResult.style.color = 'red';
    }
}

// Event listener for the form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    mintCertificateAsNFT(); // Call the mintCertificateAsNFT function
});
