// Connect to Metamask-enabled Ethereum provider
window.addEventListener('load', async () => {
    if (typeof ethereum === 'undefined') {
        console.error('Metamask or similar Ethereum wallet not detected.');
        return;
    }
    // Create a Web3 instance
    const web3 = new Web3(ethereum);

    try {
        // Request account access if needed
        await ethereum.enable();
    } catch (error) {
        // User denied account access...
        console.error('User denied account access');
    }
    // Ethereum provider is now connected to the user's Metamask wallet
});

// Function to handle document upload
async function uploadDocument() {
    if (typeof ethereum === 'undefined') {
        console.error('Metamask or similar Ethereum wallet not detected.');
        return;
    }

    // Specify your contract address and ABI
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
    const contractAbi = [
        // Include your contract's ABI here
    ];

    // Create a new web3 instance
    const web3Instance = new Web3(ethereum);

    // Check if the user is connected to an Ethereum wallet (e.g., Metamask)
    if (!(await web3Instance.eth.net.isListening())) {
        console.error('Not connected to an Ethereum wallet. Please connect Metamask or a similar wallet.');
        return;
    }

    // Create a contract instance
    const contract = new web3Instance.eth.Contract(contractAbi, contractAddress);

    // Get the file input element
    const fileInput = document.getElementById('document');

    // Check if a file is selected
    if (fileInput.files.length === 0) {
        alert('Please select a document to upload.');
        return;
    }

    // Get the selected file
    const selectedFile = fileInput.files[0];

    // Example: Call a function from your contract to upload the document
    try {
        const accounts = await web3Instance.eth.getAccounts();
        // Replace with your contract function call
        await contract.methods.uploadDocument(selectedFile.name).send({ from: accounts[0] });

        // Handle the result or perform additional actions here
        alert('Document uploaded successfully.');
    } catch (error) {
        // Handle errors, display an error message
        console.error('Upload failed:', error);
        alert('Upload failed. Please check the console for details.');
    }
}

// Event listener for the form submission
document.querySelector('#upload-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    uploadDocument(); // Call the uploadDocument function
});
