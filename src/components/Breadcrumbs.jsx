import { Link, ROUTES } from '../router.jsx';
import { getPageSeo } from '../data/seo.js';

/**
 * Visible breadcrumb trail (mirrors the BreadcrumbList schema markup).
 * Helps both orientation and internal linking.
 */
export default function Breadcrumbs({ path, currentLabel }) {
  const seo = getPageSeo(path);
  const label = currentLabel || seo.label;

  if (path === ROUTES.home) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to={ROUTES.home}>Home</Link>
        </li>
        <li aria-current="page">{label}</li>
      </ol>
    </nav>
  );
}
