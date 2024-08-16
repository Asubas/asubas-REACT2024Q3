import './welcomePage.scss';
import piratePicture from '../../assets/pirate-svgrepo-com.svg';

function WelcomePage() {
  return (
    <div className="welcomePage">
      <div className="welcomePicture">
        <img src={piratePicture} alt="pirate man" />
      </div>
      <p className="welcomeTitle">
        Hey young pirate! This fun website is designed to help you prepare for your sea voyage and
        apply to join a pirate crew! You are asked to fill out 2 forms: in fact, they are no
        different, just point where you like! Gather your pirate crew! Enjoy!
      </p>
    </div>
  );
}

export { WelcomePage };
