import React, { useState } from 'react';
import CryptoJS from 'crypto-js'; 

const PasscodeModal = ({isOpen}) => {
  const [storedHash, setStoredHash] = useState('');
  const [inputPasscode, setInputPasscode] = useState('');
  const [isVerified, setIsVerified] = useState(null);

  // Hashes a passcode using MD5
  const hashPasscode = (passcode) => {
    return CryptoJS.MD5(passcode).toString();
  };

  // Stores the hashed passcode
  const storePasscode = (passcode) => {
    const hash = hashPasscode(passcode);
    setStoredHash(hash); // Simulates storage
    alert('Passcode stored securely.');
  };

  // Verifies if the provided passcode matches the stored hash
  const verifyPasscode = (providedPasscode) => {
    const hash = hashPasscode(providedPasscode);
    setIsVerified(hash === storedHash);
      setInputPasscode('');
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal passcode-modal">
        <h2>Verify Passcode</h2>
      <div className="modal-content">
        <div>
          <label>Passcode: </label>
          <input
            type="password"
            // placeholder="Enter passcode"
            onChange={(e) => setInputPasscode(e.target.value)}
          />
        </div>
        <div className="modal-verify">
          {isVerified !== null && (
            <div>
              {isVerified ? (
                <p style={{ color: 'green' }}>Access granted: passcode matches!</p>
              ) : (
                <p style={{ color: 'red' }}>Access denied: incorrect passcode.</p>
              )}
            </div>
          )}
        </div>
        <button onClick={() => verifyPasscode(inputPasscode)}>
          Verify Passcode
        </button>
        <button >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PasscodeModal;
