import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import styles from '../styles/estilos';

export default function DetallesPokemonScreen({ route }) {
  const { pokemon } = route.params;
  const [detalles, setDetalles] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetalles = async () => {
      try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const datos = await respuesta.json();
        console.log(datos);
        setDetalles(datos);
      } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
      } finally {
        setCargando(false);
      }
    };
  
    obtenerDetalles();
  }, [pokemon]);

  return (
    <View style={styles.container}>
      {cargando ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : detalles ? (
        <View>
          <Text style={styles.title}>
            {detalles.name.charAt(0).toUpperCase() + detalles.name.slice(1)}
          </Text>
          <Image
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detalles.id}.png` }}
            style={{ width: 200, height: 200, alignSelf: 'center' }}
          />
          <Text style={styles.detallesTitle}>Detalles del Pokémon</Text>
          <Text style={styles.detallesText}>Nombre: {detalles.name}</Text>
          <Text style={styles.detallesText}>Tipo: {detalles.types.map(type => type.type.name).join(', ')}</Text>
          <Text style={styles.detallesText}>
            Habilidades: {detalles.abilities.map(ability => ability.ability.name).join(', ')}
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>No se encontró información sobre el Pokémon.</Text>
      )}
    </View>
  );
}
