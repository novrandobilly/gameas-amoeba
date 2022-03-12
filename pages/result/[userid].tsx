import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/db';
import Head from 'next/head';
import Link from 'next/link';
import styles from './userid.module.scss';
import { ObjectId } from 'mongodb';

interface UserIdType {
  sess: {
    [key: string]: any;
  };
  foundUser: {
    [key: string]: any;
  };
}
const UserResult: NextPage<UserIdType> = ({ foundUser, sess }) => {
  const { name, email, gender, dateOfBirth, domicile, jobDesc, regional, numerical, problemSolving, numerical2 } =
    foundUser;
  const saveThePlants = numerical ? Object.values(numerical.result) : [];
  const heroAssemble = problemSolving ? Object.values(problemSolving.result) : [];
  const qualityCheck = numerical2 ? Object.values(numerical2.result) : [];
  return (
    <div className={styles['container']}>
      <Head>
        <title>Test Result </title>
        <meta name='description' content='User Test Result' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['data-screen']}>
        <h1>Laporan hasil kinerja {name}:</h1>
        <div className={styles['data-content']}>
          <div className={styles['biodata']}>
            <p className={styles['name']}>
              <span>Nama</span>:&nbsp; {name}
            </p>
            <p className={styles['email']}>
              <span>Email</span>:&nbsp; {email}
            </p>
            <p className={styles['gender']}>
              <span>Jenis Kelamin</span>:&nbsp; {gender}
            </p>
            <p className={styles['age']}>
              <span>Tanggal Lahir</span>:&nbsp; {dateOfBirth}
            </p>
            <p className={styles['domicile']}>
              <span>Domisili</span>:&nbsp; {domicile}
            </p>
            <p className={styles['job-description']}>
              <span>Job Description</span>:&nbsp; {jobDesc}
            </p>
            <p className={styles['regional']}>
              <span>Regional</span>:&nbsp; {regional}
            </p>
          </div>

          <div className={styles['test-result']}>
            <div className={styles['numerical-result']}>
              <h3>Save The Plants!</h3>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Answer</th>
                    <th>Timer (s)</th>
                  </tr>
                </thead>
                <tbody>
                  {saveThePlants &&
                    saveThePlants.map((result: any, index) => (
                      <tr key={`numerical_${index}`}>
                        <td>{index + 1}</td>
                        <td>{result.isCorrect ? '✓' : 'X'}</td>
                        <td>{result.time}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className={styles['problem-solving']}>
              <h3>Hero Assemble</h3>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Answer</th>
                    <th>Timer (s)</th>
                  </tr>
                </thead>
                <tbody>
                  {heroAssemble &&
                    heroAssemble.map((result: any, index) => (
                      <tr key={`problemSolving${index}`}>
                        <td>{index + 1}</td>
                        <td>{result.isCorrect ? '✓' : 'X'}</td>
                        <td>{result.time}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className={styles['numerical2-result']}>
              <h3>Quality Check</h3>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityCheck &&
                    qualityCheck.map((result: any, index) => (
                      <tr key={`numerical2_${index}`}>
                        <td>{index + 1}</td>
                        <td>{result.isCorrect ? '✓' : 'X'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Link href='/game'>Kembali ke Deck</Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query, params }) => {
  const { userid } = query;
  const session = await getSession({ req });
  if (!session || session.userId !== userid) {
    return {
      redirect: {
        destination: '/game',
        permanent: false,
      },
    };
  }

  const client = await connectToDatabase();
  const db = client.db();
  try {
    const data = await db.collection('users').findOne({ _id: new ObjectId(userid?.toString()) });
    const foundUser = JSON.parse(JSON.stringify(data));
    return {
      props: { sess: session, foundUser },
    };
  } catch (err) {
    return { props: {} };
  }
};

export default UserResult;
