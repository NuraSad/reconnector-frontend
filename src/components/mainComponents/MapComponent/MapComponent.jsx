import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MapComponent = ({ coordinates }) => {
  const [selectedPin, setSelectedPin] = useState(null);

  const handleMarkerClick = (coordinate) => {
    setSelectedPin(coordinate);
  };

  const closeModal = () => {
    setSelectedPin(null);
  };

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            position={[coordinate.lat, coordinate.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(coordinate),
            }}
          >
            {/* <Popup>
              POPUP CONTENT
            </Popup> */}
          </Marker>
        ))}
      </MapContainer>

      <Modal
        open={!!selectedPin}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>

            <h4>Pin Details</h4>
          {selectedPin && (
            <>
                <p>Latitude: {selectedPin.lat}</p>
                <p>Longitude: {selectedPin.lng}</p>
            </>
          )}
          <Button onClick={closeModal} sx={{ mt: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MapComponent;
