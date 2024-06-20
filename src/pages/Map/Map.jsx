import './Map.scss'
import React, { useEffect, useState } from "react";
import MapComponent from '../../components/mainComponents/MapComponent/MapComponent';


export default function Groups() {

    const [coordinates, setCoordinates] = useState([
        { lat: 51.505, lng: -0.09 },
        { lat: 51.515, lng: -0.1 },
        { lat: 51.525, lng: -0.11 },
        { lat: 51.535, lng: -0.12 }
      ]);
    //   useEffect(() => {
    //       const fetchCoordinates = async (groupType) => {
    //         const { data, error } = await supabase.from('').select();
    //         if (error) {
    //           console.log(error);
    //           setFetchError("Could not Fetch the Group");
    //         } else{
    //           setFetchError(null);
    //           setCoordinates(data);
    //         }
    //       };
    //       fetchCoordinates();
    //     }, []);

    return(
    <div className='map'>
      {/* <h1 className='page-font'>Maps</h1> */}
      <MapComponent coordinates={coordinates} />
    </div>
    )
  }