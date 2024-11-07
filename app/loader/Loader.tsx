import React, { createContext, useContext, useState } from 'react';
import './Loader.css'; // Import CSS for styling



const LoaderContext = createContext({ isLoading: false, setLoading: (loading: boolean) => {} });

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  // Optional: Function to simulate loading for demonstration purposes
  const simulateLoading = async () => {
    setLoading(true);
    try {
      // Simulate a network request or loading process
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading for 2 seconds
    } catch (error) {
      console.error('Error during loading:', error);
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  return (
    <LoaderContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && (
        <div className="loader" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
          <div className="loader-content" style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>
          <div className="loader-container">
            <div className="spinner"></div>
        </div>
          </div>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);