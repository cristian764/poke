import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import styles from '../styles/estilos';

export default function EvolucionesScreen({ route }) {
  const { pokemon } = route.params;
  const [evoluciones, setEvoluciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [detalles, setDetalles] = useState(null);

  useEffect(() => {
    if (!pokemon) {
      console.log("No se ha recibido el Pokémon correctamente");
      return;
    }

    const obtenerDetallesYEvoluciones = async () => {
      try {

        const respuestaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const datosPokemon = await respuestaPokemon.json();
        
        setDetalles({
          nombre: pokemon,
          imagen: datosPokemon.sprites.other['official-artwork'].front_default,
          altura: datosPokemon.height,
          peso: datosPokemon.weight,
          habilidades: datosPokemon.abilities.map(abil => abil.ability.name),
        });

        const respuestaEspecie = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
        const datosEspecie = await respuestaEspecie.json();
      
        const respuestaEvolucion = await fetch(datosEspecie.evolution_chain.url);
        const datosEvolucion = await respuestaEvolucion.json();
        
        let evolucionesArray = [];
        let actual = datosEvolucion.chain;
        
        while (actual) {
          if (actual.species && actual.species.name) {
            const respuestaEvoPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${actual.species.name}`);
            const datosEvoPokemon = await respuestaEvoPokemon.json();
            
            evolucionesArray.push({
              name: actual.species.name,
              imagen: datosEvoPokemon.sprites.other['official-artwork'].front_default,
              altura: datosEvoPokemon.height,
              peso: datosEvoPokemon.weight,
              habilidades: datosEvoPokemon.abilities.map(abil => abil.ability.name),
              level: actual.evolution_details ? actual.evolution_details[0]?.min_level : null,
            });
          }
          actual = actual.evolves_to && actual.evolves_to.length > 0 ? actual.evolves_to[0] : null;
        }

        setEvoluciones(evolucionesArray);
      } catch (error) {
        console.error('Error al obtener detalles o evoluciones:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetallesYEvoluciones();
  }, [pokemon]);

  const formatearNombre = (nombre) => {
    if (!nombre) return '';
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  };

  return (
    <View style={styles.container}>
      {cargando ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : (
        <ScrollView contentContainerStyle={styles.evoContainer}>
          <Text style={styles.title}>Evoluciones de {formatearNombre(pokemon)}</Text>
          
          {evoluciones.length > 0 ? (
            evoluciones.map((poke, index) => (
              <View key={index} style={styles.evoCard}>
                <Image
                  source={{ uri: poke.imagen }}
                  style={styles.evoImage}
                />
                <Text style={styles.evoName}>{formatearNombre(poke.name)}</Text>
                <Text style={styles.detallesText}>Altura: {poke.altura / 10} m</Text>
                <Text style={styles.detallesText}>Peso: {poke.peso / 10} kg</Text>
                <Text style={styles.detallesText}>Habilidades: {poke.habilidades.join(', ')}</Text>
                {poke.level && (
                  <Text style={styles.evoText}>Evoluciona al nivel {poke.level}</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.evoText}>No hay evoluciones disponibles.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}