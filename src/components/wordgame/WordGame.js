import React, { useState, useEffect } from 'react';
import { Card, Typography, Dialog, DialogTitle, DialogContent, Button, Link } from '@mui/material';
import { Grid2 } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomWord, getVocabularyGame } from '../../redux/features/vocabularySlice';

const WordGame = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.vocabulary.gameData);

  // Initialize pairs dynamically from gameData
  const [pairs, setPairs] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [correctPair, setCorrectPair] = useState([]);
  const [shuffledLeftWords, setShuffledLeftWords] = useState([]);
  const [shuffledRightWords, setShuffledRightWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    dispatch(getVocabularyGame());
  }, [dispatch]);

  useEffect(() => {
    if (gameData?.pairs) {
      // Transform the pairs array into an object with English as key and Hebrew as value
      const dynamicPairs = gameData.pairs.reduce((acc, pair) => {
        acc[pair.english] = pair.hebrew;
        return acc;
      }, {});
      setPairs(dynamicPairs);
      // Shuffle words when pairs are updated
      const leftWords = Object.keys(dynamicPairs);
      const rightWords = Object.values(dynamicPairs);
      setShuffledLeftWords(shuffleArray(leftWords));
      setShuffledRightWords(shuffleArray(rightWords));
    }
  }, [gameData]);

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const handleLeftClick = (word) => {
    if (matched.includes(word)) return;
    setSelectedLeft(word);
    setSelectedRight(null);
  };

  const handleRightClick = (word) => {
    if (!selectedLeft || matched.includes(word)) return;

    if (pairs[selectedLeft] === word) {
      setCorrectPair([selectedLeft, word]);
      setTimeout(() => {
        const newMatched = [...matched, selectedLeft, word];
        setMatched(newMatched);
        setCorrectPair([]);
        setSelectedLeft(null);
        setSelectedRight(null);

        if (newMatched.length === Object.keys(pairs).length * 2) {
          setGameOver(true);
        }
      }, 2000);
    } else {
      setWrongPair([selectedLeft, word]);
      setTimeout(() => {
        setWrongPair([]);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 1000);
    }
  };

  const getBorderColor = (word, isLeft) => {
    if (matched.includes(word)) return 'transparent';
    if (correctPair.includes(word)) return 'green';
    if (wrongPair.includes(word)) return 'red';
    if (isLeft && selectedLeft === word) return 'blue';
    return '#dededf';
  };

  const getBackgroundColor = (word) => {
    if (correctPair.includes(word)) return '#c8e6c9'; // light green
    return 'white';
  };

  const renderCard = (word, onClick, isLeft) => {
    if (matched.includes(word)) return null;

    return (
      <Card
        key={word}
        onClick={onClick}
        elevation={4}
        style={{
          margin: '10px',
          width: '250px',
          border: `2px solid ${getBorderColor(word, isLeft)}`,
          backgroundColor: getBackgroundColor(word),
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          overflowWrap: 'break-word',
        }}
      >
        <Typography variant="h6" m={2} textAlign="center">
          {word}
        </Typography>
      </Card>
    );
  };

  const restartGame = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setWrongPair([]);
    setCorrectPair([]);
    setShuffledLeftWords(shuffleArray(Object.keys(pairs)));
    setShuffledRightWords(shuffleArray(Object.values(pairs)));
    setGameOver(false);
    dispatch(getVocabularyGame());
  };

  // Render loading state at the end
  if (!Object.keys(pairs).length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Grid2 container spacing={5} justifyContent="space-around" mt={5}>
        <Grid2 item lg={6} md={6} sm={6} xs={6}>
          {shuffledLeftWords.map((word) =>
            renderCard(word, () => handleLeftClick(word), true)
          )}
        </Grid2>
        <Grid2 item lg={6} md={6} sm={6} xs={6}>
          {shuffledRightWords.map((word) =>
            renderCard(word, () => handleRightClick(word), false)
          )}
        </Grid2>
      </Grid2>

      <Dialog open={gameOver} onClose={restartGame}>
        <DialogTitle>Word Game Results</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h1" color="primary" gutterBottom>
            Amazing
          </Typography>
          <Typography variant="body1" gutterBottom>
            Word challenge completed. Keep up the good work!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Score: {matched.length / 2} / {Object.keys(pairs).length}
          </Typography>
          <Button
            component={Link}
            to="/achievements"
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={restartGame}
          >
            Go to Achievements
          </Button>
          <br />
          <Button variant="outlined" color="primary" sx={{ m: 1 }} onClick={restartGame}>
            Take New Test
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WordGame;