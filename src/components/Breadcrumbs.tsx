import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-[#252525]/70 py-2 overflow-x-auto whitespace-nowrap ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#B85C38] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B85C38]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#B85C38]/50 flex-shrink-0" />
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-[#B85C38] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B85C38]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#173C35] max-w-[200px] sm:max-w-md truncate" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
