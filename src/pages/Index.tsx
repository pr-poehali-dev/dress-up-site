import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ClothingItem {
  id: string;
  name: string;
  type: 'hat' | 'top' | 'bottom' | 'shoes';
  emoji: string;
}

interface Outfit {
  id: string;
  name: string;
  items: string[];
  description: string;
}

const wardrobeItems: ClothingItem[] = [
  { id: 'hat1', name: 'Шапка-бини', type: 'hat', emoji: '🧢' },
  { id: 'hat2', name: 'Берет', type: 'hat', emoji: '🎩' },
  { id: 'hat3', name: 'Кепка', type: 'hat', emoji: '🧢' },
  
  { id: 'top1', name: 'Футболка', type: 'top', emoji: '👕' },
  { id: 'top2', name: 'Свитер', type: 'top', emoji: '🧥' },
  { id: 'top3', name: 'Пиджак', type: 'top', emoji: '🥼' },
  { id: 'top4', name: 'Рубашка', type: 'top', emoji: '👔' },
  
  { id: 'bottom1', name: 'Джинсы', type: 'bottom', emoji: '👖' },
  { id: 'bottom2', name: 'Шорты', type: 'bottom', emoji: '🩳' },
  { id: 'bottom3', name: 'Юбка', type: 'bottom', emoji: '👗' },
  
  { id: 'shoes1', name: 'Кроссовки', type: 'shoes', emoji: '👟' },
  { id: 'shoes2', name: 'Ботинки', type: 'shoes', emoji: '👢' },
  { id: 'shoes3', name: 'Туфли', type: 'shoes', emoji: '👠' },
];

const collections: Outfit[] = [
  {
    id: 'casual',
    name: 'Casual',
    items: ['hat1', 'top1', 'bottom1', 'shoes1'],
    description: 'Повседневный образ для прогулок'
  },
  {
    id: 'elegant',
    name: 'Элегант',
    items: ['hat2', 'top3', 'bottom3', 'shoes3'],
    description: 'Стильный вечерний образ'
  },
  {
    id: 'sport',
    name: 'Спорт',
    items: ['hat3', 'top2', 'bottom2', 'shoes1'],
    description: 'Комфортный спортивный стиль'
  },
  {
    id: 'business',
    name: 'Деловой',
    items: ['top4', 'bottom1', 'shoes2'],
    description: 'Образ для работы и встреч'
  }
];

