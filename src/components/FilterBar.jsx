import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Filter, X } from 'lucide-react';
import { categories, locations } from '../data/radios';

export default function FilterBar({ 
  selectedCategory, 
  selectedLocation, 
  onCategoryChange, 
  onLocationChange,
  onClearFilters,
  filteredCount,
  totalCount
}) {
  const hasActiveFilters = selectedCategory !== 'Toutes' || selectedLocation !== 'Toutes';

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtres :</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <div className="min-w-[150px]">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="min-w-[150px]">
              <Select value={selectedLocation} onValueChange={onLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearFilters}
                className="flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Effacer</span>
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            {filteredCount} sur {totalCount} radios
          </Badge>
          {hasActiveFilters && (
            <Badge variant="outline" className="text-xs">
              Filtré
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

