/* =====================================================================
   GOLDEN CRUST — EDIT YOUR WEBSITE HERE
   =====================================================================
   This is the only file you need to change for text, pictures and lists.
   - Change a picture: replace the file name (e.g. "logo.png") with yours.
   - Add an item:  copy one { ... } line inside a list, paste it, edit it.
   - Remove an item: delete its whole { ... }, line (keep the commas!).
   - Keep every quote " " and comma , in place.
   - Titles accept an "accent" word which gets the animated gradient.
   - Colors and spacing live in style.css (the :root colors at the top).
   ===================================================================== */

const SITE = {

  /* Folder where your pictures live. "" = same folder as index.html.
     Example: "images/"  (must end with a slash).
     Full web links (https://...) are always used as they are. */
  imageFolder: "",

  pageTitle: "Crave Destination: Satisfy Your Cravings",

  /* ---------- NAV BAR ---------- */
  nav: [
    { label: "Home", href: "#top" },
    { label: "Product", href: "#product-details" },
    { label: "About Us", href: "#about-us" }
  ],

  /* ---------- HOME / HERO ---------- */
  hero: {
    logo: "src/logo/logo.jpg",          // round logo
    logoEmoji: "🍗",           // shown if the logo file is missing
    image: "src/logo/side.jpg",         // big picture on the right
    imageAlt: "",
    name: "Crave Destination",          // big title
    subtitle: "Crave it, love it",
    tagline: "— Destination will satisfy your cravings —",
    buttons: [
      { label: "Buy now", href: "https://www.facebook.com/profile.php?id=61594625332333", style: "solid" },
      { label: "See More", href: "#product-details", style: "ghost" }
    ]
  },

  /* ---------- WHAT MAKES IT SPECIAL ---------- */
  special: {
    title: "What Makes It",
    accent: "Special?",
    cards: [
      {
        icon: "icon1.png",
        emoji: "🥗",
        title: "Packed with Veggies",
        text: "Every ball is loaded with fresh, nutrient-dense vegetables for a healthy, flavorful bite."
      },
      {
        icon: "icon2.png",
        emoji: "🧀",
        title: "Rich, Savory Fillings",
        text: "Every ingredient is freshly chopped and cooked to perfection, delivering a flavor explosion in every bite!"
      },
      {
        icon: "icon3.png",
        emoji: "🎒",
        title: "Perfect On-the-Go",
        text: "No mess, no plates—just pure satisfaction. The ultimate snack for busy students, road trips, or quick afternoon cravings."
      }
    ]
  },

  /* ---------- SCROLLING STRIP (words repeat automatically) ---------- */
  marquee: ["Veggie", "Yummy", "Healthy", "Handheld"],

  /* ---------- DARK BANNER ---------- */
  banner: {
    title: "The Perfect", accent: "Handheld Meal.",
    text: "Healthy snack made with fresh chicken and vegetables. Perfect for students, teachers, and anyone on the go!",
  },

  /* ---------- CUSTOMERS ---------- */
  customers: {
    title: "Thank You for Those Who Already Ordered Our Chicken Viggies!",
    note: "(Asked Permissions before Taking Photos)",
    photos: [
      { img: "src/customer/1.jpg", alt: "Customer enjoying Golden Crust Pizza Roll 1" },
      { img: "src/customer/2.jpg", alt: "Customer enjoying Golden Crust Pizza Roll 2" },
      { img: "src/customer/3.jpg", alt: "Customer enjoying Golden Crust Pizza Roll 3" }
    ]
  },

  /* ---------- PRODUCT ---------- */
  product: {
    title: "Product",
    ingredientsTitle: "Ingredients",
    ingredients: [
      { img: "src/ingredients/chicken.jpg", name: "Chicken" },
      { img: "src/ingredients/onion.jpg", name: "Onion" },
      { img: "src/ingredients/carrots.jpg", name: "Carrots" },
      { img: "src/ingredients/flour.jpg", name: "Flour" },
      { img: "src/ingredients/cornstarch.jpg", name: "Cornstarch" },
      { img: "src/ingredients/cabbage.jpg", name: "Cabbage" },
      { img: "src/ingredients/cookingoil.jpg", name: "Cooking Oil" },
      { img: "src/ingredients/crispyfry.jpg", name: "Crispy Fry" }
    ]
  },

  /* ---------- ABOUT US ---------- */
  about: {
    title: "About", accent: "Us",

    /* Mission / Vision / Objective cards.
       Use  text: "..."  for a paragraph, or  list: ["...", "..."]  for bullets. */
    cards: [
      {
        icon: "🎯", title: "Mission",
        text: "The mission of CHICKEN VEGGIE BALLS is to create a flavorful and nutritious snack made from chicken and vegetables that customers can enjoy at an affordable price. We aim to provide a convenient food option that combines good taste with nutritious ingredients. We are committed to proper food preparation, cleanliness, quality, and excellent customer service while developing our skills in teamwork, creativity, marketing, and entrepreneurship."
      },
      {
        icon: "🔭", title: "Vision",
        text: "Our vision is for CHICKEN VEGGIE BALLS to become a well-loved and trusted snack among students, teachers, and other customers. We want our product to be recognized for its unique combination of chicken and vegetables, delicious flavor, affordable price, and quality. We hope to grow our small student business through creativity, teamwork, and dedication."
      },
      {
        icon: "🚀", title: "Objective",
        list: [
          "1. To produce tasty and nutritious chicken veggie balls using quality chicken and vegetable ingredients.",
          "2. To offer an affordable and convenient snack that can be enjoyed by students, teachers, and other customers.",
          "3. To maintain proper food preparation, cleanliness, and product quality to ensure safe and satisfying food for customers.",
          "4. To provide different serving options and suitable packaging that make the product convenient and appealing to customers.",
          "5. To improve our entrepreneurial abilities through budgeting, production, marketing, selling, teamwork, communication, and decision-making while earning a reasonable profit."
        ]
      }
    ],

    orgChart: { img: "src/about/chart.jpg", alt: "Organizational Chart of Golden Crust Team" },

    facebook: {
      heading: "Facebook Page:",
      label: "Crave Destination",
      url: "https://www.facebook.com/profile.php?id=61594625332333"
    }
  },

  /* ---------- BUSINESS PERMITS ---------- */
  permits: {
    title: "Business", accent: "Permit",
    photos: [
      { img: "src/permit/essupermit.jpg", alt: "LGU Permit" },
      { img: "src/permit/permit.jpg", alt: "BIR Permit" },
      { img: "src/permit/dti.jpg", alt: "DTI Permit" }
    ]
  },

  /* ---------- FOOTER ---------- */
  footer: "2025 Crave Destination Project. Made with love for Ma'am's class."
};
