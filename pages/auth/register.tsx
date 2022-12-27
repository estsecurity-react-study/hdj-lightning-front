import { NextPage } from 'next';
import RegisterForm from '../../components/organisms/form/RegisterForm';
import styles from '../../styles/Auth.module.css';

const RegisterPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        <RegisterForm />
      </section>
    </div>
  );
};

export default RegisterPage;
