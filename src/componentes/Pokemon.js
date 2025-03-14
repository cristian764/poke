import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

const Pokemon = ({ detallesPokemon, cargando }) => {
  if (cargando) {
    return <ActivityIndicator size="large" color="#ff0000" />;
  }

  if (!detallesPokemon) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{detallesPokemon.name}</Text>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detallesPokemon.id}.png` }}
        style={styles.image}
      />
      <Text style={styles.details}>Altura: {detallesPokemon.height / 10} m</Text>
      <Text style={styles.details}>Peso: {detallesPokemon.weight / 10} kg</Text>
      <Text style={styles.details}>Habilidades:</Text>
      {detallesPokemon.abilities.map((ability, index) => (
        <Text key={index} style={styles.details}>
          - {ability.ability.name}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  details: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
});

export default Pokemon;
