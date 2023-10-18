import { init } from 'commandbar';
import { Profile, Home, Layout, NotFound } from './routes';
import { AddRecords } from './utils/commandBar';
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const BunnyImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

init('adac2439');
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = '12345'; // example
    setTimeout(() => {
      window.CommandBar.boot(loggedInUserId).then(async () => {
        const routerFunc = (newUrl: string) => navigate(newUrl);
        window.CommandBar.addRouter(routerFunc);
        await AddRecords();
        setIsLoading(false);
      });
    }, 2000);

    return () => {
      window.CommandBar.shutdown();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <LoadingWrapper data-testid="loading">
        <BunnyImage
          src={`https://bunnies.media/gif/${Math.floor(
            Math.random() * 100,
          )}.gif`}
          alt="Bunny"
        />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    );
  }
  return (
    <AppWrapper>
      <Title>Fetch all the users!</Title>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppWrapper>
  );
}
