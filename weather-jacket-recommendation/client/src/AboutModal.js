import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AboutModal = ({ setIsModalOpen }) => {
    // Prevent clicks from closing the modal
    const handleModalClick = (e) => {
      e.stopPropagation();
    };
  
    return (
      <div
        onClick={handleModalClick}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#F1EBE9',
          padding: '40px',
          zIndex: 1000, // Ensure the modal appears above the overlay
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: 'auto', // Adjust based on content or specify a value
          minHeight: '30vh', // Ensures the modal has a minimum height of 50% of the viewport height
          overflowY: 'auto', // Adds scroll to the modal content if it overflows vertically
          fontSize: '1.2rem', // Larger text
          color: '#282c34', // Text color for contrast
          display: 'flex', // Use flexbox for layout
          flexDirection: 'column', // Stack children vertically
          justifyContent: 'space-around', // Distribute space around items for a taller appearance
        }}
      >
        {/* Close Icon */}
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() => setIsModalOpen(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          color: '#282c34', // Adjust for contrast as needed
          fontSize: '1.5rem', // Adjust size as needed
        }}
      />
        {/* Modal content */}
        <div style={{margin: '0 auto', textAlign: 'center'}}>
        <h2>About This App</h2>
        <br></br>
        <p>This app helps you decide whether you need a jacket based on the current weather conditions.</p>
        <p>Jacket icons created by <a href="https://www.flaticon.com/free-icons/jacket" title="jacket icons" target="_blank" rel="noopener noreferrer">photo3idea_studio</a></p>
      </div>
      </div>
    );
  };
  

export default AboutModal;