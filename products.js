// LuxeWear Fashion - 50 Premium Products Dataset
const products = [
  // --- WOMEN'S COLLECTION ---
  // Dresses
  {
    id: "w-dress-1",
    name: "Aura Silk Slip Dress",
    price: 340,
    category: "Women",
    subcategory: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An elegant, floor-skimming slip dress crafted from fluid mulberry silk. Features a delicate cowl neckline and adjustable cross-back straps.",
    material: "100% Mulberry Silk",
    care: "Dry clean only. Iron on low heat if needed.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#000000", "#D4AF37", "#FFFFFF"],
    rating: 4.9,
    reviews: [
      { name: "Sophia L.", rating: 5, text: "Absolutely stunning draping. It fits like a glove.", date: "2026-05-14" },
      { name: "Isabella M.", rating: 4, text: "Beautiful fabric, but runs slightly long.", date: "2026-06-01" }
    ],
    aiRecommendation: ["w-handbag-1", "w-footwear-1"],
    trending: true,
    newArrival: false
  },
  {
    id: "w-dress-2",
    name: "Pleated Velvet Maxi Dress",
    price: 420,
    category: "Women",
    subcategory: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1539008885128-40d24ee31230?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Designed for evening statements, this plush velvet gown features fine accordian pleating, a cinched gold belt detail, and an open back.",
    material: "82% Rayon, 18% Silk velvet",
    care: "Dry clean only. Do not iron.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#4A0E17", "#0B2545"],
    rating: 4.8,
    reviews: [
      { name: "Victoria K.", rating: 5, text: "Received so many compliments at the gala!", date: "2026-04-18" }
    ],
    aiRecommendation: ["w-handbag-3", "w-footwear-2"],
    trending: false,
    newArrival: true
  },
  {
    id: "w-dress-3",
    name: "Linen Trench Midi Dress",
    price: 260,
    category: "Women",
    subcategory: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Structured double-breasted dress made from breathable organic flax linen. Complete with tortoiseshell buttons and a matching fabric belt.",
    material: "100% Organic Flax Linen",
    care: "Machine wash cold, line dry. Iron warm.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#F5F5F5", "#D2B48C"],
    rating: 4.5,
    reviews: [],
    aiRecommendation: ["w-handbag-2", "w-footwear-1"],
    trending: false,
    newArrival: false
  },
  {
    id: "w-dress-4",
    name: "Off-Shoulder Knit Midi",
    price: 290,
    category: "Women",
    subcategory: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A cozy but chic off-shoulder ribbed knit midi dress crafted from an ultra-soft merino wool blend.",
    material: "70% Merino Wool, 30% Cashmere",
    care: "Dry clean or hand wash cold, lay flat to dry.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#000000", "#F5F5F5"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["w-jacket-2", "w-footwear-3"],
    trending: true,
    newArrival: true
  },

  // Tops
  {
    id: "w-top-1",
    name: "Satin Drape Camisole",
    price: 135,
    category: "Women",
    subcategory: "Tops",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A luxurious satin top with a cowl neckline and thin spaghetti straps. Essential layering piece for any luxury wardrobe.",
    material: "100% Silk Satin",
    care: "Hand wash cold. Lay flat to dry.",
    sizes: ["S", "M", "L"],
    colors: ["#FFFFFF", "#000000", "#D4AF37"],
    rating: 4.6,
    reviews: [],
    aiRecommendation: ["w-jeans-1", "w-jacket-1"],
    trending: false,
    newArrival: false
  },
  {
    id: "w-top-2",
    name: "Asymmetrical Ribbed Top",
    price: 110,
    category: "Women",
    subcategory: "Tops",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Modern top featuring an asymmetrical neckline and one-shoulder strap. Made with thick, supportive ribbed cotton.",
    material: "95% Organic Cotton, 5% Elastane",
    care: "Machine wash cold, tumble dry low.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#000000", "#FFFFFF"],
    rating: 4.4,
    reviews: [],
    aiRecommendation: ["w-skirt-1", "w-jacket-2"],
    trending: false,
    newArrival: true
  },
  {
    id: "w-top-3",
    name: "Organza Puff Sleeve Blouse",
    price: 195,
    category: "Women",
    subcategory: "Tops",
    images: [
      "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sheer organza blouse with voluminous puff sleeves and a high neckline with bow fastening at the back.",
    material: "100% Polyester Organza",
    care: "Dry clean only.",
    sizes: ["S", "M", "L"],
    colors: ["#FFFFFF", "#E0B0FF"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["w-skirt-2", "w-footwear-2"],
    trending: true,
    newArrival: false
  },

  // Jeans
  {
    id: "w-jeans-1",
    name: "High-Rise Wide Leg Denim",
    price: 180,
    category: "Women",
    subcategory: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Premium Japanese denim featuring a flattering ultra-high rise, relaxed thigh, and a dramatic wide-leg silhouette.",
    material: "100% Organic Denim Cotton",
    care: "Wash inside out with cold water. Hang dry.",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    colors: ["#1F305E", "#808080"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["w-top-1", "w-footwear-1"],
    trending: true,
    newArrival: false
  },
  {
    id: "w-jeans-2",
    name: "Straight-Cut Crop Jeans",
    price: 165,
    category: "Women",
    subcategory: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An everyday classic. Ankle-grazing straight jeans with light washing and subtle distressing along the pockets.",
    material: "99% Cotton, 1% Spandex",
    care: "Machine wash cold. Tumble dry medium.",
    sizes: ["24", "26", "28", "30"],
    colors: ["#ADD8E6", "#000080"],
    rating: 4.5,
    reviews: [],
    aiRecommendation: ["w-top-2", "w-jacket-1"],
    trending: false,
    newArrival: false
  },

  // Skirts
  {
    id: "w-skirt-1",
    name: "Satin Bias Cut Midi Skirt",
    price: 155,
    category: "Women",
    subcategory: "Skirts",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Fluid satin skirt cut on the bias for a beautiful liquid-like drape. Concealed elastic waistband for comfort.",
    material: "100% Viscose Satin",
    care: "Dry clean recommended.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#D4AF37", "#000000", "#F5F5F5"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["w-top-1", "w-footwear-2"],
    trending: true,
    newArrival: false
  },
  {
    id: "w-skirt-2",
    name: "Tailored Leather Mini Skirt",
    price: 240,
    category: "Women",
    subcategory: "Skirts",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A classic high-waisted mini skirt made from buttery soft nappa lamb leather with structural darts.",
    material: "100% Genuine Lambskin Leather",
    care: "Professional leather clean only.",
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#4A2F13"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["w-top-3", "w-jacket-2"],
    trending: false,
    newArrival: true
  },

  // Jackets
  {
    id: "w-jacket-1",
    name: "Tailored Wool Double Blazer",
    price: 395,
    category: "Women",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Double-breasted structured blazer in heavy wool crepe. Structured shoulders and sharp Peak lapels.",
    material: "100% Virgin Wool, Silk Lining",
    care: "Dry clean only.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#F5F5F5"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["w-jeans-1", "w-footwear-3"],
    trending: true,
    newArrival: false
  },
  {
    id: "w-jacket-2",
    name: "Suede Oversized Trench Coat",
    price: 680,
    category: "Women",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A dramatic, floor-length trench coat crafted from premium goat suede. Relaxed fit with dropped shoulders and gun flaps.",
    material: "100% Genuine Goat Suede",
    care: "Professional suede dry clean only.",
    sizes: ["S", "M", "L"],
    colors: ["#8B5A2B", "#000000"],
    rating: 5.0,
    reviews: [],
    aiRecommendation: ["w-dress-1", "w-handbag-1"],
    trending: false,
    newArrival: true
  },
  {
    id: "w-jacket-3",
    name: "Minimalist Cashmere Cardigan Coat",
    price: 490,
    category: "Women",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An unlined open-front coat crafted from double-faced cashmere and wool. Lightweight yet exceptionally warm.",
    material: "60% Wool, 40% Cashmere",
    care: "Dry clean only.",
    sizes: ["S", "M", "L"],
    colors: ["#F5F5F5", "#D2B48C"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["w-top-2", "w-jeans-2"],
    trending: false,
    newArrival: false
  },

  // Handbags
  {
    id: "w-handbag-1",
    name: "Croc-Embossed Leather Tote",
    price: 520,
    category: "Women",
    subcategory: "Handbags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Structured handbag in glossy crocodile-effect leather. Features an internal zip compartment, top handles, and an adjustable shoulder strap.",
    material: "100% Calf Leather, Suede lining",
    care: "Wipe with a clean damp cloth, store in dustbag.",
    sizes: ["One Size"],
    colors: ["#000000", "#4A0E17", "#D4AF37"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["w-dress-1", "w-jacket-1"],
    trending: true,
    newArrival: false
  },
  {
    id: "w-handbag-2",
    name: "Gold-Chain Crossbody Clutch",
    price: 320,
    category: "Women",
    subcategory: "Handbags",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Slim evening clutch crafted from smooth calfskin with an iconic heavy gold curb chain strap. Magnetic front closure.",
    material: "100% Italian Calf Leather",
    care: "Avoid moisture and contact with abrasive surfaces.",
    sizes: ["One Size"],
    colors: ["#000000", "#FFFFFF"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["w-dress-2", "w-footwear-2"],
    trending: false,
    newArrival: true
  },
  {
    id: "w-handbag-3",
    name: "Saddle Shoulder Bag",
    price: 450,
    category: "Women",
    subcategory: "Handbags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Elegant saddle-shaped shoulder bag featuring gold hardware and a wide leather strap. Timeless accessory for day or night.",
    material: "100% Full-grain Leather",
    care: "Condition with leather balm regularly.",
    sizes: ["One Size"],
    colors: ["#8B5A2B", "#000000"],
    rating: 4.6,
    reviews: [],
    aiRecommendation: ["w-jacket-3", "w-jeans-1"],
    trending: false,
    newArrival: false
  },

  // Footwear
  {
    id: "w-footwear-1",
    name: "Square-Toe Leather Mules",
    price: 280,
    category: "Women",
    subcategory: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Minimalist leather mules with a sculptural flared block heel and contemporary square-toe bed.",
    material: "Leather Upper, Leather Sole",
    care: "Wipe clean. Store in a cool, dry place.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["#FFFFFF", "#000000", "#D2B48C"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["w-skirt-1", "w-handbag-1"],
    trending: true,
    newArrival: false
  },
  {
    id: "w-footwear-2",
    name: "Slingback Suede Pumps",
    price: 310,
    category: "Women",
    subcategory: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Refined slingback pumps with elegant pointed toe, structured thin straps, and comfortable kitten heel.",
    material: "Kid Suede Leather",
    care: "Brush gently with a suede brush.",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["#000000", "#4A0E17"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["w-dress-1", "w-handbag-2"],
    trending: false,
    newArrival: false
  },
  {
    id: "w-footwear-3",
    name: "Knee-High Slouchy Boots",
    price: 540,
    category: "Women",
    subcategory: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Pull-on knee-high boots in rich cognac brown leather with a relaxed slouchy shaft and thick stacked heel.",
    material: "Calfskin Leather, Leather lining",
    care: "Protect with waterproof spray prior to wear.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["#8B5A2B", "#000000"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["w-dress-4", "w-jacket-2"],
    trending: false,
    newArrival: true
  },

  // --- MEN'S COLLECTION ---
  // Shirts
  {
    id: "m-shirt-1",
    name: "Linen Tailored Resort Shirt",
    price: 145,
    category: "Men",
    subcategory: "Shirts",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A relaxed, camp-collar shirt constructed from pre-washed premium Irish linen. Breathable, comfortable, and naturally textured.",
    material: "100% Irish Linen",
    care: "Machine wash warm, iron while damp for best results.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#F5F5F5", "#808080"],
    rating: 4.8,
    reviews: [
      { name: "Julian P.", rating: 5, text: "Excellent quality and cut. Perfect for high summer.", date: "2026-06-02" }
    ],
    aiRecommendation: ["m-jeans-2", "m-shoes-1"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-shirt-2",
    name: "Egyptian Cotton Oxford Shirt",
    price: 160,
    category: "Men",
    subcategory: "Shirts",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A crisp formal dress shirt featuring a button-down collar, structured cuffs, and mother-of-pearl buttons.",
    material: "100% Giza Egyptian Cotton",
    care: "Warm machine wash. Iron high heat.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#FFFFFF", "#ADD8E6"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["m-jacket-1", "m-shoes-2"],
    trending: false,
    newArrival: false
  },
  {
    id: "m-shirt-3",
    name: "Silk-Cotton Knit Polo",
    price: 185,
    category: "Men",
    subcategory: "Shirts",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sophisticated retro style knit polo. Short sleeves, rib-knit collar, and three-button placket. Lightweight feel with elegant shine.",
    material: "55% Silk, 45% Organic Cotton",
    care: "Hand wash cold. Lay flat to dry.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#F5F5F5", "#1B4D3E"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["m-jeans-1", "m-shoes-1"],
    trending: false,
    newArrival: true
  },

  // T-Shirts
  {
    id: "m-tshirt-1",
    name: "Pima Cotton Crew Tee",
    price: 80,
    category: "Men",
    subcategory: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Crafted from long-staple Peruvian Pima cotton, this premium t-shirt offers unparalleled softness and durability with a clean fitted cut.",
    material: "100% ELS Peruvian Pima Cotton",
    care: "Machine wash cold. Do not bleach.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#FFFFFF", "#808080"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["m-jeans-1", "m-jacket-2"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-tshirt-2",
    name: "Heavyweight Boxy Tee",
    price: 95,
    category: "Men",
    subcategory: "T-Shirts",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Streetwear-inspired tee with dropped shoulders, wide sleeves, and a thick rib neckline. Made from dry-hand loopback cotton.",
    material: "100% Organic Heavy Cotton (300 GSM)",
    care: "Wash cold, air dry to prevent shrinkage.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#F5F5F5", "#000000"],
    rating: 4.6,
    reviews: [],
    aiRecommendation: ["m-hoodie-1", "m-jeans-2"],
    trending: false,
    newArrival: true
  },

  // Jeans
  {
    id: "m-jeans-1",
    name: "Raw Selvage Slim Jeans",
    price: 220,
    category: "Men",
    subcategory: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Unwashed indigo selvage denim from Okayama. Slim straight leg, copper hardware, and signature red chain-stitch finish.",
    material: "100% Japanese Selvage Cotton Denim",
    care: "Wear frequently, wash rarely. Hand wash cold inside out.",
    sizes: ["30", "31", "32", "33", "34", "36"],
    colors: ["#0B2545"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["m-tshirt-1", "m-jacket-3"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-jeans-2",
    name: "Relaxed Tapered Washed Jeans",
    price: 190,
    category: "Men",
    subcategory: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Relaxed fit jeans tapering gently at the ankle. Pre-washed for a soft worn-in feel from day one.",
    material: "98% Cotton, 2% Polyurethane",
    care: "Machine wash cold with similar colors.",
    sizes: ["30", "32", "34", "36"],
    colors: ["#ADD8E6", "#808080"],
    rating: 4.5,
    reviews: [],
    aiRecommendation: ["m-shirt-1", "m-shoes-1"],
    trending: false,
    newArrival: false
  },

  // Jackets
  {
    id: "m-jacket-1",
    name: "Monarch Wool Overcoat",
    price: 790,
    category: "Men",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A tailored, double-breasted coat crafted from premium melton wool with a hint of cashmere. Satin-lined sleeves for easy layering.",
    material: "85% Virgin Wool, 15% Cashmere",
    care: "Dry clean only.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000", "#4A2F13"],
    rating: 5.0,
    reviews: [
      { name: "Robert H.", rating: 5, text: "A true masterpiece of design. Incredibly warm and soft.", date: "2026-05-10" }
    ],
    aiRecommendation: ["m-shirt-2", "m-shoes-2"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-jacket-2",
    name: "Suede Bomber Jacket",
    price: 620,
    category: "Men",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Classic flight jacket reinterpreted in premium calf suede. Ribbed knit collar, hem, and cuffs, with two-way heavy metal zipper.",
    material: "100% Calf Suede, Acetate Lining",
    care: "Professional leather/suede clean only.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8B5A2B", "#000000"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["m-tshirt-1", "m-jeans-1"],
    trending: false,
    newArrival: true
  },
  {
    id: "m-jacket-3",
    name: "Nappa Leather Biker Jacket",
    price: 690,
    category: "Men",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Rock-and-roll styling in smooth nappa leather. Features off-center zip, silver hardware lapel studs, and zipped cuffs.",
    material: "100% Full-grain Nappa Sheepskin",
    care: "Professional leather clean.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["m-tshirt-1", "m-jeans-1"],
    trending: false,
    newArrival: false
  },

  // Hoodies
  {
    id: "m-hoodie-1",
    name: "Cashmere Knit Hoodie",
    price: 360,
    category: "Men",
    subcategory: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Elevated lounge attire. This hoodie is fine knit from luxurious 12-gauge Mongolian cashmere. Drawstring hood and front kangaroo pocket.",
    material: "100% Mongolian Cashmere",
    care: "Hand wash cold. Lay flat to dry or dry clean.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#F5F5F5", "#000000", "#808080"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["m-jeans-2", "m-shoes-1"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-hoodie-2",
    name: "French Terry Oversized Hoodie",
    price: 180,
    category: "Men",
    subcategory: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Thick, loopback cotton French Terry hoodie. Features double-layered hood without drawstrings for a modern, clean silhouette.",
    material: "100% Organic Loopback Cotton (450 GSM)",
    care: "Machine wash cold. Line dry.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#000000", "#121212", "#0B2545"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["m-tshirt-2", "m-jeans-2"],
    trending: false,
    newArrival: true
  },

  // Shoes
  {
    id: "m-shoes-1",
    name: "Minimalist Leather Sneakers",
    price: 240,
    category: "Men",
    subcategory: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Sleek low-top sneakers in pristine white calfskin. Margom rubber sole, gold-stamped serial numbers, and full leather lining.",
    material: "Italian Calf Leather, Margom Rubber Sole",
    care: "Clean with a damp cloth and leather cleaner.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["#FFFFFF", "#000000"],
    rating: 4.8,
    reviews: [],
    aiRecommendation: ["m-tshirt-1", "m-jeans-2"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-shoes-2",
    name: "Suede Chelsea Boots",
    price: 320,
    category: "Men",
    subcategory: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Classic Chelsea boots constructed in Italy from premium calf suede. Elasticated side panels, pull tabs, and durable leather soles.",
    material: "Calf Suede Leather",
    care: "Treat with water repellent spray. Clean with suede brush.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#8B5A2B", "#000000"],
    rating: 4.9,
    reviews: [],
    aiRecommendation: ["m-jacket-1", "m-jeans-1"],
    trending: false,
    newArrival: false
  },

  // Accessories
  {
    id: "m-acc-1",
    name: "Gold-Plated Signet Ring",
    price: 195,
    category: "Men",
    subcategory: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Minimalist signet ring crafted from solid 925 sterling silver, plated in 18k yellow gold. Smooth, polished finish ideal for engraving.",
    material: "925 Sterling Silver, 18k Gold Plating (3 Microns)",
    care: "Avoid contact with water and chemicals. Polish with soft cloth.",
    sizes: ["8", "9", "10", "11"],
    colors: ["#D4AF37"],
    rating: 4.7,
    reviews: [],
    aiRecommendation: ["m-shirt-3", "m-acc-2"],
    trending: true,
    newArrival: false
  },
  {
    id: "m-acc-2",
    name: "Leather Cardholder Wallet",
    price: 110,
    category: "Men",
    subcategory: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Slim leather wallet with 4 credit card slots and a central bill compartment. Signature gold-embossed brand name.",
    material: "100% Grained Calf Leather",
    care: "Avoid exposure to direct heat or sunlight.",
    sizes: ["One Size"],
    colors: ["#000000", "#8B5A2B"],
    rating: 4.6,
    reviews: [],
    aiRecommendation: ["m-jacket-2", "m-tshirt-1"],
    trending: false,
    newArrival: false
  }
];

// Dynamically generate the remaining 26 products to reach a total of 50
// using variations of high-fashion luxury garments to populate our shop
const namesPool = {
  Women: {
    Dresses: ["Satin Backless Gown", "Chiffon Pleated Dress", "Lace Panel Cocktail Dress", "Embroidered Kaftan"],
    Tops: ["Silk Utility Shirt", "Cashmere Mock Neck Top", "Satin Halter Camisole", "Linen Crop Blouse"],
    Jeans: ["Slim Indigo Denim", "White Flare Denim", "Mom-Fit Vintage Wash"],
    Skirts: ["Wrap Linen Skirt", "Floral Silk Midi", "Houndstooth Wool Skirt"],
    Jackets: ["Quilted Puffer Coat", "Tailored Linen Vest", "Cropped Denim Jacket"],
    Handbags: ["Suede Bucket Bag", "Woven Straw Clutch", "Structured Top-Handle Case"],
    Footwear: ["Leather Strappy Sandals", "Suede Pointed Flat Mules", "Lug-Sole Combat Boots"]
  },
  Men: {
    Shirts: ["Grandad Collar Shirt", "Pinstripe Linen Blouse", "Flannel Overshirt"],
    Tops: ["Merino Crew Knit", "Waffle Knit Long Sleeve", "Organic Cotton V-Neck"],
    Jeans: ["Black Distressed Slim Jeans", "Classic Straight Blue Jeans"],
    Jackets: ["Tech Shell Raincoat", "Double-Breasted Wool Blazer", "Shearling Collar Jacket"],
    Hoodies: ["Knit Zip Cardigan", "Logo Crewneck Sweatshirt"],
    Shoes: ["Calfskin Loafers", "Waterproof Suede Desert Boots", "Classic Leather Brogues"],
    Accessories: ["Ribbed Cashmere Beanie", "Polarized Acetate Sunglasses", "Pebbled Leather Belt"]
  }
};

const imagePool = {
  Dresses: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800"
  ],
  Tops: [
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
  ],
  Jeans: [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"
  ],
  Skirts: [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
  ],
  Jackets: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"
  ],
  Handbags: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800"
  ],
  Footwear: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
  ],
  Shirts: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"
  ],
  Hoodies: [
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
  ],
  Shoes: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800"
  ]
};

// Seed function to hit exactly 50 products
let counter = 1;
const cats = ["Women", "Men"];
while (products.length < 50) {
  const cat = cats[counter % 2];
  const subs = Object.keys(namesPool[cat]);
  const sub = subs[Math.floor(Math.random() * subs.length)];
  const nameList = namesPool[cat][sub];
  const name = nameList[Math.floor(Math.random() * nameList.length)] + ` - Coll. 0${counter}`;
  
  const price = Math.floor(Math.random() * 300) + 120;
  const imgs = imagePool[sub] || imagePool["Tops"];
  
  products.push({
    id: `${cat[0].toLowerCase()}-${sub.toLowerCase()}-gen-${counter}`,
    name: name,
    price: price,
    category: cat,
    subcategory: sub,
    images: [imgs[0], imgs[1] || imgs[0]],
    description: `A stunning expression of contemporary styling. This premium item from our latest collection is meticulously tailored to showcase LuxeWear's signature minimalist drape.`,
    material: "90% Organic Cotton, 10% Recycled Blends",
    care: "Hand wash cold. Lay flat to dry.",
    sizes: sub === "Handbags" || sub === "Accessories" ? ["One Size"] : ["S", "M", "L"],
    colors: ["#000000", "#FFFFFF", "#D4AF37", "#F5F5F5"],
    rating: parseFloat((4.0 + Math.random() * 1.0).toFixed(1)),
    reviews: [],
    aiRecommendation: [`w-dress-1`, `m-shirt-1`],
    trending: Math.random() > 0.7,
    newArrival: Math.random() > 0.7
  });
  counter++;
}

// Export the products database for browser use
if (typeof module !== "undefined") {
  module.exports = products;
} else {
  window.productsDatabase = products;
}
