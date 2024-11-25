import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  // {
  //   title: '🚀 Easy to Use',
  //   Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
  //   description: (
  //     <>
  //       Byteform offers a clean and intuitive API, making it simple to encode and decode binary data without the hassle.
  //     </>
  //   ),
  // },
  {
    title: '⚡ Performance Focused',
    description: (
      <>
        Engineered for speed, Byteform ensures efficient binary data manipulation, whether you're encoding complex structures or parsing raw buffers.
      </>
    ),
  },
  {
    title: '🔒 TypeScript First',
    description: (
      <>
        Built with TypeScript, Byteform provides strong typing and developer-friendly autocompletion for a smoother coding experience.
      </>
    ),
  },
  {
    title: '🛠️ Customizable',
    description: (
      <>
        Define and manipulate your own binary structures with flexibility to match your specific use case.
      </>
    ),
  },

  {
    title: '🚀 Easy to Use',
    description: (
      <>
        Byteform offers a clean and intuitive API, making it simple to encode and decode binary data without the hassle.
      </>
    ),
  },
  {
    title: '🌐 Works Everywhere',
    description: (
      <>
        Designed to run seamlessly in Node.js and modern browsers, Byteform adapts to your environment without extra dependencies.
      </>
    ),
  },
  {
    title: '📦 Dependency-Free',
    description: (
      <>
        No external dependencies. Just install Byteform and start encoding or decoding binary data.
      </>
    ),
  },
  // {
  //   title: 'Focus on What Matters',
  //   Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  //   description: (
  //     <>
  //       Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
  //       ahead and move your docs into the <code>docs</code> directory.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md hero-feature">
        <Heading as="h3">{title}</Heading>
        <p className='hero-feature__description'>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row hero-feature--list">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
