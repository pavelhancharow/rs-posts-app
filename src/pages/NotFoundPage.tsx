import { useNavigate } from 'react-router';
import CustomButton from '../components/CustomButton/CustomButton.tsx';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <main className="not-found-page">
      <h2>Oops!</h2>
      <h3>Sorry, the page you are looking for does not exist.</h3>
      <CustomButton onClick={handleClick}>Go Home</CustomButton>
    </main>
  );
}

export default NotFoundPage;
