import { RouterProvider, useRouter, ROUTES } from './router.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Gallery from './pages/Gallery.jsx';
import Reviews from './pages/Reviews.jsx';
import Karaoke from './pages/Karaoke.jsx';
import Contact from './pages/Contact.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Route table. Every path is prerendered to its own static HTML file at build
 * time (`npm run build`) and hydrated on the client, so the site is a true
 * client-side-rendered React app that still ships crawlable, fast HTML.
 */
function Routes() {
  const { path } = useRouter();

  switch (path) {
    case ROUTES.home:
      return <Home />;
    case ROUTES.about:
      return <About />;
    case ROUTES.services:
      return <Services />;
    case ROUTES.gallery:
      return <Gallery />;
    case ROUTES.reviews:
      return <Reviews />;
    case ROUTES.karaoke:
      return <Karaoke />;
    case ROUTES.contact:
      return <Contact />;
    case ROUTES.privacy:
      return <PrivacyPolicy />;
    case ROUTES.terms:
      return <Terms />;
    default:
      return <NotFound />;
  }
}

export default function App({ initialPath }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <Layout>
        <Routes />
      </Layout>
    </RouterProvider>
  );
}

export { Routes };
