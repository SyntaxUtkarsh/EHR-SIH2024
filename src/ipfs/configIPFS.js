// src/IPFS/configIPFS.js
import { create } from 'ipfs-http-client';

// Create an instance of the IPFS client
const ipfs = create({
  host: '127.0.0.1',
  port: 5001,
  protocol: 'http',
});

export async function addFile(fileContent) {
    try {
      // Add the file content to IPFS
      const result = await ipfs.add(fileContent);
      
      // Log the CID (Content Identifier)
      console.log('File added successfully! CID:', result.path);
      
      return result.path;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  
  // Function to retrieve a file from IPFS
  export async function getFile(cid) {
    try {
      // Retrieve file content from IPFS using CID
      const chunks = [];
      for await (const chunk of ipfs.cat(cid)) {
        chunks.push(chunk);
      }
      
      // Convert Uint8Array to string (if the file is text-based)
      const fileContent = Buffer.concat(chunks).toString();
      
      console.log('File retrieved successfully! Content:', fileContent);
      
      return fileContent;
    } catch (error) {
      console.error('Error retrieving file:', error);
    }
  }
  
  // Example usage
  (async () => {
    // Add a file (string content) to IPFS
    const cid = await addFile('Hello, IPFS! This is stored locally.');
    
    // Retrieve the file from IPFS
    await getFile(cid);
  })();

export { ipfs };
