export type Recommendation = "buy_online" | "buy_offline" | "wait";
export type Category = "Smartphones" | "Laptops" | "Audio" | "TVs" | "Gaming" | "Wearables" | "Cameras" | "Tablets";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: Category;
  emoji: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  lowestPrice: number;
  highestPrice: number;
  recommendation: Recommendation;
  badges: string[];
  features: string[];
  confidence: number;
  waitDays: number;
  predictedDrop: number;
}

export const products: Product[] = [
  { id: "sony-xm5", shortName: "Sony WH-1000XM5", name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", category: "Audio", emoji: "🎧", rating: 4.7, reviews: 2847, price: 29999, originalPrice: 34999, lowestPrice: 27999, highestPrice: 36999, recommendation: "wait", badges: ["Trending", "Price Drop Expected"], features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.2", "Multi-point Connection"], confidence: 87, waitDays: 5, predictedDrop: 2000 },
  { id: "iphone-15-pm", shortName: "iPhone 15 Pro Max", name: "Apple iPhone 15 Pro Max 256GB Titanium", category: "Smartphones", emoji: "📱", rating: 4.8, reviews: 5234, price: 154900, originalPrice: 159900, lowestPrice: 149900, highestPrice: 164900, recommendation: "buy_online", badges: ["Hot Deal", "Limited Stock"], features: ["A17 Pro Chip", "Titanium Design", "5x Telephoto", "USB-C"], confidence: 92, waitDays: 0, predictedDrop: 0 },
  { id: "lg-c3", shortName: "LG C3 OLED 55\"", name: "LG C3 55-inch OLED evo 4K Smart TV", category: "TVs", emoji: "📺", rating: 4.6, reviews: 1456, price: 119990, originalPrice: 139990, lowestPrice: 109990, highestPrice: 149990, recommendation: "buy_offline", badges: ["Best Seller", "Great Value"], features: ["OLED evo", "α9 AI Processor", "Dolby Vision IQ", "120Hz"], confidence: 81, waitDays: 0, predictedDrop: 0 },
  { id: "macbook-air-m3", shortName: "MacBook Air M3", name: "Apple MacBook Air 13\" M3 256GB", category: "Laptops", emoji: "💻", rating: 4.9, reviews: 3421, price: 114900, originalPrice: 119900, lowestPrice: 109900, highestPrice: 124900, recommendation: "wait", badges: ["New Launch", "Price Drop Soon"], features: ["M3 Chip", "18hr Battery", "Liquid Retina", "MagSafe"], confidence: 78, waitDays: 7, predictedDrop: 3500 },
  { id: "buds2-pro", shortName: "Samsung Galaxy Buds2 Pro", name: "Samsung Galaxy Buds2 Pro Wireless Earbuds", category: "Audio", emoji: "🎵", rating: 4.5, reviews: 1823, price: 14999, originalPrice: 17999, lowestPrice: 12999, highestPrice: 19999, recommendation: "buy_online", badges: ["Hot Deal", "Top Rated"], features: ["24-bit Hi-Fi", "ANC", "IPX7", "Galaxy Sync"], confidence: 89, waitDays: 0, predictedDrop: 0 },
  { id: "ps5-digital", shortName: "PS5 Digital Edition", name: "Sony PlayStation 5 Digital Edition Slim", category: "Gaming", emoji: "🎮", rating: 4.8, reviews: 4521, price: 44990, originalPrice: 49990, lowestPrice: 39990, highestPrice: 54990, recommendation: "buy_online", badges: ["Limited Stock", "High Demand"], features: ["Custom SSD", "4K 120fps", "DualSense", "3D Audio"], confidence: 84, waitDays: 0, predictedDrop: 0 },
  { id: "s24-ultra", shortName: "Galaxy S24 Ultra", name: "Samsung Galaxy S24 Ultra 512GB Titanium", category: "Smartphones", emoji: "📱", rating: 4.7, reviews: 3892, price: 129999, originalPrice: 144999, lowestPrice: 124999, highestPrice: 149999, recommendation: "buy_online", badges: ["AI Powered", "Best Camera"], features: ["S Pen", "200MP Camera", "Galaxy AI", "Snapdragon 8 Gen 3"], confidence: 90, waitDays: 0, predictedDrop: 0 },
  { id: "airpods-pro-2", shortName: "AirPods Pro 2", name: "Apple AirPods Pro (2nd Gen) USB-C", category: "Audio", emoji: "🎧", rating: 4.8, reviews: 6210, price: 21900, originalPrice: 26900, lowestPrice: 19900, highestPrice: 26900, recommendation: "buy_online", badges: ["Editor's Choice"], features: ["H2 Chip", "Adaptive Audio", "USB-C", "MagSafe Case"], confidence: 91, waitDays: 0, predictedDrop: 0 },
  { id: "xbox-series-x", shortName: "Xbox Series X", name: "Microsoft Xbox Series X 1TB Console", category: "Gaming", emoji: "🎮", rating: 4.7, reviews: 2980, price: 49990, originalPrice: 54990, lowestPrice: 47990, highestPrice: 56990, recommendation: "wait", badges: ["Price Drop Soon"], features: ["12 TFLOPS", "Quick Resume", "4K 120fps", "1TB SSD"], confidence: 75, waitDays: 10, predictedDrop: 2500 },
  { id: "dell-xps-15", shortName: "Dell XPS 15", name: "Dell XPS 15 9530 i7 16GB 512GB RTX 4050", category: "Laptops", emoji: "💻", rating: 4.6, reviews: 1245, price: 159990, originalPrice: 184990, lowestPrice: 154990, highestPrice: 194990, recommendation: "buy_online", badges: ["Big Save", "Workstation"], features: ["13th Gen i7", "RTX 4050", "OLED Touch", "InfinityEdge"], confidence: 86, waitDays: 0, predictedDrop: 0 },
  { id: "watch-ultra-2", shortName: "Apple Watch Ultra 2", name: "Apple Watch Ultra 2 49mm Titanium GPS+Cellular", category: "Wearables", emoji: "⌚", rating: 4.8, reviews: 1876, price: 89900, originalPrice: 89900, lowestPrice: 84900, highestPrice: 89900, recommendation: "wait", badges: ["Premium"], features: ["S9 Chip", "36hr Battery", "Action Button", "Dive Computer"], confidence: 70, waitDays: 14, predictedDrop: 4000 },
  { id: "sony-a7iv", shortName: "Sony A7 IV", name: "Sony Alpha A7 IV Full-Frame Mirrorless Camera", category: "Cameras", emoji: "📷", rating: 4.9, reviews: 892, price: 219990, originalPrice: 244990, lowestPrice: 214990, highestPrice: 254990, recommendation: "buy_offline", badges: ["Pro Grade"], features: ["33MP Full-Frame", "4K 60p", "759 AF Points", "5-Axis IBIS"], confidence: 83, waitDays: 0, predictedDrop: 0 },
  { id: "ipad-pro-m4", shortName: "iPad Pro M4 11\"", name: "Apple iPad Pro 11\" M4 256GB WiFi", category: "Tablets", emoji: "📱", rating: 4.8, reviews: 2134, price: 99900, originalPrice: 99900, lowestPrice: 96900, highestPrice: 99900, recommendation: "wait", badges: ["New Launch"], features: ["M4 Chip", "Ultra Retina XDR", "Apple Pencil Pro", "Thunderbolt"], confidence: 72, waitDays: 21, predictedDrop: 5000 },
  { id: "bose-qc-ultra", shortName: "Bose QC Ultra", name: "Bose QuietComfort Ultra Headphones", category: "Audio", emoji: "🎧", rating: 4.6, reviews: 1567, price: 32990, originalPrice: 39990, lowestPrice: 30990, highestPrice: 41990, recommendation: "buy_online", badges: ["Best ANC"], features: ["Immersive Audio", "World-class ANC", "24hr Battery", "Snapdragon Sound"], confidence: 88, waitDays: 0, predictedDrop: 0 },
  { id: "samsung-qn90c", shortName: "Samsung Neo QLED 65\"", name: "Samsung 65\" Neo QLED 4K QN90C Smart TV", category: "TVs", emoji: "📺", rating: 4.7, reviews: 1023, price: 169990, originalPrice: 209990, lowestPrice: 164990, highestPrice: 219990, recommendation: "buy_offline", badges: ["Mega Deal", "Bright"], features: ["Mini LED", "Neural Quantum 4K", "Anti-Reflection", "144Hz"], confidence: 85, waitDays: 0, predictedDrop: 0 },
  { id: "rog-ally", shortName: "ASUS ROG Ally", name: "ASUS ROG Ally Z1 Extreme Handheld Gaming", category: "Gaming", emoji: "🎮", rating: 4.5, reviews: 1432, price: 69990, originalPrice: 79990, lowestPrice: 64990, highestPrice: 84990, recommendation: "buy_online", badges: ["Trending"], features: ["Z1 Extreme APU", "120Hz Touch", "Windows 11", "Anti-glare"], confidence: 80, waitDays: 0, predictedDrop: 0 },
  { id: "galaxy-watch-7", shortName: "Galaxy Watch 7", name: "Samsung Galaxy Watch 7 44mm LTE", category: "Wearables", emoji: "⌚", rating: 4.5, reviews: 987, price: 28999, originalPrice: 34999, lowestPrice: 26999, highestPrice: 36999, recommendation: "buy_online", badges: ["Hot Deal"], features: ["Galaxy AI", "BioActive Sensor", "Sleep Coach", "GPS"], confidence: 87, waitDays: 0, predictedDrop: 0 },
  { id: "canon-r6m2", shortName: "Canon EOS R6 Mark II", name: "Canon EOS R6 Mark II Mirrorless Camera Body", category: "Cameras", emoji: "📷", rating: 4.8, reviews: 654, price: 234990, originalPrice: 259990, lowestPrice: 229990, highestPrice: 269990, recommendation: "wait", badges: ["Pro Choice"], features: ["24.2MP", "40fps Burst", "6K Oversampled", "Dual Pixel AF II"], confidence: 76, waitDays: 12, predictedDrop: 6000 },
];

