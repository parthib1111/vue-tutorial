import React, { useState } from 'react'

function WeatherCard() {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    let jsonData = null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("come to me");
        if (location === "") {
            alert("Please a enter a valid location first!!!!");
            return;
        }
        const url = `http://api.weatherstack.com/current?access_key=d44804024a09da3b072d197a122a34aa&query=${location}`;
        try {
            let response = await fetch(url);
            console.log(response);
            if (response.ok) {
                jsonData = await response.json();
                console.log(jsonData);
                setWeatherData(jsonData);
                setLocation("");
            }
            else {
                console.error("There is an error", response.status);
            }

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='bg-white rounded-md p-10 max-w-md shadow-xl mx-auto'>
            <h1 className='text-center text-4xl font-sans text-cyan-400 font-extrabold p-7 mb-7'>Weather Data</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Enter location here'
                    className='p-4 mb-7 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button
                    type='submit'
                    className='bg-green-500 p-4 w-full text-white rounded-md hover:bg-green-600 focus:ring-green-500 transition duration-200'>Get Weather</button>
            </form>
            <div className='mt-7'>
                {weatherData &&
                    <div className='mt-6'>
                        <div>
                            <h2 className='text-3xl font-semibold'>{weatherData.location.name},{weatherData.location.region}</h2>
                            <p className='text-lg'>{weatherData.location.country}</p>
                        </div>
                        <div className='flex justify-center items-center mt-7'>
                            <img
                                src={weatherData.current.weather_icons[0]}
                                alt="Weather icon"
                                className="w-20 h-20"
                            />
                            <div className='ml-4'>
                                <p className='text-5xl font-bold'>{weatherData.current.temperature}°C</p>
                                <p className="text-2xl">{weatherData.current.weather_descriptions[0]}</p>
                            </div>
                        </div>

                        <div className='grid sm:grid-cols-3 grid-cols-2 gap-6 mt-6'>
                            <div className="p-6 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-md">
                                <p className="text-lg font-medium text-gray-700">Wind</p>
                                <p className="text-xl text-gray-500">{weatherData.current.wind_speed}km/h</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-md">
                                <p className="text-lg font-medium text-gray-700">Humidity</p>
                                <p className="text-xl text-gray-500">{weatherData.current.humidity}%</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-md">
                                <p className="text-lg font-medium text-gray-700">UV Index</p>
                                <p className="text-xl text-gray-500">{weatherData.current.uv_index}</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-md">
                                <p className="text-lg font-medium text-gray-700">Feels Like</p>
                                <p className="text-xl text-gray-500">{weatherData.current.feelslike}°C</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-md">
                                <p className="text-lg font-medium text-gray-700">Sunrise</p>
                                <p className="text-xl text-gray-500">{weatherData.current.astro.sunrise}</p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-lg text-center bg-gray-50 shadow-md">
                                <p className="text-lg font-medium text-gray-700">Sunset</p>
                                <p className="text-xl text-gray-500">{weatherData.current.astro.sunset}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div>
            </div>
        </div>
    )
}

export default WeatherCard;