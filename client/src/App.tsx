import React from "react";
import "./App.css";

type GreetingProps = {
  greeting: string;
};

const Greeting = (props: GreetingProps) => <p>{props.greeting}</p>;

const App = () => <Greeting greeting="Hello world!" />;

export default App;

// UNINSTALL UNREQUIRED DEPENDENCIES
