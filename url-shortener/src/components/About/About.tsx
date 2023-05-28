import {
  ABOUT_TEXT_DESCRIPTION_1,
  ABOUT_TEXT_DESCRIPTION_2,
  ABOUT_TEXT_DESCRIPTION_3,
  ABOUT_TEXT_DESCRIPTION_4,
  ABOUT_TEXT_DESCRIPTION_5,
  ABOUT_TEXT_TITLE,
} from '../../resources/about/aboutText';
import styles from './About.module.less';

export const About = () => {
  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h1>{ABOUT_TEXT_TITLE}</h1>
        <div>
          <p>{ABOUT_TEXT_DESCRIPTION_1}</p>
          <p>{ABOUT_TEXT_DESCRIPTION_2}</p>
          <p>{ABOUT_TEXT_DESCRIPTION_3}</p>
          <p>{ABOUT_TEXT_DESCRIPTION_4}</p>
          <p>{ABOUT_TEXT_DESCRIPTION_5}</p>
        </div>
      </div>
    </div>
  );
};
