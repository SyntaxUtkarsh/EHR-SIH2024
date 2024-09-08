// src/IPFS/AddPatientRecords.js
import React, { useState } from 'react';
import { ipfs } from '../ipfs/configIPFS'; // Adjust the import path if necessary
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'; // For notifications



const AddPatientRecords = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { file } = data;

    if (!file[0]) {
      toast.error("Please select a file to upload");
      setLoading(false);
      return;
    }

    try {
      const fileData = file[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const buffer = new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array

        // Upload file to IPFS
        const result = await ipfs.add(buffer);

        const cid = result.path; // Retrieve the IPFS CID
        toast.success("File uploaded successfully");

        // Optionally: send CID and other data to your backend or update state
        console.log("File CID:", cid);
        reset();
      };

      reader.readAsArrayBuffer(fileData);
    } catch (error) {
      toast.error("Error uploading file to IPFS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Medical Record</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Select File</label>
          <input
            id="file"
            type="file"
            accept=".pdf, .jpeg, .png, .doc"
            {...register("file")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default AddPatientRecords;
