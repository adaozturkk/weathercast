import React from 'react'

const LocationButton = ({ setLat, setLon }) => {
  // Get user's location if they let, otherwise throw error.
  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, err);

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLat(latitude);
      setLon(longitude);
    }

    function err(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button
        className="cursor-pointer rounded-full bg-sky-500/70 active:bg-sky-600 hover:bg-sky-600 transition-colors p-2"
        onClick={() => getLocation()}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
              fill="currentColor"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.08296 7C2.50448 4.48749 4.48749 2.50448 7 2.08296V0H9V2.08296C11.5125 2.50448 13.4955 4.48749 13.917 7H16V9H13.917C13.4955 11.5125 11.5125 13.4955 9 13.917V16H7V13.917C4.48749 13.4955 2.50448 11.5125 2.08296 9H0V7H2.08296ZM4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8Z"
              fill="currentColor"
            ></path>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
};

export default LocationButton;
