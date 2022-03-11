import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import Head from 'next/head';
import styles from './dashboard.module.scss';

interface DashboardPropsType {
  foundUsers: {
    [key: string]: any;
  }[];
  session: {
    [key: string]: any;
  }[];
}

const Dashboard: NextPage<DashboardPropsType> = ({ foundUsers, session }) => {
  return (
    <div className={styles['container']}>
      <Head>
        <title>Dashboard Admin</title>
        <meta name='description' content='Dashboard Admin Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['dashboard-screen']}>
        <h1>Admin Panel</h1>
        <table className={styles['users-table']}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Domicile</th>
              <th>Job Desc</th>
              <th>Regional</th>
              <th>Save The Plants!</th>
              <th>Hero Assemble</th>
              <th>Quality Check</th>
            </tr>
          </thead>
          <tbody>
            {foundUsers.map((user, index) => {
              let saveThePlants: number | '-' = '-';
              let heroAssemble: number | '-' = '-';
              let qualityCheck: number | '-' = '-';
              let age: number = 0;

              if (user.numerical) {
                const { result } = user.numerical;
                let correct = 0;
                for (const key in result) {
                  if (result[key].isCorrect) correct += 1;
                }
                saveThePlants = correct;
              }
              if (user.problemSolving) {
                const { result } = user.problemSolving;
                let correct = 0;
                for (const key in result) {
                  if (result[key].isCorrect) correct += 1;
                }
                heroAssemble = correct;
              }

              if (user.numerical2) {
                const { result } = user.numerical2;
                let correct = 0;
                for (const key in result) {
                  if (result[key].isCorrect) correct += 1;
                }
                qualityCheck = correct;
              }

              let ageObject = DateTime.now().diff(DateTime.fromISO(user.dateOfBirth), 'years').toObject();
              if (typeof ageObject?.years === 'number') {
                age = Math.trunc(ageObject.years);
              }

              return (
                <tr key={`user_${index}`}>
                  <td className={styles['index']}>{index + 1}.</td>
                  <td className={styles['name']}>{user.name}</td>
                  <td className={styles['email']}>{user.email}</td>
                  <td className={styles['gender']}>{user.gender}</td>
                  <td className={styles['age']}>{age}</td>
                  <td className={styles['domicile']}>{user.domicile}</td>
                  <td className={styles['job-description']}>{user.jobDesc}</td>
                  <td className={styles['regional']}>{user.regional}</td>
                  <td className={styles['save-the-plants']}>{saveThePlants}</td>
                  <td className={styles['hero-assemble']}>{heroAssemble}</td>
                  <td className={styles['quality-check']}>{qualityCheck}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <div className={styles['back-to-cockpit']}>
        <Link href='/gameas-admin'>Back To Cockpit</Link>
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session || !session?.isAdmin) {
    return {
      redirect: {
        destination: '/game',
        permanent: false,
      },
    };
  }

  let foundUsers;
  try {
    foundUsers = await fetch(`${process.env.BASE_URL}/api/admin/users`, {
      method: 'GET',
    });
    foundUsers = await foundUsers.json();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      session,
      foundUsers,
    },
  };
};
