/**
 * EDUCATION PAGE
 * ==============
 * Displays educational articles and health tips.
 * Articles are organized by category with search/filter options.
 * 
 * Backend Integration:
 * - GET /api/education/articles/ -> List all articles
 * - GET /api/education/articles/{id}/ -> Get full article content
 * - GET /api/education/categories/ -> List available categories
 * 
 * Categories: health, wellness, nutrition, exercise, mental_health
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import ArticleCard from '@/components/education/ArticleCard';
import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';
import { educationArticles } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

// Available categories for filtering
const categories = [
{ id: 'all', label: 'All' },
{ id: 'health', label: 'Health' },
{ id: 'wellness', label: 'Wellness' },
{ id: 'nutrition', label: 'Nutrition' },
{ id: 'exercise', label: 'Exercise' },
{ id: 'mental_health', label: 'Mental Health' }];


const EducationPage = () => {
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State for article detail modal
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter articles based on search and category
  // Backend: This filtering could be done server-side
  // GET /api/education/articles/?search=keyword&category=health
  const filteredArticles = educationArticles.filter((article) => {
    const matchesSearch =
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
    selectedCategory === 'all' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper title="Learn">
      <div className="max-w-4xl mx-auto">
        {/* Search and Filter Header */}
        <div className="space-y-4 mb-8">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10" />
            
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) =>
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'secondary'}
              className={cn(
                "cursor-pointer transition-all",
                selectedCategory === category.id && "bg-primary"
              )}
              onClick={() => setSelectedCategory(category.id)}>
              
                {category.label}
              </Badge>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) =>
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
            onClick={() => setSelectedArticle(article)} />

          )}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12">
          
            <p className="text-muted-foreground">
              No articles found. Try adjusting your search or filters.
            </p>
          </motion.div>
        }

        {/* Article Detail Modal */}
        <Dialog
          open={selectedArticle !== null}
          onOpenChange={(open) => !open && setSelectedArticle(null)}>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedArticle &&
            <>
                <DialogHeader>
                  <Badge variant="secondary" className="w-fit capitalize mb-2">
                    {selectedArticle.category.replace('_', ' ')}
                  </Badge>
                  <DialogTitle className="text-2xl font-display">
                    {selectedArticle.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedArticle.readTime} min read
                  </p>
                </DialogHeader>

                <div className="py-4 space-y-4">
                  <p className="text-lg text-muted-foreground">
                    {selectedArticle.summary}
                  </p>
                  
                  {/* Full article content would go here */}
                  {/* Backend: GET /api/education/articles/{id}/ for full content */}
                  <div className="p-6 rounded-xl bg-secondary/50">
                    <p className="text-muted-foreground">
                      Full article content would be loaded here from the backend.
                      This is a placeholder for demonstration purposes.
                    </p>
                  </div>
                </div>
              </>
            }
          </DialogContent>
        </Dialog>
      </div>
    </PageWrapper>);

};

export default EducationPage;