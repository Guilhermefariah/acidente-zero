import { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

interface MarkerType {
    position: google.maps.LatLngLiteral;
    id: number;
}

const Map = () => {
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);

    const clearMarkers = () => {
        setMarkers([]);
        setSelectedMarker(null);
    }

    const saveMarkers = () => {
        console.log("Marcadores salvos:", markers);
    }

    const onMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const newMarker: MarkerType = {
                position: event.latLng.toJSON(),
                id: Math.random(),
            };
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
    }

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDOE23aQV3prquDwLQGNBHpUVUwul33yNg",
    });

    if (loadError) return <div>Erro ao carregar o mapa</div>;
    if (!isLoaded) return <div>Carregando o mapa...</div>;

    const markerIcon = {
        url: '/img/marker.png',
        scaledSize: new window.google.maps.Size(25, 41),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(12, 41),
    }

    const useLocate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newMarker: MarkerType = {
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    id: Math.random(),
                };
                setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            });
        } else {
            alert("Geolocalização não suportada neste navegador.");
        }
    }

    return (
        <div className="bg-gray-100 p-4">
            <div className="border-2 border-gray-500 relative">
                <GoogleMap
                    center={{ lat: -23.257046, lng: -46.739705 }}
                    zoom={13}
                    onClick={onMapClick}
                    mapContainerStyle={{ height: "80vh", width: "100%" }}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={markerIcon}
                            onClick={() => setSelectedMarker(marker)}
                        >
                            {selectedMarker && selectedMarker.id === marker.id && (
                                <InfoWindow
                                    position={marker.position}
                                    onCloseClick={() => setSelectedMarker(null)}
                                >
                                    <div>Problema relatado.</div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            </div>
            <div className="text-start mt-2 flex flex-wrap gap-2 sm:gap-4 lg:gap-6">
                <button 
                    className="bg-gray-700 text-gray-100 py-2 px-4 rounded hover:bg-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110 lg:px-6 lg:py-3" 
                    onClick={clearMarkers}
                >
                    Limpar
                </button>
                <button 
                    className="bg-gray-500 text-gray-100 py-2 px-4 rounded hover:bg-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110 lg:px-6 lg:py-3" 
                    onClick={saveMarkers}
                >
                    Salvar
                </button>
                <button 
                    className="bg-gray-500 text-white py-2 px-4 rounded ml-2 mt-2 hover:bg-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110" 
                    onClick={useLocate}
                >
                    Minha Localização
                </button>
            </div>
        </div>
    )
}

export default Map;
