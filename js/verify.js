// Function to handle document verification
async function verifyDocument() {
    // Get the document hash input element
    const documentHashInput = document.getElementById('documentHash');

    // Get the value entered by the user (the document hash)
    const documentHash = documentHashInput.value;

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

        // Your verification code
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
        const contractAbi = [
            // Include your contract's ABI here
            // Add the ABI of your 'verifyCertificate' function here
        ];

        // Create a contract instance
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // Call the 'verifyCertificate' function on the contract
        const isVerified = await contract.methods.verifyCertificate(documentHash).call();

        // Display the verification result
        const verificationResult = document.querySelector('.verification-result .status');
        if (isVerified) {
            verificationResult.textContent = 'Verified';
            verificationResult.style.color = 'green';
        } else {
            verificationResult.textContent = 'Not Verified';
            verificationResult.style.color = 'red';
        }
    } catch (error) {
        // Handle errors, display an error message
        console.error('Verification failed:', error);
        const verificationResult = document.querySelector('.verification-result .status');
        verificationResult.textContent = 'Verification Failed';
        verificationResult.style.color = 'red';
    }
}

// Event listener for the form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    verifyDocument(); // Call the verifyDocument function
});