export const categories = [
  { id: "all", label: "All", emoji: "🔥" },
  { id: "Smartphones", label: "Smartphones", emoji: "📱" },
  { id: "Laptops", label: "Laptops", emoji: "💻" },
  { id: "Audio", label: "Audio", emoji: "🎧" },
  { id: "TVs", label: "TVs", emoji: "📺" },
  { id: "Gaming", label: "Gaming", emoji: "🎮" },
  { id: "Wearables", label: "Wearables", emoji: "⌚" },
  { id: "Cameras", label: "Cameras", emoji: "📷" },
  { id: "Tablets", label: "Tablets", emoji: "📱" },
];

export const onlineStores = [
  { name: "Amazon", delivery: "Tomorrow", offer: "10% cashback with HDFC", priceDelta: 0, badge: "Best Online", best: true },
  { name: "Flipkart", delivery: "2 days", offer: "Extra ₹500 off on exchange", priceDelta: 500, badge: "Trusted" },
  { name: "Croma Online", delivery: "3 days", offer: "Free extended warranty", priceDelta: 2000, badge: "Warranty+" },
  { name: "Reliance Digital", delivery: "2 days", offer: "No-cost EMI up to 12 months", priceDelta: 2500, badge: "EMI" },
  { name: "Vijay Sales", delivery: "4 days", offer: "Bundle with accessories", priceDelta: 1500, badge: "Bundle" },
];

export const nearbyStores = [
  { name: "Croma", distance: "1.2 km", location: "Phoenix Market City, Lower Parel", hours: "10 AM - 10 PM", inStock: true, priceDelta: 2000, badge: "Closest" },
  { name: "Reliance Digital", distance: "2.5 km", location: "Inorbit Mall, Malad", hours: "11 AM - 9 PM", inStock: true, priceDelta: 2500 },
  { name: "Vijay Sales", distance: "3.8 km", location: "Linking Road, Bandra", hours: "10 AM - 9 PM", inStock: false, priceDelta: 1500 },
  { name: "Imagine Apple Store", distance: "4.6 km", location: "Palladium Mall, Worli", hours: "11 AM - 10 PM", inStock: true, priceDelta: 3000 },
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
