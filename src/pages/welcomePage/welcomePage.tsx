import './welcomePage.scss';
import piratePicture from '../../assets/pirate-svgrepo-com.svg';

function WelcomePage() {
  return (
    <div className="welcomePage">
      <div className="welcomePicture">
        <img src={piratePicture} alt="pirate man" />
      </div>
      <p className="welcomeTitle">
        Ahoy, young pirate! This playful website is created so that you can prepare for your
        seafaring journey and submit your application to join a pirate crew! You are invited to fill
        out 2 forms: one for your &quot;true self&quot; and one for your &quot;pirate self&quot;!
        Enjoy!
      </p>
    </div>
  );
}

export { WelcomePage };
