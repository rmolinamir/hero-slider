import React from 'react';
import { Header } from '../Header';
import './index.css';

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
      <section>
        <h2>Pages in Storybook</h2>
        <p>
          We recommend building UIs with a{' '}
          <a
            href="https://componentdriven.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>component-driven</strong>
          </a>{' '}
          process starting with atomic components and ending with pages.
        </p>
        <p>
          Render pages with mock data. This makes it easy to build and review
          page states without needing to navigate to them in your app. Here are
          some handy patterns for managing page data in Storybook:
        </p>
        <ul>
          <li>
            Use a higher-level connected component. Storybook helps you compose
            such data from the &quot;args&quot; of child component stories
          </li>
          <li>
            Assemble data in the page component from your services. You can mock
            these services out using Storybook.
          </li>
        </ul>
        <p>
          Get a guided tutorial on component-driven development at{' '}
          <a
            href="https://storybook.js.org/tutorials/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook tutorials
          </a>
          . Read more in the{' '}
          <a
            href="https://storybook.js.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            docs
          </a>
          .
        </p>
        <div className="tip-wrapper">
          <span className="tip">Tip</span> Adjust the width of the canvas with
          the{' '}
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                id="a"
                fill="#999"
              />
            </g>
          </svg>
          Viewports addon in the toolbar
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          ultrices nec lacus eu faucibus. Quisque imperdiet feugiat felis, vel
          dapibus velit consectetur a. Ut auctor lectus non ipsum facilisis
          scelerisque. Fusce vel sapien eget nulla pulvinar mollis eget quis
          ante. Nam sit amet vulputate augue. Integer nec nunc mauris. Curabitur
          ligula diam, laoreet sit amet odio eu, convallis gravida odio.
          Vestibulum metus metus, rutrum et odio sed, mollis mollis leo.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Aliquam a lorem sit amet purus finibus
          venenatis. Aliquam sagittis pretium odio, ut sodales ipsum sagittis
          et. Cras vulputate mauris sed nulla volutpat, ac vehicula ante
          lobortis. In facilisis euismod sapien, eget suscipit magna malesuada
          eu. Cras eu congue magna.
        </p>
        <p>
          Nunc iaculis commodo mauris, sed mollis augue fermentum in. Phasellus
          semper lorem in est suscipit, ut fermentum elit rutrum. Donec vehicula
          turpis sit amet neque aliquam convallis. Proin sem quam, congue ac
          quam vitae, aliquam dapibus ex. Fusce in interdum nulla. Suspendisse
          suscipit orci felis, nec feugiat augue posuere et. Suspendisse at
          convallis est.
        </p>
        <p>
          Nam vitae urna at mauris maximus congue ut in orci. Morbi eu felis a
          urna sagittis viverra eu vel lorem. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Donec
          sodales ut mauris a vestibulum. Nullam varius vulputate sem, vitae
          tincidunt ligula. Maecenas eleifend tempor tempor. Aenean nec est
          dolor. Phasellus imperdiet elit ac lectus pretium, ac sodales ligula
          finibus. Etiam dignissim metus ac sapien posuere, at tristique dolor
          suscipit. In ultricies nunc quis sem venenatis volutpat. Praesent
          vitae sapien tortor. Aliquam consequat ultrices diam, id vehicula
          lectus molestie eu. Aliquam lobortis enim eu maximus ornare. Nam sit
          amet sodales lacus. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </p>
        <p>
          Donec eget efficitur lectus, faucibus aliquet metus. Etiam
          pellentesque fermentum lectus eu posuere. In eu aliquet leo. Vivamus
          consequat rhoncus ex non pharetra. Aliquam sit amet blandit libero.
          Suspendisse potenti. Morbi magna felis, aliquam a lectus id, vehicula
          volutpat nisi. In hendrerit vel sapien et finibus. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Vestibulum eget pellentesque lacus. Proin sed laoreet
          ipsum. Nam fringilla nisl a mollis laoreet. Curabitur mollis dolor
          purus. Ut ac fermentum purus.
        </p>
        <p>
          Morbi eu cursus massa. Ut dictum varius maximus. Sed eu dolor ut magna
          ornare placerat. Aliquam sed malesuada justo. Sed ac malesuada purus,
          accumsan finibus metus. Pellentesque dui nunc, molestie consectetur
          diam eu, faucibus semper justo. Pellentesque convallis iaculis odio, a
          rhoncus purus sodales ut. Cras nec accumsan quam, sit amet ornare
          nisi. Nulla eu iaculis nulla, ut convallis tortor. Duis ac rutrum
          ipsum. Cras sed sodales dui.
        </p>
        <p>
          <b>Generated 5 paragraphs, 443 words, 2959 bytes of Lorem Ipsum.</b>
        </p>
      </section>
    </>
  );
};
