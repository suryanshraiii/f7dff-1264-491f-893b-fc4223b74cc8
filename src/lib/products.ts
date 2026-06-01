export type Recommendation = "buy_online" | "buy_offline" | "wait";
export type Category = "Smartphones" | "Laptops" | "Audio" | "TVs" | "Gaming" | "Wearables" | "Cameras" | "Tablets";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: Category;
  emoji: string;
  image: string;
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

const img = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  { id: "sony-xm5", shortName: "Sony WH-1000XM5", name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", category: "Audio", emoji: "🎧", image: img("1618366712010-f4ae9c647dcb"), rating: 4.7, reviews: 2847, price: 29999, originalPrice: 34999, lowestPrice: 27999, highestPrice: 36999, recommendation: "wait", badges: ["Trending", "Price Drop Expected"], features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.2", "Multi-point Connection"], confidence: 87, waitDays: 5, predictedDrop: 2000 },
  { id: "iphone-15-pm", shortName: "iPhone 15 Pro Max", name: "Apple iPhone 15 Pro Max 256GB Titanium", category: "Smartphones", emoji: "📱", image: img("1592286927505-1def25115558"), rating: 4.8, reviews: 5234, price: 154900, originalPrice: 159900, lowestPrice: 149900, highestPrice: 164900, recommendation: "buy_online", badges: ["Hot Deal", "Limited Stock"], features: ["A17 Pro Chip", "Titanium Design", "5x Telephoto", "USB-C"], confidence: 92, waitDays: 0, predictedDrop: 0 },
  { id: "lg-c3", shortName: "LG C3 OLED 55\"", name: "LG C3 55-inch OLED evo 4K Smart TV", category: "TVs", emoji: "📺", image: img("1593359677879-a4bb92f829d1"), rating: 4.6, reviews: 1456, price: 119990, originalPrice: 139990, lowestPrice: 109990, highestPrice: 149990, recommendation: "buy_offline", badges: ["Best Seller", "Great Value"], features: ["OLED evo", "α9 AI Processor", "Dolby Vision IQ", "120Hz"], confidence: 81, waitDays: 0, predictedDrop: 0 },
  { id: "macbook-air-m3", shortName: "MacBook Air M3", name: "Apple MacBook Air 13\" M3 256GB", category: "Laptops", emoji: "💻", image: img("1517336714731-489689fd1ca8"), rating: 4.9, reviews: 3421, price: 114900, originalPrice: 119900, lowestPrice: 109900, highestPrice: 124900, recommendation: "wait", badges: ["New Launch", "Price Drop Soon"], features: ["M3 Chip", "18hr Battery", "Liquid Retina", "MagSafe"], confidence: 78, waitDays: 7, predictedDrop: 3500 },
  { id: "buds2-pro", shortName: "Samsung Galaxy Buds2 Pro", name: "Samsung Galaxy Buds2 Pro Wireless Earbuds", category: "Audio", emoji: "🎵", image: img("1606220588913-b3aacb4d2f46"), rating: 4.5, reviews: 1823, price: 14999, originalPrice: 17999, lowestPrice: 12999, highestPrice: 19999, recommendation: "buy_online", badges: ["Hot Deal", "Top Rated"], features: ["24-bit Hi-Fi", "ANC", "IPX7", "Galaxy Sync"], confidence: 89, waitDays: 0, predictedDrop: 0 },
  { id: "ps5-digital", shortName: "PS5 Digital Edition", name: "Sony PlayStation 5 Digital Edition Slim", category: "Gaming", emoji: "🎮", image: img("1606813907291-d86efa9b94db"), rating: 4.8, reviews: 4521, price: 44990, originalPrice: 49990, lowestPrice: 39990, highestPrice: 54990, recommendation: "buy_online", badges: ["Limited Stock", "High Demand"], features: ["Custom SSD", "4K 120fps", "DualSense", "3D Audio"], confidence: 84, waitDays: 0, predictedDrop: 0 },
  { id: "s24-ultra", shortName: "Galaxy S24 Ultra", name: "Samsung Galaxy S24 Ultra 512GB Titanium", category: "Smartphones", emoji: "📱", image: img("1610945265064-0e34e5519bbf"), rating: 4.7, reviews: 3892, price: 129999, originalPrice: 144999, lowestPrice: 124999, highestPrice: 149999, recommendation: "buy_online", badges: ["AI Powered", "Best Camera"], features: ["S Pen", "200MP Camera", "Galaxy AI", "Snapdragon 8 Gen 3"], confidence: 90, waitDays: 0, predictedDrop: 0 },
  { id: "airpods-pro-2", shortName: "AirPods Pro 2", name: "Apple AirPods Pro (2nd Gen) USB-C", category: "Audio", emoji: "🎧", image: img("1606741965326-cb990ae01bb2"), rating: 4.8, reviews: 6210, price: 21900, originalPrice: 26900, lowestPrice: 19900, highestPrice: 26900, recommendation: "buy_online", badges: ["Editor's Choice"], features: ["H2 Chip", "Adaptive Audio", "USB-C", "MagSafe Case"], confidence: 91, waitDays: 0, predictedDrop: 0 },
  { id: "xbox-series-x", shortName: "Xbox Series X", name: "Microsoft Xbox Series X 1TB Console", category: "Gaming", emoji: "🎮", image: img("1621259182978-fbf93132d53d"), rating: 4.7, reviews: 2980, price: 49990, originalPrice: 54990, lowestPrice: 47990, highestPrice: 56990, recommendation: "wait", badges: ["Price Drop Soon"], features: ["12 TFLOPS", "Quick Resume", "4K 120fps", "1TB SSD"], confidence: 75, waitDays: 10, predictedDrop: 2500 },
  { id: "dell-xps-15", shortName: "Dell XPS 15", name: "Dell XPS 15 9530 i7 16GB 512GB RTX 4050", category: "Laptops", emoji: "💻", image: img("1496181133206-80ce9b88a853"), rating: 4.6, reviews: 1245, price: 159990, originalPrice: 184990, lowestPrice: 154990, highestPrice: 194990, recommendation: "buy_online", badges: ["Big Save", "Workstation"], features: ["13th Gen i7", "RTX 4050", "OLED Touch", "InfinityEdge"], confidence: 86, waitDays: 0, predictedDrop: 0 },
  { id: "watch-ultra-2", shortName: "Apple Watch Ultra 2", name: "Apple Watch Ultra 2 49mm Titanium GPS+Cellular", category: "Wearables", emoji: "⌚", image: img("1546868871-7041f2a55e12"), rating: 4.8, reviews: 1876, price: 89900, originalPrice: 89900, lowestPrice: 84900, highestPrice: 89900, recommendation: "wait", badges: ["Premium"], features: ["S9 Chip", "36hr Battery", "Action Button", "Dive Computer"], confidence: 70, waitDays: 14, predictedDrop: 4000 },
  { id: "sony-a7iv", shortName: "Sony A7 IV", name: "Sony Alpha A7 IV Full-Frame Mirrorless Camera", category: "Cameras", emoji: "📷", image: img("1502920917128-1aa500764cbd"), rating: 4.9, reviews: 892, price: 219990, originalPrice: 244990, lowestPrice: 214990, highestPrice: 254990, recommendation: "buy_offline", badges: ["Pro Grade"], features: ["33MP Full-Frame", "4K 60p", "759 AF Points", "5-Axis IBIS"], confidence: 83, waitDays: 0, predictedDrop: 0 },
  { id: "ipad-pro-m4", shortName: "iPad Pro M4 11\"", name: "Apple iPad Pro 11\" M4 256GB WiFi", category: "Tablets", emoji: "📱", image: img("1561154464-82e9adf32764"), rating: 4.8, reviews: 2134, price: 99900, originalPrice: 99900, lowestPrice: 96900, highestPrice: 99900, recommendation: "wait", badges: ["New Launch"], features: ["M4 Chip", "Ultra Retina XDR", "Apple Pencil Pro", "Thunderbolt"], confidence: 72, waitDays: 21, predictedDrop: 5000 },
  { id: "bose-qc-ultra", shortName: "Bose QC Ultra", name: "Bose QuietComfort Ultra Headphones", category: "Audio", emoji: "🎧", image: img("1545127398-14699f92334b"), rating: 4.6, reviews: 1567, price: 32990, originalPrice: 39990, lowestPrice: 30990, highestPrice: 41990, recommendation: "buy_online", badges: ["Best ANC"], features: ["Immersive Audio", "World-class ANC", "24hr Battery", "Snapdragon Sound"], confidence: 88, waitDays: 0, predictedDrop: 0 },
  { id: "samsung-qn90c", shortName: "Samsung Neo QLED 65\"", name: "Samsung 65\" Neo QLED 4K QN90C Smart TV", category: "TVs", emoji: "📺", image: img("1593784991095-a205069470b6"), rating: 4.7, reviews: 1023, price: 169990, originalPrice: 209990, lowestPrice: 164990, highestPrice: 219990, recommendation: "buy_offline", badges: ["Mega Deal", "Bright"], features: ["Mini LED", "Neural Quantum 4K", "Anti-Reflection", "144Hz"], confidence: 85, waitDays: 0, predictedDrop: 0 },
  { id: "rog-ally", shortName: "ASUS ROG Ally", name: "ASUS ROG Ally Z1 Extreme Handheld Gaming", category: "Gaming", emoji: "🎮", image: img("1612287230202-1ff1d85d1bdf"), rating: 4.5, reviews: 1432, price: 69990, originalPrice: 79990, lowestPrice: 64990, highestPrice: 84990, recommendation: "buy_online", badges: ["Trending"], features: ["Z1 Extreme APU", "120Hz Touch", "Windows 11", "Anti-glare"], confidence: 80, waitDays: 0, predictedDrop: 0 },
  { id: "galaxy-watch-7", shortName: "Galaxy Watch 7", name: "Samsung Galaxy Watch 7 44mm LTE", category: "Wearables", emoji: "⌚", image: img("1579586337278-3befd40fd17a"), rating: 4.5, reviews: 987, price: 28999, originalPrice: 34999, lowestPrice: 26999, highestPrice: 36999, recommendation: "buy_online", badges: ["Hot Deal"], features: ["Galaxy AI", "BioActive Sensor", "Sleep Coach", "GPS"], confidence: 87, waitDays: 0, predictedDrop: 0 },
  { id: "canon-r6m2", shortName: "Canon EOS R6 Mark II", name: "Canon EOS R6 Mark II Mirrorless Camera Body", category: "Cameras", emoji: "📷", image: img("1606983340126-99ab4feaa64a"), rating: 4.8, reviews: 654, price: 234990, originalPrice: 259990, lowestPrice: 229990, highestPrice: 269990, recommendation: "wait", badges: ["Pro Choice"], features: ["24.2MP", "40fps Burst", "6K Oversampled", "Dual Pixel AF II"], confidence: 76, waitDays: 12, predictedDrop: 6000 },
  // New additions
  { id: "pixel-8-pro", shortName: "Google Pixel 8 Pro", name: "Google Pixel 8 Pro 256GB Obsidian", category: "Smartphones", emoji: "📱", image: img("1598327105666-5b89351aff97"), rating: 4.6, reviews: 2456, price: 89999, originalPrice: 106999, lowestPrice: 84999, highestPrice: 109999, recommendation: "buy_online", badges: ["Best Camera AI", "Big Save"], features: ["Tensor G3", "50MP Triple Cam", "7yr Updates", "Magic Editor"], confidence: 88, waitDays: 0, predictedDrop: 0 },
  { id: "oneplus-12", shortName: "OnePlus 12", name: "OnePlus 12 5G 256GB Silky Black", category: "Smartphones", emoji: "📱", image: img("1556656793-08538906a9f8"), rating: 4.6, reviews: 1987, price: 64999, originalPrice: 69999, lowestPrice: 59999, highestPrice: 72999, recommendation: "wait", badges: ["Flagship Killer"], features: ["Snapdragon 8 Gen 3", "100W SuperVOOC", "Hasselblad Cam", "120Hz LTPO"], confidence: 82, waitDays: 6, predictedDrop: 3000 },
  { id: "rog-strix-g16", shortName: "ASUS ROG Strix G16", name: "ASUS ROG Strix G16 i9 RTX 4070 16GB Gaming Laptop", category: "Laptops", emoji: "💻", image: img("1593642632559-0c6d3fc62b89"), rating: 4.7, reviews: 1156, price: 174990, originalPrice: 199990, lowestPrice: 169990, highestPrice: 209990, recommendation: "buy_online", badges: ["Gaming Beast"], features: ["i9-13980HX", "RTX 4070", "240Hz QHD", "MUX Switch"], confidence: 84, waitDays: 0, predictedDrop: 0 },
  { id: "macbook-pro-14", shortName: "MacBook Pro 14 M3 Pro", name: "Apple MacBook Pro 14\" M3 Pro 18GB 512GB", category: "Laptops", emoji: "💻", image: img("1611186871348-b1ce696e52c9"), rating: 4.9, reviews: 1432, price: 199900, originalPrice: 209900, lowestPrice: 194900, highestPrice: 214900, recommendation: "buy_offline", badges: ["Pro Workflow"], features: ["M3 Pro", "Liquid Retina XDR", "22hr Battery", "ProRes"], confidence: 80, waitDays: 0, predictedDrop: 0 },
  { id: "sony-x90l-65", shortName: "Sony Bravia X90L 65\"", name: "Sony Bravia X90L 65\" 4K Google TV", category: "TVs", emoji: "📺", image: img("1571415060716-baff5f717b5b"), rating: 4.6, reviews: 876, price: 134990, originalPrice: 169990, lowestPrice: 129990, highestPrice: 179990, recommendation: "buy_online", badges: ["Movie Lover"], features: ["Full Array LED", "XR Triluminos Pro", "Google TV", "120Hz"], confidence: 87, waitDays: 0, predictedDrop: 0 },
  { id: "marshall-emberton", shortName: "Marshall Emberton II", name: "Marshall Emberton II Portable Bluetooth Speaker", category: "Audio", emoji: "🔊", image: img("1608043152269-423dbba4e7e1"), rating: 4.7, reviews: 2103, price: 14999, originalPrice: 19999, lowestPrice: 13999, highestPrice: 21999, recommendation: "buy_online", badges: ["Iconic Sound"], features: ["30hr Battery", "IP67", "Stack Mode", "Signature Sound"], confidence: 90, waitDays: 0, predictedDrop: 0 },
  { id: "nintendo-switch-oled", shortName: "Nintendo Switch OLED", name: "Nintendo Switch OLED Model White", category: "Gaming", emoji: "🎮", image: img("1612036782180-6f0b6cd846fe"), rating: 4.8, reviews: 5673, price: 32990, originalPrice: 37990, lowestPrice: 29990, highestPrice: 39990, recommendation: "buy_online", badges: ["Family Fun"], features: ["7\" OLED", "Enhanced Audio", "64GB Storage", "Wired LAN"], confidence: 92, waitDays: 0, predictedDrop: 0 },
  { id: "meta-quest-3", shortName: "Meta Quest 3", name: "Meta Quest 3 512GB Mixed Reality Headset", category: "Gaming", emoji: "🥽", image: img("1622979135225-d2ba269cf1ac"), rating: 4.6, reviews: 1854, price: 54999, originalPrice: 64999, lowestPrice: 51999, highestPrice: 67999, recommendation: "buy_online", badges: ["Mixed Reality"], features: ["Snapdragon XR2 Gen 2", "4K+ Display", "Color Passthrough", "Touch Plus"], confidence: 86, waitDays: 0, predictedDrop: 0 },
  { id: "garmin-fenix-7", shortName: "Garmin Fenix 7", name: "Garmin Fenix 7 Solar Multisport GPS Watch", category: "Wearables", emoji: "⌚", image: img("1523275335684-37898b6baf30"), rating: 4.8, reviews: 1342, price: 64990, originalPrice: 79990, lowestPrice: 59990, highestPrice: 84990, recommendation: "buy_online", badges: ["Adventure Ready"], features: ["Solar Charging", "Topo Maps", "Pulse Ox", "18-day Battery"], confidence: 89, waitDays: 0, predictedDrop: 0 },
  { id: "fitbit-charge-6", shortName: "Fitbit Charge 6", name: "Fitbit Charge 6 Advanced Fitness Tracker", category: "Wearables", emoji: "⌚", image: img("1575311373937-040b8e1fd5b6"), rating: 4.4, reviews: 2876, price: 12999, originalPrice: 16999, lowestPrice: 11499, highestPrice: 18999, recommendation: "buy_online", badges: ["Wellness"], features: ["ECG", "SpO2", "Google Maps", "7-day Battery"], confidence: 91, waitDays: 0, predictedDrop: 0 },
  { id: "fuji-xt5", shortName: "Fujifilm X-T5", name: "Fujifilm X-T5 Mirrorless Camera Body", category: "Cameras", emoji: "📷", image: img("1606983340057-3b13b6e3f08c"), rating: 4.8, reviews: 567, price: 159990, originalPrice: 174990, lowestPrice: 154990, highestPrice: 179990, recommendation: "wait", badges: ["Retro Pro"], features: ["40MP X-Trans", "7-stop IBIS", "6.2K Video", "Film Simulations"], confidence: 79, waitDays: 9, predictedDrop: 4500 },
  { id: "ipad-air-m2", shortName: "iPad Air M2 11\"", name: "Apple iPad Air 11\" M2 128GB WiFi", category: "Tablets", emoji: "📱", image: img("1544244015-0df4b3ffc6b0"), rating: 4.7, reviews: 1654, price: 59900, originalPrice: 59900, lowestPrice: 56900, highestPrice: 59900, recommendation: "buy_online", badges: ["Best Value"], features: ["M2 Chip", "Liquid Retina", "Apple Pencil Pro", "WiFi 6E"], confidence: 84, waitDays: 0, predictedDrop: 0 },
  { id: "galaxy-tab-s9", shortName: "Galaxy Tab S9+", name: "Samsung Galaxy Tab S9+ 12.4\" 256GB WiFi", category: "Tablets", emoji: "📱", image: img("1623126908029-58cb08a2b272"), rating: 4.6, reviews: 1129, price: 89999, originalPrice: 104999, lowestPrice: 84999, highestPrice: 109999, recommendation: "buy_online", badges: ["S Pen Included"], features: ["Snapdragon 8 Gen 2", "Super AMOLED 120Hz", "IP68", "DeX Mode"], confidence: 86, waitDays: 0, predictedDrop: 0 },
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
  { name: "Amazon", delivery: "Tomorrow", offer: "10% cashback with HDFC", priceDelta: 0, badge: "Best Online", best: true, urlBase: "https://www.amazon.in/s?k=" },
  { name: "Flipkart", delivery: "2 days", offer: "Extra ₹500 off on exchange", priceDelta: 500, badge: "Trusted", urlBase: "https://www.flipkart.com/search?q=" },
  { name: "Croma Online", delivery: "3 days", offer: "Free extended warranty", priceDelta: 2000, badge: "Warranty+", urlBase: "https://www.croma.com/searchB?q=" },
  { name: "Reliance Digital", delivery: "2 days", offer: "No-cost EMI up to 12 months", priceDelta: 2500, badge: "EMI", urlBase: "https://www.reliancedigital.in/search?q=" },
  { name: "Vijay Sales", delivery: "4 days", offer: "Bundle with accessories", priceDelta: 1500, badge: "Bundle", urlBase: "https://www.vijaysales.com/search/" },
];

export const nearbyStores = [
  { name: "Croma", distance: "1.2 km", location: "Phoenix Market City, Lower Parel", hours: "10 AM - 10 PM", inStock: true, priceDelta: 2000, badge: "Closest", mapQ: "Croma Phoenix Market City Lower Parel" },
  { name: "Reliance Digital", distance: "2.5 km", location: "Inorbit Mall, Malad", hours: "11 AM - 9 PM", inStock: true, priceDelta: 2500, mapQ: "Reliance Digital Inorbit Mall Malad" },
  { name: "Vijay Sales", distance: "3.8 km", location: "Linking Road, Bandra", hours: "10 AM - 9 PM", inStock: false, priceDelta: 1500, mapQ: "Vijay Sales Linking Road Bandra" },
  { name: "Imagine Apple Store", distance: "4.6 km", location: "Palladium Mall, Worli", hours: "11 AM - 10 PM", inStock: true, priceDelta: 3000, mapQ: "Imagine Apple Store Palladium Mall Worli" },
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
