// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertificateVerification is ERC721 {
    address public owner;
    mapping(uint256 => Certificate) public certificates;

    uint256 public certificateCounter;
    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed issuer
    );
    event CertificateVerified(
        uint256 indexed certificateId,
        address indexed verifier,
        bool isValid
    );

    constructor() ERC721("Certificate", "CERT") {
        owner = msg.sender;
        certificateCounter = 0;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    struct Certificate {
        address issuer;
        string certificateType;
        string holdersName;
        uint256 dateOfIssuance;
        bool isValid;
        string additionalData;
        string documentUrl;
        address holder; // Address of the certificate holder
    }

    function issueCertificate(
        string memory certificateType,
        string memory holdersName,
        string memory additionalData,
        string memory documentUrl,
        address holder // Address of the certificate holder
    ) external onlyOwner {
        certificateCounter++;
        uint256 certificateId = certificateCounter;
        require(
            certificates[certificateId].issuer == address(0),
            "Certificate with this ID already exists"
        );

        certificates[certificateId] = Certificate({
            issuer: msg.sender,
            certificateType: certificateType,
            holdersName: holdersName,
            dateOfIssuance: block.timestamp,
            isValid: true,
            additionalData: additionalData,
            documentUrl: documentUrl,
            holder: holder // Set the holder of the certificate
        });

        emit CertificateIssued(certificateId, msg.sender);
    }

    // Function to allow the holder to mint the certificate as an NFT
    function mintCertificateAsNFT(uint256 certificateId) external {
        Certificate storage certificate = certificates[certificateId];
        require(
            msg.sender == certificate.holder,
            "Only the certificate holder can mint the NFT"
        );
        require(certificate.isValid, "Certificate is not valid");

        _safeMint(msg.sender, certificateId);

        // certificate.isValid = false;
    }

    // Step 2: Certificate Verification
    function verifyCertificate(
        uint256 certificateId
    ) external view returns (bool) {
        Certificate storage certificate = certificates[certificateId];
        require(certificate.issuer != address(0), "Certificate not found");
        return certificate.isValid;
    }
}
