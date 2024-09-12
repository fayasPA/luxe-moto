import React from 'react';

const MapComponent = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.194343017122!2d76.33660051146924!3d10.083156471554986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080f9ac54f0edd%3A0x751fa7ddf80579cf!2sLUXE%20MOTO!5e0!3m2!1sen!2sin!4v1725518154282!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>
  );
};

export default MapComponent;
