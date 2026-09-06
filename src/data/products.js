// ==========================================================================
// MARCELLE DEMO PRODUCTS CATALOG DATA
// Exact match to Reference Visuals & Structure
// ==========================================================================

export const assetPath = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith(import.meta.env.BASE_URL)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, '')}`
}

export const PRODUCTS = [
  {
    id: 'prod-001',
    slug: 'riviera-weekend-resort-wear-set',
    name: 'Riviera Weekend Resort Wear Set',
    type: 'variable',
    sku: '786753',
    price: 250.00,
    originalPrice: 450.00,
    onSale: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 14,
    stockStatus: 'in-stock',
    categories: ['Blazers', 'Jeans'],
    tags: ['everyday-essential', 'street-wear'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Tailored athletic resort top and relaxed linen trouser set engineered for sunlit comfort and timeless elegance.',
    fullDescription: 'Crafted from premium Italian stretch cotton and natural European linen, this set seamlessly transitions from golf greens to sunset dining.',
    specifications: {
      'Composition': '78% Organic Cotton, 22% European Linen',
      'Fit': 'Contemporary Athletic Fit',
      'Care': 'Cold Machine Wash, Line Dry',
      'Made in': 'Portugal'
    },
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [
        { name: 'Pure White', hex: '#FFFFFF' },
        { name: 'Sand Dune', hex: '#E6D7C3' },
        { name: 'Navy Sea', hex: '#1C2938' }
      ]
    }
  },
  {
    id: 'prod-002',
    slug: 'mediterranean-muse-two-piece-set',
    name: 'Mediterranean Muse Two Piece Set',
    type: 'variable',
    sku: '564565',
    price: 250.00,
    originalPrice: 450.00,
    onSale: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 22,
    stockStatus: 'in-stock',
    categories: ['Blazers', 'Jeans'],
    tags: ['casual-layers', 'daily-comfort'],
    images: [
      assetPath('/images/products/golf-muse.jpg'),
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Tailored athletic resort crop top and skirt set engineered for movement and sunlit comfort.',
    fullDescription: 'Inspired by coastal sport and golf greens, cut from breathable premium stretch-cotton blend.',
    specifications: {
      'Composition': '60% Habotai Silk, 40% Cotton',
      'Details': 'Self-tie front knot, elasticated waistband',
      'Care': 'Dry Clean Recommended',
      'Made in': 'Italy'
    },
    attributes: {
      sizes: ['XS', 'S', 'M'],
      colors: [
        { name: 'Sage Garden', hex: '#8A9A86' },
        { name: 'Ochre Sand', hex: '#CBA135' }
      ]
    }
  },
  {
    id: 'prod-003',
    slug: 'coastal-charm-mini-crossbody-bag',
    name: 'Coastal Charm Mini Crossbody Bag',
    type: 'simple',
    sku: '546345',
    price: 890.00,
    originalPrice: null,
    onSale: false,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 9,
    stockStatus: 'in-stock',
    categories: ['Knitwear', 'Jeans'],
    tags: ['urban-style', 'artisan-craft'],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Hand-woven natural raffia tote bag trimmed with vegetable-tanned Italian calf leather handles.',
    fullDescription: 'Handcrafted by master basket-weavers in the Balearic Islands, each tote features unique artisanal weave textures.',
    specifications: {
      'Material': '100% Natural Madagascar Raffia',
      'Trim': 'Full-grain Italian Tuscan Leather',
      'Dimensions': '32cm x 24cm x 14cm',
      'Made in': 'Spain'
    }
  },
  {
    id: 'prod-004',
    slug: 'santorini-sunset-matching-set',
    name: 'Santorini Sunset Matching Set',
    type: 'simple',
    sku: '347654',
    price: 560.00,
    originalPrice: null,
    onSale: false,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 18,
    stockStatus: 'in-stock',
    categories: ['Dresses', 'T-Shirts'],
    tags: ['activewear', 'street-classic'],
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Long-sleeve coastal rashguard and swim brief set in muted eucalyptus sage with UPF 50+ sun protection.',
    fullDescription: 'High-performance quick-drying recycled polyamide engineered for ocean paddleboarding and beach relaxation.',
    specifications: {
      'Material': '82% Recycled ECONYL Polyamide, 18% Elastane',
      'Sun Protection': 'UPF 50+ Certified',
      'Care': 'Rinse after salt water, Line dry',
      'Made in': 'Greece'
    }
  },
  {
    id: 'prod-005',
    slug: 'mediterranean-escape-wrap-dress',
    name: 'Mediterranean Escape Wrap Dress',
    type: 'external',
    sku: '892341',
    price: 150.00,
    originalPrice: 330.00,
    onSale: true,
    isFeatured: false,
    rating: 4.0,
    reviewCount: 31,
    stockStatus: 'in-stock',
    categories: ['Dresses', 'T-Shirts'],
    tags: ['summer-essential', 'wrap-dress'],
    images: [
      assetPath('/images/products/shop-1.jpg'),
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Airy patterned kimono wrap dress with wide bell sleeves and fluid asymmetrical hemline.',
    fullDescription: 'Drapes effortlessly with every summer breeze, ideal for afternoon beach club lunches and warm evening walks.',
    specifications: {
      'Fabric': '100% Breathable Rayon Viscose',
      'Closure': 'Internal security tie & external sash',
      'Care': 'Hand Wash Cold',
      'Made in': 'France'
    }
  },
  {
    id: 'prod-006',
    slug: 'coastal-walk-everyday-flats',
    name: 'Coastal Walk Everyday Flats',
    type: 'grouped',
    sku: '789675',
    price: 420.00,
    originalPrice: null,
    onSale: false,
    isFeatured: false,
    rating: 5.0,
    reviewCount: 12,
    stockStatus: 'in-stock',
    categories: ['Blazers', 'Jeans'],
    tags: ['resort-footwear', 'espadrilles'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Braided jute platform espadrille sandals with artisan floral embroidery and ankle buckle wrap.',
    fullDescription: 'Handcrafted in La Rioja using traditional rope soles vulcanized with natural rubber for enduring traction.',
    specifications: {
      'Sole': 'Natural Spanish Jute with Rubber Outsole',
      'Upper': 'Embroidered Linen Canvas',
      'Heel Height': '6.5 cm platform wedge',
      'Made in': 'Spain'
    }
  },
  {
    id: 'prod-007',
    slug: 'amalfi-breeze-strap-sandals',
    name: 'Amalfi Breeze Strap Sandals',
    type: 'simple',
    sku: '234512',
    price: 380.00,
    originalPrice: null,
    onSale: false,
    isFeatured: false,
    rating: 5.0,
    reviewCount: 8,
    stockStatus: 'in-stock',
    categories: ['Knitwear'],
    tags: ['nautical', 'sandals'],
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Classic Mediterranean striped cotton canvas espadrilles with crossover ankle ribbons.',
    fullDescription: 'Crisp navy-and-white maritime stripes on padded memory-foam jute footbeds.',
    specifications: {
      'Sole': 'Biodegradable Jute & Natural Latex',
      'Upper': 'Heavyweight Sea Canvas',
      'Made in': 'Italy'
    }
  },
  {
    id: 'prod-008',
    slug: 'santorini-linen-blazer',
    name: 'Santorini Relaxed Linen Blazer',
    type: 'variable',
    sku: '453218',
    price: 340.00,
    originalPrice: 490.00,
    onSale: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 16,
    stockStatus: 'in-stock',
    categories: ['Blazers'],
    tags: ['tailoring', 'summer-blazer'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Unstructured double-breasted pure linen blazer tailored for coastal breezes and warm twilight dinners.',
    fullDescription: 'Features tortoiseshell horn buttons, unlined construction for supreme breathability, and patch pockets.',
    specifications: {
      'Fabric': '100% Certified Normandy Flax Linen',
      'Fit': 'Relaxed Oversized Fit',
      'Care': 'Dry Clean or Cold Hand Wash',
      'Made in': 'Italy'
    },
    attributes: {
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [
        { name: 'Oatmeal Natural', hex: '#E6DDD4' },
        { name: 'Pure White', hex: '#FFFFFF' }
      ]
    }
  },
  {
    id: 'prod-009',
    slug: 'capri-knit-halter-jumpsuit',
    name: 'Capri Ribbed Halter Jumpsuit',
    type: 'simple',
    sku: '887643',
    price: 280.00,
    originalPrice: null,
    onSale: false,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 11,
    stockStatus: 'in-stock',
    categories: ['Jumpsuits', 'Knitwear'],
    tags: ['evening-wear', 'knitwear'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Form-fitting open-back ribbed knit jumpsuit with high halter neckline and sweeping wide-leg hem.',
    fullDescription: 'Spun from soft organic mercerized cotton yarn with subtle stretch for comfort from day to night.',
    specifications: {
      'Fabric': '92% Mercerized Organic Cotton, 8% Elastane',
      'Neckline': 'Self-tie Halter Knot',
      'Care': 'Machine Wash Cold Gentle',
      'Made in': 'Portugal'
    }
  }
];

export const CATEGORIES = [
  'All',
  'Blazers',
  'Dresses',
  'Jeans',
  'Jumpsuits',
  'Knitwear',
  'T-Shirts'
];

export const BRAND_PARTNERS = [
  { name: 'Stradivarius' },
  { name: 'Massimo Dutti' },
  { name: 'BYSHD' },
  { name: 'PRADA' },
  { name: 'ZARA' },
  { name: 'VOGUE' }
];
