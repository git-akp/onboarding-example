import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import { useOnboarding } from "./hooks/useOnboarding";

function App() {
  const user = useContext(UserContext);
  const { startOnboarding } = useOnboarding();
  const onClickStartOnboarding = async () => {
    startOnboarding(user?.sessionId);
  };
  return (
    <div className="App">
      <Row>
        <Container>
          <h1>Onboarding Example</h1>
          <Button
            onClick={onClickStartOnboarding}
            disabled={user.userData.isOnboardingComplete}
          >
            {user.userData.isOnboardingComplete
              ? "Onboarding Complete"
              : "Start Onboarding"}
          </Button>
        </Container>
      </Row>
    </div>
  );
}

export default App;
