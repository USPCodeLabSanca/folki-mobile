import { Dimensions, StyleSheet } from "react-native";
import theme from "../../config/theme";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray.gray1,
    flex: 1,
  },
});

export default styles;
