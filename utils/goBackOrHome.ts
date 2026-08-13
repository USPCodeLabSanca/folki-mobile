const goBackOrHome = (navigation: any) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }

  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
};

export default goBackOrHome;
