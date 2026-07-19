import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, Check } from 'lucide-react';

function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60 min-w-0 transition-all mb-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
          Filter Kategori
        </span>
        {selectedCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory('')}
            className="text-[11px] text-foreground underline hover:opacity-80 transition-opacity cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      <div className="relative sm:max-w-xs w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground text-xs font-medium shadow-sm hover:bg-muted/50 focus:outline-none flex items-center justify-between gap-2 capitalize cursor-pointer transition-colors"
        >
          <span className="truncate">
            {selectedCategory ? `#${selectedCategory}` : 'Semua Kategori'}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 z-50 w-full bg-card border border-border rounded-xl shadow-lg p-1.5 flex flex-col gap-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <button
              type="button"
              onClick={() => {
                onSelectCategory('');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-all cursor-pointer rounded-lg ${
                selectedCategory === ''
                  ? 'bg-foreground/15 text-foreground font-semibold shadow-sm'
                  : 'text-foreground hover:bg-muted/60'
              }`}
            >
              <span>Semua Kategori</span>
              {selectedCategory === '' && <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />}
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  onSelectCategory(category);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-all capitalize cursor-pointer rounded-lg ${
                  selectedCategory === category
                    ? 'bg-foreground/15 text-foreground font-semibold shadow-sm'
                    : 'text-foreground hover:bg-muted/60'
                }`}
              >
                <span className="truncate">#{category}</span>
                {selectedCategory === category && <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
