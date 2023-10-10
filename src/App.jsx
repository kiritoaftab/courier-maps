import { Room, TextFieldsOutlined } from "@mui/icons-material";

import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import ReactMapGl, { Layer, Marker, Source } from "react-map-gl";
import "./index.css";
// import Source from "react-map-gl/dist/esm/components/source";
import logoBank from "./assets/logoBank.png";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
const TOKEN =
  "pk.eyJ1Ijoia2lyaXRvYWZ0YWIiLCJhIjoiY2xuNDdiZDhsMHUwOTJscGhzcmN6d281NyJ9.tfmVbiTUhxl21BH-GMQh5A";

function App() {
  const [newPlace, setNewPlace] = useState(null);
  const [srcPlace, setSrcPlace] = useState(null);
  const [destPlace, setDestPlace] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 9.8905527,
    longitude: 110.25311850000003,
    zoom: 3.0,
  });

  const [pathData, setPathData] = useState(null);
  const [path2Data, setPath2Data] = useState(null);
  async function handleClick(e) {
    if (e) {
      // console.log(e.lngLat.lat);
      // console.log(e.lngLat.lng);
      // const latitude = e.lngLat.lat;
      // const longitude = e.lngLat.lng;
      console.log(`here`);
      

      const pathDataJSON = makePath(srcPlace, destPlace);

      setPathData(pathDataJSON);

      const path2DataJSON = makePath(
        { lat: path2[0][0], long: path2[0][1] },
        { lat: path2[path2.length - 1][0], long: path2[path2.length - 1][1] }
      );
      setPath2Data(path2DataJSON);
    }
  }

  function makePath(src, dest) {
    if (src && dest) {
      const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [src?.long, src?.lat],
            [dest?.long, dest?.lat],
          ],
        },
      };
      return dataOne;
    }
  }

  // console.log(srcPlace);
  // Response recieved from api
  const apiResponse = {
    route: [
      {
        path: [
          [13.3042, 80.33204999999998],
          [13.304484574980378, 80.33375840671738],
          [13.305812591555483, 80.34173097139865],
          [13.306097166535862, 80.34343937811605],
          [12.387049241555482, 82.34385687139866],
          [8.098158924980378, 91.67913850671744],
          [7.179111, 93.67955599999999],
          [6.8905527, 94.25311850000003],
          [5.543947299999999, 96.92974349999997],
          [5.255389, 97.50330600000001],
          [4.65750565, 98.40456015000001],
          [1.8673833499999999, 102.61041284999999],
          [1.2695, 103.51166699999999],
          [1.28425835, 103.62640440000001],
          [1.35313065, 104.16184559999999],
          [1.367889, 104.27658300000002],
          [4.55514465, 106.68209504999999],
          [19.42900435, 117.90781794999998],
          [22.61626, 120.31333000000001],
        ],
        type: "SEA",
      },
      {
        path: [
          [22.61626, 120.31333000000001],
          [22.6851919, 120.27077215000003],
          [23.006874099999997, 120.07216885000003],
          [23.075806, 120.02961099999999],
          [23.1593059, 120.04448185000001],
          [23.548972099999997, 120.11387915],
          [23.632472, 120.12874999999997],
          [23.882667799999997, 120.34531249999998],
          [25.0502482, 121.35593749999998],
          [25.300444, 121.57249999999999],
          [26.505123249999997, 122.77068335000001],
          [32.126959750000005, 128.36220564999996],
          [33.331639, 129.560389],
          [33.377970726316974, 129.6866074094645],
          [33.5941854491295, 130.2756266536323],
          [33.64051717544647, 130.40184506309686],
          [33.6, 130.41666666667004],
        ],
        type: "SEA",
      },
    ],
    pin: [33.6, 130.41666666667],
    ais: {
      status: "NOT_ON_BOARD",
      data: null,
    },
  };

  const [route, setRoute] = useState(apiResponse.route);
  const [pin, setPin] = useState(apiResponse.pin);
  const [ais, setAis] = useState(apiResponse.ais);
  // console.log(route[0].path)

  const [path, setPath] = useState(route[0].path);
  const [path2, setPath2] = useState(route[1].path);

  const [awbInput, setAwbInput] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  function handleSubmit() {
    console.log(`AWB input ${awbInput.toUpperCase()}`);
    setNewPlace({
      lat: pin[0],
      long: pin[1],
    });

    setSrcPlace({
      lat: path[0][0],
      long: path[0][1],
    });

    console.log(path[path.length - 1]);
    setDestPlace({
      lat: path[path.length - 1][0],
      long: path[path.length - 1][1],
    });
    setFormSubmit(true);
  }
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/3">
          <img
            className="h-16 max-w-full ml-8 mt-8"
            src={logoBank}
            alt="image description"
          />

          <form className="ml-6 mt-12">
            <label
              htmlFor="awb"
              className="block mb-2 font-serif text-2xl dark:text-white"
            >
              Enter AWB number
            </label>
            <div className="flex flex-row">
              <input
                type="text"
                id="awb"
                className="bg-gray-50 uppercase border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter AWB number"
                onChange={(e) => setAwbInput(e.target.value)}
              />
              <button
                type="button"
                className=" ml-5 mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </form>
          {formSubmit ? (
            <div className="grid grid-flow-row auto-rows-max">
              <div className="flex flex-col items-center bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="w-20 h-24 rounded-full"
                  src="https://media.istockphoto.com/id/536052589/vector/map-symbol.jpg?s=612x612&w=0&k=20&c=4GjzKnytSyiFQQi8GYuP8yHnfctb5cLc_46K7dJQRoc="
                  alt="Source marker"
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Source Location
                  </h5>
                  <p className="mb-3 font-semibold  text-gray-700 dark:text-gray-400">
                    Chennai , Tamil Nadu, India 
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Latitude: {srcPlace.lat} Longitude : {srcPlace.long}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="w-20 h-24 rounded-full"
                  src="https://media.istockphoto.com/id/536052589/vector/map-symbol.jpg?s=612x612&w=0&k=20&c=4GjzKnytSyiFQQi8GYuP8yHnfctb5cLc_46K7dJQRoc="
                  alt="Destination marker"
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Destination Location
                  </h5>
                  <p className="mb-3 font-semibold  text-gray-700 dark:text-gray-400">
                    Qijin District, Taiwan 
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Latitude: {destPlace.lat} Longitude : {destPlace.long}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white  rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="w-20 h-24 rounded-full"
                  src="https://media.istockphoto.com/id/536052589/vector/map-symbol.jpg?s=612x612&w=0&k=20&c=4GjzKnytSyiFQQi8GYuP8yHnfctb5cLc_46K7dJQRoc="
                  alt="Source marker"
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Next Location
                  </h5>
                  <p className="mb-3 font-semibold  text-gray-700 dark:text-gray-400">
                    Hakata Port , Fukouka, Japan 
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Latitude: {newPlace.lat} Longitude : {newPlace.long}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ``
          )}
        </div>
        <div
          className="basis-2/3"
          style={{ width: "100vw", height: "100vh", zIndex: 999 }}
        >
          <ReactMapGl
            {...viewPort}
            mapboxAccessToken={TOKEN}
            width="100%"
            height="100%"
            transitionDuration="200"
            mapStyle="mapbox://styles/kiritoaftab/clf9s30t000gh01pevrhhm9k9"
            onViewportChange={(viewPort) => setViewPort(viewPort)}
            onDblClick={handleClick}
            projection="globe"
            boxZoom={true}
            dragPan={true}
          >
            {srcPlace ? (
              <Marker latitude={srcPlace.lat} longitude={srcPlace.long}>
                <Room
                  style={{
                    fontSize: 7 * viewPort.zoom,
                    color: "blue",
                    cursor: "pointer",
                  }}
                />
              </Marker>
            ) : null}

            {destPlace ? (
              <Marker latitude={destPlace.lat} longitude={destPlace.long}>
                <Room
                  style={{
                    fontSize: 7 * viewPort.zoom,
                    color: "tomato",
                    cursor: "pointer",
                  }}
                />
              </Marker>
            ) : null}

            {newPlace ? (
              <Marker latitude={newPlace.lat} longitude={newPlace.long}>
                <Room
                  style={{
                    fontSize: 7 * viewPort.zoom,
                    color: "green",
                    cursor: "pointer",
                  }}
                />
              </Marker>
            ) : null}
            {pathData ? (
              <Source id="polyLineLayer" type="geojson" data={pathData}>
                <Layer
                  id="lineLayer"
                  type="line"
                  source="my-data"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": "rgba(0, 0, 0, 0.8)",
                    "line-width": 3,
                  }}
                />
              </Source>
            ) : null}

            {/* {path2Data ? (
              <Source id="polyLineLayer" type="geojson" data={path2Data}>
                <Layer
                  id="lineLayer"
                  type="line"
                  source="my-data"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": "rgba(0, 0, 0, 0.8)",
                    "line-width": 3,
                  }}
                />
              </Source>
            ) : null} */}

            {path
              ? path.map((p, index) => {
                  return (
                    <>
                      <Marker latitude={p[0]} longitude={p[1]} key={index}>
                        <Room
                          style={{
                            fontSize: 7 * viewPort.zoom,
                            color: "black",
                            cursor: "pointer",
                          }}
                        />
                      </Marker>
                    </>
                  );
                })
              : null}
            {path2
              ? path2.map((p, index) => {
                  return (
                    <>
                      <Marker latitude={p[0]} longitude={p[1]} key={index}>
                        <Room
                          style={{
                            fontSize: 7 * viewPort.zoom,
                            color: "black",
                            cursor: "pointer",
                          }}
                        />
                      </Marker>
                    </>
                  );
                })
              : null}
          </ReactMapGl>
        </div>
      </div>
    </>
  );
}

export default App;
