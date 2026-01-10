import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, Clock, User, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { articles } from '@/data/siteData';

const ArticlesSection = () => {
  const navigate = useNavigate();
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 4);
  const moreArticles = articles.slice(4, 6);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-semibold">Travel Stories</span>
            </div>
            <h2 className="section-title text-left mb-2">Stories & Guides</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Insider tips, travel guides, and inspiring stories from Bir Billing
            </p>
          </div>
          <Button variant="outline" size="lg" onClick={() => navigate('/articles')} className="hidden md:flex">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Featured Article + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Article */}
          <Card 
            className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-card h-full"
            onClick={() => navigate(`/articles/${featuredArticle.slug}`)}
          >
            <div className="relative h-80 lg:h-full overflow-hidden">
              <img 
                src={featuredArticle.featured_image} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-bold rounded-full capitalize inline-flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Featured
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 inline-block">
                  {featuredArticle.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-secondary transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-white/80 mb-4 line-clamp-2">{featuredArticle.excerpt}</p>
                
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(featuredArticle.published_at).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Article Grid */}
          <div className="grid grid-cols-1 gap-6">
            {otherArticles.map((article) => (
              <Card 
                key={article.id}
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-card flex flex-row h-36"
                onClick={() => navigate(`/articles/${article.slug}`)}
              >
                <div className="relative w-36 md:w-44 h-full overflow-hidden flex-shrink-0">
                  <img 
                    src={article.featured_image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <CardContent className="p-4 flex flex-col justify-center flex-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.published_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* More Articles Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreArticles.map((article) => (
            <Card 
              key={article.id}
              className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 border-0 bg-card"
              onClick={() => navigate(`/articles/${article.slug}`)}
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={article.featured_image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full capitalize">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(article.published_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-14 md:hidden">
          <Button variant="outline" size="lg" onClick={() => navigate('/articles')}>
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
