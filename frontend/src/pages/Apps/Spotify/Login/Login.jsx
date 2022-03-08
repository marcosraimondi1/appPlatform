import Button from "@mui/material/Button";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import { login } from "../../../../helper/spotify/loginFunctions";

export default function Login() {
  const onClick = async () => {
    login();
  };
  return (
    <>
      <Header
        id="spotify-masthead"
        title="Spotify PlayList Download"
        description="Login to Spotify"
      >
        <Button variant="contained" size="large" onClick={onClick}>
          Login
        </Button>
        <br />
      </Header>
      <Footer />
    </>
  );
}
