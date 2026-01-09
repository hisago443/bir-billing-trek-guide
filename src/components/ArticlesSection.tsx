import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { articles } from '@/data/siteData';

const ArticlesSection = () => {
  const navigate = useNavigate();
  const featuredArticles = articles.slice(0, 3);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">Stories & Guides</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Discover insider tips and inspiring stories from Bir Billing
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/articles')}>
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Card 
              key={article.id}
              className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-card"
              onClick={() => navigate(`/articles/${article.slug}`)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={article.featured_image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full capitalize">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(article.published_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured article highlight */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.slice(3, 5).map((article) => (
            <Card 
              key={article.id}
              className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-card flex flex-col md:flex-row"
              onClick={() => navigate(`/articles/${article.slug}`)}
            >
              <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                <img 
                  src={article.featured_image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <CardContent className="p-6 flex flex-col justify-center">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
