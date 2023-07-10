import React, { useState, useEffect } from 'react';

const StudyWords = ({ words }) => {

  const [studyWords, setStudyWords] = useState(words.slice(0, 3));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedWords, setReviewedWords] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (currentWordIndex === studyWords.length) {
      setCompleted(true);
    }
  }, [currentWordIndex, studyWords.length]);

  const handleNextWord = (e) => {
    const selection = e.target.name;
    const updatedWords = [...studyWords];
    if (selection === 'correct') {
      updatedWords[currentWordIndex].correctNumberOfTimes += 1;
      if (updatedWords[currentWordIndex].correctNumberOfTimes === 3) {
        updatedWords[currentWordIndex].know = true;
      }

    } else {
      updatedWords[currentWordIndex].correctNumberOfTimes = 0;
    }

    if (currentWordIndex < studyWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
    } else {
      setShowAnswer(false);
      setCurrentWordIndex(0);
    }
    // Check if any word has a correctNumberOfTimes >= 3
    const wordWithThreeOrMore = studyWords.find((word) => word.correctNumberOfTimes >= 3);
    console.log("It's " + studyWords[currentWordIndex].know + " that you know " + studyWords[currentWordIndex].word + " word" + " \nYou got it right " + studyWords[currentWordIndex].correctNumberOfTimes  )


    if (studyWords[currentWordIndex].know !== false && studyWords[currentWordIndex].correctNumberOfTimes) {

      console.log("id: " + studyWords[currentWordIndex].id + " word: " + studyWords[currentWordIndex].word + " correct " + studyWords[currentWordIndex].correctNumberOfTimes + " Of Times ")


      const next = studyWords.length + 1;
      const nextWordIndex = words[next];

      setStudyWords((prev) => [...prev, words[next]]);
      //   if (nextWordIndex < words.length) {
      //     const nextWord = words[nextWordIndex];
      //     const newStudyWords = [...studyWords, nextWord];
      //     setStudyWords(newStudyWords);
    } else {
      setStudyWords(updatedWords);

    }
    // }
    // }




  };


  // const handleReviewWord = () => {
  //   const reviewedWord = {
  //     word: studyWords[currentWordIndex].word,
  //     definition: studyWords[currentWordIndex].definition,
  //     reviewedAt: new Date(),
  //   };

  //   setReviewedWords([...reviewedWords, reviewedWord]);
  //   handleNextWord();
  // };

  const calculateNextReviewDate = (reviewedAt, reviewCount) => {
    const fibonacci = [1, 1];
    while (fibonacci.length < reviewCount + 2) {
      const nextFibonacci = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
      fibonacci.push(nextFibonacci);
    }


    const nextReviewDate = new Date(reviewedAt);

    nextReviewDate.setDate(nextReviewDate.getDate() + fibonacci[reviewCount]);

    return nextReviewDate;
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  if (completed) {
    return (
      <div>
        <h2>Learning Completed!</h2>
        <p>You have reviewed all the studyWords in the dictionary.</p>
        <p>Reviewed studyWords:</p>
        <ul>
          {reviewedWords.map((reviewedWord, index) => (
            <li key={index}>{reviewedWord.word}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>Spaced Based Repetition Learning</h2>
      <p>Word {currentWordIndex + 1} of {studyWords.length}</p>
      <h3>Word: {studyWords[currentWordIndex].word}</h3>
      {!showAnswer ? (
        <button onClick={handleShowAnswer}>Show Answer</button>
      ) : (
        <div>
          <p>Definition: {studyWords[currentWordIndex].definition}</p>
          {/* <button name="review" onClick={handleReviewWord}>Review Word</button> */}
          {/* <button onClick={handleNextWord}>Next Word</button> */}
        </div>
      )}
      <div>
        <p>Be Honest with yourself</p>
        <button name="incorrect" style={{ backgroundColor: "red", color: "white" }} onClick={handleNextWord}>Not yet</button>
        <button name="correct" style={{ backgroundColor: "green", color: "white" }} onClick={handleNextWord}>Got it</button>
      </div>
      {reviewedWords.length > 0 && (
        <div>
          <h4>Review Schedule</h4>
          <ul>
            {reviewedWords.map((reviewedWord, index) => (
              <li key={index}>
                Word: {reviewedWord.word}, Next Review Date:{' '}
                {calculateNextReviewDate(reviewedWord.reviewedAt, index + 1).toLocaleDateString() + " " + index}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudyWords;
