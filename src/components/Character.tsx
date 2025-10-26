import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CharacterProps {
  outfit: {
    hat: string | null;
    top: string | null;
    bottom: string | null;
    shoes: string | null;
  };
  isChanging: boolean;
  wardrobeItems: Array<{
    id: string;
    name: string;
    type: 'hat' | 'top' | 'bottom' | 'shoes';
    emoji: string;
  }>;
}

const Character = ({ outfit, isChanging, wardrobeItems }: CharacterProps) => {
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState(50);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const getCurrentItem = (type: 'hat' | 'top' | 'bottom' | 'shoes') => {
    const itemId = outfit[type];
    return itemId ? wardrobeItems.find(item => item.id === itemId) : null;
  };

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  const handleWalk = (dir: 'left' | 'right') => {
    setDirection(dir);
    setIsWalking(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => {
        setPosition(prev => {
          const newPos = direction === 'right' ? prev + 2 : prev - 2;
          if (newPos >= 90 || newPos <= 10) {
            setIsWalking(false);
            return prev;
          }
          return newPos;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isWalking, direction]);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-card to-muted/30 rounded-lg overflow-hidden border border-border">
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary/20"></div>
      
      <div 
        className={`absolute bottom-24 transition-all duration-100 ${
          isJumping ? 'animate-bounce' : ''
        } ${isChanging ? 'animate-outfit-change' : ''}`}
        style={{ 
          left: `${position}%`,
          transform: `translateX(-50%) ${direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="text-[180px] leading-none">🧍</div>
          
          {getCurrentItem('hat') && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl animate-slide-up">
              {getCurrentItem('hat')?.emoji}
            </div>
          )}
          
          {getCurrentItem('top') && (
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 text-6xl animate-slide-up">
              {getCurrentItem('top')?.emoji}
            </div>
          )}
          
          {getCurrentItem('bottom') && (
            <div className="absolute top-[130px] left-1/2 -translate-x-1/2 text-6xl animate-slide-up">
              {getCurrentItem('bottom')?.emoji}
            </div>
          )}
          
          {getCurrentItem('shoes') && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-5xl animate-slide-up">
              {getCurrentItem('shoes')?.emoji}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-card/80 backdrop-blur p-3 rounded-lg border border-border z-10">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleWalk('left')}
          disabled={isWalking}
          className="gap-2"
        >
          <Icon name="ArrowLeft" size={16} />
          Влево
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={handleJump}
          disabled={isJumping}
          className="gap-2"
        >
          <Icon name="ArrowUp" size={16} />
          Прыжок
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleWalk('right')}
          disabled={isWalking}
          className="gap-2"
        >
          Вправо
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>

      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur p-3 rounded-lg border border-border max-w-[200px]">
        <div className="text-xs text-muted-foreground mb-2">Текущий образ:</div>
        <div className="flex flex-col gap-1">
          {(['hat', 'top', 'bottom', 'shoes'] as const).map(type => {
            const item = getCurrentItem(type);
            return item ? (
              <div key={type} className="flex items-center gap-2 text-xs">
                <span className="text-lg">{item.emoji}</span>
                <span className="truncate">{item.name}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Character;