const Index = () => {
  const [currentOutfit, setCurrentOutfit] = useState<{
    hat: string | null;
    top: string | null;
    bottom: string | null;
    shoes: string | null;
  }>({
    hat: 'hat1',
    top: 'top1',
    bottom: 'bottom1',
    shoes: 'shoes1'
  });

  const [isChanging, setIsChanging] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleItemClick = (item: ClothingItem) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentOutfit(prev => ({
        ...prev,
        [item.type]: prev[item.type] === item.id ? null : item.id
      }));
      setIsChanging(false);
    }, 250);
  };

  const applyCollection = (outfit: Outfit) => {
    setIsChanging(true);
    setTimeout(() => {
      const newOutfit = {
        hat: null,
        top: null,
        bottom: null,
        shoes: null
      };
      
      outfit.items.forEach(itemId => {
        const item = wardrobeItems.find(w => w.id === itemId);
        if (item) {
          newOutfit[item.type] = itemId;
        }
      });
      
      setCurrentOutfit(newOutfit);
      setIsChanging(false);
    }, 250);
  };

  const getCurrentItem = (type: 'hat' | 'top' | 'bottom' | 'shoes') => {
    const itemId = currentOutfit[type];
    return itemId ? wardrobeItems.find(item => item.id === itemId) : null;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
              Виртуальная Примерочная
            </h1>
            <Badge variant="secondary" className="text-sm">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Beta
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="home" className="font-heading">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="wardrobe" className="font-heading">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Гардероб
            </TabsTrigger>
            <TabsTrigger value="collections" className="font-heading">
              <Icon name="Star" size={16} className="mr-2" />
              Коллекции
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <Card className="p-8 bg-card/80 backdrop-blur sticky top-24">
                <div className="flex flex-col items-center justify-center min-h-[500px] relative">
                  <div className={`transition-all duration-500 ${isChanging ? 'animate-outfit-change' : ''}`}>
                    <div className="text-8xl mb-4">🧑</div>
                    <div className="space-y-3 text-center">
                      {getCurrentItem('hat') && (
                        <div className="flex items-center justify-center gap-2 animate-slide-up">
                          <span className="text-4xl">{getCurrentItem('hat')?.emoji}</span>
                          <span className="text-sm text-muted-foreground">{getCurrentItem('hat')?.name}</span>
                        </div>
                      )}
                      {getCurrentItem('top') && (
                        <div className="flex items-center justify-center gap-2 animate-slide-up">
                          <span className="text-4xl">{getCurrentItem('top')?.emoji}</span>
                          <span className="text-sm text-muted-foreground">{getCurrentItem('top')?.name}</span>
                        </div>
                      )}
                      {getCurrentItem('bottom') && (
                        <div className="flex items-center justify-center gap-2 animate-slide-up">
                          <span className="text-4xl">{getCurrentItem('bottom')?.emoji}</span>
                          <span className="text-sm text-muted-foreground">{getCurrentItem('bottom')?.name}</span>
                        </div>
                      )}
                      {getCurrentItem('shoes') && (
                        <div className="flex items-center justify-center gap-2 animate-slide-up">
                          <span className="text-4xl">{getCurrentItem('shoes')?.emoji}</span>
                          <span className="text-sm text-muted-foreground">{getCurrentItem('shoes')?.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4 text-foreground">
                    Быстрый выбор
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Выберите гардероб или коллекцию, чтобы начать создавать свой уникальный образ
                  </p>
                </div>

                <div className="grid gap-4">
                  <Button
                    size="lg"
                    variant="default"
                    className="w-full justify-start h-auto py-6"
                    onClick={() => setActiveTab('wardrobe')}
                  >
                    <Icon name="ShoppingBag" size={24} className="mr-3" />
                    <div className="text-left">
                      <div className="font-heading font-semibold text-lg">Открыть гардероб</div>
                      <div className="text-sm opacity-90">Выбирайте отдельные предметы одежды</div>
                    </div>
                  </Button>

                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full justify-start h-auto py-6"
                    onClick={() => setActiveTab('collections')}
                  >
                    <Icon name="Star" size={24} className="mr-3" />
                    <div className="text-left">
                      <div className="font-heading font-semibold text-lg">Готовые образы</div>
                      <div className="text-sm opacity-90">Примерьте стильные коллекции</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wardrobe" className="animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 p-6 bg-card/80 backdrop-blur h-fit sticky top-24">
                <h3 className="font-heading font-semibold text-lg mb-4">Ваш образ</h3>
                <div className={`transition-all duration-500 ${isChanging ? 'animate-outfit-change' : ''}`}>
                  <div className="text-6xl mb-4 text-center">🧑</div>
                  <div className="space-y-2">
                    {(['hat', 'top', 'bottom', 'shoes'] as const).map(type => {
                      const item = getCurrentItem(type);
                      return (
                        <div key={type} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                          <span className="text-2xl">{item?.emoji || '❌'}</span>
                          <span className="text-sm text-muted-foreground">
                            {item?.name || 'Не выбрано'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <div className="lg:col-span-2 space-y-6">
                {(['hat', 'top', 'bottom', 'shoes'] as const).map(type => {
                  const typeNames = {
                    hat: 'Головные уборы',
                    top: 'Верх',
                    bottom: 'Низ',
                    shoes: 'Обувь'
                  };
                  
                  const items = wardrobeItems.filter(item => item.type === type);
                  
                  return (
                    <div key={type}>
                      <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">
                        {typeNames[type]}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {items.map(item => (
                          <Card
                            key={item.id}
                            className={`p-4 cursor-pointer transition-all hover:scale-105 hover:border-primary ${
                              currentOutfit[type] === item.id ? 'border-primary bg-primary/10' : 'bg-card/60'
                            }`}
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2">{item.emoji}</div>
                              <div className="text-sm font-medium">{item.name}</div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="collections" className="animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-card/80 backdrop-blur sticky top-24">
                <div className="flex flex-col items-center justify-center min-h-[500px]">
                  <div className={`transition-all duration-500 ${isChanging ? 'animate-outfit-change' : ''}`}>
                    <div className="text-8xl mb-4">🧑</div>
                    <div className="space-y-3 text-center">
                      {(['hat', 'top', 'bottom', 'shoes'] as const).map(type => {
                        const item = getCurrentItem(type);
                        return item ? (
                          <div key={type} className="flex items-center justify-center gap-2 animate-slide-up">
                            <span className="text-4xl">{item.emoji}</span>
                            <span className="text-sm text-muted-foreground">{item.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-2 text-foreground">
                    Готовые образы
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Выберите коллекцию и примерьте полный образ одним кликом
                  </p>
                </div>

                {collections.map(outfit => (
                  <Card
                    key={outfit.id}
                    className="p-6 cursor-pointer transition-all hover:scale-[1.02] hover:border-primary bg-card/60"
                    onClick={() => applyCollection(outfit)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-1">{outfit.name}</h3>
                        <p className="text-sm text-muted-foreground">{outfit.description}</p>
                      </div>
                      <Icon name="ArrowRight" size={20} className="text-primary" />
                    </div>
                    <div className="flex gap-2">
                      {outfit.items.map(itemId => {
                        const item = wardrobeItems.find(w => w.id === itemId);
                        return item ? (
                          <div key={itemId} className="text-3xl">{item.emoji}</div>
                        ) : null;
                      })}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
