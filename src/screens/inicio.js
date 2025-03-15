import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Pokemon from '../componentes/Pokemon';
import styles from '../styles/estilos';

export default function HomeScreen() {
  const [listaPokemon, setListaPokemon] = useState([]);
  const [pokemon, setPokemon] = useState('bulbasaur');
  const [cargando, setCargando] = useState(true);
  const [detallesPokemon, setDetallesPokemon] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0')
      .then(response => response.json())
      .then(data => {
        setListaPokemon(data.results);
        setCargando(false);
      })
      .catch(error => {
        console.error(error);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    if (pokemon) {
      setCargando(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
          setDetallesPokemon(data);
          setCargando(false);
        })
        .catch(error => {
          console.error(error);
          setCargando(false);
        });
    }
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige un Pokémon</Text>
      <Picker
        selectedValue={pokemon}
        onValueChange={(itemValue) => setPokemon(itemValue)}
        style={styles.picker}
      >
        {listaPokemon.map((poke, index) => (
          <Picker.Item key={index} label={poke.name.toUpperCase()} value={poke.name} />
        ))}
      </Picker>
      <Pokemon detallesPokemon={detallesPokemon} cargando={cargando} />
      
      {/* Botón personalizado */}
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('Evoluciones', { pokemon })}
      >
        <Text style={styles.customButtonText}>Ver Evoluciones</Text>
      </TouchableOpacity>
    </View>
  );
}