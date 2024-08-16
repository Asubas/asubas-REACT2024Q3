import './completedForm.scss';
import { FormData } from '../../app/slices/FormSlices';
import firstImage from '../../assets/pirate-hook.svg';
import secondImage from '../../assets/pirate-key.svg';
import thirdImage from '../../assets/pirate-rum.svg';
import fourthImage from '../../assets/pirate-sword.svg';
import { FormInputData } from '../hookFormComponent/schemaForHookForm';

const images = [firstImage, secondImage, thirdImage, fourthImage];
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

function CompletedForm({ data }: { data: FormData | FormInputData }) {
  const randomImg = getRandomImage();
  return (
    <div className="completedForm">
      <div className="cart-title">
        <div className="cart-avatar">
          {' '}
          {data.profilePicture && (
            <img
              src={data.profilePicture}
              alt={`${data.name}'s profile`}
              style={{ width: '100px', height: '100px' }}
            />
          )}{' '}
          |
          {data.fileBase64 && (
            <img
              src={data.fileBase64}
              alt={`${data.name}'s profile`}
              style={{ width: '100px', height: '100px' }}
            />
          )}
          {data.profilePicture && (
            <img
              src={data.profilePicture}
              alt={`${data.name}'s profile`}
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <p className="cart-name">{data.name}</p>
      </div>
      <div className="cart-content">
        <p>Age: {data.age}</p>
        <p>Country: {data.country}</p>
        <p>Email: {data.email}</p>
        <p>Gender: {data.gender ? 'man' : 'woman'}</p>
        <div className="randomImg">
          <img src={randomImg} alt="random image" />
        </div>
      </div>
    </div>
  );
}

export { CompletedForm };
