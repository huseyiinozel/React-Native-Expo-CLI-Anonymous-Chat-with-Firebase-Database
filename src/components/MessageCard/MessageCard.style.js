import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    borderColor: 'red',
    borderWidth: 1,
    margin: 10,
    backgroundColor: colors.darkgreen,
    borderRadius: 10,
    padding: 10,
  },
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
 
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
 
});