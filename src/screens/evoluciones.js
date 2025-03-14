import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import styles from '../styles/estilos';

export default function EvolucionesScreen({ route, navigation }) {
  const { pokemon } = route.params;
  const [evoluciones, setEvoluciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerEvoluciones = async () => {
      try {
        const respuestaEspecie = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
        const datosEspecie = await respuestaEspecie.json();
        
        const respuestaEvolucion = await fetch(datosEspecie.evolution_chain.url);
        const datosEvolucion = await respuestaEvolucion.json();
        
        let evolucionesArray = [];
        let actual = datosEvolucion.chain;
        
        while (actual) {
          evolucionesArray.push(actual.species.name);
          actual = actual.evolves_to.length > 0 ? actual.evolves_to[0] : null;
        }

        setEvoluciones(evolucionesArray);
      } catch (error) {
        console.error('Error al obtener evoluciones:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerEvoluciones();
  }, [pokemon]);

  const formatearNombre = (nombre) => {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evoluciones de {formatearNombre(pokemon)}</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : (
        evoluciones.length > 0 ? (
          <ScrollView contentContainerStyle={styles.evoContainer}>
            {evoluciones.map((poke, index) => (
              <TouchableOpacity
                key={index}
                style={styles.evoCard}
                onPress={() => navigation.navigate('DetallesPokemon', { pokemon: poke })}
              >
                <Text style={styles.evoName}>{formatearNombre(poke)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.text}>No hay evoluciones disponibles.</Text>
        )
      )}
    </View>
  );
}
