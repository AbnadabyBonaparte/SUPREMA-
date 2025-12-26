// src/components/cards/ProductCard.tsx

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye, Star, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  isFavorite?: boolean
}

export const ProductCard = memo(function ProductCard({ 
  name, 
  brand, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  badge,
  isFavorite = false 
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="group relative overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-obsidian-900">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true)
            setImageLoaded(true)
          }}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <Badge variant="gold">
              {badge}
            </Badge>
          </div>
        )}
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 flex gap-2"
        >
          <motion.button
            className="p-2.5 rounded-full bg-obsidian-900/90 backdrop-blur-sm border border-sovereign-gold-700/30 hover:bg-obsidian-900 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-marble-50" />
          </motion.button>
          <motion.button
            className={`p-2.5 rounded-full backdrop-blur-sm border transition-colors ${
              isFavorite 
                ? 'bg-ruby-700 border-ruby-700' 
                : 'bg-obsidian-900/90 border-sovereign-gold-700/30 hover:bg-obsidian-900'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-marble-50 text-marble-50' : 'text-marble-50'}`} />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="font-accent text-xs text-sovereign-gold-700 uppercase tracking-wider mb-1">
            {brand}
          </p>
          <h3 className="font-heading text-lg text-marble-50 line-clamp-2 leading-snug">
            {name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'text-sovereign-gold-700 fill-sovereign-gold-700'
                    : 'text-marble-50/20'
                }`}
              />
            ))}
          </div>
          <span className="font-body text-xs text-marble-50/60">
            ({reviews})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-heading text-2xl text-marble-50">
              R$ {price.toFixed(2)}
            </div>
            {originalPrice && (
              <div className="font-body text-xs text-marble-50/40 line-through">
                R$ {originalPrice.toFixed(2)}
              </div>
            )}
          </div>
          
          <Button variant="gold" size="icon" className="rounded-full">
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
})

