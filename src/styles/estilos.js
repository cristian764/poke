import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', 
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff0000', 
    textAlign: 'center',
    marginVertical: 25,
  },
  picker: {
    backgroundColor: '#333', 
    color: '#fff', 
    borderRadius: 10,
    marginBottom: 20,
  },
  evoText: {
    fontSize: 18,
    color: '#fff', 
    textAlign: 'center',
    marginVertical: 5,
  },

  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center', 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', 
    fontWeight: 'bold',
  },

  detallesText: {
    fontSize: 16, 
    color: '#f1f1f1', 
    textAlign: 'left',
    marginVertical: 10,
  },
  detallesTitle: {
    fontSize: 24,
    color: '#ff0000', 
    fontWeight: 'bold',
    marginVertical: 15,
  },
  
  evoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    marginTop: 20,
  },
  evoCard: {
    backgroundColor: '#333', 
    borderRadius: 10,
    margin: 10,
    padding: 15,
    width: 140, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  evoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  evoName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
