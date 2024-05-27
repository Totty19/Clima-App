import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, Button, Image  } from 'react-native';

const ClimaAPP = () => {
    const [city, setCity] = useState('...')
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '3b76148821286203d7f4a67e2d9106dc';


    const Api = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
                
            if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Network response was not ok: ${errorDetails}`);
            }

            const data = await response.json();
            setWeather(data);   
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        Api();
    }, []);
    
    const Busqueda = () => {
        Api();
    };


    if (loading) {
        return <Text>Cargando Datos...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tit}>Tu clima App</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe una ciudad"
                value={city}
                onChangeText={setCity}
            />
            <Button title="Buscar" onPress={Busqueda} />
            {weather && (
                <View style={styles.container}>
                    <Text>{weather.sys.country}</Text>
                    <Text style={styles.title}>{weather.name}</Text>
                    <Text>{weather.weather[0].description}</Text>
                    <Image
                            style={styles.icon}
                            source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                        />
                    <View style={styles.Cont}>
                        <View>
                            <Text>Temperatura actual: {weather.main.temp}°C</Text>
                            <Text>Humedad: {weather.main.humidity}%</Text>
                            <Text>Sensacion termica de: {weather.main.feels_like}°C</Text>
                        </View>
                        <View>
                            <Text>Max{weather.main.temp_max}°C  / Min{weather.main.temp_min}°C</Text>
                            <Text>Viento de: {weather.wind.speed} metro/seg</Text>
                            <Text>Nubosidad de: {weather.clouds.all}%</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#8FC1B5',
            width: '96%',
            color: 'white',
            borderRadius: 8,
        },
        Cont: {
            flexDirection: 'row',
            gap:15
        },
        input: {
            height: 40,
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 15,
            color: 'white',
            overflow: 'hidden',
            marginBottom: 10,
            paddingHorizontal: 10,
            width: '90%',
            textAlign: 'center',
            fontSize: 22,
            flexDirection: 'row'
        },

        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            color:'black',
        },

        icon: {
            width: 100,
            height: 100,
            marginBottom: 10,
        },

        tit:{
            fontSize: 35,
            marginBottom: 45,
            padding: 10,
            textAlign: 'center',
            width: '100%',
            borderRadius: 15,
            color: '#003B4A',
            backgroundColor: '#BFBFBF',
            borderWidth: 5,
            borderColor: '#003B4A'
        }
});

export default ClimaAPP;



