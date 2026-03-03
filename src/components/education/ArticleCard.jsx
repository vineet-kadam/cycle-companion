/**
 * ARTICLE CARD COMPONENT
 * ======================
 * Displays an educational article card in the resources page.
 * Shows title, summary, category, and read time.
 * 
 * Backend developers:
 * - GET /api/education/articles/ for article list
 * - GET /api/education/articles/{id}/ for full article
 * - Article images could be stored in Django media folder
 * 
 * Props:
 * - article: EducationArticle object
 * - onClick: Callback when card is clicked
 */

import { motion } from 'framer-motion';
import { Clock, BookOpen, Heart, Apple, Dumbbell, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';







// Category configuration
// Maps category to icon and color
const categoryConfig =



{
  health: {
    icon: Heart,
    color: 'text-period',
    bgColor: 'bg-period-light'
  },
  wellness: {
    icon: BookOpen,
    color: 'text-fertile',
    bgColor: 'bg-fertile-light'
  },
  nutrition: {
    icon: Apple,
    color: 'text-pms',
    bgColor: 'bg-pms-light'
  },
  exercise: {
    icon: Dumbbell,
    color: 'text-ovulation',
    bgColor: 'bg-ovulation-light'
  },
  mental_health: {
    icon: Brain,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }
};

const ArticleCard = ({ article, onClick, index = 0 }) => {
  // Get category configuration
  const category = categoryConfig[article.category] || categoryConfig.health;
  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>
      
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300",
          "hover:shadow-medium hover:-translate-y-1",
          "overflow-hidden"
        )}
        onClick={onClick}>
        
        <CardContent className="p-0">
          {/* Article header with gradient */}
          <div className={cn(
            "h-24 flex items-center justify-center",
            category.bgColor
          )}>
            <CategoryIcon className={cn("w-12 h-12", category.color, "opacity-60")} />
          </div>

          {/* Article content */}
          <div className="p-4 space-y-3">
            {/* Category badge */}
            <Badge
              variant="secondary"
              className={cn(
                "text-xs capitalize",
                category.bgColor,
                category.color
              )}>
              
              {article.category.replace('_', ' ')}
            </Badge>

            {/* Title */}
            <h3 className="font-display font-bold text-lg leading-tight line-clamp-2">
              {article.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {article.summary}
            </p>

            {/* Read time */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>);

};

export default ArticleCard;