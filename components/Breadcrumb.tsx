// Compatibility wrapper for existing pages
import Breadcrumbs from './Breadcrumbs'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return <Breadcrumbs items={items} />
} 