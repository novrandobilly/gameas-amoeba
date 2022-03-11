import { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Explorer from '../../assets/numerical-test-2/explorer.png';
import LandingModule from '../../assets/numerical-test-2/landing-module.png';
import SpaceBlaster from '../../assets/numerical-test-2/space-blaster.png';
import SpaceSuit from '../../assets/numerical-test-2/space-suit.png';
import Satellite from '../../assets/numerical-test-2/satellite.png';
import ThumbsUp from '../../assets/numerical-test-2/thumbs_up.png';
import ThumbsDown from '../../assets/numerical-test-2/thumbs_down.png';
import Equal from '../../assets/numerical-test-2/equal.png';
import styles from './numerical-2-test.module.scss';
import { Numerical2TestKit } from '../../lib/numerical-2-test';

interface feedbackType {
  upFeedback: string;
  equalFeedback: string;
  downFeedback: string;
}

interface answerType {
  [key: string]: {
    answer: string;
    isCorrect: boolean;
  };
}

const initialState = {
  ans1: {
    answer: '',
    isCorrect: false,
  },
  ans2: {
    answer: '',
    isCorrect: false,
  },
  ans3: {
    answer: '',
    isCorrect: false,
  },
  ans4: {
    answer: '',
    isCorrect: false,
  },
  ans5: {
    answer: '',
    isCorrect: false,
  },
};
const Numerical2Test = () => {
  const { data: session, status } = useSession();
  const [testPhase, setTestPhase] = useState<number>(1);
  const [feedback, setFeedBack] = useState<feedbackType>({
    upFeedback: '',
    equalFeedback: '',
    downFeedback: '',
  });
  const [answer, setAnswer] = useState<answerType>(initialState);
  const { problem1, problem2, problem3, problem4, problem5 } = Numerical2TestKit;

  let toolsImage = null;
  let toolsText = '';

  switch (testPhase) {
    case 1:
      toolsImage = Explorer;
      toolsText = 'Explorer';
      break;
    case 2:
      toolsImage = LandingModule;
      toolsText = 'Landing Module';
      break;
    case 3:
      toolsImage = SpaceBlaster;
      toolsText = 'Space Blaster';
      break;
    case 4:
      toolsImage = SpaceSuit;
      toolsText = 'Space Suit';
      break;
    case 5:
      toolsImage = Satellite;
      toolsText = 'Satellite';
      break;
    default:
      toolsImage = Explorer;
      toolsText = 'Explorer';
  }

  useEffect(() => {
    if (testPhase === 6) {
      fetch('/api/game/numerical-2-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answerResult: answer,
          userData: {
            email: session?.user?.email,
          },
        }),
      })
        .then((res) => res.json())
        .then((resJSON) => console.log(resJSON))
        .catch((err) => console.log(err));
    }
  }, [testPhase]); // eslint-disable-line

  const onUpClickHandler = () => {
    switch (testPhase) {
      case 3:
        setFeedBack((prevState) => {
          const newState = { ...prevState };
          newState.upFeedback = styles['correct'];
          return newState;
        });

        setAnswer((prevState) => {
          const newState = { ...prevState };
          newState[`ans${testPhase}`] = {
            answer: 'thumbs-up',
            isCorrect: true,
          };
          return newState;
        });
        setTimeout(() => {
          setFeedBack((prevState) => {
            const newState = { ...prevState };
            newState.upFeedback = '';
            return newState;
          });
          setTestPhase((prevState) => prevState + 1);
        }, 1000);
        break;
      default:
        setFeedBack((prevState) => {
          const newState = { ...prevState };
          newState.upFeedback = styles['incorrect'];
          return newState;
        });
        setAnswer((prevState) => {
          const newState = { ...prevState };
          newState[`ans${testPhase}`] = {
            answer: 'thumbs-up',
            isCorrect: false,
          };
          return newState;
        });
        setTimeout(() => {
          setFeedBack((prevState) => {
            const newState = { ...prevState };
            newState.upFeedback = '';
            return newState;
          });
          setTestPhase((prevState) => prevState + 1);
        }, 1000);
    }
  };
  const onEqualClickHandler = () => {
    switch (testPhase) {
      case 2:
        setFeedBack((prevState) => {
          const newState = { ...prevState };
          newState.equalFeedback = styles['correct'];
          return newState;
        });
        setAnswer((prevState) => {
          const newState = { ...prevState };
          newState[`ans${testPhase}`] = {
            answer: 'equal',
            isCorrect: true,
          };
          return newState;
        });
        setTimeout(() => {
          setFeedBack((prevState) => {
            const newState = { ...prevState };
            newState.equalFeedback = '';
            return newState;
          });
          setTestPhase((prevState) => prevState + 1);
        }, 1000);
        break;
      default:
        setFeedBack((prevState) => {
          const newState = { ...prevState };
          newState.equalFeedback = styles['incorrect'];
          return newState;
        });
        setAnswer((prevState) => {
          const newState = { ...prevState };
          newState[`ans${testPhase}`] = {
            answer: 'equal',
            isCorrect: false,
          };
          return newState;
        });
        setTimeout(() => {
          setFeedBack((prevState) => {
            const newState = { ...prevState };
            newState.equalFeedback = '';
            return newState;
          });
          setTestPhase((prevState) => prevState + 1);
        }, 1000);
    }
  };
  const onDownClickHandler = () => {
    switch (testPhase) {
      case 1:
      case 4:
      case 5:
        setFeedBack((prevState) => {
          const newState = { ...prevState };
          newState.downFeedback = styles['correct'];
          return newState;
        });
        setAnswer((prevState) => {
          const newState = { ...prevState };
          newState[`ans${testPhase}`] = {
            answer: 'thumbs-down',
            isCorrect: true,
          };
          return newState;
        });
        setTimeout(() => {
          setFeedBack((prevState) => {
            const newState = { ...prevState };
            newState.downFeedback = '';
            return newState;
          });
          setTestPhase((prevState) => prevState + 1);
        }, 1000);
        break;
      default:
        setFeedBack((prevState) => {
          const newState = { ...prevState };
          newState.downFeedback = styles['incorrect'];
          return newState;
        });
        setAnswer((prevState) => {
          const newState = { ...prevState };
          newState[`ans${testPhase}`] = {
            answer: 'thumbs-down',
            isCorrect: false,
          };
          return newState;
        });
        setTimeout(() => {
          setFeedBack((prevState) => {
            const newState = { ...prevState };
            newState.downFeedback = '';
            return newState;
          });
          setTestPhase((prevState) => prevState + 1);
        }, 1000);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Quality Check Test</title>
        <meta name='description' content='Quality Check Test Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles['container']}>
        {testPhase <= 5 && (
          <Fragment>
            <div className={styles['problem-container']}>
              <div className={styles['condition']}>
                <p>Kondisi</p>
                {testPhase === 1 &&
                  problem1.condition.map((val, index) => (
                    <div key={`condition-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 2 &&
                  problem2.condition.map((val, index) => (
                    <div key={`condition-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 3 &&
                  problem3.condition.map((val, index) => (
                    <div key={`condition-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 4 &&
                  problem4.condition.map((val, index) => (
                    <div key={`condition-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 5 &&
                  problem5.condition.map((val, index) => (
                    <div key={`condition-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
              </div>
              <div className={styles['standard']}>
                <p>Standard</p>
                {testPhase === 1 &&
                  problem1.standard.map((val, index) => (
                    <div key={`standard-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 2 &&
                  problem2.standard.map((val, index) => (
                    <div key={`standard-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 3 &&
                  problem3.standard.map((val, index) => (
                    <div key={`standard-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 4 &&
                  problem4.standard.map((val, index) => (
                    <div key={`standard-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
                {testPhase === 5 &&
                  problem5.standard.map((val, index) => (
                    <div key={`standard-${index}`} className={styles['bubble']}>
                      {val}
                    </div>
                  ))}
              </div>
              <div className={styles['tools']}>
                <Fragment>
                  <Image alt='Tools Image' src={toolsImage} width={300} height={200} />
                  <p>{toolsText}</p>
                </Fragment>
              </div>
            </div>
            <div className={styles['answer-options']}>
              <div className={`${styles['option-button']} ${feedback.upFeedback}`} onClick={onUpClickHandler}>
                <Image alt='Thumbs Up' src={ThumbsUp} width={150} height={100} />
              </div>
              <div className={`${styles['option-button']} ${feedback.equalFeedback}`} onClick={onEqualClickHandler}>
                <Image alt='Equal ' src={Equal} width={150} height={100} />
              </div>
              <div className={`${styles['option-button']} ${feedback.downFeedback}`} onClick={onDownClickHandler}>
                <Image alt='Thumbs Down' src={ThumbsDown} width={150} height={100} />
              </div>
            </div>
          </Fragment>
        )}

        {testPhase >= 6 && (
          <div className={styles['test-finish']}>
            <h1>Selamat! Kamu sudah selesai mengumpulkan peralatan yang perlu diperbaiki!</h1>
            <Link href='/game'>Kembali ke Cockpit</Link>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default Numerical2Test;
