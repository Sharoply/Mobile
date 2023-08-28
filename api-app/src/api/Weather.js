import { View, Text, StyleSheet, Button, TextInput} from "react-native";
import React, {useState} from "react";
import axios from "axios";
const Weather=() => {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const API_KEY = "65c30d4836db1bfe76e870ca33c723e4"; 

    const getWeather = async () =>{
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Error Fetching Weather Data", error);
        }
        
    };
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Weather 🌧 : {city}</Text>
            <TextInput 
                placeholder="City Name i.e. London or Bangkok"
                value={city}
                onChangeText={(newText)=>setCity(newText)}
                style = {styles.input}
                />
            <Button title = ' Get Weather' onPress={getWeather} color='#006988'/>
            {weather &&(
            <View style={styles.infoContainer}>
                <Text style={styles.infoTemp}>{Math.round(weather.main.temp - 273.15)} °C</Text>
                <Text style={styles.info}>{weather.weather[0].description}</Text>
                <Text style={styles.info}>Cloudiness: {weather.clouds.all}%</Text>
                <Text style={styles.info}>Humidity: {weather.main.humidity}%</Text>
                <Text style={styles.info}>Wind Speed: {weather.wind.speed} meter/sec</Text>
                <Text style={styles.info}>Atmospheric pressure : {weather.main.pressure} hPa</Text>
                <Text style={styles.info}>Lon : {weather.coord.lon} Lat : {weather.coord.lat}</Text>

            </View>
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 24,
        margin: 10,
        color: 'white'
    },
    infoContainer: {
        backgroundColor: "#e4f7fa",
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        marginBottom: 10,
        borderColor:'black',
      },
      infoTemp: {
        fontSize: 20,
        color:'#006988',
      },
      info: {
        color: '#0082a0',
        fontSize: 16,
      },
      input:{
        backgroundColor: 'white',
        paddingLeft: 10,
        padding: 8,
        width: 300,
        marginBottom: 10,
        fontSize: 20,
        borderRadius: 8,
        borderColor:'black',
        borderWidth: 1,
      },
});

export default Weather;