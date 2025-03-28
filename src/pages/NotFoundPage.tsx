import { useNavigate } from 'react-router';
import CustomButton from '../components/CustomButton/CustomButton.tsx';
import NotFound from '../components/NotFound/NotFound.tsx';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <NotFound>
      <CustomButton onClick={handleClick}>Go Home</CustomButton>
    </NotFound>
  );
}

export default NotFoundPage;
